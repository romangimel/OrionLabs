import { Reveal } from './Motion';
import { Starfield } from './Starfield';
import { Aurora } from './Aurora';
import { PrimaryActionButton, SecondaryActionButton } from './shared/ActionButtons';
import { SectionEyebrow } from './shared/SectionEyebrow';
import { prepareNewAnalysisJourney } from '@/lib/analysis-session';

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
          <h2 aria-label="The system has made its case. Now let it make yours." className="mt-7 max-w-3xl font-serif text-4xl leading-[1.08] md:text-6xl lg:text-[4rem]">
            <span className="text-gradient-gold">The system has made its case. Now let it make </span>
            <span className="text-[hsl(326_65%_65%)]">yours.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
            A short calibration is all that stands between your current understanding
            of yourself and OrionLabs replacing it with a more structured, more
            confident, and substantially more celestial interpretation.
          </p>
        </Reveal>

        <Reveal delay={0.26}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <PrimaryActionButton
              href="/questionnaire"
              onClick={prepareNewAnalysisJourney}
              className="px-8"
            >
              Begin Analysis
            </PrimaryActionButton>
            <SecondaryActionButton href="#research" className="px-8">
              Read the Research
            </SecondaryActionButton>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="mt-10 text-xs tracking-wide text-[hsl(326_50%_60%_/_0.7)]">
            No prior preparation required. OrionLabs will handle the interpretation.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
