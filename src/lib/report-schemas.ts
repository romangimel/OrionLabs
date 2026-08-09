import { z } from 'zod';
import {
  ATTENTION_AREAS,
  BEHAVIORAL_STATEMENTS,
  ZODIAC_SIGNS,
} from '@/data/questionnaire';
import type { OrionReport } from '@/data/report';
import type { ReportGenerationInput } from '@/lib/report-generation-input';
import {
  MAX_ADDITIONAL_CONTEXT_LENGTH,
  MAX_SUBJECT_NAME_LENGTH,
} from '@/lib/report-generation-constraints';

export { MAX_ADDITIONAL_CONTEXT_LENGTH } from '@/lib/report-generation-constraints';

const zodiacNames = ZODIAC_SIGNS.map((sign) => sign.name);
const nonEmptyText = z.string().trim().min(1);
const reportInsightSchema = z
  .object({
    title: nonEmptyText,
    description: nonEmptyText,
  })
  .strict();

/** Runtime boundary for the only questionnaire data allowed to reach an AI provider. */
export const reportGenerationInputSchema: z.ZodType<ReportGenerationInput> = z
  .object({
    subject: z
      .object({
        name: z.string().trim().min(1).max(MAX_SUBJECT_NAME_LENGTH),
        zodiacSign: z
          .string()
          .trim()
          .refine((value) => zodiacNames.includes(value as (typeof zodiacNames)[number])),
        age: z.number().int().min(0).max(120),
      })
      .strict(),
    focusArea: z
      .string()
      .trim()
      .refine((value) => ATTENTION_AREAS.includes(value as (typeof ATTENTION_AREAS)[number])),
    behavioralStatement: z
      .string()
      .trim()
      .refine((value) =>
        BEHAVIORAL_STATEMENTS.includes(
          value as (typeof BEHAVIORAL_STATEMENTS)[number],
        ),
      ),
    additionalContext: z
      .string()
      .trim()
      .min(1)
      .max(MAX_ADDITIONAL_CONTEXT_LENGTH)
      .optional(),
  })
  .strict();

/** Runtime counterpart to the TypeScript report contract used by storage and Gemini. */
export const orionReportSchema: z.ZodType<OrionReport> = z
  .object({
    subject: z
      .object({
        name: nonEmptyText,
        zodiacSign: nonEmptyText,
        age: z.number().int().min(0).max(120),
      })
      .strict(),
    summary: z
      .object({
        headline: nonEmptyText,
        body: nonEmptyText,
      })
      .strict(),
    personalityAnalysis: z
      .object({
        overview: nonEmptyText,
        traits: z.array(reportInsightSchema).length(3),
      })
      .strict(),
    currentLifeAnalysis: z
      .object({
        focusArea: nonEmptyText,
        headline: nonEmptyText,
        analysis: nonEmptyText,
        forecast: nonEmptyText,
      })
      .strict(),
    strengths: z.array(reportInsightSchema).length(3),
    risks: z.array(reportInsightSchema).length(3),
    recommendedAction: z
      .object({
        title: nonEmptyText,
        description: nonEmptyText,
      })
      .strict(),
    metrics: z
      .array(
        z
          .object({
            id: nonEmptyText,
            label: nonEmptyText,
            value: z.number().int().min(0).max(100),
            interpretation: nonEmptyText,
          })
          .strict(),
      )
      .length(3),
    closingVerdict: nonEmptyText,
  })
  .strict();

/** Ensures model-controlled prose cannot silently replace application-controlled identity. */
export class GeneratedReportIdentityError extends Error {}

export function parseGeneratedReportForInput(
  candidate: unknown,
  input: ReportGenerationInput,
): OrionReport {
  const report = orionReportSchema.parse(candidate);

  if (
    report.subject.name !== input.subject.name ||
    report.subject.zodiacSign !== input.subject.zodiacSign ||
    report.subject.age !== input.subject.age ||
    report.currentLifeAnalysis.focusArea !== input.focusArea
  ) {
    throw new GeneratedReportIdentityError(
      'Generated report changed application-controlled profile data.',
    );
  }

  return report;
}
