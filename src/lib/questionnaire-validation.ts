import type { QuestionnaireStep } from '@/data/questionnaire';
import {
  calculateAge,
  isBirthDateInFuture,
  isValidBirthDate,
} from '@/lib/age';
import {
  QUESTION_FIELD_MAP,
  type QuestionnaireAnswerField,
  type QuestionnaireAnswers,
} from '@/lib/questionnaire-state';
import { MAX_ADDITIONAL_CONTEXT_LENGTH } from '@/lib/report-generation-constraints';

/** Step-local errors are keyed by the canonical answer field they describe. */
export type QuestionnaireValidationErrors = Partial<
  Record<QuestionnaireAnswerField, string>
>;

/** All current required answers use the same deliberately narrow presence rule. */
export function hasQuestionnaireAnswer(value: string) {
  return value.trim().length > 0;
}

const INVALID_BIRTH_DATE_MESSAGE = 'Please enter a valid birth date.';
const FUTURE_BIRTH_DATE_MESSAGE = 'Please enter a birth date that is not in the future.';
const MINIMUM_AGE_MESSAGE =
  'OrionLabs analysis is currently limited to subjects aged 18 and over.';
export const ADDITIONAL_CONTEXT_TOO_LONG_MESSAGE =
  `Please keep additional context within ${MAX_ADDITIONAL_CONTEXT_LENGTH} characters.`;

/** Keeps persisted over-limit context visible while exposing its blocking error. */
export function getAdditionalContextLengthError(value: string) {
  return value.length > MAX_ADDITIONAL_CONTEXT_LENGTH
    ? ADDITIONAL_CONTEXT_TOO_LONG_MESSAGE
    : undefined;
}

/** Applies the configured presence rule and any validation owned by the input type. */
export function validateQuestionnaireAnswer(
  question: QuestionnaireStep['questions'][number],
  value: string,
  currentDate = new Date(),
): string | undefined {
  if (!hasQuestionnaireAnswer(value)) {
    return question.required ? question.validationMessage : undefined;
  }

  if (question.type === 'textarea') {
    return getAdditionalContextLengthError(value);
  }

  if (question.type !== 'date') {
    return undefined;
  }

  if (!isValidBirthDate(value)) {
    return INVALID_BIRTH_DATE_MESSAGE;
  }

  if (isBirthDateInFuture(value, currentDate)) {
    return FUTURE_BIRTH_DATE_MESSAGE;
  }

  const age = calculateAge(value, currentDate);
  if (age === null) {
    return INVALID_BIRTH_DATE_MESSAGE;
  }

  return age < 18 ? MINIMUM_AGE_MESSAGE : undefined;
}

/**
 * Derives validation results from the active step configuration and current
 * answers. Future steps are intentionally excluded from this calculation.
 */
export function validateQuestionnaireStep(
  step: QuestionnaireStep,
  answers: QuestionnaireAnswers,
  currentDate = new Date(),
): QuestionnaireValidationErrors {
  const errors: QuestionnaireValidationErrors = {};

  for (const question of step.questions) {
    const field = QUESTION_FIELD_MAP[question.id];
    const error = validateQuestionnaireAnswer(question, answers[field], currentDate);
    if (error) {
      errors[field] = error;
    }
  }

  return errors;
}

/** Returns the first invalid control in the current step's visual and DOM order. */
export function getFirstInvalidQuestionId(
  step: QuestionnaireStep,
  errors: QuestionnaireValidationErrors,
) {
  return step.questions.find((question) => errors[QUESTION_FIELD_MAP[question.id]])?.id;
}
