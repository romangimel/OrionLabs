/** The theatrical copy shown alongside the independently animated signature. */
export const ANALYSIS_CALIBRATION_MESSAGES = [
  'Mapping behavioral resonance...',
  'Ignoring centuries of scientific consensus...',
  'Resolving ambiguity through proprietary optimism...',
  'Finalizing conclusions before reviewing the evidence...',
  'Report complete. Redirecting before reconsideration...',
] as const;

/**
 * These presentation-only milestones deliberately do not correspond to
 * provider, validation, or persistence events. The last stage begins shortly
 * before the approved 16-second Subject Signature timeline settles.
 */
export const ANALYSIS_CALIBRATION_STAGE_STARTS_MS = [
  0,
  3_500,
  7_500,
  11_500,
  15_500,
] as const;

export type CalibrationRowState = 'upcoming' | 'active' | 'complete' | 'failed';

interface CalibrationSequence {
  activeStageIndex: number | null;
  minimumExperienceComplete: boolean;
  rowStates: readonly CalibrationRowState[];
}

interface CalibrationSequenceOptions {
  hasFailed?: boolean;
  minimumExperienceComplete?: boolean;
  reportReadyToRedirect?: boolean;
}

/** Resolves the stable visual state for every calibration row at a given time. */
export function resolveCalibrationSequence(
  elapsedMs: number,
  durationMs: number,
  {
    hasFailed = false,
    minimumExperienceComplete = elapsedMs >= durationMs,
    reportReadyToRedirect = false,
  }: CalibrationSequenceOptions = {},
): CalibrationSequence {
  if (minimumExperienceComplete && reportReadyToRedirect) {
    return {
      activeStageIndex: null,
      minimumExperienceComplete: true,
      rowStates: ANALYSIS_CALIBRATION_MESSAGES.map(() => 'complete'),
    };
  }

  let activeStageIndex = 0;
  ANALYSIS_CALIBRATION_STAGE_STARTS_MS.forEach((stageStartMs, stageIndex) => {
    if (elapsedMs >= stageStartMs) {
      activeStageIndex = stageIndex;
    }
  });

  return {
    activeStageIndex: hasFailed ? null : activeStageIndex,
    minimumExperienceComplete,
    rowStates: ANALYSIS_CALIBRATION_MESSAGES.map((_, rowIndex) => {
      if (rowIndex < activeStageIndex) {
        return 'complete';
      }

      if (rowIndex === activeStageIndex) {
        return hasFailed ? 'failed' : 'active';
      }

      return 'upcoming';
    }),
  };
}
