import { calculateAge } from '@/lib/age';
import type { QuestionnaireAnswers } from '@/lib/questionnaire-state';

/**
 * The application-controlled context eligible for future AI report generation.
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
 * Replaces the birth date with an application-calculated age before the future
 * server-side generation boundary. No provider request exists in this prototype.
 */
export function createReportGenerationInput(
  answers: QuestionnaireAnswers,
): ReportGenerationInput | null {
  const age = calculateAge(answers.birthDate);
  if (age === null) {
    return null;
  }

  const additionalContext = answers.additionalContext.trim();
  return {
    subject: {
      name: answers.firstName.trim(),
      zodiacSign: answers.zodiacSign,
      age,
    },
    focusArea: answers.attentionArea,
    behavioralStatement: answers.behavioralStatement,
    ...(additionalContext ? { additionalContext } : {}),
  };
}
