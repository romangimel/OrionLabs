import { ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/site/Logo';

/** Compact publication navigation that reuses the report page's subpage shell. */
export function ResearchPublicationHeader() {
  return (
    <header className="relative z-20 border-b border-[hsl(43_60%_70%_/_0.1)] bg-[hsl(262_45%_7%_/_0.66)] backdrop-blur-xl">
      <nav
        aria-label="Research publication navigation"
        className="container-narrow flex h-16 items-center justify-between gap-4 md:h-20"
      >
        <a
          href="/"
          className="group flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.7)] focus-visible:ring-offset-4 focus-visible:ring-offset-[hsl(262_45%_7%)]"
          aria-label="Return to OrionLabs home"
        >
          <Logo className="h-8 w-8 sm:h-9 sm:w-9" />
          <span className="font-serif text-xl tracking-tight text-foreground sm:text-2xl">
            Orion<span className="text-gradient-gold">Labs</span>
          </span>
        </a>

        <a
          href="/#research"
          className="inline-flex min-h-11 items-center gap-2 rounded-full px-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.7)] focus-visible:ring-offset-4 focus-visible:ring-offset-[hsl(262_45%_7%)] sm:text-sm"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
          <span className="hidden sm:inline">Research index</span>
          <span className="sm:hidden">Research</span>
        </a>
      </nav>
    </header>
  );
}
