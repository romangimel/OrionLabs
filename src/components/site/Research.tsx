import { useReducer } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, FileText } from 'lucide-react';
import {
  INITIAL_RESEARCH_SHOWCASE_STATE,
  LANDING_RESEARCH_PAPERS,
  researchShowcaseReducer,
} from '@/data/research-showcase';
import type { ResearchPaperSharedData } from '@/data/research-types';
import { Reveal } from './Motion';
import { SectionHeading } from './SectionHeading';
import { BackgroundGlow } from './shared/BackgroundGlow';

const DESKTOP_VISIBLE_PAPER_COUNT = 3;

function getLandingSummary(paper: ResearchPaperSharedData) {
  return paper.abstract[1] ?? paper.abstract[0];
}

export function Research() {
  const [showcaseState, dispatch] = useReducer(
    researchShowcaseReducer,
    INITIAL_RESEARCH_SHOWCASE_STATE,
  );
  const reduceMotion = useReducedMotion();
  const selectedPaper = LANDING_RESEARCH_PAPERS.find(
    (paper) => paper.slug === showcaseState.selectedSlug,
  ) ?? LANDING_RESEARCH_PAPERS[0];
  const isFeaturedPaper = selectedPaper.slug === 'limits-of-science';
  const isAtRailStart = showcaseState.railStartIndex === 0;
  const isAtRailEnd =
    showcaseState.railStartIndex ===
    LANDING_RESEARCH_PAPERS.length - DESKTOP_VISIBLE_PAPER_COUNT;

  return (
    <section id="research" className="relative overflow-hidden py-28 md:py-36">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Peer-Adjacent Research"
          title={
            <>
              <span className="text-gradient-gold">Where observation becomes </span>
              <span className="text-[hsl(326_65%_65%)]">sufficient evidence.</span>
            </>
          }
          titleAccessibleLabel="Where observation becomes sufficient evidence."
          description="OrionLabs conducts structured research into the computational effects of planetary conditions, behavioral priors, and other variables historically excluded from conventional machine learning for reasons we consider increasingly difficult to defend."
        />

        <Reveal delay={0.1} className="mt-16">
          <article
            id="selected-research-paper"
            aria-live="polite"
            className="relative overflow-hidden rounded-2xl glass-strong p-6 sm:p-8 md:min-h-[42rem] md:p-10 lg:min-h-[34rem]"
          >
            <BackgroundGlow className="-right-20 -top-20 h-48 w-48 rounded-full bg-[hsl(315_80%_58%_/_0.22)] blur-3xl" />
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={selectedPaper.slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.24, ease: 'easeOut' }}
                className="relative z-10 grid min-h-full items-center gap-9 md:grid-cols-[minmax(0,1.08fr)_minmax(16rem,0.92fr)] md:gap-8 lg:gap-12"
              >
                <div className="min-w-0">
                  <div className="flex min-h-7 flex-wrap items-center gap-3">
                    {isFeaturedPaper ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[hsl(43_60%_70%_/_0.3)] bg-[hsl(43_74%_66%_/_0.08)] px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-[hsl(43_60%_75%)]">
                        <FileText aria-hidden="true" className="h-3 w-3" /> Featured
                      </span>
                    ) : null}
                    <span className="text-xs text-[hsl(326_55%_62%)]">
                      {selectedPaper.metadata.year}
                    </span>
                  </div>

                  <p className="mt-5 text-[0.62rem] uppercase leading-relaxed tracking-[0.18em] text-[hsl(326_50%_64%_/_0.9)]">
                    {selectedPaper.metadata.conference}
                  </p>
                  <h3 className="mt-4 font-serif text-2xl leading-[1.18] text-gradient-gold md:text-[1.7rem] lg:text-3xl">
                    {selectedPaper.metadata.title}
                  </h3>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {selectedPaper.metadata.authors.join(' · ')}
                  </p>
                  <p className="mt-6 text-sm leading-[1.75] text-foreground/80">
                    {getLandingSummary(selectedPaper)}
                  </p>
                  <a
                    href={selectedPaper.route}
                    className="mt-7 inline-flex items-center gap-1 text-sm font-medium text-[hsl(43_60%_75%)] transition-colors hover:text-[hsl(43_70%_85%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(326_65%_65%)] focus-visible:ring-offset-4 focus-visible:ring-offset-[hsl(262_45%_7%)]"
                  >
                    Read paper <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </a>
                </div>

                <figure className="mx-auto w-full max-w-[32rem]">
                  <div className="overflow-hidden rounded-xl border border-[hsl(43_60%_70%_/_0.3)] bg-[hsl(262_45%_7%_/_0.9)] p-2">
                    <div className="aspect-[4/3] overflow-hidden rounded-[0.6rem]">
                      <img
                        src={selectedPaper.hero.imageSrc}
                        alt={selectedPaper.hero.imageAlt}
                        width={selectedPaper.hero.imageWidth}
                        height={selectedPaper.hero.imageHeight}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </figure>
              </motion.div>
            </AnimatePresence>
          </article>
        </Reveal>

        <Reveal delay={0.14} className="mt-5">
          <div className="mb-3 hidden justify-end gap-2 lg:flex">
            <button
              type="button"
              aria-label="Show previous research paper"
              disabled={isAtRailStart}
              onClick={() => dispatch({ type: 'previous' })}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[hsl(43_60%_70%_/_0.22)] bg-[hsl(262_45%_8%_/_0.72)] text-[hsl(43_60%_75%)] transition-colors hover:border-[hsl(43_60%_70%_/_0.4)] hover:bg-[hsl(262_45%_12%_/_0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(326_65%_65%)] disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Show next research paper"
              disabled={isAtRailEnd}
              onClick={() => dispatch({ type: 'next' })}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[hsl(43_60%_70%_/_0.22)] bg-[hsl(262_45%_8%_/_0.72)] text-[hsl(43_60%_75%)] transition-colors hover:border-[hsl(43_60%_70%_/_0.4)] hover:bg-[hsl(262_45%_12%_/_0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(326_65%_65%)] disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>

          <div
            aria-label="Research paper selector"
            className="research-selector-viewport snap-x snap-mandatory overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-hidden lg:pb-0"
          >
            <div
              data-rail-start={showcaseState.railStartIndex}
              className="research-selector-track flex gap-4"
            >
              {LANDING_RESEARCH_PAPERS.map((paper) => {
                const isSelected = paper.slug === selectedPaper.slug;

                return (
                  <button
                    key={paper.slug}
                    type="button"
                    aria-pressed={isSelected}
                    aria-controls="selected-research-paper"
                    onClick={() => dispatch({ type: 'select', slug: paper.slug })}
                    className={`group relative flex min-h-[13.5rem] flex-[0_0_82%] snap-start flex-col overflow-hidden rounded-xl border border-[hsl(43_60%_70%_/_0.14)] bg-[hsl(262_45%_8%_/_0.72)] text-left transition-colors hover:border-[hsl(43_60%_70%_/_0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(326_65%_65%)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(262_45%_5%)] sm:flex-basis-[48%] ${
                      isSelected
                        ? 'before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-0.5 before:bg-[hsl(326_65%_65%)]'
                        : ''
                    }`}
                  >
                    <img
                      src={paper.hero.imageSrc}
                      alt=""
                      width={paper.hero.imageWidth}
                      height={paper.hero.imageHeight}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/8] w-full object-cover"
                    />
                    <span className="flex flex-1 flex-col px-5 pb-5 pt-4">
                      <span className="text-[0.62rem] uppercase tracking-[0.18em] text-[hsl(326_55%_65%)]">
                        {paper.metadata.year}
                      </span>
                      <span className="mt-2 font-serif text-base leading-snug text-[hsl(43_48%_82%)]">
                        {paper.metadata.title}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-10 max-w-xl text-center text-xs leading-relaxed text-[hsl(326_50%_58%_/_0.7)]">
            Ignoring centuries of scientific consensus since 2026. Our h-index is
            calculated using a formula we are not at liberty to share.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
