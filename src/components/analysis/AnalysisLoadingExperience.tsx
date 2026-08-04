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
      className="glass-strong relative w-full max-w-[36rem] overflow-hidden rounded-[1.5rem] px-5 py-7 text-center shadow-[0_36px_120px_-42px_hsl(255_80%_2%_/_0.96)] sm:px-8 sm:py-8 md:rounded-[1.75rem] md:px-10 md:py-9"
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
          className="mx-auto mt-3 max-w-xl font-serif text-[1.9rem] leading-[1.06] text-gradient-gold sm:text-[2.5rem] md:text-[2.8rem]"
        >
          Calibrating your celestial profile
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
          {subjectName
            ? `${subjectName}'s confirmed profile is being aligned with the OrionLabs assessment framework.`
            : 'Your confirmed profile is being aligned with the OrionLabs assessment framework.'}
        </p>

        <div className="mx-auto my-5 flex justify-center sm:my-6">
          <CelestialCalibrationIndicator isComplete={isComplete} />
        </div>

        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="mx-auto flex min-h-16 max-w-lg items-center justify-center rounded-xl border border-[hsl(43_60%_70%_/_0.12)] bg-[hsl(262_45%_7%_/_0.3)] px-4 py-3 sm:px-5"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={displayedMessage}
              initial={reduceMotion ? false : { opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -5 }}
              transition={{ duration: reduceMotion ? 0 : 0.28, ease: 'easeOut' }}
              className="text-gradient-gold text-sm font-medium leading-relaxed sm:text-[0.95rem]"
            >
              {displayedMessage}
            </motion.p>
          </AnimatePresence>
        </div>

        <p className="mt-3 text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground/45 sm:text-[0.63rem]">
          Session-local assessment protocol · No external transmission
        </p>
      </div>
    </section>
  );
}
