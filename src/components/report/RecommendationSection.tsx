import { ArrowUpRight } from 'lucide-react';
import type { OrionReport } from '@/data/report';
import type { OrbitalProfileData } from '@/lib/orbital-profile';
import { ReportSection } from './ReportSection';

interface RecommendationSectionProps {
  recommendation: OrionReport['recommendedAction'];
  profile: OrbitalProfileData;
}

/** Presents the recommendation as the report's directive chapter. */
export function RecommendationSection({
  recommendation,
  profile,
}: RecommendationSectionProps) {
  return (
    <ReportSection
      id="recommended-action"
      chapter="05"
      eyebrow="Recommended action"
      title={recommendation.title}
      description="The highest-leverage intervention identified by the current celestial model."
      profile={profile}
    >
      <div className="relative overflow-hidden border-y border-[hsl(43_60%_70%_/_0.18)] bg-[linear-gradient(90deg,hsl(43_74%_66%_/_0.06),transparent)] px-5 py-7 sm:px-7 sm:py-8">
        <ArrowUpRight
          aria-hidden="true"
          className="absolute right-5 top-6 h-6 w-6 text-[hsl(43_60%_72%)] sm:right-7 sm:top-7"
          strokeWidth={1.5}
        />
        <p className="max-w-2xl pr-7 text-base leading-[1.85] text-foreground/90 sm:text-lg">
          {recommendation.description}
        </p>
        <p className="mt-6 border-t border-[hsl(43_60%_70%_/_0.12)] pt-4 text-[0.65rem] uppercase tracking-[0.18em] text-[hsl(326_55%_68%)]">
          Priority classification · Immediate but composed
        </p>
      </div>
    </ReportSection>
  );
}
