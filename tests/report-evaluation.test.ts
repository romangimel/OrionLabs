import { describe, expect, it } from 'vitest';
import { evaluateReportRedFlags } from '../evaluation/report-evaluation';
import { REPORT_GENERATION_EVALUATION_FIXTURES } from '../evaluation/report-generation-fixtures';
import { reportGenerationInputSchema } from '@/lib/report-schemas';
import { createValidReport } from './fixtures';
import type { ReportEvaluationFixture } from '../evaluation/report-generation-fixtures';

describe('offline report-generation evaluation fixtures', () => {
  it('provides a small valid set with meaningful coverage', () => {
    expect(REPORT_GENERATION_EVALUATION_FIXTURES).toHaveLength(8);

    const fixtures = REPORT_GENERATION_EVALUATION_FIXTURES;
    expect(new Set(fixtures.map(({ id }) => id)).size).toBe(fixtures.length);
    expect(new Set(fixtures.map(({ input }) => input.subject.zodiacSign)).size).toBeGreaterThanOrEqual(6);
    expect(new Set(fixtures.map(({ input }) => input.focusArea)).size).toBeGreaterThanOrEqual(6);
    expect(new Set(fixtures.map(({ input }) => input.behavioralStatement)).size).toBe(5);
    expect(fixtures.some(({ input }) => input.subject.age <= 21)).toBe(true);
    expect(fixtures.some(({ input }) => input.subject.age >= 65)).toBe(true);
    expect(fixtures.some(({ input }) => input.additionalContext === undefined)).toBe(true);
    expect(fixtures.some(({ coverage }) => coverage.includes('behavior-focus-tension'))).toBe(true);

    fixtures.forEach(({ input }) => {
      expect(reportGenerationInputSchema.safeParse(input).success).toBe(true);
    });
  });

  it('contains only approved provider-boundary fields', () => {
    REPORT_GENERATION_EVALUATION_FIXTURES.forEach(({ input }) => {
      expect(Object.keys(input).sort()).toEqual([
        'additionalContext',
        'behavioralStatement',
        'focusArea',
        'subject',
      ].filter((key) => key !== 'additionalContext' || input.additionalContext));
      expect(Object.keys(input.subject).sort()).toEqual(['age', 'name', 'zodiacSign']);
      expect(JSON.stringify(input)).not.toMatch(
        /birthDate|birth date|pronouns|referencePreference|reportId|questionnaire/i,
      );
    });
  });
});

