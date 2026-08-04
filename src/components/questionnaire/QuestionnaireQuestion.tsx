import type { QuestionnaireQuestion as QuestionnaireQuestionData } from '@/data/questionnaire';
import { OptionSelector } from './OptionSelector';
import { TextInput } from './TextInput';
import { ZodiacSelector } from './ZodiacSelector';
import {
  QUESTION_FIELD_MAP,
  type QuestionnaireAnswerField,
  type QuestionnaireAnswers,
} from '@/lib/questionnaire-state';

interface QuestionnaireQuestionProps {
  question: QuestionnaireQuestionData;
  answers: QuestionnaireAnswers;
  error?: string;
  onAnswerChange: (field: QuestionnaireAnswerField, value: string) => void;
}

/**
 * Converts a questionnaire definition into its concrete controlled input.
 * This is the bridge between content configuration and the normalized answer
 * object, so adding an input kind should be handled exhaustively here.
 */
export function QuestionnaireQuestion({
  question,
  answers,
  error,
  onAnswerChange,
}: QuestionnaireQuestionProps) {
  // Content IDs deliberately remain separate from the camel-cased storage fields.
  const field = QUESTION_FIELD_MAP[question.id];
  const value = answers[field];

  switch (question.type) {
    case 'text':
    case 'date':
      return (
        <TextInput
          id={question.id}
          label={question.label}
          helper={question.helper}
          placeholder={question.placeholder}
          type={question.type}
          required={question.required}
          error={error}
          value={value}
          onChange={(nextValue) => onAnswerChange(field, nextValue)}
        />
      );
    case 'options':
      return (
        <OptionSelector
          id={question.id}
          label={question.label}
          helper={question.helper}
          options={question.options}
          required={question.required}
          error={error}
          value={value}
          onChange={(nextValue) => onAnswerChange(field, nextValue)}
        />
      );
    case 'zodiac':
      return (
        <ZodiacSelector
          id={question.id}
          label={question.label}
          helper={question.helper}
          required={question.required}
          error={error}
          value={value}
          onChange={(nextValue) => onAnswerChange(field, nextValue)}
        />
      );
    case 'textarea':
      return (
        <TextInput
          id={question.id}
          label={question.label}
          helper={question.helper}
          placeholder={question.placeholder}
          multiline
          required={question.required}
          error={error}
          value={value}
          onChange={(nextValue) => onAnswerChange(field, nextValue)}
        />
      );
  }
}
