import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

interface QuestionnaireNavigationProps {
  isFirstStep: boolean;
  isFinalStep?: boolean;
  disabled?: boolean;
  onBack: () => void;
}

/** Shared back/submit controls for each questionnaire step. */
export function QuestionnaireNavigation({
  isFirstStep,
  isFinalStep = false,
  disabled = false,
  onBack,
}: QuestionnaireNavigationProps) {
  return (
    <div className="flex items-center gap-3 border-t border-[hsl(43_60%_70%_/_0.1)] pt-6 sm:justify-between lg:pt-8">
      <button
        type="button"
        disabled={isFirstStep || disabled}
        aria-describedby={isFirstStep ? 'questionnaire-back-unavailable' : undefined}
        onClick={onBack}
        className="group inline-flex h-12 min-w-24 items-center justify-center gap-2 rounded-full border border-[hsl(43_60%_70%_/_0.24)] px-5 text-sm font-medium text-foreground/85 transition-all duration-300 hover:border-[hsl(43_60%_70%_/_0.5)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.65)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(264_45%_8%)] disabled:cursor-not-allowed disabled:border-[hsl(43_60%_70%_/_0.1)] disabled:text-muted-foreground/35"
      >
        <ArrowLeft aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
        Back
      </button>
      {isFirstStep && (
        <span id="questionnaire-back-unavailable" className="sr-only">
          Back is unavailable on the first step.
        </span>
      )}

      {/* Submission is handled by the parent form so validation can be added at one boundary. */}
      <button
        type="submit"
        disabled={disabled}
        className="group relative inline-flex h-12 flex-1 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#F5E6B0] to-[#C9A24A] px-6 text-sm font-semibold text-[#070514] shadow-[0_8px_30px_-6px_hsl(43_74%_66%_/_0.4)] transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_78%)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(264_45%_8%)] disabled:cursor-wait disabled:opacity-70 sm:flex-none sm:min-w-40"
      >
        <span className="relative z-10">
          {isFinalStep ? 'Review Answers' : 'Continue'}
        </span>
        {isFinalStep ? (
          <Sparkles aria-hidden="true" className="relative z-10 h-4 w-4" />
        ) : (
          <ArrowRight aria-hidden="true" className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        )}
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      </button>
    </div>
  );
}
