import { useReducer } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, FileText } from 'lucide-react';
import {
  INITIAL_RESEARCH_SHOWCASE_STATE,
  LANDING_RESEARCH_PAPERS,
  researchShowcaseReducer,
} from '@/data/research-showcase';
import { Reveal } from './Motion';
import { SectionHeading } from './SectionHeading';
import { BackgroundGlow } from './shared/BackgroundGlow';

const DESKTOP_VISIBLE_PAPER_COUNT = 3;

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

  function selectPaper(slug: string) {
    dispatch({ type: 'select', slug });

    // Desktop selection should feel like an in-place content swap. On smaller
    // screens, re-align only when the featured panel has mostly left the viewport.
    if (window.matchMedia('(min-width: 1024px)').matches) {
      return;
    }

    const featuredPanel = document.getElementById('selected-research-paper');
    if (!featuredPanel) {
      return;
    }

    const panelBounds = featuredPanel.getBoundingClientRect();
    const viewportTop = 96;
    const usableViewportHeight = Math.max(window.innerHeight - viewportTop, 0);
    const visiblePanelHeight = Math.max(
      0,
      Math.min(panelBounds.bottom, window.innerHeight) -
        Math.max(panelBounds.top, viewportTop),
    );
    const substantialVisibilityThreshold = Math.min(
      panelBounds.height * 0.4,
      usableViewportHeight * 0.5,
    );

    if (visiblePanelHeight >= substantialVisibilityThreshold) {
      return;
    }

    featuredPanel.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  }

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
            className="relative scroll-mt-24 overflow-hidden rounded-2xl glass-strong p-6 sm:p-8 md:min-h-[42rem] md:p-10 lg:min-h-[34rem]"
          >
            <BackgroundGlow className="-right-20 -top-20 h-48 w-48 rounded-full bg-[hsl(315_80%_58%_/_0.22)] blur-3xl" />
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={selectedPaper.slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.24, ease: 'easeOut' }}
                className="relative z-10 grid min-h-full gap-9 md:min-h-[37rem] md:grid-cols-[minmax(0,1.08fr)_minmax(16rem,0.92fr)] md:items-stretch md:gap-8 lg:min-h-[29rem] lg:grid-cols-[minmax(0,1.12fr)_minmax(22rem,0.88fr)] lg:gap-10"
              >
                <div className="min-w-0 md:max-w-[26rem] lg:max-w-[28rem]">
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

                  <h3 className="mt-5 font-serif text-[1.6rem] leading-[1.18] text-gradient-gold md:text-[1.85rem] lg:text-[2.1rem]">
                    {selectedPaper.metadata.title}
                  </h3>
                  <p className="mt-4 text-sm text-muted-foreground md:text-base">
                    {selectedPaper.metadata.authors.join(' · ')}
                  </p>
                  <p className="mt-6 text-sm leading-[1.75] text-foreground/80 md:text-base md:leading-[1.7]">
                    {selectedPaper.summary}
                  </p>
                </div>

                <div className="flex min-w-0 flex-col">
                  <p className="text-right text-[0.68rem] uppercase leading-relaxed tracking-[0.18em] text-[hsl(326_50%_64%_/_0.9)]">
                    {selectedPaper.metadata.conference}
                  </p>
                  <figure className="mx-auto mt-4 w-full max-w-[32rem]">
                    <div className="overflow-hidden rounded-xl border border-[hsl(43_60%_70%_/_0.3)] bg-[hsl(262_45%_7%_/_0.9)] p-2">
                      <div className="aspect-[4/3] overflow-hidden rounded-[0.6rem]">
                        <img
                          src={selectedPaper.hero.imageSrc}
                          alt={selectedPaper.hero.imageAlt}
                          width={selectedPaper.hero.imageWidth}
                          height={selectedPaper.hero.imageHeight}
                          loading="lazy"
                          decoding="async"
                          className={`h-full w-full object-cover object-center ${
                            selectedPaper.slug === 'moon-aware-transformers'
                              ? 'scale-[1.12]'
                              : ''
                          }`}
                        />
                      </div>
                    </div>
                  </figure>
                  <a
                    href={selectedPaper.route}
                    className="mt-auto inline-flex self-end items-center gap-1 pt-6 text-sm font-medium text-[hsl(43_60%_75%)] transition-colors hover:text-[hsl(43_70%_85%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(326_65%_65%)] focus-visible:ring-offset-4 focus-visible:ring-offset-[hsl(262_45%_7%)]"
                  >
                    Read paper <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </article>
        </Reveal>

        <Reveal delay={0.14} className="mt-3">
          <div className="relative">
            {!isAtRailStart ? (
              <button
                type="button"
                aria-label="Show previous research paper"
                onClick={() => dispatch({ type: 'previous' })}
                className="absolute left-0 top-1/2 z-20 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[hsl(43_60%_70%_/_0.3)] bg-[hsl(262_45%_8%_/_0.78)] text-[hsl(43_74%_66%)] shadow-[0_12px_30px_-16px_hsl(255_80%_2%_/_0.95)] backdrop-blur-md transition-[border-color,background-color,color] hover:border-[hsl(43_60%_70%_/_0.48)] hover:bg-[hsl(262_45%_11%_/_0.86)] hover:text-[hsl(43_70%_80%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(326_65%_65%)] lg:inline-flex"
              >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              </button>
            ) : null}

            {!isAtRailEnd ? (
              <button
                type="button"
                aria-label="Show next research paper"
                onClick={() => dispatch({ type: 'next' })}
                className="absolute right-0 top-1/2 z-20 hidden h-10 w-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[hsl(43_60%_70%_/_0.3)] bg-[hsl(262_45%_8%_/_0.78)] text-[hsl(43_74%_66%)] shadow-[0_12px_30px_-16px_hsl(255_80%_2%_/_0.95)] backdrop-blur-md transition-[border-color,background-color,color] hover:border-[hsl(43_60%_70%_/_0.48)] hover:bg-[hsl(262_45%_11%_/_0.86)] hover:text-[hsl(43_70%_80%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(326_65%_65%)] lg:inline-flex"
              >
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </button>
            ) : null}

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
                      onClick={() => selectPaper(paper.slug)}
                      className={`group relative flex min-h-[13.5rem] flex-[0_0_82%] snap-start flex-col overflow-hidden rounded-xl border bg-[hsl(262_45%_8%_/_0.72)] text-left transition-[border-color,box-shadow] duration-300 hover:border-[hsl(43_60%_70%_/_0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(326_65%_65%)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(262_45%_5%)] sm:flex-basis-[48%] ${
                        isSelected
                          ? 'border-[hsl(326_65%_65%_/_0.48)] ring-1 ring-inset ring-[hsl(326_65%_65%_/_0.22)] shadow-[0_20px_46px_-28px_hsl(326_70%_65%_/_0.65)] before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-[3px] before:bg-[hsl(326_65%_65%)]'
                          : 'border-[hsl(43_60%_70%_/_0.14)]'
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
                        <span
                          className={`mt-2 font-serif text-base leading-snug ${
                            isSelected
                              ? 'text-gradient-gold'
                              : 'text-[hsl(43_48%_82%)]'
                          }`}
                        >
                          {paper.metadata.title}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
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