describe('offline red-flag triage', () => {
  it('blocks schema mismatches without attempting prose checks', () => {
    const flags = evaluateReportRedFlags(
      { incomplete: true },
      REPORT_GENERATION_EVALUATION_FIXTURES[0],
    );

    expect(flags).toEqual([
      expect.objectContaining({ code: 'SCHEMA_MISMATCH', severity: 'blocking' }),
    ]);
  });

  it('surfaces unsupported biography, clinical language, unsafe advice, and weak metrics', () => {
    const fixture = REPORT_GENERATION_EVALUATION_FIXTURES[1];
    const report = createValidReport();
    report.subject = { ...fixture.input.subject };
    report.currentLifeAnalysis.focusArea = fixture.input.focusArea;
    report.summary.body = `${fixture.input.subject.name}, your ${fixture.input.subject.zodiacSign} career review has become a portfolio revision program. Your boss says you suffer from an anxiety disorder.`;
    report.personalityAnalysis.overview =
      'You work as an engineer and continue to overthink every publish decision.';
    report.currentLifeAnalysis.forecast = 'You will receive a promotion in three weeks.';
    report.recommendedAction.description = 'Quit your job immediately and invest everything.';
    report.metrics[0].label = 'Confidence';
    report.metrics[1].id = report.metrics[0].id;

    const codes = evaluateReportRedFlags(report, fixture).map(({ code }) => code);

    expect(codes).toEqual(
      expect.arrayContaining([
        'INVENTED_PERSONAL_FACT_SIGNAL',
        'UNSUPPORTED_ROLE_OR_RELATIONSHIP_SIGNAL',
        'MEDICAL_OR_MENTAL_HEALTH_SIGNAL',
        'UNSAFE_RECOMMENDATION_SIGNAL',
        'CONCRETE_FUTURE_EVENT_SIGNAL',
        'GENERIC_METRIC_SIGNAL',
        'REPEATED_LANGUAGE_SIGNAL',
      ]),
    );
  });

  it('accepts canonical zodiac names and common adjectival forms', () => {
    const zodiacCases = [
      ['Aries', 'Arian'],
      ['Taurus', 'Taurean'],
      ['Gemini', 'Geminian'],
      ['Cancer', 'Cancerian'],
      ['Leo', 'Leonine'],
      ['Virgo', 'Virgoan'],
      ['Libra', 'Libran'],
      ['Scorpio', 'Scorpionic'],
      ['Sagittarius', 'Sagittarian'],
      ['Capricorn', 'Capricornian'],
      ['Aquarius', 'Aquarian'],
      ['Pisces', 'Piscean'],
    ] as const;
    const baseFixture = REPORT_GENERATION_EVALUATION_FIXTURES[0];

    zodiacCases.forEach(([zodiacSign, adjective]) => {
      const fixture: ReportEvaluationFixture = {
        ...baseFixture,
        input: {
          ...baseFixture.input,
          subject: { ...baseFixture.input.subject, zodiacSign },
        },
      };
      const report = createValidReport();
      report.subject = { ...fixture.input.subject };
      report.currentLifeAnalysis.focusArea = fixture.input.focusArea;
      report.summary.body = `${fixture.input.subject.name}, your ${adjective} personal growth profile adapts as conditions change.`;

      const codes = evaluateReportRedFlags(report, fixture).map(({ code }) => code);

      expect(codes).not.toContain('MISSING_ZODIAC_REFERENCE');
    });
  });

  it('does not treat clearly rhetorical sharpness as a proven clinical signal', () => {
    const fixture = REPORT_GENERATION_EVALUATION_FIXTURES[7];
    const report = createValidReport();
    report.subject = { ...fixture.input.subject };
    report.currentLifeAnalysis.focusArea = fixture.input.focusArea;
    report.summary.body = `${fixture.input.subject.name}, your ${fixture.input.subject.zodiacSign} fiscal anxiety has become a spreadsheet approval workflow.`;
    report.risks[0].title = 'Delusional Spontaneity';

    const codes = evaluateReportRedFlags(report, fixture).map(({ code }) => code);

    expect(codes).not.toContain('MEDICAL_OR_MENTAL_HEALTH_SIGNAL');
  });

  it('flags unsupported counts, concrete behaviors, external actors, outcomes, and internal states', () => {
    const ariesFixture = REPORT_GENERATION_EVALUATION_FIXTURES[0];
    const ariesReport = createValidReport();
    ariesReport.subject = { ...ariesFixture.input.subject };
    ariesReport.currentLifeAnalysis.focusArea = ariesFixture.input.focusArea;
    ariesReport.summary.body = `${ariesFixture.input.subject.name}, your ${ariesFixture.input.subject.zodiacSign} personal growth adapts as conditions change.`;
    ariesReport.currentLifeAnalysis.analysis =
      'You launch three self-improvement projects simultaneously and abandon two projects when momentum stalls.';

    const ariesCodes = evaluateReportRedFlags(ariesReport, ariesFixture).map(
      ({ code }) => code,
    );

    expect(ariesCodes).toEqual(
      expect.arrayContaining([
        'UNSUPPORTED_NUMERIC_SPECIFICITY_SIGNAL',
        'UNSUPPORTED_BEHAVIOR_ESCALATION_SIGNAL',
      ]),
    );

    const capricornFixture = REPORT_GENERATION_EVALUATION_FIXTURES[1];
    const capricornReport = createValidReport();
    capricornReport.subject = { ...capricornFixture.input.subject };
    capricornReport.currentLifeAnalysis.focusArea = capricornFixture.input.focusArea;
    capricornReport.summary.body = `${capricornFixture.input.subject.name}, your ${capricornFixture.input.subject.zodiacSign} career portfolio remains in revision instead of publication.`;
    capricornReport.currentLifeAnalysis.analysis =
      'Both projects are ninety-nine percent complete, but clients cannot see them.';
    capricornReport.risks[0].description =
      'Your terror of criticism could keep income-generating work private.';

    const capricornCodes = evaluateReportRedFlags(
      capricornReport,
      capricornFixture,
    ).map(({ code }) => code);

    expect(capricornCodes).toEqual(
      expect.arrayContaining([
        'UNSUPPORTED_NUMERIC_SPECIFICITY_SIGNAL',
        'UNSUPPORTED_EXTERNAL_ACTOR_SIGNAL',
        'UNSUPPORTED_FINANCIAL_OUTCOME_SIGNAL',
        'UNSUPPORTED_INTERNAL_STATE_SIGNAL',
      ]),
    );
  });

  it('flags unsupported health performance and ungrounded metric concepts', () => {
    const fixture = REPORT_GENERATION_EVALUATION_FIXTURES[5];
    const report = createValidReport();
    report.subject = { ...fixture.input.subject };
    report.currentLifeAnalysis.focusArea = fixture.input.focusArea;
    report.summary.body = `${fixture.input.subject.name}, your ${fixture.input.subject.zodiacSign} health plan keeps redesigning the supplied sleep and walking routine each Monday.`;
    report.currentLifeAnalysis.analysis =
      'You remain entirely stationary while designing the schedule.';
    report.currentLifeAnalysis.forecast =
      'Your sleep efficiency and walking consistency will decay to zero.';
    report.metrics[0].label = 'Daily Step Count';

    const codes = evaluateReportRedFlags(report, fixture).map(({ code }) => code);

    expect(codes).toEqual(
      expect.arrayContaining([
        'UNSUPPORTED_HEALTH_PERFORMANCE_SIGNAL',
        'UNSUPPORTED_METRIC_CONCEPT_SIGNAL',
      ]),
    );
  });
});
