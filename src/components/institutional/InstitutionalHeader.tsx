import { ArrowRight } from 'lucide-react';
import { Logo } from '@/components/site/Logo';
import { prepareNewAnalysisJourney } from '@/lib/analysis-session';

interface InstitutionalHeaderProps {
  pageLabel: string;
}

/** Neutral subpage navigation shared by Docs, Press, and Legal. */
export function InstitutionalHeader({ pageLabel }: InstitutionalHeaderProps) {
  return (
    <header className="relative z-30 border-b border-[hsl(43_60%_70%_/_0.1)] bg-[hsl(262_45%_7%_/_0.72)] backdrop-blur-xl">
      <nav
        aria-label={`${pageLabel} navigation`}
        className="container-narrow flex h-16 items-center justify-between gap-4 md:h-20"
      >
        <a
          href="/"
          aria-label="Return to OrionLabs home"
          className="group flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.7)] focus-visible:ring-offset-4 focus-visible:ring-offset-[hsl(262_45%_7%)]"
        >
          <Logo className="h-8 w-8 sm:h-9 sm:w-9" />
          <span className="font-serif text-xl tracking-tight text-foreground sm:text-2xl">
            Orion<span className="text-gradient-gold">Labs</span>
          </span>
        </a>

        <div className="flex items-center gap-3 sm:gap-5">
          <span className="hidden text-[0.62rem] font-medium uppercase tracking-[0.2em] text-muted-foreground/65 sm:inline">
            {pageLabel}
          </span>
          <a
            href="/questionnaire"
            onClick={prepareNewAnalysisJourney}
            className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-[hsl(43_60%_70%_/_0.24)] px-4 text-xs font-medium text-[hsl(43_60%_76%)] transition-colors hover:border-[hsl(43_60%_70%_/_0.48)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.7)] focus-visible:ring-offset-4 focus-visible:ring-offset-[hsl(262_45%_7%)] sm:px-5 sm:text-sm"
          >
            Begin Analysis
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
              strokeWidth={1.5}
            />
          </a>
        </div>
      </nav>
    </header>
  );
}
