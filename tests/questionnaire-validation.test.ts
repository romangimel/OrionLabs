import { describe, expect, it } from 'vitest';
import { QUESTIONNAIRE_STEPS } from '@/data/questionnaire';
import type { QuestionnaireAnswers } from '@/lib/questionnaire-state';
import {
  ADDITIONAL_CONTEXT_TOO_LONG_MESSAGE,
  getFirstInvalidQuestionId,
  validateQuestionnaireStep,
} from '@/lib/questionnaire-validation';

const CURRENT_DATE = new Date(2026, 7, 10, 12);
const PROFILE_CALIBRATION_STEP = QUESTIONNAIRE_STEPS[1];

function validateBirthDate(birthDate: string) {
  const answers: QuestionnaireAnswers = {
    firstName: '',
    zodiacSign: '',
    birthDate,
    pronouns: 'They / Them',
    attentionArea: '',
    behavioralStatement: '',
    additionalContext: '',
  };

  return validateQuestionnaireStep(
    PROFILE_CALIBRATION_STEP,
    answers,
    CURRENT_DATE,
  ).birthDate;
}

function createProfileCalibrationAnswers(birthDate: string): QuestionnaireAnswers {
  return {
    firstName: '',
    zodiacSign: '',
    birthDate,
    pronouns: 'They / Them',
    attentionArea: '',
    behavioralStatement: '',
    additionalContext: '',
  };
}

describe('questionnaire birth-date validation', () => {
  it('preserves the required-field message', () => {
    expect(validateBirthDate('')).toBe('Please enter your birth date.');
  });

  it('allows a subject who turns 18 today', () => {
    expect(validateBirthDate('2008-08-10')).toBeUndefined();
  });

  it('rejects a subject who turns 18 tomorrow', () => {
    expect(validateBirthDate('2008-08-11')).toBe(
      'OrionLabs analysis is currently limited to subjects aged 18 and over.',
    );
  });

  it('allows a subject who turned 18 yesterday', () => {
    expect(validateBirthDate('2008-08-09')).toBeUndefined();
  });

  it('rejects a clearly under-18 subject', () => {
    expect(validateBirthDate('2015-04-20')).toBe(
      'OrionLabs analysis is currently limited to subjects aged 18 and over.',
    );
  });

  it('allows a clearly adult subject', () => {
    expect(validateBirthDate('1990-04-20')).toBeUndefined();
  });

  it('allows a subject who is exactly 120 today', () => {
    expect(validateBirthDate('1906-08-10')).toBeUndefined();
  });

  it('allows a subject who remains 120 until tomorrow', () => {
    expect(validateBirthDate('1905-08-11')).toBeUndefined();
  });

  it.each(['1905-08-10', '1905-08-09'])(
    'rejects a subject who is already at least 121 (%s)',
    (birthDate) => {
      expect(validateBirthDate(birthDate)).toBe(
        'OrionLabs currently supports subjects up to age 120.',
      );
    },
  );

  it('blocks progression and identifies birth date as the first invalid field', () => {
    const errors = validateQuestionnaireStep(
      PROFILE_CALIBRATION_STEP,
      createProfileCalibrationAnswers('1905-08-10'),
      CURRENT_DATE,
    );

    expect(errors).toEqual({
      birthDate: 'OrionLabs currently supports subjects up to age 120.',
    });
    expect(getFirstInvalidQuestionId(PROFILE_CALIBRATION_STEP, errors)).toBe(
      'birth-date',
    );
  });

  it('allows a valid profile-calibration step to progress normally', () => {
    const errors = validateQuestionnaireStep(
      PROFILE_CALIBRATION_STEP,
      createProfileCalibrationAnswers('1990-04-20'),
      CURRENT_DATE,
    );

    expect(errors).toEqual({});
    expect(getFirstInvalidQuestionId(PROFILE_CALIBRATION_STEP, errors)).toBeUndefined();
  });

  it('rejects a future birth date', () => {
    expect(validateBirthDate('2027-01-01')).toBe(
      'Please enter a birth date that is not in the future.',
    );
  });

  it.each(['not-a-date', '2026-02-30'])(
    'rejects the malformed or invalid date %s',
    (birthDate) => {
      expect(validateBirthDate(birthDate)).toBe('Please enter a valid birth date.');
    },
  );
});

describe('questionnaire additional-context validation', () => {
  const finalCalibrationStep = QUESTIONNAIRE_STEPS[3];

  function validateContext(additionalContext: string) {
    const answers: QuestionnaireAnswers = {
      firstName: 'Maya',
      zodiacSign: 'Capricorn',
      birthDate: '1994-01-15',
      pronouns: 'They / Them',
      attentionArea: 'Career',
      behavioralStatement: 'I overthink things',
      additionalContext,
    };

    return validateQuestionnaireStep(finalCalibrationStep, answers).additionalContext;
  }

  it('accepts exactly 600 characters', () => {
    expect(validateContext('x'.repeat(600))).toBeUndefined();
  });

  it('rejects more than 600 characters', () => {
    expect(validateContext('x'.repeat(601))).toBe(
      ADDITIONAL_CONTEXT_TOO_LONG_MESSAGE,
    );
  });
});
