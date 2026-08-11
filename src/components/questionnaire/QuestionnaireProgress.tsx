import { SubjectSignature } from '@/components/celestial/SubjectSignature';
import type { SubjectSignatureData } from '@/lib/subject-signature';

interface QuestionnaireProgressProps {
  currentStep: number;
  totalSteps: number;
  percentage: number;
  isReviewing: boolean;
  signature: SubjectSignatureData;
}

/**
 * Displays completion based on finished steps rather than visual position.
 * With four configured steps, the three internal markers divide the track at
 * 25% intervals; the review state is the terminal 100% milestone.
 */
export function QuestionnaireProgress({
  currentStep,
  totalSteps,
  percentage,
  isReviewing,
  signature,
}: QuestionnaireProgressProps) {
  // The start and end markers are rendered separately at 0% and 100%.
  const markerPositions = [25, 50, 75] as const;

  return (
    <section aria-label="Questionnaire progress" className="w-full">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-[hsl(43_60%_72%)] lg:text-xs">
            Calibration sequence
          </p>
          <p className="mt-1 text-sm text-muted-foreground lg:mt-1.5 lg:text-base">
            {isReviewing ? (
              <span className="text-foreground">Final Review</span>
            ) : (
              <>
                Step <span className="text-foreground">{currentStep}</span> of {totalSteps}
              </>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3" aria-hidden="true">
          <SubjectSignature signature={signature} variant="compact" ariaHidden />
          <p className="font-serif text-2xl leading-none text-gradient-gold lg:text-3xl">
            {percentage}%
          </p>
        </div>
      </div>

      <div
        className="relative mt-4 h-0.5 bg-[hsl(43_60%_70%_/_0.14)] lg:mt-5"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
        aria-label={`${percentage}% complete`}
      >
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#C9A24A] via-[#F5E6B0] to-[#E8C77A] shadow-[0_0_14px_hsl(43_74%_66%_/_0.6)] transition-[width] duration-700 motion-reduce:transition-none"
          style={{ width: `${percentage}%` }}
        />
        <span
          aria-hidden="true"
          className="absolute left-0 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[hsl(43_74%_78%)] bg-[hsl(43_74%_66%)] shadow-[0_0_10px_hsl(43_74%_66%_/_0.7)]"
        />
        <div className="absolute inset-0">
          {markerPositions.map((position) => {
            const active = position <= percentage;
            return (
              <span
                key={position}
                aria-hidden="true"
                className={`absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-colors duration-500 ${
                  active
                    ? 'border-[hsl(43_74%_78%)] bg-[hsl(43_74%_66%)] shadow-[0_0_10px_hsl(43_74%_66%_/_0.7)]'
                    : 'border-[hsl(43_60%_70%_/_0.28)] bg-[hsl(264_45%_8%)]'
                }`}
                style={{ left: `${position}%` }}
              />
            );
          })}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-4 text-[0.58rem] font-medium uppercase tracking-[0.18em] text-muted-foreground/40 sm:text-[0.62rem]">
        <span>Subject signature initialized</span>
        <span>{isReviewing ? 'Subject signature ready' : 'Signature geometry pending'}</span>
      </div>
    </section>
  );
}
