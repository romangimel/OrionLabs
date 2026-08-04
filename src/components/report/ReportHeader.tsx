import { ShieldCheck } from 'lucide-react';
import type { OrionReport } from '@/data/report';
import { FadeIn } from '@/components/site/Motion';

interface ReportHeaderProps {
  subject: OrionReport['subject'];
}

/** Establishes the report as a distinct, generated product stage. */
export function ReportHeader({ subject }: ReportHeaderProps) {
  return (
    <header className="relative pb-14 pt-16 sm:pb-16 sm:pt-20 md:pb-20 md:pt-24">
      <FadeIn>
        <div className="flex flex-wrap items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[hsl(43_60%_72%)]">
          <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(43_60%_70%_/_0.2)] bg-[hsl(43_74%_66%_/_0.06)] px-3 py-1.5">
            <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
            Generated analysis
          </span>
          <span className="text-muted-foreground/65">Personal intelligence brief</span>
        </div>
      </FadeIn>

      <FadeIn delay={0.08} duration={1.05}>
        <h1 className="mt-8 max-w-5xl font-serif text-[clamp(2.8rem,7vw,5.7rem)] leading-[0.96] tracking-[-0.025em]">
          Celestial operating report
          <span className="mt-2 block text-gradient-gold">for {subject.name}</span>
        </h1>
      </FadeIn>

      <FadeIn delay={0.16}>
        <div className="mt-8 flex flex-col gap-5 border-l border-[hsl(43_60%_70%_/_0.35)] pl-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:pl-7">
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            A synthesized assessment of behavioral momentum, recurring patterns, and the
            operational implications of current planetary positioning.
          </p>
          <div className="shrink-0 sm:text-right">
            <p className="text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground/65">
              Primary sign
            </p>
            <p className="mt-1 font-serif text-2xl text-foreground sm:text-3xl">
              {subject.zodiacSign}
            </p>
          </div>
        </div>
      </FadeIn>
    </header>
  );
}
