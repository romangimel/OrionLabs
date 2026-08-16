import { CircleCheck, Orbit, Sparkles } from 'lucide-react';
import type { ReportInsight } from '@/data/report';
import { cn } from '@/lib/utils';

type InsightVariant = 'trait' | 'strength' | 'risk';

interface ReportInsightListProps {
  insights: ReportInsight[];
  variant: InsightVariant;
  labelledBy?: string;
}

const insightIcons = {
  trait: Orbit,
  strength: Sparkles,
  risk: CircleCheck,
};

/**
 * Keeps repeated report observations consistent while variant details provide
 * semantic distinction without relying on alarm colors.
 */
export function ReportInsightList({
  insights,
  variant,
  labelledBy,
}: ReportInsightListProps) {
  const Icon = insightIcons[variant];

  return (
    <ol aria-labelledby={labelledBy} className="divide-y divide-[hsl(43_60%_70%_/_0.1)]">
      {insights.map((insight, index) => (
        <li
          key={insight.title}
          className="grid grid-cols-[2.35rem_minmax(0,1fr)] gap-3.5 py-6 first:pt-0 last:pb-0 sm:grid-cols-[2.75rem_minmax(0,1fr)] sm:gap-4"
        >
          <div
            aria-hidden="true"
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-lg border sm:h-11 sm:w-11 sm:rounded-xl',
              variant === 'risk'
                ? 'border-[hsl(326_55%_68%_/_0.2)] bg-[hsl(326_70%_45%_/_0.07)] text-[hsl(326_55%_72%)]'
                : 'border-[hsl(43_60%_70%_/_0.16)] bg-[hsl(43_74%_66%_/_0.06)] text-[hsl(43_60%_72%)]',
            )}
          >
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
          </div>
          <div className="min-w-0">
            <div className="flex items-baseline justify-between gap-4">
              <h3
                className={cn(
                  'font-serif text-xl leading-tight sm:text-2xl',
                  variant === 'trait'
                    ? 'text-[hsl(326_55%_68%)]'
                    : 'text-foreground',
                )}
              >
                {insight.title}
              </h3>
              <span className="shrink-0 text-[0.62rem] tracking-[0.16em] text-muted-foreground/45">
                0{index + 1}
              </span>
            </div>
            <p className="mt-2 text-sm leading-[1.8] text-muted-foreground sm:text-base">
              {insight.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
