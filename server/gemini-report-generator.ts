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

export const GEMINI_REPORT_MODEL = 'gemini-3.6-flash';
const MAX_GENERATION_ATTEMPTS = 2;
const RETRYABLE_STATUS_CODES = new Set([408, 429, 500, 502, 503, 504]);

type GenerateCandidate = (input: ReportGenerationInput) => Promise<unknown>;

export class MissingGeminiApiKeyError extends Error {}

function isRetryableGenerationError(error: unknown) {
  return (
    error instanceof SyntaxError ||
    error instanceof ZodError ||
    error instanceof TypeError ||
    (error instanceof ApiError && RETRYABLE_STATUS_CODES.has(error.status)) ||
    error instanceof GeneratedReportIdentityError
  );
}

/** Runs one initial generation plus at most one retry for transient or malformed output. */
export async function generateReportWithRetry(
  input: ReportGenerationInput,
  generateCandidate: GenerateCandidate,
): Promise<OrionReport> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_GENERATION_ATTEMPTS; attempt += 1) {
    try {
      const candidate = await generateCandidate(input);
      return parseGeneratedReportForInput(candidate, input);
    } catch (error) {
      lastError = error;
      if (attempt === MAX_GENERATION_ATTEMPTS || !isRetryableGenerationError(error)) {
        throw error;
      }
    }
  }

  throw lastError;
}

function createGeminiCandidateGenerator(apiKey: string): GenerateCandidate {
  // The SDK defaults to five HTTP attempts. Disable those implicit retries so
  // OrionLabs' explicit policy remains one initial request plus one retry.
  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      timeout: 30_000,
      retryOptions: { attempts: 1 },
    },
  });
  const responseSchema = zodToJsonSchema(orionReportSchema, {
    $refStrategy: 'none',
  });
  // Gemini expects the schema itself, not the JSON Schema draft declaration.
  delete responseSchema.$schema;

  return async (input) => {
    const interaction = await ai.interactions.create({
      model: GEMINI_REPORT_MODEL,
      system_instruction: ORIONLABS_SYSTEM_PROMPT,
      input: buildReportGenerationPrompt(input),
      response_format: {
        type: 'text',
        mime_type: 'application/json',
        schema: responseSchema,
      },
    });

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
