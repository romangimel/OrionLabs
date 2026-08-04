import { Telescope } from 'lucide-react';
import type { OrionReport } from '@/data/report';
import { ReportSection } from './ReportSection';

interface CurrentLifeSectionProps {
  analysis: OrionReport['currentLifeAnalysis'];
}

/** Gives the mock focus area and its forecast one connected, prominent chapter. */
export function CurrentLifeSection({ analysis }: CurrentLifeSectionProps) {
  return (
    <ReportSection
      id="current-life"
      eyebrow={`Current focus · ${analysis.focusArea}`}
      title={analysis.headline}
      description="Near-term operating conditions derived from the subject's selected area of attention."
    >
      <p className="text-base leading-[1.85] text-foreground/85 sm:text-lg">
        {analysis.analysis}
      </p>

      <aside className="relative mt-8 overflow-hidden rounded-2xl border border-[hsl(43_60%_70%_/_0.16)] bg-[linear-gradient(135deg,hsl(43_74%_66%_/_0.08),hsl(280_55%_16%_/_0.22))] p-5 sm:p-7">
        <div aria-hidden="true" className="absolute -right-16 -top-20 h-44 w-44 rounded-full bg-[hsl(326_80%_50%_/_0.12)] blur-[64px]" />
        <div className="relative flex items-center gap-3">
          <Telescope aria-hidden="true" className="h-5 w-5 text-[hsl(43_60%_72%)]" strokeWidth={1.5} />
          <h3 className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-[hsl(43_60%_72%)]">
            Six-week forecast
          </h3>
        </div>
        <p className="relative mt-4 font-serif text-2xl leading-snug text-foreground sm:text-3xl">
          {analysis.forecast}
        </p>
      </aside>
    </ReportSection>
  );
}
