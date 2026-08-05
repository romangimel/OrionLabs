import type { RefObject } from 'react';
import { ArrowLeft, Pencil, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { OrbitalProfile } from '@/components/celestial/OrbitalProfile';
import { createOrbitalProfile } from '@/lib/orbital-profile';
import type { QuestionnaireAnswers, QuestionnaireStepIndex } from '@/lib/questionnaire-state';
import { cn } from '@/lib/utils';

interface QuestionnaireReviewProps {
  answers: QuestionnaireAnswers;
  headingRef: RefObject<HTMLHeadingElement>;
  isTransitioning: boolean;
  persistenceError?: string;
  onBack: () => void;
  onChangeAnswers: () => void;
  onEdit: (step: QuestionnaireStepIndex) => void;
  onConfirm: () => void;
}

interface ReviewSection {
  title: string;
  step: QuestionnaireStepIndex;
  items: { label: string; value: string }[];
}

/** Produces review-safe copy for blank optional or incomplete answers. */
function displayValue(value: string, fallback = 'Not provided') {
  return value.trim() || fallback;
}

/** Formats an HTML date value without allowing the viewer's timezone to shift the day. */
function formatBirthDate(value: string) {
  if (!value) {
    return 'Not provided';
  }

  const parsedDate = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parsedDate);
}

/**
 * Groups the normalized answer state into the same sections the user completed.
 * Each edit action returns to its original step with all other answers intact;
 * confirmation is the only action that persists data for the analysis route.
 */
