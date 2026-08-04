import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { Logo } from '@/components/site/Logo';
import { Starfield } from '@/components/site/Starfield';
import { Aurora } from '@/components/site/Aurora';
import { QuestionnaireCard } from '@/components/questionnaire/QuestionnaireCard';
import { QuestionnaireProgress } from '@/components/questionnaire/QuestionnaireProgress';
import { QuestionnaireReview } from '@/components/questionnaire/QuestionnaireReview';
import { QUESTIONNAIRE_STEPS } from '@/data/questionnaire';
import {
  QUESTION_FIELD_MAP,
  createQuestionnaireState,
  loadCompletedQuestionnaireData,
  saveCompletedQuestionnaireData,
  type CompletedQuestionnaireData,
  type QuestionnaireAnswerField,
  type QuestionnaireState,
  type QuestionnaireStepIndex,
} from '@/lib/questionnaire-state';
import {
  getFirstInvalidQuestionId,
  hasQuestionnaireAnswer,
  validateQuestionnaireStep,
  type QuestionnaireValidationErrors,
} from '@/lib/questionnaire-validation';

const TOTAL_STEPS = QUESTIONNAIRE_STEPS.length;
// Matches the card entrance duration closely enough to prevent overlapping navigation events.
const TRANSITION_LOCK_MS = 450;

/**
 * Owns the complete questionnaire flow: answers, step navigation, review mode,
 * accessibility focus, and the handoff to the mock analysis route.
 *
 * Answer state is lifted to this page so each configuration-driven input can be
 * remounted between steps without losing values. Only confirmed answers are
 * persisted; partially completed sessions intentionally remain in memory.
 */
