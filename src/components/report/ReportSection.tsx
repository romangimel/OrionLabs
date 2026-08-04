import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ReportSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

/**
 * Provides the shared editorial rhythm and heading hierarchy for major report
 * chapters while allowing each chapter to own its most useful internal layout.
 */
export function ReportSection({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  contentClassName,
}: ReportSectionProps) {
  return (
    <section
      aria-labelledby={`${id}-title`}
      className={cn(
        'relative border-t border-[hsl(43_60%_70%_/_0.1)] px-5 py-14 sm:px-8 sm:py-16 md:px-12 lg:px-16 lg:py-20',
        className,
      )}
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-14">
        <header>
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-[hsl(326_55%_68%)]">
            {eyebrow}
          </p>
          <h2
            id={`${id}-title`}
            className="mt-3 max-w-xl font-serif text-3xl leading-[1.08] text-gradient-gold sm:text-4xl md:text-[2.65rem]"
          >
            {title}
          </h2>
          {description && (
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              {description}
            </p>
          )}
        </header>

        <div className={cn('min-w-0', contentClassName)}>{children}</div>
      </div>
    </section>
  );
}
