import { useEffect, useRef, useState } from 'react';
import {
  resolveCalibrationSequence,
  type CalibrationRowState,
} from '@/lib/analysis-presentation';

interface AnalysisPresentationSequenceOptions {
  durationMs: number;
  stageStartMs: readonly number[];
  runKey: number;
  isAttemptActive: boolean;
  hasFailed: boolean;
  reportReadyToRedirect: boolean;
}

interface AnalysisPresentationTimerScheduleOptions {
  durationMs: number;
  stageStartMs: readonly number[];
  onStageStart: (elapsedMs: number) => void;
  onMinimumExperienceComplete: () => void;
}

/**
 * Schedules one attempt's approved milestones and returns its cancellation function.
 * The cancellation flag also protects against a callback that was already queued when
 * a failure, retry, or unmount invalidated the attempt.
 */
export function scheduleAnalysisPresentationTimers({
  durationMs,
  stageStartMs,
  onStageStart,
  onMinimumExperienceComplete,
}: AnalysisPresentationTimerScheduleOptions) {
  let isCancelled = false;
  const stageTimers = stageStartMs.slice(1).map((stageStartMs) =>
    globalThis.setTimeout(() => {
      if (!isCancelled) {
        onStageStart(stageStartMs);
      }
    }, stageStartMs),
  );
  const completionTimer = globalThis.setTimeout(() => {
    if (!isCancelled) {
      onMinimumExperienceComplete();
    }
  }, durationMs);

  return () => {
    isCancelled = true;
    stageTimers.forEach((timer) => globalThis.clearTimeout(timer));
    globalThis.clearTimeout(completionTimer);
  };
}

/**
 * Advances the theatrical calibration sequence only during an active Analysis attempt.
 * Its separate minimum-duration gate preserves the approved presentation timing without
 * allowing stale timers to advance a failed or superseded attempt.
 */
export function useAnalysisPresentationSequence({
  durationMs,
  stageStartMs,
  runKey,
  isAttemptActive,
  hasFailed,
  reportReadyToRedirect,
}: AnalysisPresentationSequenceOptions) {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [minimumExperienceComplete, setMinimumExperienceComplete] = useState(false);
  const timerGenerationRef = useRef(0);
  const renderedRunKeyRef = useRef(runKey);
  const hasNewRun = renderedRunKeyRef.current !== runKey;

  if (hasNewRun) {
    // Render row 1 immediately when Retry starts instead of waiting for an effect reset.
    renderedRunKeyRef.current = runKey;
  }

  useEffect(() => {
    setElapsedMs(0);
    setMinimumExperienceComplete(false);
  }, [runKey]);

  useEffect(() => {
    const timerGeneration = timerGenerationRef.current + 1;
    timerGenerationRef.current = timerGeneration;

    if (!isAttemptActive) {
      return;
    }

    const cancelTimers = scheduleAnalysisPresentationTimers({
      durationMs,
      stageStartMs,
      onStageStart: (stageStartMs) => {
        if (timerGenerationRef.current === timerGeneration) {
          setElapsedMs(stageStartMs);
        }
      },
      onMinimumExperienceComplete: () => {
        if (timerGenerationRef.current === timerGeneration) {
          setMinimumExperienceComplete(true);
        }
      },
    });

    return () => {
      cancelTimers();
      if (timerGenerationRef.current === timerGeneration) {
        timerGenerationRef.current += 1;
      }
    };
  }, [durationMs, isAttemptActive, runKey, stageStartMs]);

  const sequence = resolveCalibrationSequence(hasNewRun ? 0 : elapsedMs, durationMs, {
    hasFailed,
    minimumExperienceComplete: hasNewRun ? false : minimumExperienceComplete,
    reportReadyToRedirect,
  });

  return {
    activeStageIndex: sequence.activeStageIndex,
    minimumExperienceComplete: sequence.minimumExperienceComplete,
    rowStates: sequence.rowStates as readonly CalibrationRowState[],
  };
}
