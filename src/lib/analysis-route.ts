/**
 * Keeps a valid in-progress analysis separate from the last completed report.
 * Without a pending run, completed-report recovery remains the safe default for
 * direct `/calibration` navigation.
 */
export function resolveAnalysisRouteDestination(
  hasActiveCompletedReport: boolean,
  canRenderAnalysis: boolean,
): '/report' | '/questionnaire' | null {
  if (canRenderAnalysis) {
    return null;
  }

  if (hasActiveCompletedReport) {
    return '/report';
  }

  return '/questionnaire';
}
