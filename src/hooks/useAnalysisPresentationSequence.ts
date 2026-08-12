import { useEffect, useState } from 'react';
import {
  resolveCalibrationSequence,
  type CalibrationRowState,
} from '@/lib/analysis-presentation';

interface AnalysisPresentationSequenceOptions {
  durationMs: number;
  stageStartMs: readonly number[];
  runKey: number;
}

/** Advances the theatrical calibration sequence independently from the provider request. */
export function useAnalysisPresentationSequence({
  durationMs,
  stageStartMs,
  runKey,
}: AnalysisPresentationSequenceOptions) {
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    setElapsedMs(0);

    const stageTimers = stageStartMs.slice(1).map((stageStartMs) =>
      window.setTimeout(() => setElapsedMs(stageStartMs), stageStartMs),
    );

    const completionTimer = window.setTimeout(() => setElapsedMs(durationMs), durationMs);

    return () => {
      stageTimers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(completionTimer);
    };
  }, [durationMs, runKey, stageStartMs]);

  const sequence = resolveCalibrationSequence(elapsedMs, durationMs);

  return {
    activeStageIndex: sequence.activeStageIndex,
    minimumExperienceComplete: sequence.minimumExperienceComplete,
    rowStates: sequence.rowStates as readonly CalibrationRowState[],
  };
}
