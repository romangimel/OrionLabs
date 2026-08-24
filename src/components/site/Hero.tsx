import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { Starfield } from './Starfield';
import { FadeIn } from './Motion';
import { PrimaryActionButton, SecondaryActionButton } from './shared/ActionButtons';
import { prepareNewAnalysisJourney } from '@/lib/analysis-session';

/**
 * Establishes the landing page's cinematic first impression and primary actions.
 * Independent background layers keep text contrast, atmospheric imagery, and
 * decorative motion adjustable without altering the content hierarchy.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <Starfield density={1} />

      {/* Cosmic nebula background image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: 'hsl(262 50% 6%)',
        }}
      />
      <div
        aria-hidden="true"
        className="hero-artwork pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/6f29af55-85e9-4c26-83a1-dae8770f2657.png)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          opacity: 0.96,
        }}
      />
      {/* Left fade to blend text area */}
      <div
        aria-hidden="true"
        className="hero-readability-overlay pointer-events-none absolute inset-0 z-0"
      />
      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-b from-transparent to-[hsl(262_45%_7%_/_0.72)]" />
      {/* Top fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-32 bg-gradient-to-b from-[hsl(262_45%_7%_/_0.68)] to-transparent" />

      {/* Orbiting constellation rings — subtle overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2"
      >
        <OrbitRing size={620} duration={80} stars={6} reverse />
        <OrbitRing size={920} duration={120} stars={4} />
        <OrbitRing size={1240} duration={180} stars={3} reverse />
      </div>

      {/* Content */}
      <div className="container-narrow relative z-10 flex flex-col items-start pt-28 md:pt-32">
        <FadeIn delay={0.1}>
          <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(43_60%_70%_/_0.2)] bg-[hsl(280_55%_16%_/_0.5)] px-4 py-1.5 text-xs font-medium tracking-wide text-[hsl(43_60%_75%)] backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(43_74%_66%)] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(43_74%_66%)]" />
            </span>
            Enterprise-Grade Astrological Intelligence
          </span>
        </FadeIn>

        <FadeIn delay={0.2} duration={1.1}>
          <h1 aria-label="Personalized Horoscope, Powered by AI" className="mt-8 max-w-2xl font-serif leading-[1.04] lg:max-w-[37.5rem]" style={{ fontSize: 'clamp(2.8rem, 6vw, 5.2rem)' }}>
            <span className="text-gradient-gold">Personalized Horoscope, Powered by </span>
            <span className="text-[hsl(326_65%_65%)]">AI</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground md:max-w-[34rem] md:text-lg">
            OrionLabs combines proprietary AI, behavioral inputs, and planetary positioning to produce an astrological analysis tailored to you, with greater analytical precision than conventional astrology has historically considered necessary.
          </p>
        </FadeIn>

        <FadeIn delay={0.55}>
          <div className="mt-10 flex flex-col items-start gap-4 lg:mt-8 sm:flex-row">
            <PrimaryActionButton
              href="/questionnaire"
              onClick={prepareNewAnalysisJourney}
              className="px-7"
            >
              Begin Analysis
            </PrimaryActionButton>
            <SecondaryActionButton href="#research" className="px-7">
              <BookOpen className="h-4 w-4" />
              Read the Research
            </SecondaryActionButton>
          </div>
        </FadeIn>

        <FadeIn delay={0.8}>
          <p className="mt-10 text-xs tracking-wide text-muted-foreground/80">
            Developed under <span className="text-[hsl(326_75%_68%)]">internally rigorous</span> conditions.
          </p>
        </FadeIn>
      </div>

    </section>
  );
}

/** Decorative orbit whose motion stops when the user requests reduced motion. */
function OrbitRing({
  size,
  duration,
  stars,
  reverse = false,
}: {
  size: number;
  duration: number;
  stars: number;
  reverse?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <div
      className="absolute rounded-full border border-[hsl(43_60%_70%_/_0.05)]"
      style={{ width: size, height: size, left: -size / 2, top: -size / 2 }}
    >
      <motion.div
        className="absolute inset-0"
        animate={reduce ? { rotate: 0 } : { rotate: reverse ? -360 : 360 }}
        transition={reduce ? { duration: 0 } : { duration, repeat: Infinity, ease: 'linear' }}
      >
        {Array.from({ length: stars }, (_, i) => {
          // Equal angular spacing keeps every ring balanced regardless of star count.
          const angle = (i / stars) * Math.PI * 2;
          const x = Math.cos(angle) * (size / 2);
          const y = Math.sin(angle) * (size / 2);
          return (
            <span
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-[#F5E6B0]"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                boxShadow: '0 0 8px hsl(43 74% 66% / 0.8)',
                transform: 'translate(-50%, -50%)',
              }}
            />
          );
        })}
      </motion.div>
    </div>
  );
}
