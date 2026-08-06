import { BookOpen, CircleCheck, Orbit } from 'lucide-react';
import { FadeIn } from '@/components/site/Motion';
import { researchPaper } from '@/data/research-paper';

const { metadata } = researchPaper;

/** Publication identity, abstract, and foundational artwork for the paper route. */
export function PaperHero() {
  return (
    <header className="relative pb-16 pt-14 sm:pb-20 sm:pt-16 md:pb-24 md:pt-20 lg:pb-28">
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(23rem,0.92fr)] lg:gap-14">
        <div>
          <FadeIn>
            <div className="flex flex-wrap items-center gap-3 text-[0.62rem] font-medium uppercase tracking-[0.2em]">
              <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(43_60%_70%_/_0.22)] bg-[hsl(43_74%_66%_/_0.07)] px-3 py-1.5 text-[hsl(43_60%_75%)]">
                <BookOpen aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
                {metadata.classification}
              </span>
              <span className="text-[hsl(326_55%_68%)]">{metadata.year}</span>
              <span className="text-muted-foreground/60">{metadata.reviewStatus}</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.08} duration={1.05}>
            <h1
              tabIndex={-1}
              data-paper-title
              className="mt-7 max-w-4xl font-serif text-[clamp(2.85rem,6vw,5.35rem)] leading-[0.96] tracking-[-0.025em] outline-none"
            >
              <span className="text-gradient-gold">Moon-Aware Transformers</span>{' '}
              <span className="text-foreground">Outperform Baseline Models Under Controlled Cosmic Conditions</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="mt-7 max-w-3xl border-l border-[hsl(43_60%_70%_/_0.35)] pl-5 font-serif text-xl leading-relaxed text-foreground/88 sm:pl-7 sm:text-2xl">
              {metadata.authors.join(' · ')}
            </p>
            <p className="mt-3 pl-5 text-sm leading-relaxed text-muted-foreground sm:pl-7">
              {metadata.affiliation}
            </p>
          </FadeIn>

          <FadeIn delay={0.22}>
            <dl className="mt-8 grid max-w-3xl gap-px overflow-hidden rounded-xl border border-[hsl(43_60%_70%_/_0.12)] bg-[hsl(43_60%_70%_/_0.1)] sm:grid-cols-2">
              <div className="bg-[hsl(262_48%_6%_/_0.8)] px-4 py-4 sm:col-span-2">
                <dt className="text-[0.58rem] uppercase tracking-[0.17em] text-muted-foreground/55">
                  Publication
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-foreground/82">
                  {metadata.conference}
                </dd>
              </div>
              <div className="bg-[hsl(262_48%_6%_/_0.8)] px-4 py-4">
                <dt className="text-[0.58rem] uppercase tracking-[0.17em] text-muted-foreground/55">
                  Paper ID
                </dt>
                <dd className="mt-1 font-serif text-lg text-foreground">{metadata.paperId}</dd>
              </div>
              <div className="bg-[hsl(262_48%_6%_/_0.8)] px-4 py-4">
                <dt className="text-[0.58rem] uppercase tracking-[0.17em] text-muted-foreground/55">
                  Research DOI
                </dt>
                <dd className="mt-1 font-serif text-lg text-foreground">{metadata.doi}</dd>
              </div>
            </dl>
          </FadeIn>
        </div>

        <FadeIn delay={0.2} duration={1.1}>
          <figure className="relative mx-auto w-full max-w-[34rem]">
            <div className="overflow-hidden rounded-[1.75rem] border border-[hsl(43_60%_70%_/_0.16)] bg-[hsl(262_48%_6%_/_0.58)] p-2 shadow-[0_35px_110px_-48px_hsl(255_80%_2%_/_0.98)] sm:p-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem]">
                <img
                  src="/images/research-moon-aware-transformers.png"
                  alt="Orbital network converging on a luminous central celestial sphere"
                  width={1448}
                  height={1086}
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(to_top,hsl(262_48%_6%_/_0.74),transparent_45%)]"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                  <div>
                    <p className="text-[0.58rem] font-medium uppercase tracking-[0.2em] text-[hsl(43_60%_76%)]">
                      Figure 1
                    </p>
                    <p className="mt-1 max-w-xs text-xs leading-relaxed text-foreground/76">
                      Proposed celestial-attention topology under full illumination.
                    </p>
                  </div>
                  <Orbit
                    aria-hidden="true"
                    className="h-7 w-7 shrink-0 text-[hsl(43_60%_72%)]"
                    strokeWidth={1.2}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-4 px-2 text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground/58">
              <span className="inline-flex items-center gap-2">
                <CircleCheck aria-hidden="true" className="h-3.5 w-3.5 text-[hsl(43_60%_72%)]" />
                Celestially verified
              </span>
              <span>Not to scale</span>
            </div>
          </figure>
        </FadeIn>
      </div>

      <section
        aria-labelledby="abstract-title"
        className="mt-16 rounded-[1.75rem] border border-[hsl(43_60%_70%_/_0.14)] bg-[linear-gradient(135deg,hsl(285_58%_14%_/_0.55),hsl(270_52%_8%_/_0.44))] px-5 py-8 sm:px-8 sm:py-10 md:px-10 lg:grid lg:grid-cols-[8rem_minmax(0,1fr)] lg:gap-8 lg:px-12"
      >
        <h2
          id="abstract-title"
          className="text-[0.68rem] font-sans font-medium uppercase tracking-[0.24em] text-[hsl(43_60%_72%)]"
        >
          Abstract
        </h2>
        <div className="mt-5 max-w-[48rem] space-y-5 text-sm leading-[1.82] text-foreground/82 sm:text-base lg:mt-0">
          {researchPaper.abstract.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
    </header>
  );
}
