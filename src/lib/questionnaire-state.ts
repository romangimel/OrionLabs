/**
 * Canonical answer model shared by the questionnaire, review, and analysis routes.
 * Every field remains a string so controlled inputs always receive a stable value.
 */
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

/** Valid zero-based indices for the four configured questionnaire steps. */
export type QuestionnaireStepIndex = 0 | 1 | 2 | 3;

/** Versioned snapshot written only after the user confirms the review screen. */
export interface CompletedQuestionnaireData {
  version: 1;
  answers: QuestionnaireAnswers;
}

/** Transient UI state owned by the questionnaire page. */
export interface QuestionnaireState {
  currentStep: QuestionnaireStepIndex;
  answers: QuestionnaireAnswers;
  isReviewing: boolean;
  completedData: CompletedQuestionnaireData | null;
}

export const QUESTIONNAIRE_STORAGE_KEY = 'orionlabs.questionnaire.completed.v1';

/**
 * Bridges content-facing question IDs to the state-facing answer properties.
 * Keeping this mapping centralized lets question copy and rendering stay
 * configuration-driven without making storage keys depend on DOM identifiers.
 */
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
  zodiacSign: '',
  birthDate: '',
  pronouns: '',
  attentionArea: '',
  behavioralStatement: '',
  additionalContext: '',
};

/** Creates a fresh questionnaire, optionally prefilled from a confirmed session snapshot. */
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
  // Validate every required key before untrusted storage data enters typed application state.
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
    // Storage can fail in restricted browsing contexts; malformed JSON is handled the same way.
    return null;
  }
}

/**
 * Persists the confirmed snapshot for route-level handoff within the current tab.
 * A boolean result keeps browser storage failures recoverable in the review UI.
 */
export function saveCompletedQuestionnaireData(data: CompletedQuestionnaireData): boolean {
  try {
    window.sessionStorage.setItem(QUESTIONNAIRE_STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}
