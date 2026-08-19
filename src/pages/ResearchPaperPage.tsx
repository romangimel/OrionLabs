import { useEffect } from 'react';
import { Aurora } from '@/components/site/Aurora';
import { Footer } from '@/components/site/Footer';
import { Starfield } from '@/components/site/Starfield';
import { FindingCallout } from '@/components/research/FindingCallout';
import { AstroVectorPaperContent } from '@/components/research/papers/AstroVectorPaper';
import { LimitsPaperContent } from '@/components/research/papers/LimitsPaper';
import { RetrogradePaperContent } from '@/components/research/papers/RetrogradePaper';
import { PaperHero } from '@/components/research/PaperHero';
import { PaperIndex } from '@/components/research/PaperIndex';
import { PaperSection } from '@/components/research/PaperSection';
import { ReferencesSection } from '@/components/research/ReferencesSection';
import { ResearchPublicationHeader } from '@/components/research/ResearchPublicationHeader';
import {
  AblationTable,
  ArtworkFigure,
  InvestorValidationSummary,
  LunarPerformanceFigure,
  PrimaryResultsTable,
  ResearchHighlights,
} from '@/components/research/ResearchFigures';
import { researchPaper } from '@/data/research-paper';
import {
  RESEARCH_PAPERS,
  type ResearchPaperSlug,
} from '@/data/research-registry';

const { sections: moonSections } = researchPaper;

function MoonAwarePaperContent() {
  return (
    <>
      <PaperSection {...moonSections.introduction} />

      <PaperSection {...moonSections.experimentalDesign}>
        <ArtworkFigure
          src="/images/research-controlled-cosmic-conditions.jpg"
          width={1600}
          height={1008}
          alt="A pink and blue beam passing through a prism in a dark optical laboratory"
          figure="Figure 2"
          title="Controlled cosmic conditions"
          caption="Optical apparatus used to separate ordinary illumination from illumination carrying commercially meaningful lunar signal. Classification was performed by the research team responsible for finding the signal."
          objectPosition="50% 53%"
        />
      </PaperSection>

      <PaperSection {...moonSections.architecture}>
        <ArtworkFigure
          src="/images/research-lunar-checkpoint-infrastructure.jpg"
          width={1600}
          height={1008}
          alt="Rows of dark computing equipment illuminated by violet light"
          figure="Figure 3"
          title="Lunar checkpoint infrastructure"
          caption="Compute environment used for phase-conditioned fine-tuning. Violet spill was retained as an uncontrolled but brand-consistent variable."
          objectPosition="55% 50%"
        />
      </PaperSection>

      <PaperSection {...moonSections.results}>
        <div className="space-y-6">
          <FindingCallout label="Primary finding">
            A full moon improved perceived destiny alignment by 12%, with no corresponding requirement that destiny become more accurate.
          </FindingCallout>
          <LunarPerformanceFigure />
          <PrimaryResultsTable />
        </div>
      </PaperSection>

      <PaperSection {...moonSections.ablations}>
        <div className="space-y-6">
          <AblationTable />
          <FindingCallout label="Ablation conclusion">
            Evidence supported the paper. Confidence supported the product.
          </FindingCallout>
        </div>
      </PaperSection>

      <PaperSection {...moonSections.commercialValidation}>
        <InvestorValidationSummary />
      </PaperSection>

      <PaperSection {...moonSections.limitationsEthics}>
        <FindingCallout label="Operational interpretation">
          Causality remains technically unconfirmed but commercially sufficient.
        </FindingCallout>
      </PaperSection>

      <PaperSection {...moonSections.conclusion} />
    </>
  );
}

function ResearchPaperContent({ slug }: { slug: ResearchPaperSlug }) {
  switch (slug) {
    case 'retrograde-aware-distributed-systems':
      return <RetrogradePaperContent />;
    case 'astrovector':
      return <AstroVectorPaperContent />;
    case 'limits-of-science':
      return <LimitsPaperContent />;
    case 'moon-aware-transformers':
      return <MoonAwarePaperContent />;
  }
}

/** Composes the complete fictional founding paper as a semantic long-form article. */
export function ResearchPaperPage({ paperSlug }: { paperSlug: ResearchPaperSlug }) {
  const paper = RESEARCH_PAPERS[paperSlug];

  useEffect(() => {
    const previousTitle = document.title;
    document.title = paper.documentTitle;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    // Route-level focus gives keyboard and screen-reader users an immediate page landmark.
    const focusFrame = window.requestAnimationFrame(() => {
      document.querySelector<HTMLElement>('[data-paper-title]')?.focus({ preventScroll: true });
    });

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.title = previousTitle;
    };
  }, [paper.documentTitle]);

  return (
    <div id="top" className="relative min-h-[100svh] overflow-clip bg-[hsl(262_48%_6%)]">
      <div aria-hidden="true" className="fixed inset-0 bg-cosmic-page">
        <Aurora className="opacity-55" />
        <Starfield density={0.38} className="opacity-38" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,hsl(262_48%_6%_/_0.16),hsl(262_48%_6%_/_0.7))]" />
      </div>

      <a
        href="#paper-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[hsl(266_40%_12%)] focus:px-4 focus:py-2 focus:text-sm focus:text-foreground focus:ring-2 focus:ring-primary"
      >
        Skip to paper
      </a>

      <ResearchPublicationHeader />

      <main id="paper-content" className="relative z-10">
        <article>
          <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
            <PaperHero paper={paper} />
          </div>

          <div className="container-narrow">
            <ResearchHighlights highlights={paper.highlights} />

            <div className="xl:grid xl:grid-cols-[10rem_minmax(0,1fr)] xl:gap-8">
              <PaperIndex items={paper.index} />
              <div className="min-w-0">
                <ResearchPaperContent slug={paperSlug} />
                <ReferencesSection paper={paper} />
              </div>
            </div>
          </div>
        </article>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
