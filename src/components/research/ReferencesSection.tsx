import { Copy, ExternalLink } from 'lucide-react';
import { researchPaper } from '@/data/research-paper';

export function ReferencesSection() {
  const { metadata, references } = researchPaper;

  return (
    <section
      id="references"
      aria-labelledby="references-title"
      className="border-t border-[hsl(43_60%_70%_/_0.12)] py-14 sm:py-16 md:py-20"
    >
      <div className="grid gap-4 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-8">
        <p className="flex items-center gap-3 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/55">
          <span className="text-[hsl(43_60%_72%)]">14</span>
          <span aria-hidden="true" className="h-px w-7 bg-[hsl(43_60%_70%_/_0.42)]" />
        </p>
        <div>
          <p className="text-[0.64rem] font-medium uppercase tracking-[0.22em] text-[hsl(326_55%_68%)]">
            References
          </p>
          <h2 id="references-title" className="mt-3 font-serif text-4xl text-gradient-gold">
            Prior work of suitable alignment
          </h2>
        </div>
      </div>

      <ol className="mt-10 space-y-0 md:ml-40">
        {references.map((reference, index) => (
          <li
            key={reference.title}
            className="grid gap-3 border-t border-[hsl(43_60%_70%_/_0.08)] py-5 text-sm leading-relaxed sm:grid-cols-[2.2rem_minmax(0,1fr)]"
          >
            <span className="font-serif text-lg text-[hsl(43_60%_72%)]">{index + 1}.</span>
            <p className="max-w-[48rem] text-foreground/76">
              <span className="text-foreground/92">{reference.authors}</span>{' '}
              <span className="text-[hsl(326_50%_68%)]">({reference.year}).</span>{' '}
              <span className="font-medium text-foreground/88">{reference.title}.</span>{' '}
              <span className="text-muted-foreground">{reference.publication}</span>
            </p>
          </li>
        ))}
      </ol>

      <aside
        aria-labelledby="citation-title"
        className="mt-12 rounded-2xl border border-[hsl(43_60%_70%_/_0.14)] bg-[hsl(262_48%_6%_/_0.62)] p-5 sm:p-7 md:ml-40"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-[hsl(43_60%_72%)]">
              Citation metadata
            </p>
            <h3 id="citation-title" className="mt-2 font-serif text-2xl text-foreground">
              Cite this foundational result
            </h3>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[hsl(43_60%_70%_/_0.16)] px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
            <Copy aria-hidden="true" className="h-3.5 w-3.5" />
            Citation verified internally
          </span>
        </div>
        <p className="mt-5 max-w-4xl rounded-xl border border-[hsl(43_60%_70%_/_0.08)] bg-[hsl(280_45%_12%_/_0.4)] p-4 font-mono text-xs leading-relaxed text-foreground/72 sm:p-5">
          Selene, A., Nox, K., &amp; Vega, R. ({metadata.year}). {metadata.title}.{' '}
          <em>{metadata.conference}</em>. doi:{metadata.doi}
        </p>
      </aside>

      <div className="mt-14 rounded-[1.75rem] border border-[hsl(43_60%_70%_/_0.15)] bg-[linear-gradient(145deg,hsl(280_55%_13%_/_0.5),hsl(262_50%_6%_/_0.42))] px-5 py-12 text-center sm:px-8 sm:py-14 md:ml-40">
        <p className="text-[0.64rem] font-medium uppercase tracking-[0.22em] text-[hsl(43_60%_72%)]">
          Research translated
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl font-serif text-3xl leading-tight text-foreground sm:text-4xl">
          Experience the system this evidence was sufficient to create.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
          OrionLabs now operationalizes moon-aware intelligence through a calibrated personal analysis, pending the ordinary availability of the Moon.
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <a
            href="/questionnaire"
            className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#F5E6B0] to-[#C9A24A] px-7 text-sm font-semibold text-[#070514] shadow-[0_8px_30px_-6px_hsl(43_74%_66%_/_0.4)] transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.8)] focus-visible:ring-offset-4 focus-visible:ring-offset-[hsl(262_45%_7%)] motion-reduce:transform-none"
          >
            <span className="relative z-10">Run Your Analysis</span>
            <ExternalLink aria-hidden="true" className="relative z-10 h-4 w-4" strokeWidth={1.5} />
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>
          <a
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full border border-[hsl(43_60%_70%_/_0.25)] px-7 text-sm font-medium text-foreground/90 transition-colors hover:border-[hsl(43_60%_70%_/_0.5)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.7)] focus-visible:ring-offset-4 focus-visible:ring-offset-[hsl(262_45%_7%)]"
          >
            Return to OrionLabs
          </a>
        </div>
      </div>
    </section>
  );
}
