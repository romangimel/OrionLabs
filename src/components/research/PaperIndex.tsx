const INDEX_ITEMS = [
  ['01', 'Introduction', '#introduction'],
  ['03', 'Methodology', '#methodology'],
  ['05', 'Architecture', '#architecture'],
  ['06', 'Results', '#results'],
  ['07', 'Ablations', '#ablations'],
  ['09', 'Investor validation', '#investor-validation'],
  ['10', 'Limitations', '#limitations'],
  ['11', 'Commercial implications', '#commercial-implications'],
  ['14', 'References', '#references'],
] as const;

/** Slim desktop index; mobile readers retain the numbered section hierarchy. */
export function PaperIndex() {
  return (
    <nav
      aria-label="Paper sections"
      className="hidden xl:block xl:self-start xl:pt-20"
    >
      <div className="sticky top-8 border-l border-[hsl(43_60%_70%_/_0.14)] pl-5">
        <p className="text-[0.58rem] font-medium uppercase tracking-[0.22em] text-[hsl(43_60%_72%)]">
          Paper index
        </p>
        <ol className="mt-5 space-y-3">
          {INDEX_ITEMS.map(([number, label, href]) => (
            <li key={href}>
              <a
                href={href}
                className="group flex items-start gap-3 text-[0.68rem] leading-snug text-muted-foreground/65 transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.7)]"
              >
                <span className="text-[hsl(326_50%_68%)]">{number}</span>
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