export function QuestionnaireReview({
  answers,
  headingRef,
  isTransitioning,
  persistenceError,
  onBack,
  onChangeAnswers,
  onEdit,
  onConfirm,
}: QuestionnaireReviewProps) {
  const reduceMotion = useReducedMotion();
  const orbitalProfile = createOrbitalProfile(answers);
  // Review presentation is derived from canonical answers rather than duplicated state.
  const sections: ReviewSection[] = [
    {
      title: 'Celestial Identity',
      step: 0,
      items: [
        { label: 'First name', value: displayValue(answers.firstName) },
        { label: 'Zodiac sign', value: displayValue(answers.zodiacSign) },
      ],
    },
    {
      title: 'Profile Calibration',
      step: 1,
      items: [
        { label: 'Birth date', value: formatBirthDate(answers.birthDate) },
        { label: 'Reference preference', value: displayValue(answers.pronouns) },
      ],
    },
    {
      title: 'Behavioral Snapshot',
      step: 2,
      items: [
        { label: 'Main area of attention', value: displayValue(answers.attentionArea) },
        { label: 'Behavioral statement', value: displayValue(answers.behavioralStatement) },
      ],
    },
    {
      title: 'Final Calibration',
      step: 3,
      items: [
        {
          label: 'Additional context',
          value: displayValue(answers.additionalContext, 'No additional context provided.'),
        },
      ],
    },
  ];

  return (
    <motion.section
      aria-labelledby="questionnaire-review-title"
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
      }
      className="glass-strong relative mt-7 w-full overflow-hidden rounded-2xl p-5 shadow-[0_28px_90px_-38px_hsl(255_80%_2%_/_0.95)] sm:p-8 md:mt-9 md:p-10 lg:mt-10 lg:p-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-28 h-64 w-64 rounded-full bg-[hsl(326_80%_50%_/_0.12)] blur-[72px]"
      />

      <div className="relative">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(19rem,0.72fr)] lg:gap-12">
          <div className="max-w-3xl">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[hsl(326_55%_68%)] lg:text-xs">
              Final Review
            </p>
            <h1
              id="questionnaire-review-title"
              ref={headingRef}
              tabIndex={-1}
              className="mt-3 font-serif text-3xl leading-tight text-gradient-gold outline-none sm:text-4xl lg:mt-4 lg:text-[2.75rem]"
            >
              Review Answers
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base lg:mt-4 lg:text-lg">
              Confirm your calibration profile before OrionLabs begins its analysis.
            </p>

            <div className="mt-7 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-[hsl(43_60%_70%_/_0.12)] bg-[hsl(43_60%_70%_/_0.1)] sm:grid-cols-3">
              {[
                ['Subject', displayValue(answers.firstName)],
                ['Baseline', displayValue(answers.zodiacSign)],
                ['Current focus', displayValue(answers.attentionArea)],
              ].map(([label, value], index) => (
                <div
                  key={label}
                  className={cn(
                    'bg-[hsl(268_50%_9%_/_0.82)] px-3 py-3.5',
                    index === 2 && 'col-span-2 sm:col-span-1',
                  )}
                >
                  <p className="text-[0.58rem] uppercase tracking-[0.16em] text-muted-foreground/55">
                    {label}
                  </p>
                  <p className="mt-1 truncate font-serif text-lg text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm rounded-2xl border border-[hsl(43_60%_70%_/_0.14)] bg-[hsl(262_45%_7%_/_0.28)] p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-muted-foreground/55">
              <span>Subject profile seed</span>
              <span className="text-[hsl(43_60%_72%)]">Ready</span>
            </div>
            <OrbitalProfile
              profile={orbitalProfile}
              variant="review"
              stage={3}
              className="mx-auto mt-1"
            />
            <div className="flex items-center justify-between gap-3 border-t border-[hsl(43_60%_70%_/_0.1)] pt-3 text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground/50">
              <span>{orbitalProfile.signature}</span>
              <span>{orbitalProfile.focusCode} / {orbitalProfile.behaviorCode}</span>
            </div>
          </div>
        </div>

        <div className="my-7 h-px bg-gradient-to-r from-[hsl(43_60%_70%_/_0.18)] via-[hsl(326_55%_65%_/_0.12)] to-transparent sm:my-8 lg:my-10" />

        <div className="grid overflow-hidden rounded-2xl border border-[hsl(43_60%_70%_/_0.12)] bg-[hsl(43_60%_70%_/_0.08)] md:grid-cols-2">
          {sections.map((section, index) => (
            <section
              key={section.title}
              aria-labelledby={`review-${section.step}-title`}
              className={cn(
                'bg-[hsl(275_45%_12%_/_0.3)] p-5 sm:p-6',
                index < sections.length - 1 && 'border-b border-[hsl(43_60%_70%_/_0.1)]',
                'md:border-b-0',
                index < 2 && 'md:border-b md:border-[hsl(43_60%_70%_/_0.1)]',
                index % 2 === 0 && 'md:border-r md:border-[hsl(43_60%_70%_/_0.1)]',
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <h2
                  id={`review-${section.step}-title`}
                  className="font-serif text-xl text-gradient-gold sm:text-2xl"
                >
                  {section.title}
                </h2>
                <button
                  type="button"
                  disabled={isTransitioning}
                  aria-label={`Edit ${section.title}`}
                  onClick={() => onEdit(section.step)}
                  className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium text-[hsl(326_75%_68%)] transition-colors hover:bg-[hsl(326_75%_68%_/_0.1)] hover:text-[hsl(326_82%_78%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.75)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(275_45%_10%)] disabled:cursor-wait disabled:opacity-50"
                >
                  <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                  Edit
                </button>
              </div>
              <dl className="mt-5 space-y-4">
                {section.items.map((item) => (
                  <div key={item.label}>
                    <dt className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-muted-foreground/70">
                      {item.label}
                    </dt>
                    <dd className="mt-1 break-words text-sm leading-relaxed text-foreground/90 sm:text-base">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>

        <div className="mt-7 flex flex-col gap-3 border-t border-[hsl(43_60%_70%_/_0.1)] pt-6 sm:mt-8 lg:mt-10 lg:pt-8">
          {persistenceError && (
            <p role="alert" className="text-sm text-[hsl(326_65%_74%)]">
              {persistenceError}
            </p>
          )}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              disabled={isTransitioning}
              onClick={onBack}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[hsl(43_60%_70%_/_0.24)] px-5 text-sm font-medium text-foreground/85 transition-all duration-300 hover:border-[hsl(43_60%_70%_/_0.5)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.65)] disabled:cursor-wait disabled:opacity-50 sm:min-w-24"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1 motion-reduce:transform-none" />
              Back
            </button>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                disabled={isTransitioning}
                onClick={onChangeAnswers}
                className="inline-flex h-12 items-center justify-center rounded-full border border-[hsl(43_60%_70%_/_0.24)] px-6 text-sm font-medium text-foreground/85 transition-all duration-300 hover:border-[hsl(43_60%_70%_/_0.5)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.65)] disabled:cursor-wait disabled:opacity-50"
              >
                Change Answers
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#F5E6B0] to-[#C9A24A] px-7 text-sm font-semibold text-[#070514] shadow-[0_8px_30px_-6px_hsl(43_74%_66%_/_0.4)] transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_78%)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(264_45%_8%)] motion-reduce:transform-none"
              >
                <span className="relative z-10">Begin Analysis</span>
                <Sparkles aria-hidden="true" className="relative z-10 h-4 w-4" />
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full motion-reduce:hidden" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
