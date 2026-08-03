import type { QuestionnaireQuestionId } from '@/lib/questionnaire-state';

/**
 * Supported question definitions for the configuration-driven questionnaire.
 * The `type` discriminant determines both available configuration and renderer.
 */
export type QuestionnaireQuestion =
  | {
      id: QuestionnaireQuestionId;
      type: 'text' | 'date';
      label: string;
      helper: string;
      placeholder?: string;
    }
  | {
      id: QuestionnaireQuestionId;
      type: 'options';
      label: string;
      helper: string;
      options: readonly string[];
    }
  | {
      id: QuestionnaireQuestionId;
      type: 'zodiac';
      label: string;
      helper: string;
      defaultValue?: string;
    }
  | {
      id: QuestionnaireQuestionId;
      type: 'textarea';
      label: string;
      helper: string;
      placeholder: string;
      optional?: boolean;
    };

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

/**
 * Ordered questionnaire content. Navigation treats array position as the step
 * index, while each question ID maps to answer state in `questionnaire-state`.
 */
export const QUESTIONNAIRE_STEPS: readonly QuestionnaireStep[] = [
  {
    id: 'celestial-identity',
    title: 'Celestial Identity',
    description: 'Establish the basic coordinates for your OrionLabs profile.',
    questions: [
      {
        id: 'zodiac-sign',
        type: 'zodiac',
        label: 'Select your zodiac sign',
        helper: 'This gives the model its primary celestial reference point.',
        defaultValue: 'Leo',
      },
      {
        id: 'first-name',
        type: 'text',
        label: 'What should we call you?',
        helper: 'Your first name will personalize the analysis experience.',
        placeholder: 'First name',
      },
    ],
  },
  {
    id: 'profile-calibration',
    title: 'Profile Calibration',
    description: 'Add the personal details used to refine your profile.',
    questions: [
      {
        id: 'birth-date',
        type: 'date',
        label: 'What is your birth date?',
        helper: 'Your date of birth helps establish a more precise celestial baseline.',
      },
      {
        id: 'pronouns',
        type: 'options',
        label: 'How should OrionLabs refer to you?',
        helper: 'Choose the language you would like us to use in your report.',
        options: ['He / Him', 'She / Her', 'They / Them', 'Prefer not to say'],
      },
    ],
  },
  {
    id: 'behavioral-snapshot',
    title: 'Behavioral Snapshot',
    description: 'Capture a concise view of your current priorities and tendencies.',
    questions: [
      {
        id: 'attention',
        type: 'options',
        label: 'What is occupying most of your attention lately?',
        helper: 'Select the area that currently receives most of your focus.',
        options: [
          'Career',
          'Relationships',
          'Money',
          'Family',
          'Health',
          'Personal growth',
          'Something else',
        ],
      },
      {
        id: 'behavior',
        type: 'options',
        label: 'Which statement sounds most like you?',
        helper: 'Choose the statement that best reflects how you usually operate.',
        options: [
          'I overthink things',
          'I trust my instincts',
          'I like having a plan',
          'I adapt as I go',
          'I usually leave things until later',
        ],
      },
    ],
  },
  {
    id: 'final-calibration',
    title: 'Final Calibration',
    description: 'Add any context you would like the analysis to consider.',
    questions: [
      {
        id: 'additional-context',
        type: 'textarea',
        label: 'Tell us something about yourself',
        helper: 'Optional context can help shape the tone and emphasis of your report.',
        placeholder:
          'Goals, interests, current challenges, recent events, or anything else OrionLabs should consider.',
        optional: true,
      },
    ],
  },
] as const;
