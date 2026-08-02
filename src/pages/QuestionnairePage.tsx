import { X } from 'lucide-react';
import { Logo } from '@/components/site/Logo';
import { Starfield } from '@/components/site/Starfield';
import { Aurora } from '@/components/site/Aurora';
import { QuestionnaireCard } from '@/components/questionnaire/QuestionnaireCard';
import { QuestionnaireProgress } from '@/components/questionnaire/QuestionnaireProgress';
import { QUESTIONNAIRE_STEPS } from '@/data/questionnaire';

const CURRENT_STEP = 1;
const TOTAL_STEPS = QUESTIONNAIRE_STEPS.length;
const PERCENTAGE = ((CURRENT_STEP - 1) / TOTAL_STEPS) * 100;

export function QuestionnairePage() {
  const activeStep = QUESTIONNAIRE_STEPS[CURRENT_STEP - 1];

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
            <X className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
          </a>
        </div>
      </header>

      <main
        id="questionnaire-content"
        className="container-narrow relative z-10 pb-14 pt-8 sm:pb-20 sm:pt-10 md:pb-24 md:pt-12"
      >
        <div className="mx-auto w-full max-w-3xl lg:max-w-5xl">
          <QuestionnaireProgress
            currentStep={CURRENT_STEP}
            totalSteps={TOTAL_STEPS}
            percentage={PERCENTAGE}
          />
          <QuestionnaireCard
            step={activeStep}
            stepNumber={CURRENT_STEP}
            totalSteps={TOTAL_STEPS}
          />
          <p className="mx-auto mt-6 text-center text-[0.68rem] leading-relaxed tracking-wide text-muted-foreground/55">
            Your profile remains local until analysis begins.
          </p>
        </div>
      </main>
    </div>
  );
}
