import { describe, expect, it } from 'vitest';
import { QUESTIONNAIRE_STEPS } from '@/data/questionnaire';
import type { QuestionnaireAnswers } from '@/lib/questionnaire-state';
import { validateQuestionnaireStep } from '@/lib/questionnaire-validation';

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
