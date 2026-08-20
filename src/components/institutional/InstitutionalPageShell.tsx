import { useEffect, type ReactNode } from 'react';
import { Aurora } from '@/components/site/Aurora';
import { Footer } from '@/components/site/Footer';
import { Starfield } from '@/components/site/Starfield';
import type { InstitutionalPageMetadata } from '@/data/institutional-content';
import { InstitutionalHeader } from './InstitutionalHeader';

interface InstitutionalPageShellProps {
  metadata: InstitutionalPageMetadata;
  children: ReactNode;
}

/**
 * Shared institutional page boundary for atmosphere, metadata, deep-link focus,
 * skip navigation, the neutral header, and the global footer.
 */
export function InstitutionalPageShell({
  metadata,
  children,
}: InstitutionalPageShellProps) {
  useEffect(() => {
    const previousTitle = document.title;
    const descriptionElement = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    const previousDescription = descriptionElement?.content;

    document.title = metadata.documentTitle;
    if (descriptionElement) {
      descriptionElement.content = metadata.description;
    }

    const focusFragmentTarget = (ensureScroll: boolean) => {
      const hash = window.location.hash.slice(1);
      if (!hash) {
        return;
      }

      const target = document.getElementById(decodeURIComponent(hash));
      if (!target) {
        return;
      }

      // Direct-load fragments can be resolved before React has rendered them.
      // Repeating the same native destination after render is not a top reset.
      if (ensureScroll) {
        target.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
      target
        .querySelector<HTMLElement>('[data-institutional-heading]')
        ?.focus({ preventScroll: true });
    };

    let isDisposed = false;
    let nestedFocusFrame = 0;
    const focusFrame = window.requestAnimationFrame(() => {
      nestedFocusFrame = window.requestAnimationFrame(() => focusFragmentTarget(true));
    });
    // The site loads its display fonts remotely. Their final metrics can shift a
    // long document after the browser's first fragment calculation, so align
    // the same target once more when the font set settles.
    void document.fonts?.ready.then(() => {
      if (!isDisposed) {
        window.requestAnimationFrame(() => focusFragmentTarget(true));
      }
    });
    const handleHashChange = () => {
      window.requestAnimationFrame(() => focusFragmentTarget(false));
    };
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      isDisposed = true;
      window.cancelAnimationFrame(focusFrame);
      window.cancelAnimationFrame(nestedFocusFrame);
      window.removeEventListener('hashchange', handleHashChange);
      document.title = previousTitle;
      if (descriptionElement && previousDescription !== undefined) {
        descriptionElement.content = previousDescription;
      }
    };
  }, [metadata]);

  return (
    <div id="top" className="relative min-h-[100svh] overflow-clip bg-[hsl(262_48%_6%)]">
      <div aria-hidden="true" className="fixed inset-0 bg-cosmic-page">
        <Aurora className="opacity-45" />
        <Starfield density={0.34} className="opacity-35" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,hsl(262_48%_6%_/_0.14),hsl(262_48%_6%_/_0.74))]" />
      </div>

      <a
        href="#institutional-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[hsl(266_40%_12%)] focus:px-4 focus:py-2 focus:text-sm focus:text-foreground focus:ring-2 focus:ring-primary"
      >
        Skip to content
      </a>

      <InstitutionalHeader pageLabel={metadata.pageLabel} />
      <main id="institutional-content" className="relative z-10">
        {children}
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
