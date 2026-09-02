import { ApiError, GoogleGenAI } from '@google/genai';
import { ZodError } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';
import type { OrionReport } from '../src/data/report.js';
import type { ReportGenerationInput } from '../src/lib/report-generation-input.js';
import {
  GeneratedReportIdentityError,
  orionReportSchema,
  parseGeneratedReportForInput,
} from '../src/lib/report-schemas.js';
import { ORIONLABS_SYSTEM_PROMPT } from './prompts/orionlabs-system-prompt.js';
import { buildReportGenerationPrompt } from './prompts/report-generation-prompt.js';

export const GEMINI_REPORT_MODEL = 'gemini-3.7-flash';
const MAX_GENERATION_ATTEMPTS = 2;
const GEMINI_PROVIDER_TIMEOUT_MS = 90_000;
// Vercel permits 120 seconds. Reserve ten seconds for parsing, validation,
// error handling, serialization, and HTTP completion. A retry is allowed only
// when another full provider attempt fits inside the remaining internal budget.
const GENERATION_RETRY_DEADLINE_MS = 110_000;
const GEMINI_INTERACTIONS_REQUEST_OPTIONS = {
  timeout: GEMINI_PROVIDER_TIMEOUT_MS,
  maxRetries: 0,
} as const;
const RETRYABLE_STATUS_CODES = new Set([408, 429, 500, 502, 503, 504]);

type GenerateCandidate = (input: ReportGenerationInput) => Promise<unknown>;

export class MissingGeminiApiKeyError extends Error {}

/** Provider capacity is unavailable for the current request window or quota boundary. */
export class GeminiCapacityExhaustedError extends Error {}

function getProviderHttpStatus(error: unknown): number | null {
  if (error instanceof ApiError) {
    return error.status;
  }

  if (!error || typeof error !== 'object') {
    return null;
  }

  // The SDK's Interactions API currently wraps failures in compatibility
  // errors with numeric `status`/`statusCode` fields instead of public ApiError.
  const providerError = error as Record<string, unknown>;
  const status = providerError.status ?? providerError.statusCode;
  return typeof status === 'number' ? status : null;
}

function isGeminiCapacityExhaustion(error: unknown) {
  return getProviderHttpStatus(error) === 429;
}

function isRetryableGenerationError(error: unknown) {
  const providerStatus = getProviderHttpStatus(error);
  return (
    error instanceof SyntaxError ||
    error instanceof ZodError ||
    error instanceof TypeError ||
    (providerStatus !== null && RETRYABLE_STATUS_CODES.has(providerStatus)) ||
    error instanceof GeneratedReportIdentityError
  );
}

/** Runs one initial generation plus at most one retry for transient or malformed output. */
export async function generateReportWithRetry(
  input: ReportGenerationInput,
  generateCandidate: GenerateCandidate,
  getCurrentTime = Date.now,
): Promise<OrionReport> {
  let lastError: unknown;
  const generationStartedAt = getCurrentTime();

  for (let attempt = 1; attempt <= MAX_GENERATION_ATTEMPTS; attempt += 1) {
    try {
      const candidate = await generateCandidate(input);
      return parseGeneratedReportForInput(candidate, input);
    } catch (error) {
      lastError = error;
      if (isGeminiCapacityExhaustion(error)) {
        // Treat 429 broadly as capacity exhaustion without parsing unstable
        // provider payload/message details or claiming a specific limit type.
        throw new GeminiCapacityExhaustedError(
          'Gemini report-generation capacity is exhausted.',
        );
      }
      const canFitAnotherProviderAttempt =
        getCurrentTime() - generationStartedAt + GEMINI_PROVIDER_TIMEOUT_MS <=
        GENERATION_RETRY_DEADLINE_MS;
      if (
        attempt === MAX_GENERATION_ATTEMPTS ||
        !isRetryableGenerationError(error) ||
        !canFitAnotherProviderAttempt
      ) {
        throw error;
      }
    }
  }

  throw lastError;
}

function createGeminiCandidateGenerator(apiKey: string): GenerateCandidate {
  const ai = new GoogleGenAI({ apiKey });
  const responseSchema = zodToJsonSchema(orionReportSchema, {
    $refStrategy: 'none',
  });
  // Gemini expects the schema itself, not the JSON Schema draft declaration.
  delete responseSchema.$schema;

  return async (input) => {
    const interaction = await ai.interactions.create(
      {
        model: GEMINI_REPORT_MODEL,
        generation_config: { thinking_level: 'low' },
        system_instruction: ORIONLABS_SYSTEM_PROMPT,
        input: buildReportGenerationPrompt(input),
        response_format: {
          type: 'text',
          mime_type: 'application/json',
          schema: responseSchema,
        },
      },
      // Interactions uses a separate generated client, so the parent
      // `httpOptions.retryOptions` setting does not control this request.
      // OrionLabs owns retries and needs every outer attempt to issue one call.
      GEMINI_INTERACTIONS_REQUEST_OPTIONS,
    );

    if (!interaction.output_text) {
      throw new SyntaxError('Gemini returned no structured report text.');
    }

    return JSON.parse(interaction.output_text) as unknown;
  };
}

/** Server-only provider boundary. The API key is never returned or logged. */
export async function generateGeminiReport(
  input: ReportGenerationInput,
): Promise<OrionReport> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new MissingGeminiApiKeyError('GEMINI_API_KEY is not configured.');
  }

  return generateReportWithRetry(input, createGeminiCandidateGenerator(apiKey));
}
