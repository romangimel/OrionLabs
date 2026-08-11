import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CelestialCalibrationIndicator } from '@/components/analysis/CelestialCalibrationIndicator';
import type { SubjectSignatureData } from '@/lib/subject-signature';

export type AnalysisPhase = 'loading' | 'complete' | 'error' | 'capacity';

interface AnalysisLoadingExperienceProps {
  signature: SubjectSignatureData;
  message: string;
  messageIndex: number;
  messageCount: number;
  phase: AnalysisPhase;
  onRetry: () => void;
}

const COMPLETION_MESSAGE = 'Report synthesis complete.';

/** Presents the prominent status narrative and its evolving subject model. */
export function AnalysisLoadingExperience({
  signature,
  message,
  messageIndex,
  messageCount,
  phase,
  onRetry,
}: AnalysisLoadingExperienceProps) {
  const reduceMotion = useReducedMotion();
  const isComplete = phase === 'complete';
  const isCapacityUnavailable = phase === 'capacity';
  const isError = phase === 'error' || isCapacityUnavailable;
  const displayedMessage = isComplete
    ? COMPLETION_MESSAGE
    : isCapacityUnavailable
      ? 'Analysis capacity is temporarily unavailable.'
    : isError
      ? 'Celestial synthesis encountered an administrative anomaly.'
      : message;

  return (
    <section
      aria-labelledby="analysis-title"
      className="glass-strong relative w-full max-w-5xl overflow-hidden rounded-[1.5rem] px-4 py-4 shadow-[0_40px_140px_-44px_hsl(255_80%_2%_/_0.98)] sm:rounded-[1.75rem] sm:px-8 sm:py-8 md:rounded-[2rem] md:px-10 md:py-10 lg:px-12"
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
          <span className="text-[hsl(326_55%_68%)]">
            DeepConstellation™ · Calibration sequence
          </span>
          <span>{signature.identity}</span>
        </div>

        <div className="grid items-center gap-3 pt-3 sm:gap-7 sm:pt-6 lg:grid-cols-[minmax(0,0.88fr)_minmax(24rem,1.12fr)] lg:gap-10 lg:pt-7">
          <div className="text-left">
            <p className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-[hsl(43_60%_72%)]">
              Subject signature · {signature.constellationLabel ?? signature.zodiacSign ?? 'Dormant'}
            </p>
            <h1
              id="analysis-title"
              className="mt-2 max-w-xl font-serif text-[1.9rem] leading-[1.02] text-gradient-gold sm:mt-3 sm:text-[2.75rem] lg:text-[3.25rem]"
            >
              Calibrating your celestial profile
            </h1>
            <p className="mt-2 max-w-lg text-xs leading-relaxed text-muted-foreground sm:mt-4 sm:text-base">
              Your confirmed profile is being aligned with the OrionLabs assessment
              framework.
            </p>

            <div
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="relative mt-4 min-h-[7.75rem] overflow-hidden rounded-2xl border border-[hsl(43_60%_70%_/_0.14)] bg-[linear-gradient(135deg,hsl(43_74%_66%_/_0.055),hsl(262_50%_7%_/_0.44))] px-4 py-4 sm:mt-7 sm:min-h-[9.25rem] sm:px-6 sm:py-6"
            >
              <div className="flex items-center justify-between gap-4 text-[0.58rem] font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
                <span>
                  {isComplete
                    ? 'Calibration outcome'
                    : isCapacityUnavailable
                      ? 'Capacity boundary reached'
                    : isError
                      ? 'Sequence interrupted'
                      : 'Current operation'}
                </span>
                <span>
                  {isComplete
                    ? '04 / 04'
                    : `${String(messageIndex + 1).padStart(2, '0')} / ${String(messageCount).padStart(2, '0')}`}
                </span>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={displayedMessage}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mt-3 font-serif text-[1.65rem] leading-[1.08] text-gradient-cosmic sm:mt-4 sm:text-[2rem] sm:leading-[1.12] lg:text-[2.15rem]"
                >
                  {displayedMessage}
                </motion.p>
              </AnimatePresence>

              {isError && (
                <div className="relative z-10 mt-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {isCapacityUnavailable
                      ? 'Your confirmed answers remain secured in this session. Return later to resume without recalibration.'
                      : 'Your confirmed answers remain secured in this session. The sequence can be attempted again without recalibration.'}
                  </p>
                  {isCapacityUnavailable ? (
                    <a
                      href="/questionnaire"
                      className="inline-flex h-10 shrink-0 items-center justify-center rounded-full border border-[hsl(43_60%_70%_/_0.3)] px-5 text-xs font-medium text-foreground transition-colors hover:border-[hsl(43_60%_70%_/_0.58)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.65)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(262_45%_7%)]"
                    >
                      Return to review
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={onRetry}
                      className="inline-flex h-10 shrink-0 items-center justify-center rounded-full border border-[hsl(43_60%_70%_/_0.3)] px-5 text-xs font-medium text-foreground transition-colors hover:border-[hsl(43_60%_70%_/_0.58)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.65)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(262_45%_7%)]"
                    >
                      Retry analysis
                    </button>
                  )}
                </div>
              )}

              <div
                aria-hidden="true"
                className="absolute inset-x-4 bottom-3 flex gap-1.5 sm:inset-x-6 sm:bottom-4"
              >
                {Array.from({ length: messageCount }, (_, index) => (
                  <span
                    key={index}
                    className="h-px flex-1 overflow-hidden bg-[hsl(43_60%_70%_/_0.12)]"
                  >
                    <span
                      className={`block h-full bg-gradient-to-r from-[#C9A24A] to-[#F5E6B0] transition-[width] duration-700 motion-reduce:transition-none ${
                        index <= messageIndex || isComplete ? 'w-full' : 'w-0'
                      }`}
                    />
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-4 text-[0.55rem] uppercase tracking-[0.14em] text-muted-foreground/45 sm:mt-5 sm:text-[0.6rem] sm:tracking-[0.16em]">
              <p>Server-mediated protocol</p>
              <p className="text-right">Approved fields only</p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[14rem] rounded-[1.25rem] border border-[hsl(43_60%_70%_/_0.1)] bg-[hsl(262_50%_6%_/_0.25)] p-1 sm:max-w-[31rem] sm:rounded-[1.5rem] sm:p-3">
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
            <CelestialCalibrationIndicator
              signature={signature}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
