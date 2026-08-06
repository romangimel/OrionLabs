import { Reveal, Stagger, StaggerItem } from './Motion';
import { SectionHeading } from './SectionHeading';
import { FileText, ArrowUpRight } from 'lucide-react';
import { BackgroundGlow } from './shared/BackgroundGlow';

interface Paper {
  title: string;
  authors: string;
  venue: string;
  year: string;
  abstract: string;
  featured?: boolean;
}

const PAPERS: Paper[] = [
  {
    title: 'Moon-Aware Transformers Outperform Baseline Models Under Controlled Cosmic Conditions',
    authors: 'Dr. A. Selene, Dr. K. Nox, R. Vega',
    venue: 'Proceedings of the International Conference on Celestial Computing',
    year: '2026',
    abstract:
      'Models trained during a full moon demonstrated superior horoscope generation, stronger emotional specificity, and a 12% increase in perceived destiny alignment. The findings remained robust across three random seeds, two astrologers, and one investor presentation, providing sufficient evidence for immediate commercial deployment.',
    featured: true,
  },
  {
    title: 'Towards a Unified Theory of Retrograde-Aware Distributed Systems',
    authors: 'Dr. K. Nox, M. Vance',
    venue: 'Journal of Probabilistic Infrastructure',
    year: '2026',
    abstract:
      'We propose that distributed consensus protocols can be improved by incorporating planetary aspects into the leader-election timeout. Paxos, but it reads its horoscope first.',
  },
  {
    title: 'AstroVector: Embedding Human Personality in 1,024 Dimensions of Celestial Noise',
    authors: 'Dr. A. Selene, S. Reyes',
    venue: 'Workshop on Unfalsifiable Machine Learning',
    year: '2025',
    abstract:
      'We introduce a 1,024-dimensional embedding space in which Capricorns cluster near the centroid for "owns multiple air fryers". We make no causal claim. We merely observe.',
  },
  {
    title: 'On the Statistical Significance of Statistically Significant Optimism',
    authors: 'R. Vega, Dr. K. Nox',
    venue: 'Bulletin of Post-Hoc Justifications',
    year: '2025',
    abstract:
      'A meta-analysis of our own marketing claims finds that 97.8% of them are, technically, not false. We conclude that this is sufficient.',
  },
];

export function Research() {
  const featured = PAPERS.find((p) => p.featured)!;
  const rest = PAPERS.filter((p) => !p.featured);

  return (
    <section id="research" className="relative overflow-hidden py-28 md:py-36">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Peer-Adjacent Research"
          title={
            <>
              <span className="text-gradient-gold">Our research has been</span>
              <br />
              <span className="text-foreground italic">described</span>{' '}
              <span className="text-foreground">as research.</span>
            </>
          }
          description="The following papers were reviewed by a panel of our own researchers, who confirmed the research was, in fact, research. External peer review is pending, indefinitely, due to Mercury."
        />

        {/* Featured paper */}
        <Reveal delay={0.1} className="mt-16">
          <article className="group relative overflow-hidden rounded-2xl glass-strong p-8 md:p-10">
            <BackgroundGlow className="-right-20 -top-20 h-48 w-48 rounded-full bg-[hsl(315_80%_58%_/_0.22)] blur-3xl" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-8 right-10 hidden w-[60%] justify-center lg:flex"
            >
              <div className="aspect-[7/6] w-[66%] overflow-hidden rounded-xl">
                <img
                  src="/images/research-moon-aware-transformers.png"
                  alt=""
                  width={1448}
                  height={1086}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-[50%_48%]"
                />
              </div>
            </div>

            <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[hsl(43_60%_70%_/_0.3)] bg-[hsl(43_74%_66%_/_0.08)] px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-[hsl(43_60%_75%)]">
                    <FileText className="h-3 w-3" /> Featured
                  </span>
                  <span className="text-xs text-[hsl(326_55%_62%)]">{featured.year}</span>
                </div>
                <h3 className="mt-5 font-serif text-2xl leading-snug text-gradient-gold md:text-3xl">
                  {featured.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{featured.authors}</p>
                <p className="mt-5 text-sm leading-relaxed text-foreground/80">
                  {featured.abstract}
                </p>
              </div>
              <div className="shrink-0 lg:text-right">
                <p className="text-xs uppercase tracking-[0.2em] text-[hsl(326_50%_60%_/_0.85)]">
                  {featured.venue}
                </p>
                <a
                  href="/research/moon-aware-transformers"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[hsl(43_60%_75%)] transition-colors hover:text-[hsl(43_70%_85%)]"
                >
                  Read paper <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Rest */}
        <Stagger className="mt-6 grid gap-5 md:grid-cols-3">
          {rest.map((p) => (
            <StaggerItem key={p.title}>
              <article className="group flex h-full flex-col rounded-2xl glass p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[hsl(43_60%_70%_/_0.25)]">
                <div className="flex items-center justify-between">
                  <FileText className="h-4 w-4 text-[hsl(43_60%_70%)]" strokeWidth={1.5} />
                  <span className="text-xs text-[hsl(326_55%_62%)]">{p.year}</span>
                </div>
                <h3 className="mt-4 font-serif text-lg leading-snug text-gradient-gold">
                  {p.title}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground">{p.authors}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/75">
                  {p.abstract}
                </p>
                <p className="mt-5 text-[0.65rem] uppercase tracking-[0.18em] text-[hsl(326_50%_58%_/_0.8)]">
                  {p.venue}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-10 max-w-xl text-center text-xs leading-relaxed text-[hsl(326_50%_58%_/_0.7)]">
            Ignoring centuries of scientific consensus since 2026. Our h-index is
            calculated using a formula we are not at liberty to share.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
