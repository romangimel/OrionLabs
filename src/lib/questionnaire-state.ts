import {
  ATTENTION_AREAS,
  BEHAVIORAL_STATEMENTS,
  REFERENCE_PREFERENCES,
  ZODIAC_SIGNS,
} from '@/data/questionnaire';

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

/**
 * Temporary progress for one active questionnaire-to-analysis journey.
 * `pendingReportId` is assigned only after review confirmation and doubles as
 * the idempotency key for the completed report created by the analysis route.
 */
export interface QuestionnaireDraft {
  version: 1;
  status: 'in-progress';
  answers: QuestionnaireAnswers;
  currentStep: QuestionnaireStepIndex;
  isReviewing: boolean;
  pendingReportId: string | null;
}

/** Transient UI state owned by the questionnaire page. */
export interface QuestionnaireState {
  currentStep: QuestionnaireStepIndex;
  answers: QuestionnaireAnswers;
  isReviewing: boolean;
  pendingReportId: string | null;
}

export const QUESTIONNAIRE_DRAFT_STORAGE_KEY = 'orionlabs.questionnaire.draft.v1';
const LEGACY_COMPLETED_QUESTIONNAIRE_KEY = 'orionlabs.questionnaire.completed.v1';
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

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

/** Creates questionnaire UI state, optionally restored from a validated draft. */
export function createQuestionnaireState(
  draft: QuestionnaireDraft | null = null,
): QuestionnaireState {
  return {
    currentStep: draft?.currentStep ?? 0,
    answers: draft?.answers ?? { ...EMPTY_ANSWERS },
    isReviewing: draft?.isReviewing ?? false,
    pendingReportId: draft?.pendingReportId ?? null,
  };
}

/** Converts the page's UI state into the small versioned browser-storage record. */
export function createQuestionnaireDraft(
  state: QuestionnaireState,
): QuestionnaireDraft {
  return {
    version: 1,
    status: 'in-progress',
    answers: { ...state.answers },
    currentStep: state.currentStep,
    isReviewing: state.isReviewing,
    pendingReportId: state.pendingReportId,
  };
}

function isQuestionnaireAnswers(value: unknown): value is QuestionnaireAnswers {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const answers = value as Record<string, unknown>;
  if (!Object.keys(EMPTY_ANSWERS).every((key) => typeof answers[key] === 'string')) {
    return false;
  }

  // In-progress drafts may be incomplete, but values written by the controlled
  // selectors must still belong to their configured option sets when present.
  const isAllowedOrEmpty = (answer: string, options: readonly string[]) =>
    answer === '' || options.includes(answer);
  const isDateOrEmpty = (answer: string) =>
    answer === '' ||
    (/^\d{4}-\d{2}-\d{2}$/.test(answer) &&
      !Number.isNaN(new Date(`${answer}T00:00:00Z`).getTime()) &&
      new Date(`${answer}T00:00:00Z`).toISOString().slice(0, 10) === answer);

  return (
    isAllowedOrEmpty(
      answers.zodiacSign as string,
      ZODIAC_SIGNS.map((sign) => sign.name),
    ) &&
    isDateOrEmpty(answers.birthDate as string) &&
    isAllowedOrEmpty(answers.pronouns as string, REFERENCE_PREFERENCES) &&
    isAllowedOrEmpty(answers.attentionArea as string, ATTENTION_AREAS) &&
    isAllowedOrEmpty(answers.behavioralStatement as string, BEHAVIORAL_STATEMENTS)
  );
}

function isQuestionnaireStepIndex(value: unknown): value is QuestionnaireStepIndex {
  return Number.isInteger(value) && typeof value === 'number' && value >= 0 && value <= 3;
}

function isQuestionnaireDraft(value: unknown): value is QuestionnaireDraft {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const draft = value as Record<string, unknown>;
  return (
    draft.version === 1 &&
    draft.status === 'in-progress' &&
    isQuestionnaireAnswers(draft.answers) &&
    isQuestionnaireStepIndex(draft.currentStep) &&
    typeof draft.isReviewing === 'boolean' &&
    (draft.pendingReportId === null ||
      (typeof draft.pendingReportId === 'string' && UUID_PATTERN.test(draft.pendingReportId)))
  );
}

/** Reads only validated in-progress data and removes malformed OrionLabs draft data. */
export function loadQuestionnaireDraft(): QuestionnaireDraft | null {
  try {
    const savedData = window.sessionStorage.getItem(QUESTIONNAIRE_DRAFT_STORAGE_KEY);
    if (!savedData) {
      return null;
    }

    const parsedData: unknown = JSON.parse(savedData);
    if (isQuestionnaireDraft(parsedData)) {
      return parsedData;
    }

    window.sessionStorage.removeItem(QUESTIONNAIRE_DRAFT_STORAGE_KEY);
    return null;
  } catch {
    // Storage can fail in restricted contexts; malformed JSON is discarded when possible.
    try {
      window.sessionStorage.removeItem(QUESTIONNAIRE_DRAFT_STORAGE_KEY);
    } catch {
      // There is no additional recovery when the browser blocks session storage entirely.
    }
    return null;
  }
}

/** Persists refresh-safe progress for the active journey in the current tab. */
export function saveQuestionnaireDraft(draft: QuestionnaireDraft): boolean {
  try {
    window.sessionStorage.setItem(
      QUESTIONNAIRE_DRAFT_STORAGE_KEY,
      JSON.stringify(draft),
    );
    window.sessionStorage.removeItem(LEGACY_COMPLETED_QUESTIONNAIRE_KEY);
    return true;
  } catch {
    return false;
  }
}

/** Removes only temporary questionnaire data, including the superseded legacy key. */
export function clearQuestionnaireDraft(): boolean {
  try {
    window.sessionStorage.removeItem(QUESTIONNAIRE_DRAFT_STORAGE_KEY);
    window.sessionStorage.removeItem(LEGACY_COMPLETED_QUESTIONNAIRE_KEY);
    return true;
  } catch {
    return false;
  }
}
