import { describe, expect, it } from 'vitest';
import { createReportGenerationInput } from '@/lib/report-generation-input';
import {
  MAX_ADDITIONAL_CONTEXT_LENGTH,
  orionReportSchema,
  parseGeneratedReportForInput,
  reportGenerationInputSchema,
} from '@/lib/report-schemas';
import { createValidReport, validGenerationInput } from './fixtures';

describe('ReportGenerationInput boundary', () => {
  it('accepts the approved input shape', () => {
    expect(reportGenerationInputSchema.safeParse(validGenerationInput).success).toBe(true);
  });

  it('rejects missing fields, implausible ages, and oversized context', () => {
    const missingFocus: Record<string, unknown> = { ...validGenerationInput };
    delete missingFocus.focusArea;
    expect(reportGenerationInputSchema.safeParse(missingFocus).success).toBe(false);
    expect(
      reportGenerationInputSchema.safeParse({
        ...validGenerationInput,
        subject: { ...validGenerationInput.subject, age: 121 },
      }).success,
    ).toBe(false);
    expect(
      reportGenerationInputSchema.safeParse({
        ...validGenerationInput,
        additionalContext: 'x'.repeat(MAX_ADDITIONAL_CONTEXT_LENGTH + 1),
      }).success,
    ).toBe(false);
  });

  it('rejects reference preference as an extra AI-boundary field', () => {
    expect(
      reportGenerationInputSchema.safeParse({
        ...validGenerationInput,
        referencePreference: 'They / Them',
      }).success,
    ).toBe(false);
  });

  it('maps questionnaire answers without birth date or reference preference', () => {
    const input = createReportGenerationInput({
      firstName: ' Maya ',
      zodiacSign: 'Capricorn',
      birthDate: '1994-01-15',
      pronouns: 'They / Them',
      attentionArea: 'Career',
      behavioralStatement: 'I overthink things',
      additionalContext: '  A useful detail.  ',
    });

    expect(input).not.toBeNull();
    expect(input).not.toHaveProperty('birthDate');
    expect(input).not.toHaveProperty('pronouns');
    expect(input).toMatchObject({
      subject: { name: 'Maya', zodiacSign: 'Capricorn' },
      additionalContext: 'A useful detail.',
    });
  });
});

describe('OrionReport runtime validation', () => {
  it('accepts a complete report', () => {
    expect(orionReportSchema.safeParse(createValidReport()).success).toBe(true);
  });

  it('rejects missing sections and malformed insights', () => {
    const missingSummary = createValidReport() as Partial<ReturnType<typeof createValidReport>>;
    delete missingSummary.summary;
    expect(orionReportSchema.safeParse(missingSummary).success).toBe(false);

    const malformedInsight = createValidReport();
    malformedInsight.risks[0].description = '';
    expect(orionReportSchema.safeParse(malformedInsight).success).toBe(false);
  });

  it('rejects wrong metric counts and out-of-range metric values', () => {
    const wrongCount = createValidReport();
    wrongCount.metrics.pop();
    expect(orionReportSchema.safeParse(wrongCount).success).toBe(false);

    const invalidValue = createValidReport();
    invalidValue.metrics[0].value = 101;
    expect(orionReportSchema.safeParse(invalidValue).success).toBe(false);
  });

  it('rejects malformed or provider-modified subject identity', () => {
    const malformedSubject = createValidReport();
    malformedSubject.subject.age = -1;
    expect(orionReportSchema.safeParse(malformedSubject).success).toBe(false);

    const changedIdentity = createValidReport();
    changedIdentity.subject.name = 'Someone Else';
    expect(() =>
      parseGeneratedReportForInput(changedIdentity, validGenerationInput),
    ).toThrow();
  });
});
