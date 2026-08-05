import { Reveal } from './Motion';
import { Starfield } from './Starfield';
import { Aurora } from './Aurora';
import { PrimaryActionButton, SecondaryActionButton } from './shared/ActionButtons';
import { SectionEyebrow } from './shared/SectionEyebrow';

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
          <SectionEyebrow>Begin</SectionEyebrow>
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
            <PrimaryActionButton href="/questionnaire" className="px-8">
              Begin Analysis
            </PrimaryActionButton>
            <SecondaryActionButton href="#research" className="px-8">
              Read the Research
            </SecondaryActionButton>
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
