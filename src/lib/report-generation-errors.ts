/** Stable API code for provider or upstream analysis-capacity exhaustion. */
export const ANALYSIS_CAPACITY_EXHAUSTED_CODE =
  'ANALYSIS_CAPACITY_EXHAUSTED' as const;

/** Reads only the public machine code from OrionLabs' safe API error shape. */
export function getReportGenerationErrorCode(payload: unknown): string | null {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const error = (payload as Record<string, unknown>).error;
  if (!error || typeof error !== 'object') {
    return null;
  }

  const code = (error as Record<string, unknown>).code;
  return typeof code === 'string' ? code : null;
}