export function QuestionnairePage() {
  const [questionnaire, setQuestionnaire] = useState<QuestionnaireState>(() =>
    createQuestionnaireState(loadCompletedQuestionnaireData()),
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [persistenceError, setPersistenceError] = useState('');
  const [validationErrors, setValidationErrors] =
    useState<QuestionnaireValidationErrors>({});
  const [hasAttemptedCurrentStep, setHasAttemptedCurrentStep] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasMounted = useRef(false);
  const navigationLocked = useRef(false);
  const transitionTimer = useRef<number>();
  const analysisStarted = useRef(false);

  // These values are derived from the state instead of stored separately, avoiding drift.
  const activeStep = QUESTIONNAIRE_STEPS[questionnaire.currentStep];
  const currentStepNumber = questionnaire.currentStep + 1;
  // Progress represents completed steps, so Step 1 begins at 0% and review reaches 100%.
  const percentage = questionnaire.isReviewing ? 100 : questionnaire.currentStep * 25;

  // Move focus to the new heading after navigation, but not on the initial render.
  useEffect(() => {
    if (hasMounted.current) {
      headingRef.current?.focus();
    } else {
      hasMounted.current = true;
    }
  }, [questionnaire.currentStep, questionnaire.isReviewing]);

  useEffect(
    () => () => {
      if (transitionTimer.current) {
        window.clearTimeout(transitionTimer.current);
      }
    },
    [],
  );

  const performTransition = (update: () => void) => {
    if (navigationLocked.current) {
      return;
    }

    navigationLocked.current = true;
    setIsTransitioning(true);
    update();
    transitionTimer.current = window.setTimeout(() => {
      navigationLocked.current = false;
      setIsTransitioning(false);
    }, TRANSITION_LOCK_MS);
  };

  const handleAnswerChange = (field: QuestionnaireAnswerField, value: string) => {
    setPersistenceError('');
    if (hasAttemptedCurrentStep) {
      setValidationErrors((currentErrors) => {
        const activeQuestion = activeStep.questions.find(
          (question) => QUESTION_FIELD_MAP[question.id] === field,
        );
        const nextErrors = { ...currentErrors };

        if (activeQuestion?.required && !hasQuestionnaireAnswer(value)) {
          nextErrors[field] = activeQuestion.validationMessage;
        } else {
          delete nextErrors[field];
        }

        return nextErrors;
      });
    }
    setQuestionnaire((currentState) => ({
      ...currentState,
      answers: {
        ...currentState.answers,
        [field]: value,
      },
      // Any edit makes the previously confirmed snapshot stale until confirmation runs again.
      completedData: null,
    }));
  };

  const handleContinue = () => {
    const nextErrors = validateQuestionnaireStep(activeStep, questionnaire.answers);
    const firstInvalidQuestionId = getFirstInvalidQuestionId(activeStep, nextErrors);

    if (firstInvalidQuestionId) {
      setHasAttemptedCurrentStep(true);
      setValidationErrors(nextErrors);
      // All controls share their configured question ID as a name, including radio groups.
      window.requestAnimationFrame(() => {
        document
          .querySelector<HTMLElement>(`[name="${firstInvalidQuestionId}"]`)
          ?.focus();
      });
      return;
    }

    setHasAttemptedCurrentStep(false);
    setValidationErrors({});
    performTransition(() => {
      setQuestionnaire((currentState) => {
        if (currentState.currentStep === TOTAL_STEPS - 1) {
          // Review is a separate UI state rather than a fifth question definition.
          return { ...currentState, isReviewing: true };
        }

        return {
          ...currentState,
          currentStep: (currentState.currentStep + 1) as QuestionnaireStepIndex,
        };
      });
    });
  };

  const handleBack = () => {
    setHasAttemptedCurrentStep(false);
    setValidationErrors({});
    performTransition(() => {
      setQuestionnaire((currentState) => {
        if (currentState.isReviewing) {
          // Back from review returns to the last editable questionnaire step.
          return { ...currentState, isReviewing: false, currentStep: 3 };
        }

        if (currentState.currentStep === 0) {
          return currentState;
        }

        return {
          ...currentState,
          currentStep: (currentState.currentStep - 1) as QuestionnaireStepIndex,
        };
      });
    });
  };

  const handleEdit = (step: QuestionnaireStepIndex) => {
    setHasAttemptedCurrentStep(false);
    setValidationErrors({});
    performTransition(() => {
      setQuestionnaire((currentState) => ({
        ...currentState,
        currentStep: step,
        isReviewing: false,
      }));
    });
  };

  const handleBeginAnalysis = () => {
    // Guard against repeated clicks before location navigation completes.
    if (analysisStarted.current) {
      return;
    }

    analysisStarted.current = true;
    const completedData: CompletedQuestionnaireData = {
      version: 1,
      answers: { ...questionnaire.answers },
    };

    // Analysis must never open with an unsaved profile because it reads this snapshot by route.
    if (!saveCompletedQuestionnaireData(completedData)) {
      analysisStarted.current = false;
      setPersistenceError(
        'We could not secure this profile in the current session. Please allow session storage and try again.',
      );
      return;
    }

    setQuestionnaire((currentState) => ({ ...currentState, completedData }));
    window.location.assign('/analysis');
  };

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-[hsl(262_48%_6%)]">
      <div aria-hidden="true" className="fixed inset-0 bg-cosmic-page">
        <Aurora className="opacity-45" />
        <Starfield density={0.55} className="opacity-55" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,hsl(262_48%_6%_/_0.15),hsl(262_48%_6%_/_0.66))]" />
      </div>

      <a
        href="#questionnaire-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[hsl(266_40%_12%)] focus:px-4 focus:py-2 focus:text-sm focus:text-foreground focus:ring-2 focus:ring-primary"
      >
        Skip to questionnaire
      </a>

      <header className="relative z-10 border-b border-[hsl(43_60%_70%_/_0.1)] bg-[hsl(262_45%_7%_/_0.42)] backdrop-blur-lg">
        <div className="container-narrow flex h-16 items-center justify-between md:h-20">
          <a
            href="/"
            className="group flex items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.7)] focus-visible:ring-offset-4 focus-visible:ring-offset-[hsl(262_45%_7%)]"
            aria-label="Return to OrionLabs home"
          >
            <Logo className="h-8 w-8 drop-shadow-[0_0_12px_hsl(43_74%_66%_/_0.3)] transition-transform duration-500 group-hover:rotate-[18deg] sm:h-9 sm:w-9" />
            <span className="font-serif text-xl tracking-tight text-foreground sm:text-2xl">
              Orion<span className="text-gradient-gold">Labs</span>
            </span>
          </a>

          <a
            href="/"
            className="group inline-flex h-10 items-center gap-2 rounded-full border border-[hsl(43_60%_70%_/_0.16)] px-3.5 text-xs font-medium text-muted-foreground transition-colors duration-300 hover:border-[hsl(43_60%_70%_/_0.38)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.65)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(262_45%_7%)] sm:px-4 sm:text-sm"
          >
            <span className="hidden sm:inline">Exit analysis</span>
            <span className="sm:hidden">Exit</span>
            <X aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
          </a>
        </div>
      </header>

      <main
        id="questionnaire-content"
        className="container-narrow relative z-10 pb-14 pt-8 sm:pb-20 sm:pt-10 md:pb-24 md:pt-12"
      >
        <div className="mx-auto w-full max-w-3xl lg:max-w-5xl">
          <QuestionnaireProgress
            currentStep={currentStepNumber}
            totalSteps={TOTAL_STEPS}
            percentage={percentage}
            isReviewing={questionnaire.isReviewing}
          />

          {questionnaire.isReviewing ? (
            <QuestionnaireReview
              key="review"
              answers={questionnaire.answers}
              headingRef={headingRef}
              isTransitioning={isTransitioning}
              persistenceError={persistenceError}
              onBack={handleBack}
              onChangeAnswers={() => handleEdit(0)}
              onEdit={handleEdit}
              onConfirm={handleBeginAnalysis}
            />
          ) : (
            <QuestionnaireCard
              key={activeStep.id}
              step={activeStep}
              stepNumber={currentStepNumber}
              totalSteps={TOTAL_STEPS}
              answers={questionnaire.answers}
              validationErrors={validationErrors}
              isTransitioning={isTransitioning}
              headingRef={headingRef}
              onAnswerChange={handleAnswerChange}
              onBack={handleBack}
              onContinue={handleContinue}
            />
          )}

          <p className="mx-auto mt-6 text-center text-[0.68rem] leading-relaxed tracking-wide text-muted-foreground/55">
            Your profile remains local until analysis begins.
          </p>
        </div>
      </main>
    </div>
  );
}
