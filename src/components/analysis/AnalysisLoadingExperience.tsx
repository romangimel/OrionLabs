import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CelestialCalibrationIndicator } from '@/components/analysis/CelestialCalibrationIndicator';
import type { MockAnalysisPhase } from '@/hooks/useMockAnalysisSequence';

interface AnalysisLoadingExperienceProps {
  firstName: string;
  message: string;
  phase: MockAnalysisPhase;
}

const COMPLETION_MESSAGE = 'Report synthesis complete.';

/** Presents the active and completed analysis states without owning their timing. */
export function AnalysisLoadingExperience({
  firstName,
  message,
  phase,
}: AnalysisLoadingExperienceProps) {
  const reduceMotion = useReducedMotion();
  const isComplete = phase === 'complete';
  const displayedMessage = isComplete ? COMPLETION_MESSAGE : message;
  const subjectName = firstName.trim();

  return (
    <section
      aria-labelledby="analysis-title"
      className="glass-strong relative w-full max-w-[46rem] overflow-hidden rounded-[1.75rem] px-5 py-10 text-center shadow-[0_36px_120px_-42px_hsl(255_80%_2%_/_0.96)] sm:px-10 sm:py-12 md:rounded-[2rem] md:px-14 md:py-14"
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-40 w-3/4 -translate-x-1/2 rounded-full bg-[hsl(280_78%_48%_/_0.15)] blur-[72px]"
      />
      <div className="relative">
        <p className="text-[0.64rem] font-medium uppercase tracking-[0.24em] text-[hsl(326_55%_68%)] sm:text-[0.68rem]">
          DeepConstellation™ · Calibration sequence
        </p>
        <h1
          id="analysis-title"
          className="mx-auto mt-4 max-w-2xl font-serif text-[2.15rem] leading-[1.06] text-gradient-gold sm:text-5xl md:text-[3.35rem]"
        >
          Calibrating your celestial profile
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {subjectName
            ? `${subjectName}'s confirmed profile is being aligned with the OrionLabs assessment framework.`
            : 'Your confirmed profile is being aligned with the OrionLabs assessment framework.'}
        </p>

        <div className="mx-auto my-8 flex justify-center sm:my-10">
          <CelestialCalibrationIndicator isComplete={isComplete} />
        </div>

        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="mx-auto flex min-h-[4.75rem] max-w-xl items-center justify-center rounded-2xl border border-[hsl(43_60%_70%_/_0.12)] bg-[hsl(262_45%_7%_/_0.3)] px-4 py-4 sm:min-h-[5rem] sm:px-6"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={displayedMessage}
              initial={reduceMotion ? false : { opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -5 }}
              transition={{ duration: reduceMotion ? 0 : 0.28, ease: 'easeOut' }}
              className={`text-sm leading-relaxed sm:text-base ${
                isComplete
                  ? 'font-medium text-[hsl(43_74%_72%)]'
                  : 'text-foreground/82'
              }`}
            >
              {displayedMessage}
            </motion.p>
          </AnimatePresence>
        </div>

        <p className="mt-5 text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground/45 sm:text-[0.66rem]">
          Session-local assessment protocol · No external transmission
        </p>
      </div>
    </section>
  );
}
