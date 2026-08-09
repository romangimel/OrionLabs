import type { OrionReport } from '@/data/report';
import type { ReportGenerationInput } from '@/lib/report-generation-input';
import { reportGenerationInputSchema } from '@/lib/report-schemas';
import {
  generateGeminiReport,
  MissingGeminiApiKeyError,
} from './gemini-report-generator';

const MAX_REQUEST_BODY_BYTES = 16_384;

type ReportGenerator = (input: ReportGenerationInput) => Promise<OrionReport>;

function jsonResponse(body: unknown, status: number, extraHeaders?: HeadersInit) {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      ...extraHeaders,
    },
  });
}

function safeGenerationErrorResponse() {
  return jsonResponse(
    {
      error: {
        code: 'REPORT_GENERATION_FAILED',
        message: 'OrionLabs could not complete this analysis. Please try again.',
      },
    },
    502,
  );
}

/** Creates the Vercel handler with an injectable generator for focused tests. */
export function createReportGenerationHandler(
  generateReport: ReportGenerator = generateGeminiReport,
) {
  return async function handleReportGeneration(request: Request): Promise<Response> {
    if (request.method !== 'POST') {
      return jsonResponse(
        { error: { code: 'METHOD_NOT_ALLOWED', message: 'Use POST for this endpoint.' } },
        405,
        { Allow: 'POST' },
      );
    }

    const declaredLength = Number(request.headers.get('content-length'));
    if (Number.isFinite(declaredLength) && declaredLength > MAX_REQUEST_BODY_BYTES) {
      return jsonResponse(
        { error: { code: 'REQUEST_TOO_LARGE', message: 'The request is too large.' } },
        413,
      );
    }

    let rawBody: string;
    try {
      rawBody = await request.text();
    } catch {
      return jsonResponse(
        { error: { code: 'INVALID_REQUEST', message: 'The request could not be read.' } },
        400,
      );
    }

    if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BODY_BYTES) {
      return jsonResponse(
        { error: { code: 'REQUEST_TOO_LARGE', message: 'The request is too large.' } },
        413,
      );
    }

    let body: unknown;
    try {
      body = JSON.parse(rawBody) as unknown;
    } catch {
      return jsonResponse(
        { error: { code: 'INVALID_JSON', message: 'The request body must be valid JSON.' } },
        400,
      );
    }

    const inputResult = reportGenerationInputSchema.safeParse(body);
    if (!inputResult.success) {
      return jsonResponse(
        { error: { code: 'INVALID_INPUT', message: 'The report input is invalid.' } },
        400,
      );
    }

    try {
      const report = await generateReport(inputResult.data);
      return jsonResponse({ report }, 200);
    } catch (error) {
      if (error instanceof MissingGeminiApiKeyError) {
        console.error('[generate-report] GEMINI_API_KEY is not configured.');
        return jsonResponse(
          {
            error: {
              code: 'SERVICE_NOT_CONFIGURED',
              message: 'Report generation is not configured for this environment.',
            },
          },
          503,
        );
      }

      // Avoid logging provider messages or questionnaire text. The exception
      // class is enough to distinguish failures during development.
      console.error('[generate-report] Generation failed.', {
        errorType: error instanceof Error ? error.constructor.name : 'UnknownError',
      });
      return safeGenerationErrorResponse();
    }
  };
}
