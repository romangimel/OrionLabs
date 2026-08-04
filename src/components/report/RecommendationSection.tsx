import { ArrowUpRight } from 'lucide-react';
import type { OrionReport } from '@/data/report';
import { ReportSection } from './ReportSection';

interface RecommendationSectionProps {
  recommendation: OrionReport['recommendedAction'];
}

/** Presents the report's recommendation as a conclusion, not an interactive CTA. */
export function RecommendationSection({ recommendation }: RecommendationSectionProps) {
  return (
    <ReportSection
      id="recommended-action"
      eyebrow="Recommended action"
      title={recommendation.title}
      description="The highest-leverage intervention identified by the current celestial model."
    >
      <div className="relative overflow-hidden rounded-2xl border border-[hsl(43_60%_70%_/_0.18)] bg-[hsl(43_74%_66%_/_0.055)] p-6 sm:p-8">
        <ArrowUpRight
          aria-hidden="true"
          className="absolute right-5 top-5 h-6 w-6 text-[hsl(43_60%_72%)] sm:right-7 sm:top-7"
          strokeWidth={1.5}
        />
        <p className="max-w-2xl pr-7 text-base leading-[1.85] text-foreground/90 sm:text-lg">
          {recommendation.description}
        </p>
        <p className="mt-6 border-t border-[hsl(43_60%_70%_/_0.12)] pt-4 text-xs uppercase tracking-[0.18em] text-[hsl(326_55%_68%)]">
          Priority classification · Immediate but composed
        </p>
      </div>
    </ReportSection>
  );
}
