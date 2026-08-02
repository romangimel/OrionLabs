import { motion, useReducedMotion } from 'framer-motion';
import type { QuestionnaireStep } from '@/data/questionnaire';
import { QuestionnaireNavigation } from './QuestionnaireNavigation';
import { QuestionnaireQuestion } from './QuestionnaireQuestion';
import type {
  QuestionnaireAnswerField,
  QuestionnaireAnswers,
} from '@/lib/questionnaire-state';
import type { RefObject } from 'react';

interface QuestionnaireCardProps {
  step: QuestionnaireStep;
  stepNumber: number;
  totalSteps: number;
  answers: QuestionnaireAnswers;
  isTransitioning: boolean;
  headingRef: RefObject<HTMLHeadingElement>;
  onAnswerChange: (field: QuestionnaireAnswerField, value: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

export function QuestionnaireCard({
  step,
  stepNumber,
  totalSteps,
  answers,
  isTransitioning,
  headingRef,
  onAnswerChange,
  onBack,
  onContinue,
}: QuestionnaireCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      aria-labelledby="questionnaire-step-title"
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="glass-strong relative mt-7 w-full overflow-hidden rounded-2xl p-5 shadow-[0_28px_90px_-38px_hsl(255_80%_2%_/_0.95)] sm:p-8 md:mt-9 md:p-10 lg:mt-10 lg:p-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-28 h-64 w-64 rounded-full bg-[hsl(326_80%_50%_/_0.12)] blur-[72px]"
      />

      <div className="relative">
        <div className="max-w-2xl lg:max-w-3xl">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[hsl(326_55%_68%)] lg:text-xs">
            Step {stepNumber.toString().padStart(2, '0')}
          </p>
          <h1
            id="questionnaire-step-title"
            ref={headingRef}
            tabIndex={-1}
            className="mt-3 font-serif text-3xl leading-tight text-gradient-gold outline-none sm:text-4xl lg:mt-4 lg:text-[2.75rem]"
          >
            {step.title}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base lg:mt-4 lg:text-lg">
            {step.description}
          </p>
        </div>

        <div className="my-7 h-px bg-gradient-to-r from-[hsl(43_60%_70%_/_0.18)] via-[hsl(326_55%_65%_/_0.12)] to-transparent sm:my-8 lg:my-10" />

        <form
          className="space-y-8 lg:space-y-10"
          onSubmit={(event) => {
            event.preventDefault();
            onContinue();
          }}
        >
          {step.questions.map((question) => (
            <QuestionnaireQuestion
              key={question.id}
              question={question}
              answers={answers}
              onAnswerChange={onAnswerChange}
            />
          ))}
          <QuestionnaireNavigation
            isFirstStep={stepNumber === 1}
            isFinalStep={stepNumber === totalSteps}
            disabled={isTransitioning}
            onBack={onBack}
          />
        </form>
      </div>
    </motion.section>
  );
}
