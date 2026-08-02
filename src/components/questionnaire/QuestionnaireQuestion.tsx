import type { QuestionnaireQuestion as QuestionnaireQuestionData } from '@/data/questionnaire';
import { OptionSelector } from './OptionSelector';
import { TextInput } from './TextInput';
import { ZodiacSelector } from './ZodiacSelector';

interface QuestionnaireQuestionProps {
  question: QuestionnaireQuestionData;
}

export function QuestionnaireQuestion({ question }: QuestionnaireQuestionProps) {
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
        />
      );
    case 'options':
      return (
        <OptionSelector
          id={question.id}
          label={question.label}
          helper={question.helper}
          options={question.options}
        />
      );
    case 'zodiac':
      return (
        <ZodiacSelector
          id={question.id}
          label={question.label}
          helper={question.helper}
          defaultValue={question.defaultValue}
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
        />
      );
  }
}

