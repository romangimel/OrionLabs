import { Logo } from '@/components/site/Logo';

interface ClosingVerdictProps {
  subjectName: string;
  verdict: string;
}

/** Delivers the final branded assessment as the report's visual payoff. */
export function ClosingVerdict({ subjectName, verdict }: ClosingVerdictProps) {
  return (
    <section
      aria-labelledby="closing-verdict-title"
      className="relative overflow-hidden border-t border-[hsl(43_60%_70%_/_0.12)] px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-16 lg:py-24"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,hsl(326_80%_48%_/_0.18),transparent_58%)]" />
      <div className="relative mx-auto max-w-4xl text-center">
        <Logo className="mx-auto h-11 w-11 drop-shadow-[0_0_18px_hsl(43_74%_66%_/_0.32)]" />
        <p className="mt-6 text-[0.68rem] font-medium uppercase tracking-[0.26em] text-[hsl(43_60%_72%)]">
          OrionLabs final verdict
        </p>
        <h2 id="closing-verdict-title" className="mt-4 font-serif text-3xl text-foreground sm:text-4xl">
          Assessment complete for {subjectName}
        </h2>
        <p className="mt-7 font-serif text-3xl leading-[1.22] text-gradient-cosmic sm:text-4xl md:text-5xl">
          {verdict}
        </p>
        <div aria-hidden="true" className="mx-auto mt-9 h-px w-24 bg-gradient-to-r from-transparent via-[hsl(43_60%_70%_/_0.65)] to-transparent" />
        <p className="mt-5 text-xs tracking-wide text-muted-foreground/65">
          DeepConstellation™ · Scientifically adjacent since 2026
        </p>
      </div>
    </section>
  );
}
