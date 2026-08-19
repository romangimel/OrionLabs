import { afterEach, describe, expect, it, vi } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AnalysisLoadingExperience } from '@/components/analysis/AnalysisLoadingExperience';
import {
  ANALYSIS_CALIBRATION_MESSAGES,
  ANALYSIS_CALIBRATION_STAGE_STARTS_MS,
  resolveCalibrationSequence,
} from '@/lib/analysis-presentation';
import { createSubjectSignature } from '@/lib/subject-signature';
import { scheduleAnalysisPresentationTimers } from '@/hooks/useAnalysisPresentationSequence';

const presentationDurationMs = 16_000;

describe('analysis calibration presentation', () => {
  it('keeps all five approved messages in their intended order', () => {
    expect(ANALYSIS_CALIBRATION_MESSAGES).toEqual([
      'Mapping behavioral resonance...',
      'Ignoring centuries of scientific consensus...',
      'Resolving ambiguity through proprietary optimism...',
      'Finalizing conclusions before reviewing the evidence...',
      'Report complete. Redirecting before reconsideration...',
    ]);
    expect(ANALYSIS_CALIBRATION_STAGE_STARTS_MS).toEqual([
      0,
      3_500,
      7_500,
      11_500,
      15_500,
    ]);
  });

  it('keeps one active row while preserving completed and upcoming rows', () => {
    const sequence = resolveCalibrationSequence(7_500, presentationDurationMs);

    expect(sequence.activeStageIndex).toBe(2);
    expect(sequence.rowStates).toEqual([
      'complete',
      'complete',
      'active',
      'upcoming',
      'upcoming',
    ]);
    expect(sequence.rowStates.filter((state) => state === 'active')).toHaveLength(1);
  });

  it('keeps step 5 active after the minimum duration until a valid report is ready', () => {
    const sequence = resolveCalibrationSequence(presentationDurationMs, presentationDurationMs, {
      minimumExperienceComplete: true,
    });

    expect(sequence.minimumExperienceComplete).toBe(true);
    expect(sequence.activeStageIndex).toBe(4);
    expect(sequence.rowStates).toEqual([
      'complete',
      'complete',
      'complete',
      'complete',
      'active',
    ]);
  });

  it('settles every row only when a valid report is ready to redirect', () => {
    const sequence = resolveCalibrationSequence(presentationDurationMs, presentationDurationMs, {
      minimumExperienceComplete: true,
      reportReadyToRedirect: true,
    });

    expect(sequence.minimumExperienceComplete).toBe(true);
    expect(sequence.activeStageIndex).toBeNull();
    expect(sequence.rowStates).toEqual([
      'complete',
      'complete',
      'complete',
      'complete',
      'complete',
    ]);
  });

  it('freezes an ordinary failure on the active row without completing future rows', () => {
    const sequence = resolveCalibrationSequence(7_500, presentationDurationMs, {
      hasFailed: true,
    });

    expect(sequence.activeStageIndex).toBeNull();
    expect(sequence.rowStates).toEqual([
      'complete',
      'complete',
      'failed',
      'upcoming',
      'upcoming',
    ]);
  });

  it('cancels a failed attempt before a retried sequence schedules its own milestones', () => {
    vi.useFakeTimers();
    const firstAttemptStages: number[] = [];
    const secondAttemptStages: number[] = [];
    const cancelFirstAttempt = scheduleAnalysisPresentationTimers({
      durationMs: presentationDurationMs,
      stageStartMs: ANALYSIS_CALIBRATION_STAGE_STARTS_MS,
      onStageStart: (stageStartMs) => firstAttemptStages.push(stageStartMs),
      onMinimumExperienceComplete: () => firstAttemptStages.push(presentationDurationMs),
    });

    vi.advanceTimersByTime(7_500);
    cancelFirstAttempt();

    const cancelSecondAttempt = scheduleAnalysisPresentationTimers({
      durationMs: presentationDurationMs,
      stageStartMs: ANALYSIS_CALIBRATION_STAGE_STARTS_MS,
      onStageStart: (stageStartMs) => secondAttemptStages.push(stageStartMs),
      onMinimumExperienceComplete: () => secondAttemptStages.push(presentationDurationMs),
    });
    vi.advanceTimersByTime(3_500);

    expect(firstAttemptStages).toEqual([3_500, 7_500]);
    expect(secondAttemptStages).toEqual([3_500]);
    cancelSecondAttempt();
  });

  it('renders the full persistent sequence without the retired operation card copy', () => {
    const markup = renderToStaticMarkup(
      createElement(AnalysisLoadingExperience, {
        signature: createSubjectSignature({
          zodiacSign: 'Capricorn',
          focusArea: 'Career',
          behavioralStatement: 'I overthink things',
        }),
        messages: ANALYSIS_CALIBRATION_MESSAGES,
        rowStates: ['complete', 'active', 'upcoming', 'upcoming', 'upcoming'],
        phase: 'loading',
        onRetry: () => undefined,
      }),
    );

    ANALYSIS_CALIBRATION_MESSAGES.forEach((message) => {
      expect(markup).toContain(message);
    });
    expect(markup).toContain('data-calibration-rail="true"');
    ['01', '02', '03', '04', '05'].forEach((stepNumber) => {
      expect(markup).toContain(`>${stepNumber}</span>`);
    });
    expect(markup).not.toContain('Current operation');
    expect(markup).not.toContain('Calibrating your celestial profile');
  });

  it('renders the failed row marker and reuses the gold primary CTA for ordinary retry', () => {
    const markup = renderToStaticMarkup(
      createElement(AnalysisLoadingExperience, {
        signature: createSubjectSignature({
          zodiacSign: 'Capricorn',
          focusArea: 'Career',
          behavioralStatement: 'I overthink things',
        }),
        messages: ANALYSIS_CALIBRATION_MESSAGES,
        rowStates: ['complete', 'failed', 'upcoming', 'upcoming', 'upcoming'],
        phase: 'error',
        onRetry: () => undefined,
      }),
    );

    expect(markup).toContain('lucide-circle-x');
    expect(markup).toContain('Retry analysis');
    expect(markup).toContain('bg-gradient-to-r');
    expect(markup).toContain('text-[#070514]');
  });

  it('preserves capacity handling by omitting the Retry action', () => {
    const markup = renderToStaticMarkup(
      createElement(AnalysisLoadingExperience, {
        signature: createSubjectSignature({
          zodiacSign: 'Capricorn',
          focusArea: 'Career',
          behavioralStatement: 'I overthink things',
        }),
        messages: ANALYSIS_CALIBRATION_MESSAGES,
        rowStates: ['complete', 'failed', 'upcoming', 'upcoming', 'upcoming'],
        phase: 'capacity',
        onRetry: () => undefined,
      }),
    );

    expect(markup).toContain('Return to review');
    expect(markup).not.toContain('Retry analysis');
  });
});

afterEach(() => {
  vi.useRealTimers();
});
