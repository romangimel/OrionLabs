import { calculateAge } from '@/lib/age';
import { reportGenerationInputSchema } from '@/lib/report-schemas';
import type { QuestionnaireAnswers } from '@/lib/questionnaire-state';

/**
 * The application-controlled context eligible for AI report generation.
 * Reference preference remains in the questionnaire journey but is deliberately
 * omitted: reports use second-person language for every subject.
 */
export interface ReportGenerationInput {
  subject: {
    name: string;
    zodiacSign: string;
    age: number;
  };
  focusArea: string;
  behavioralStatement: string;
  additionalContext?: string;
}

/**
 * Replaces birth date with application-calculated age and returns only data that
 * satisfies the shared client/server generation boundary.
 */
export function createReportGenerationInput(
  answers: QuestionnaireAnswers,
): ReportGenerationInput | null {
  const age = calculateAge(answers.birthDate);
  if (age === null) {
    return null;
  }

  const additionalContext = answers.additionalContext.trim();
  const candidate: ReportGenerationInput = {
    subject: {
      name: answers.firstName.trim(),
      zodiacSign: answers.zodiacSign.trim(),
      age,
    },
    focusArea: answers.attentionArea.trim(),
    behavioralStatement: answers.behavioralStatement.trim(),
    ...(additionalContext ? { additionalContext } : {}),
  };

  const result = reportGenerationInputSchema.safeParse(candidate);
  return result.success ? result.data : null;
}
