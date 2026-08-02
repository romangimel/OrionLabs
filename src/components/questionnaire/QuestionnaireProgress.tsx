interface QuestionnaireProgressProps {
  currentStep: number;
  totalSteps: number;
  percentage: number;
}

export function QuestionnaireProgress({
  currentStep,
  totalSteps,
  percentage,
}: QuestionnaireProgressProps) {
  return (
    <section aria-label="Questionnaire progress" className="mx-auto w-full max-w-3xl">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-[hsl(43_60%_72%)]">
            Calibration sequence
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Step <span className="text-foreground">{currentStep}</span> of {totalSteps}
          </p>
        </div>
        <p className="font-serif text-2xl leading-none text-gradient-gold" aria-hidden="true">
          {percentage}%
        </p>
      </div>

      <div
        className="relative mt-4 h-px bg-[hsl(43_60%_70%_/_0.14)]"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
        aria-label={`${percentage}% complete`}
      >
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#C9A24A] via-[#F5E6B0] to-[#E8C77A] shadow-[0_0_14px_hsl(43_74%_66%_/_0.6)] transition-[width] duration-700"
          style={{ width: `${percentage}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-between">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const active = stepNumber <= currentStep;
            return (
              <span
                key={stepNumber}
                className={`h-2 w-2 rounded-full border transition-colors duration-500 ${
                  active
                    ? 'border-[hsl(43_74%_78%)] bg-[hsl(43_74%_66%)] shadow-[0_0_10px_hsl(43_74%_66%_/_0.7)]'
                    : 'border-[hsl(43_60%_70%_/_0.28)] bg-[hsl(264_45%_8%)]'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

