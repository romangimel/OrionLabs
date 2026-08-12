import { Telescope } from 'lucide-react';
import type { OrionReport } from '@/data/report';
import { ReportSection } from './ReportSection';

interface CurrentLifeSectionProps {
  analysis: OrionReport['currentLifeAnalysis'];
}

/** Gives the focus area a reversed, evidence-led chapter composition. */
export function CurrentLifeSection({ analysis }: CurrentLifeSectionProps) {
  return (
    <ReportSection
      id="current-life"
      chapter="03"
      eyebrow={`Current focus · ${analysis.focusArea}`}
      title={analysis.headline}
      description="Near-term operating conditions derived from the subject's selected area of attention."
      layout="reverse"
      surface="panel"
      contentClassName="lg:contents"
    >
      <p className="text-base leading-[1.85] text-foreground/85 sm:text-lg lg:order-1">
        {analysis.analysis}
      </p>

      <aside className="relative mt-8 overflow-hidden border-l border-[hsl(43_60%_70%_/_0.38)] bg-[linear-gradient(90deg,hsl(43_74%_66%_/_0.07),transparent_75%)] px-5 py-5 sm:px-7 sm:py-6 lg:order-3 lg:col-span-2">
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-20 h-44 w-44 rounded-full bg-[hsl(326_80%_50%_/_0.12)] blur-[64px]"
        />
        <div className="relative flex items-center gap-3">
          <Telescope
            aria-hidden="true"
            className="h-5 w-5 text-[hsl(43_60%_72%)]"
            strokeWidth={1.5}
          />
          <h3 className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-[hsl(43_60%_72%)]">
            Six-week forecast
          </h3>
        </div>
        <p className="relative mt-4 max-w-4xl font-serif text-2xl leading-snug text-gradient-cosmic sm:text-3xl">
          {analysis.forecast}
        </p>
      </aside>
    </ReportSection>
  );
}
