import { Check, LoaderCircle } from 'lucide-react';
import { CelestialCalibrationIndicator } from '@/components/analysis/CelestialCalibrationIndicator';
import type { CalibrationRowState } from '@/lib/analysis-presentation';
import type { SubjectSignatureData } from '@/lib/subject-signature';

export type AnalysisPhase = 'loading' | 'complete' | 'error' | 'capacity';

interface AnalysisLoadingExperienceProps {
  signature: SubjectSignatureData;
  messages: readonly string[];
  rowStates: readonly CalibrationRowState[];
  phase: AnalysisPhase;
  onRetry: () => void;
}

/** Presents the persistent calibration narrative beside the evolving subject model. */
export function AnalysisLoadingExperience({
  signature,
  messages,
  rowStates,
  phase,
  onRetry,
}: AnalysisLoadingExperienceProps) {
  const isCapacityUnavailable = phase === 'capacity';
  const isError = phase === 'error' || isCapacityUnavailable;
  const liveStatus = isCapacityUnavailable
    ? 'Analysis capacity is temporarily unavailable. Return later to try again.'
    : isError
      ? 'Analysis encountered an administrative anomaly. You can retry without recalibration.'
      : phase === 'complete'
        ? 'Your report is ready. Redirecting to the report.'
        : 'Your report is being prepared.';

  return (
    <section
      aria-labelledby="analysis-title"
      className="glass-strong relative w-full max-w-5xl overflow-hidden rounded-[1.5rem] px-4 py-4 shadow-[0_40px_140px_-44px_hsl(255_80%_2%_/_0.98)] sm:rounded-[1.75rem] sm:px-7 sm:py-7 md:rounded-[2rem] md:px-8 md:py-8 lg:px-10"
    >
      <div
        aria-hidden="true"
        className="absolute -right-16 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[hsl(280_78%_48%_/_0.16)] blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[hsl(43_60%_70%_/_0.45)] to-transparent"
      />

      <div className="relative">
        <div className="flex items-center justify-between gap-4 border-b border-[hsl(43_60%_70%_/_0.1)] pb-3 text-[0.55rem] font-medium uppercase tracking-[0.18em] text-muted-foreground/55 sm:pb-5 sm:text-[0.63rem] sm:tracking-[0.2em]">
          <span className="text-[hsl(326_55%_68%)] sm:hidden">DeepConstellation™</span>
          <span className="hidden text-[hsl(326_55%_68%)] sm:inline">
            DeepConstellation™ · Calibration sequence
          </span>
          <span className="hidden text-right sm:inline">{signature.identity}</span>
        </div>

        <p id="analysis-title" role="status" aria-live="polite" aria-atomic="true" className="sr-only">
          {liveStatus}
        </p>

        <div className="grid items-center gap-6 pt-5 sm:gap-8 sm:pt-7 lg:grid-cols-[minmax(0,0.92fr)_minmax(24rem,1.08fr)] lg:items-stretch lg:gap-9">
          <div className="text-left lg:flex lg:min-h-0 lg:flex-col">
            <p className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-[hsl(43_60%_72%)]">
              Calibration sequence
            </p>

            <ol
              aria-hidden="true"
              data-calibration-rail
              className="relative mt-4 border-y border-[hsl(43_60%_70%_/_0.18)] before:absolute before:bottom-5 before:left-2 before:top-5 before:w-px before:bg-gradient-to-b before:from-[hsl(43_74%_66%_/_0.32)] before:via-[hsl(43_74%_66%_/_0.58)] before:to-[hsl(43_74%_66%_/_0.2)] sm:mt-5 sm:before:left-[0.625rem] lg:grid lg:min-h-0 lg:flex-1 lg:grid-rows-5"
            >
              {messages.map((message, index) => {
                const rowState = rowStates[index] ?? 'upcoming';
                const isActive = rowState === 'active';
                const isRowComplete = rowState === 'complete';
                const stepNumber = String(index + 1).padStart(2, '0');

                return (
                  <li
                    key={message}
                    className={`relative grid min-h-[4.25rem] grid-cols-[1rem_1.25rem_minmax(0,1fr)] items-center gap-2 py-3 sm:min-h-[4.75rem] sm:grid-cols-[1.25rem_1.75rem_minmax(0,1fr)] sm:gap-3 sm:py-3.5 lg:min-h-0 lg:py-2.5 ${
                      isActive
                        ? 'after:absolute after:inset-y-2 after:right-0 after:left-8 after:-z-10 after:bg-[linear-gradient(90deg,hsl(43_74%_66%_/_0.07),transparent_78%)] sm:after:left-10'
                        : ''
                    }`}
                  >
                    <span
                      className={`relative z-10 flex h-4 w-4 items-center justify-center rounded-full border bg-[hsl(262_48%_8%)] sm:h-5 sm:w-5 ${
                        isActive || isRowComplete
                          ? 'border-[hsl(326_78%_69%_/_0.62)]'
                          : 'border-[hsl(43_60%_70%_/_0.24)]'
                      }`}
                      aria-hidden="true"
                    >
                      {isActive ? (
                        <LoaderCircle
                          className="h-2.5 w-2.5 animate-spin text-[hsl(326_78%_69%)] motion-reduce:animate-none sm:h-3 sm:w-3"
                          strokeWidth={1.8}
                        />
                      ) : isRowComplete ? (
                        <Check
                          className="h-2.5 w-2.5 text-[hsl(326_78%_69%)] sm:h-3 sm:w-3"
                          strokeWidth={2}
                        />
                      ) : (
                        <span className="h-1 w-1 rounded-full bg-[hsl(43_60%_70%_/_0.38)]" />
                      )}
                    </span>
                    <span className="text-[0.56rem] font-medium tracking-[0.18em] text-[hsl(326_55%_68%_/_0.88)] sm:text-[0.6rem]">
                      {stepNumber}
                    </span>
                    <p
                      className={`min-w-0 break-words font-serif text-[1.15rem] leading-[1.13] transition-[color,opacity] duration-500 motion-reduce:transition-none sm:text-[1.35rem] lg:text-[1.3rem] ${
                        isActive
                          ? 'text-gradient-gold'
                          : isRowComplete
                            ? 'text-foreground/92'
                            : 'text-muted-foreground/50'
                      }`}
                    >
                      {message}
                    </p>
                  </li>
                );
              })}
            </ol>

            {isError && (
              <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                {isCapacityUnavailable ? (
                  <a
                    href="/questionnaire"
                    className="inline-flex h-10 items-center justify-center rounded-full border border-[hsl(43_60%_70%_/_0.3)] px-5 text-xs font-medium text-foreground transition-colors hover:border-[hsl(43_60%_70%_/_0.58)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.65)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(262_45%_7%)]"
                  >
                    Return to review
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={onRetry}
                    className="inline-flex h-10 items-center justify-center rounded-full border border-[hsl(43_60%_70%_/_0.3)] px-5 text-xs font-medium text-foreground transition-colors hover:border-[hsl(43_60%_70%_/_0.58)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.65)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(262_45%_7)]"
                  >
                    Retry analysis
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="relative mx-auto w-full max-w-[14rem] rounded-[1.25rem] border border-[hsl(43_60%_70%_/_0.1)] bg-[hsl(262_50%_6%_/_0.25)] p-1 sm:max-w-[29rem] sm:rounded-[1.5rem] sm:p-2.5">
            <span
              aria-hidden="true"
              className="absolute left-4 top-4 h-5 w-5 border-l border-t border-[hsl(43_60%_70%_/_0.38)]"
            />
            <span
              aria-hidden="true"
              className="absolute right-4 top-4 h-5 w-5 border-r border-t border-[hsl(43_60%_70%_/_0.38)]"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-4 left-4 h-5 w-5 border-b border-l border-[hsl(43_60%_70%_/_0.38)]"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-4 right-4 h-5 w-5 border-b border-r border-[hsl(43_60%_70%_/_0.38)]"
            />
            <CelestialCalibrationIndicator signature={signature} />
          </div>
        </div>
      </div>
    </section>
  );
}
