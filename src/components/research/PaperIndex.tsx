import { useEffect, useState } from 'react';

const INDEX_ITEMS = [
  ['01', 'Introduction', 'introduction'],
  ['02', 'Experimental design', 'experimental-design'],
  ['03', 'Model architecture', 'architecture'],
  ['04', 'Results', 'results'],
  ['05', 'Ablation studies', 'ablations'],
  ['06', 'Commercial validation', 'investor-validation'],
  ['07', 'Limitations and ethics', 'limitations'],
  ['08', 'Conclusion', 'conclusion'],
  ['09', 'References', 'references'],
] as const;

/** Persistent desktop index that highlights the section crossing the reading line. */
export function PaperIndex() {
  const [activeSectionId, setActiveSectionId] = useState<string>(INDEX_ITEMS[0][2]);

  useEffect(() => {
    const sectionElements = INDEX_ITEMS.map(([, , id]) =>
      document.getElementById(id),
    ).filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);

        if (visibleEntry) {
          setActiveSectionId(visibleEntry.target.id);
        }
      },
      // The narrow observation band follows the upper third of the viewport,
      // which is where a section becomes the reader's primary context.
      { rootMargin: '-24% 0px -70% 0px' },
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Paper sections"
      className="hidden xl:sticky xl:top-4 xl:block xl:self-start xl:pt-20"
    >
      <div className="border-l border-[hsl(43_60%_70%_/_0.14)] pl-5">
        <p className="text-[0.58rem] font-medium uppercase tracking-[0.22em] text-[hsl(43_60%_72%)]">
          Paper index
        </p>
        <ol className="mt-5 space-y-2.5">
          {INDEX_ITEMS.map(([number, label, id]) => {
            const isActive = activeSectionId === id;

            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={`group flex items-start gap-3 text-[0.68rem] leading-snug transition-colors focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.7)] ${
                    isActive ? '' : 'text-muted-foreground/65 hover:text-foreground'
                  }`}
                >
                  <span
                    className={
                      isActive ? 'text-gradient-gold' : 'text-[hsl(326_50%_68%)]'
                    }
                  >
                    {number}
                  </span>
                  <span className={isActive ? 'text-gradient-gold' : undefined}>
                    {label}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
