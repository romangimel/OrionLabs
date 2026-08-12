import { describe, expect, it } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AnalysisLoadingExperience } from '@/components/analysis/AnalysisLoadingExperience';
import {
  ANALYSIS_CALIBRATION_MESSAGES,
  ANALYSIS_CALIBRATION_STAGE_STARTS_MS,
  resolveCalibrationSequence,
} from '@/lib/analysis-presentation';
import { createSubjectSignature } from '@/lib/subject-signature';

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

  it('settles every row without restarting when the theatrical timeline ends', () => {
    const sequence = resolveCalibrationSequence(presentationDurationMs, presentationDurationMs);

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
});
