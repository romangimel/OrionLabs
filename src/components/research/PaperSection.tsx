import type { ReactNode } from 'react';

interface PaperSectionProps {
  id: string;
  number: string;
  kicker: string;
  title: string;
  paragraphs: readonly string[];
  children?: ReactNode;
}

/** Readable numbered section used throughout the long-form research paper. */
export function PaperSection({
  id,
  number,
  kicker,
  title,
  paragraphs,
  children,
}: PaperSectionProps) {
  const headingId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="scroll-mt-8 border-t border-[hsl(43_60%_70%_/_0.12)] py-14 sm:py-16 md:py-20"
    >
      <header className="grid gap-4 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-8">
        <p className="flex items-center gap-3 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/55">
          <span className="text-[hsl(43_60%_72%)]">{number}</span>
          <span aria-hidden="true" className="h-px w-7 bg-[hsl(43_60%_70%_/_0.42)]" />
        </p>
        <div>
          <p className="text-[0.64rem] font-medium uppercase tracking-[0.22em] text-[hsl(326_55%_68%)]">
            {kicker}
          </p>
          <h2
            id={headingId}
            className="mt-3 max-w-3xl font-serif text-3xl leading-[1.08] text-gradient-gold sm:text-4xl md:text-[2.75rem]"
          >
            {title}
          </h2>
        </div>
      </header>

      <div className="mt-8 md:ml-40 md:mt-10">
        <div className="max-w-[46rem] space-y-5 text-[0.98rem] leading-[1.85] text-foreground/82 sm:text-[1.04rem]">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}
