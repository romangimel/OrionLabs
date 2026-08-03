import type { QuestionnaireStep } from '@/data/questionnaire';
import {
  QUESTION_FIELD_MAP,
  type QuestionnaireAnswerField,
  type QuestionnaireAnswers,
} from '@/lib/questionnaire-state';

/** Step-local errors are keyed by the canonical answer field they describe. */
export type QuestionnaireValidationErrors = Partial<
  Record<QuestionnaireAnswerField, string>
>;

/** All current required answers use the same deliberately narrow presence rule. */
export function hasQuestionnaireAnswer(value: string) {
  return value.trim().length > 0;
}

/**
 * Derives validation results from the active step configuration and current
 * answers. Future steps are intentionally excluded from this calculation.
 */
export function validateQuestionnaireStep(
  step: QuestionnaireStep,
  answers: QuestionnaireAnswers,
): QuestionnaireValidationErrors {
  const errors: QuestionnaireValidationErrors = {};

  for (const question of step.questions) {
    if (!question.required) {
      continue;
    }

    const field = QUESTION_FIELD_MAP[question.id];
    if (!hasQuestionnaireAnswer(answers[field])) {
      errors[field] = question.validationMessage;
    }
  }

  return errors;
}

/**
 * Returns the control that should receive focus after a failed submission.
 * The order follows the product's required-field sequence, including first
 * name before zodiac sign on the opening step.
 */
export function getFirstInvalidQuestionId(
  step: QuestionnaireStep,
  errors: QuestionnaireValidationErrors,
) {
  const fieldOrder: readonly QuestionnaireAnswerField[] = [
    'firstName',
    'zodiacSign',
    'birthDate',
    'pronouns',
    'attentionArea',
    'behavioralStatement',
  ];

  const firstInvalidField = fieldOrder.find((field) => errors[field]);
  return step.questions.find(
    (question) => QUESTION_FIELD_MAP[question.id] === firstInvalidField,
  )?.id;
}
