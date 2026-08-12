/**
 * Keeps completed report recovery ahead of the temporary analysis draft guard.
 * A completed snapshot is the durable state for the current tab; the draft is
 * intentionally removed once that snapshot has been stored.
 */
export function resolveAnalysisRouteDestination(
  hasActiveCompletedReport: boolean,
  canRenderAnalysis: boolean,
): '/report' | '/questionnaire' | null {
  if (hasActiveCompletedReport) {
    return '/report';
  }

  return canRenderAnalysis ? null : '/questionnaire';
}
