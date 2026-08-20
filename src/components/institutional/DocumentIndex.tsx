import { useEffect, useState } from 'react';
import type { DocumentIndexItem } from '@/data/institutional-content';

interface DocumentIndexProps {
  items: readonly DocumentIndexItem[];
  label?: string;
}

/** Sticky desktop index paired with an in-flow native mobile disclosure. */
export function DocumentIndex({
  items,
  label = 'On this page',
}: DocumentIndexProps) {
  const [activeSectionId, setActiveSectionId] = useState(items[0]?.id ?? '');

  useEffect(() => {
    const sections = items
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length || !('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveSectionId(visibleEntry.target.id);
        }
      },
      { rootMargin: '-18% 0px -72% 0px' },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  const links = items.map(({ id, label: itemLabel }, index) => (
    <li key={id}>
      <a
        href={`#${id}`}
        aria-current={activeSectionId === id ? 'location' : undefined}
        className={`flex items-start gap-3 rounded-sm text-sm leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.7)] ${
          activeSectionId === id
            ? 'text-[hsl(43_60%_78%)]'
            : 'text-muted-foreground/72 hover:text-foreground'
        }`}
      >
        <span className="font-mono text-[0.62rem] text-[hsl(326_50%_68%)]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span>{itemLabel}</span>
      </a>
    </li>
  ));

  return (
    <>
      <details className="mb-10 rounded-2xl border border-[hsl(43_60%_70%_/_0.14)] bg-[hsl(262_48%_6%_/_0.62)] p-5 backdrop-blur-lg xl:hidden">
        <summary className="cursor-pointer text-sm font-medium text-[hsl(43_60%_76%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.7)]">
          {label}
        </summary>
        <nav aria-label={label} className="mt-5 border-t border-[hsl(43_60%_70%_/_0.1)] pt-5">
          <ol className="grid gap-3 sm:grid-cols-2">{links}</ol>
        </nav>
      </details>

      <nav
        aria-label={label}
        className="hidden xl:sticky xl:top-24 xl:block xl:self-start"
      >
        <div className="border-l border-[hsl(43_60%_70%_/_0.16)] pl-5">
          <p className="text-[0.6rem] font-medium uppercase tracking-[0.22em] text-[hsl(43_60%_72%)]">
            {label}
          </p>
          <ol className="mt-5 space-y-3">{links}</ol>
        </div>
      </nav>
    </>
  );
}
