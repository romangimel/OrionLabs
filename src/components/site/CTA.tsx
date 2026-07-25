import { Reveal } from './Motion';
import { ArrowRight } from 'lucide-react';
import { Starfield } from './Starfield';
import { Aurora } from './Aurora';

export function CTA() {
  return (
    <section
      id="cta"
      className="relative flex min-h-[80vh] items-center justify-center overflow-hidden py-32"
    >
      <Starfield density={0.7} />
      <Aurora />

      {/* Central glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[44vh] w-[44vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(310_80%_55%_/_0.34)] blur-[100px] animate-pulse-glow"
      />

      <div className="container-narrow relative z-10 flex flex-col items-center text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-[hsl(43_60%_70%)]">
            <span className="h-px w-6 bg-[hsl(43_60%_70%_/_0.5)]" />
            Begin
            <span className="h-px w-6 bg-[hsl(43_60%_70%_/_0.5)]" />
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-7 max-w-3xl font-serif text-4xl leading-[1.08] md:text-6xl lg:text-[4rem]">
            <span className="text-foreground">Your chart is ready.</span>
            <br />
            <span className="text-foreground">The universe is </span>
            <span className="text-gradient-gold italic">standing by.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
            Join <span className="text-[hsl(43_74%_66%)]">millions</span> of spiritually curious professionals who have already
            outsourced their self-understanding to a machine that is, itself,
            powered by starlight and venture capital.
          </p>
        </Reveal>

        <Reveal delay={0.26}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="#top"
              className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#F5E6B0] to-[#C9A24A] px-8 text-sm font-semibold text-[#070514] shadow-[0_8px_30px_-6px_hsl(43_74%_66%_/_0.4)] transition-transform duration-300 hover:scale-[1.02]"
            >
              <span className="relative z-10">Begin Analysis</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
            <a
              href="#research"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-[hsl(43_60%_70%_/_0.25)] px-8 text-sm font-medium text-foreground/90 backdrop-blur-md transition-colors duration-300 hover:border-[hsl(43_60%_70%_/_0.5)] hover:text-foreground"
            >
              Read the Research
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="mt-10 text-xs tracking-wide text-[hsl(326_50%_60%_/_0.7)]">
            No credit card required. Spiritual commitment implied. Auto-renews
            at the next full moon.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
