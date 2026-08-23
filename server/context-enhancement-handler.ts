import type { ContextEnhancementInput } from '../src/lib/context-enhancement-schema.js';
import { contextEnhancementInputSchema } from '../src/lib/context-enhancement-schema.js';
import {
  GroqContextRateLimitError,
  MissingGroqApiKeyError,
  enhanceContextWithGroq,
} from './groq-context-enhancer.js';

export const MAX_CONTEXT_ENHANCEMENT_BODY_BYTES = 4_096;

type ContextEnhancer = (input: ContextEnhancementInput) => Promise<string>;

function jsonResponse(body: unknown, status: number, extraHeaders?: HeadersInit) {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      ...extraHeaders,
    },
  });
}

function enhancementUnavailableResponse(status = 502) {
  return jsonResponse(
    {
      error: {
        code: 'ENHANCEMENT_UNAVAILABLE',
        message: 'Context enhancement is temporarily unavailable.',
      },
    },
    status,
  );
}

/** Creates the narrow Vercel handler with an injectable provider for tests. */
export function createContextEnhancementHandler(
  enhanceContext: ContextEnhancer = enhanceContextWithGroq,
) {
  return async function handleContextEnhancement(request: Request): Promise<Response> {
    if (request.method !== 'POST') {
      return jsonResponse(
        { error: { code: 'METHOD_NOT_ALLOWED', message: 'Use POST for this endpoint.' } },
        405,
        { Allow: 'POST' },
      );
    }

    const declaredLength = Number(request.headers.get('content-length'));
    if (
      Number.isFinite(declaredLength) &&
      declaredLength > MAX_CONTEXT_ENHANCEMENT_BODY_BYTES
    ) {
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

    if (new TextEncoder().encode(rawBody).byteLength > MAX_CONTEXT_ENHANCEMENT_BODY_BYTES) {
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

    const inputResult = contextEnhancementInputSchema.safeParse(body);
    if (!inputResult.success) {
      return jsonResponse(
        { error: { code: 'INVALID_INPUT', message: 'The enhancement input is invalid.' } },
        400,
      );
    }

    try {
      const enhancedContext = await enhanceContext(inputResult.data);
      return jsonResponse({ enhancedContext }, 200);
    } catch (error) {
      if (error instanceof MissingGroqApiKeyError) {
        console.error('[enhance-context] GROQ_API_KEY is not configured.');
        return enhancementUnavailableResponse(503);
      }

      if (error instanceof GroqContextRateLimitError) {
        console.error('[enhance-context] Provider capacity is unavailable.');
        return enhancementUnavailableResponse(429);
      }

      // Do not log raw provider messages or the user's free-context text.
      console.error('[enhance-context] Enhancement failed.', {
        errorType: error instanceof Error ? error.constructor.name : 'UnknownError',
      });
      return enhancementUnavailableResponse();
    }
  };
}
