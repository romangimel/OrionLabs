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
  onAnswerChange: (field: QuestionnaireAnswerField, value: string) => void;
}

export function QuestionnaireQuestion({
  question,
  answers,
  onAnswerChange,
}: QuestionnaireQuestionProps) {
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
          optional={question.optional}
          value={value}
          onChange={(nextValue) => onAnswerChange(field, nextValue)}
        />
      );
  }
}
