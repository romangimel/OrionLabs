import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface InstitutionalSectionProps {
  id: string;
  eyebrow?: string;
  title: string;
  number?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

/** Semantic anchored section with consistent heading and scroll-offset behavior. */
export function InstitutionalSection({
  id,
  eyebrow,
  title,
  number,
  children,
  className,
  contentClassName,
}: InstitutionalSectionProps) {
  const headingId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(
        'scroll-mt-24 border-t border-[hsl(43_60%_70%_/_0.12)] py-14 sm:py-16 md:py-20',
        className,
      )}
    >
      <header className="grid gap-4 md:grid-cols-[7rem_minmax(0,1fr)] md:gap-8">
        <p className="flex items-center gap-3 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/55">
          <span className="text-[hsl(43_60%_72%)]">{number ?? '·'}</span>
          <span aria-hidden="true" className="h-px w-7 bg-[hsl(43_60%_70%_/_0.42)]" />
        </p>
        <div>
          {eyebrow ? (
            <p className="text-[0.64rem] font-medium uppercase tracking-[0.22em] text-[hsl(326_55%_68%)]">
              {eyebrow}
            </p>
          ) : null}
          <h2
            id={headingId}
            tabIndex={-1}
            data-institutional-heading
            className="mt-2 max-w-3xl font-serif text-3xl leading-[1.08] text-gradient-gold outline-none sm:text-4xl md:text-[2.75rem]"
          >
            {title}
          </h2>
        </div>
      </header>

      <div className={cn('mt-8 min-w-0 md:ml-[9rem] md:mt-10', contentClassName)}>
        {children}
      </div>
    </section>
  );
}
