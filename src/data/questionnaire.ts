import type { QuestionnaireQuestionId } from '../lib/questionnaire-state.js';
import {
  MAX_ADDITIONAL_CONTEXT_LENGTH,
  MAX_SUBJECT_NAME_LENGTH,
} from '../lib/report-generation-constraints.js';

type QuestionnaireRequirement =
  | {
      required: true;
      validationMessage: string;
    }
  | {
      required: false;
      validationMessage?: never;
    };

interface QuestionnaireQuestionBase {
  id: QuestionnaireQuestionId;
  label: string;
  helper: string;
}

/**
 * Supported question definitions for the configuration-driven questionnaire.
 * The `type` discriminant determines both available configuration and renderer.
 */
export type QuestionnaireQuestion = QuestionnaireQuestionBase &
  QuestionnaireRequirement &
  ({
      type: 'text' | 'date';
      placeholder?: string;
      maxLength?: number;
    }
  | {
      type: 'options';
      options: readonly string[];
    }
  | {
      type: 'zodiac';
    }
  | {
      type: 'textarea';
      placeholder: string;
      maxLength?: number;
    });

/** One ordered screen in the questionnaire, containing one or more related questions. */
export interface QuestionnaireStep {
  id: string;
  title: string;
  description: string;
  questions: readonly QuestionnaireQuestion[];
}

/** Display metadata for the dedicated zodiac radio-card control. */
export const ZODIAC_SIGNS = [
  { name: 'Aries', symbol: '♈︎' },
  { name: 'Taurus', symbol: '♉︎' },
  { name: 'Gemini', symbol: '♊︎' },
  { name: 'Cancer', symbol: '♋︎' },
  { name: 'Leo', symbol: '♌︎' },
  { name: 'Virgo', symbol: '♍︎' },
  { name: 'Libra', symbol: '♎︎' },
  { name: 'Scorpio', symbol: '♏︎' },
  { name: 'Sagittarius', symbol: '♐︎' },
  { name: 'Capricorn', symbol: '♑︎' },
  { name: 'Aquarius', symbol: '♒︎' },
  { name: 'Pisces', symbol: '♓︎' },
] as const;

/** Reusable option labels shared by questionnaire rendering and report personalization. */
export const REFERENCE_PREFERENCES = [
  'He / Him',
  'She / Her',
  'They / Them',
  'Prefer not to say',
] as const;

export const ATTENTION_AREAS = [
  'Career',
  'Relationships',
  'Money',
  'Family',
  'Health',
  'Personal growth',
  'Something else',
] as const;

export const BEHAVIORAL_STATEMENTS = [
  'I overthink things',
  'I trust my instincts',
  'I like having a plan',
  'I adapt as I go',
  'I usually leave things until later',
] as const;

export type ReferencePreference = (typeof REFERENCE_PREFERENCES)[number];
export type AttentionArea = (typeof ATTENTION_AREAS)[number];
export type BehavioralStatement = (typeof BEHAVIORAL_STATEMENTS)[number];

/**
 * Ordered questionnaire content. Navigation treats array position as the step
 * index, while each question ID maps to answer state in `questionnaire-state`.
 */
export const QUESTIONNAIRE_STEPS: readonly QuestionnaireStep[] = [
  {
    id: 'celestial-identity',
    title: 'Celestial Identity',
    description: 'Define the celestial baseline for your OrionLabs profile.',
    questions: [
      {
        id: 'zodiac-sign',
        type: 'zodiac',
        label: 'Select your zodiac sign',
        helper: 'Included as part of a broader analytical framework.',
        required: true,
        validationMessage: 'Please select a zodiac sign.',
      },
      {
        id: 'first-name',
        type: 'text',
        label: 'What should we call you?',
        helper: 'Addressing subjects by name has been shown to improve perceived horoscope credibility.',
        placeholder: 'First name',
        maxLength: MAX_SUBJECT_NAME_LENGTH,
        required: true,
        validationMessage: 'Please enter your first name.',
      },
    ],
  },
  {
    id: 'profile-calibration',
    title: 'Profile Calibration',
    description: 'Supply the personal data required for higher-resolution celestial profiling.',
    questions: [
      {
        id: 'birth-date',
        type: 'date',
        label: 'What is your birth date?',
        helper: 'Adds chronological precision to an otherwise alarmingly broad celestial model.',
        required: true,
        validationMessage: 'Please enter your birth date.',
      },
      {
        id: 'pronouns',
        type: 'options',
        label: 'How should OrionLabs refer to you?',
        helper: 'Used for highly questionable demographic calibration and stereotype alignment.',
        options: REFERENCE_PREFERENCES,
        required: true,
        validationMessage: 'Please choose how OrionLabs should refer to you.',
      },
    ],
  },
  {
    id: 'behavioral-snapshot',
    title: 'Behavioral Snapshot',
    description: 'Define the priorities and behavioral patterns requiring further interpretation.',
    questions: [
      {
        id: 'attention',
        type: 'options',
        label: 'What is occupying most of your attention lately?',
        helper: 'Used to determine which part of your life deserves disproportionate computational attention.',
        options: ATTENTION_AREAS,
        required: true,
        validationMessage: 'Please select what is occupying most of your attention.',
      },
      {
        id: 'behavior',
        type: 'options',
        label: 'Which statement sounds most like you?',
        helper: 'Used to identify the behavioral pattern OrionLabs should overinterpret most aggressively.',
        options: BEHAVIORAL_STATEMENTS,
        required: true,
        validationMessage: 'Please choose the statement that best describes you.',
      },
    ],
  },
  {
    id: 'final-calibration',
    title: 'Final Calibration',
    description: 'Provide additional context to improve the specificity of the final interpretation.',
    questions: [
      {
        id: 'additional-context',
        type: 'textarea',
        label: 'Tell us more about yourself',
        helper: 'Strongly recommended. The more specific the context, the more precisely OrionLabs can weaponize it.',
        placeholder:
          'Goals, interests, current challenges, recent events, or anything else OrionLabs should consider.',
        maxLength: MAX_ADDITIONAL_CONTEXT_LENGTH,
        required: false,
      },
    ],
  },
] as const;
