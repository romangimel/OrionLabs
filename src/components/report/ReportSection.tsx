import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ReportSectionLayout = 'split' | 'reverse' | 'stacked';
type ReportSectionSurface = 'none' | 'panel';

interface ReportSectionProps {
  id: string;
  chapter: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  layout?: ReportSectionLayout;
  surface?: ReportSectionSurface;
  className?: string;
  contentClassName?: string;
}

/**
 * Creates alternating report chapters without inventing a separate component
 * for every composition. Glass is opt-in so it remains evidence framing rather
 * than the default container for the entire document.
 */
export function ReportSection({
  id,
  chapter,
  eyebrow,
  title,
  description,
  children,
  layout = 'split',
  surface = 'none',
  className,
  contentClassName,
}: ReportSectionProps) {
  const isStacked = layout === 'stacked';
  const isReverse = layout === 'reverse';

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn(
        'relative overflow-hidden border-t border-[hsl(43_60%_70%_/_0.12)] py-14 sm:py-16 lg:py-20',
        surface === 'panel' &&
          'rounded-[1.75rem] border border-[hsl(43_60%_70%_/_0.13)] bg-[linear-gradient(135deg,hsl(280_55%_13%_/_0.44),hsl(262_50%_7%_/_0.32))] px-5 sm:px-8 md:px-10 lg:px-12',
        className,
      )}
    >
      <div
        className={cn(
          'relative grid gap-8',
          isStacked
            ? 'lg:gap-12'
            : 'lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-14',
        )}
      >
        <header className={cn(isReverse && 'lg:order-2 lg:pl-8')}>
          <div className="flex items-center gap-3 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/45">
            <span className="text-[hsl(43_60%_72%)]">{chapter}</span>
            <span aria-hidden="true" className="h-px w-7 bg-[hsl(43_60%_70%_/_0.4)]" />
            <span className="text-[hsl(326_55%_68%)]">{eyebrow}</span>
          </div>
          <h2
            id={`${id}-title`}
            className="mt-4 max-w-2xl font-serif text-3xl leading-[1.06] text-gradient-gold sm:text-4xl md:text-[2.7rem]"
          >
            {title}
          </h2>
          {description && (
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              {description}
            </p>
          )}
        </header>

        <div
          className={cn(
            'min-w-0',
            isReverse && 'lg:order-1',
            contentClassName,
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
