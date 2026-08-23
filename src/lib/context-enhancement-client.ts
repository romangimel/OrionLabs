import type { ContextEnhancementInput } from '@/lib/context-enhancement-schema';
import { contextEnhancementResponseSchema } from '@/lib/context-enhancement-schema';

export class ContextEnhancementRequestError extends Error {}

async function readJsonPayload(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

/** Calls only the OrionLabs endpoint and reconstructs the privacy-minimized body. */
export async function requestContextEnhancement(
  input: ContextEnhancementInput,
): Promise<string> {
  // Reconstruct the mode-specific shape so accidental caller fields cannot cross
  // the browser-to-server privacy boundary.
  const requestBody: ContextEnhancementInput =
    input.mode === 'enhance'
      ? {
          mode: 'enhance',
          additionalContext: input.additionalContext,
        }
      : {
          mode: 'generate',
          focusArea: input.focusArea,
          behavioralStatement: input.behavioralStatement,
        };

  let response: Response;
  try {
    response = await fetch('/api/enhance-context', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
  } catch {
    throw new ContextEnhancementRequestError('Context enhancement could not be reached.');
  }

  if (!response.ok) {
    throw new ContextEnhancementRequestError('Context enhancement is unavailable.');
  }

  const result = contextEnhancementResponseSchema.safeParse(
    await readJsonPayload(response),
  );
  if (!result.success) {
    throw new ContextEnhancementRequestError(
      'Context enhancement returned invalid data.',
    );
  }

  return result.data.enhancedContext;
}
