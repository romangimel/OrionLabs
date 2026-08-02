export interface QuestionnaireAnswers {
  firstName: string;
  zodiacSign: string;
  birthDate: string;
  pronouns: string;
  attentionArea: string;
  behavioralStatement: string;
  additionalContext: string;
}

export type QuestionnaireAnswerField = keyof QuestionnaireAnswers;

export type QuestionnaireStepIndex = 0 | 1 | 2 | 3;

export interface CompletedQuestionnaireData {
  version: 1;
  answers: QuestionnaireAnswers;
}

export interface QuestionnaireState {
  currentStep: QuestionnaireStepIndex;
  answers: QuestionnaireAnswers;
  isReviewing: boolean;
  completedData: CompletedQuestionnaireData | null;
}

export const QUESTIONNAIRE_STORAGE_KEY = 'orionlabs.questionnaire.completed.v1';

export const QUESTION_FIELD_MAP = {
  'first-name': 'firstName',
  'zodiac-sign': 'zodiacSign',
  'birth-date': 'birthDate',
  pronouns: 'pronouns',
  attention: 'attentionArea',
  behavior: 'behavioralStatement',
  'additional-context': 'additionalContext',
} as const satisfies Record<string, QuestionnaireAnswerField>;

export type QuestionnaireQuestionId = keyof typeof QUESTION_FIELD_MAP;

const EMPTY_ANSWERS: QuestionnaireAnswers = {
  firstName: '',
  zodiacSign: 'Leo',
  birthDate: '',
  pronouns: '',
  attentionArea: '',
  behavioralStatement: '',
  additionalContext: '',
};

export function createQuestionnaireState(
  completedData: CompletedQuestionnaireData | null = null,
): QuestionnaireState {
  return {
    currentStep: 0,
    answers: completedData?.answers ?? { ...EMPTY_ANSWERS },
    isReviewing: false,
    completedData,
  };
}

function isQuestionnaireAnswers(value: unknown): value is QuestionnaireAnswers {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const answers = value as Record<string, unknown>;
  return Object.keys(EMPTY_ANSWERS).every((key) => typeof answers[key] === 'string');
}

function isCompletedQuestionnaireData(value: unknown): value is CompletedQuestionnaireData {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const data = value as Record<string, unknown>;
  return data.version === 1 && isQuestionnaireAnswers(data.answers);
}

export function loadCompletedQuestionnaireData(): CompletedQuestionnaireData | null {
  try {
    const savedData = window.sessionStorage.getItem(QUESTIONNAIRE_STORAGE_KEY);
    if (!savedData) {
      return null;
    }

    const parsedData: unknown = JSON.parse(savedData);
    return isCompletedQuestionnaireData(parsedData) ? parsedData : null;
  } catch {
    return null;
  }
}

export function saveCompletedQuestionnaireData(data: CompletedQuestionnaireData): boolean {
  try {
    window.sessionStorage.setItem(QUESTIONNAIRE_STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}
