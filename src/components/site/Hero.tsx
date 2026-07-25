import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Starfield } from './Starfield';
import { FadeIn } from './Motion';

export function Hero() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="top"
      ref={wrapRef}
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
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/6f29af55-85e9-4c26-83a1-dae8770f2657.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
          opacity: 0.85,
        }}
      />
      {/* Left fade to blend text area */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(to right, hsl(262 50% 5% / 0.92) 30%, hsl(262 50% 5% / 0.55) 60%, transparent 85%)',
        }}
      />
      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-b from-transparent to-[hsl(262_45%_7%)]" />
      {/* Top fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-32 bg-gradient-to-b from-[hsl(262_45%_7%)] to-transparent" />

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
            The World's Leading Astrological AI Platform
          </span>
        </FadeIn>

        <FadeIn delay={0.2} duration={1.1}>
          <h1 className="mt-8 max-w-2xl font-serif leading-[1.04]" style={{ fontSize: 'clamp(2.8rem, 6vw, 5.2rem)' }}>
            <span className="text-gradient-gold block">Decode Your Destiny</span>
            <span className="text-foreground block">with Artificial Intelligence</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            OrionLabs combines ancient cosmic wisdom with cutting-edge AI
            to deliver hyper-personalized astrological insights that are{' '}
            <span className="text-[hsl(326_75%_68%)]">scientifically adjacent.</span>
          </p>
        </FadeIn>

        <FadeIn delay={0.55}>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
            <a
              href="#cta"
              className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#F5E6B0] to-[#C9A24A] px-7 text-sm font-semibold text-[#070514] shadow-[0_8px_30px_-6px_hsl(43_74%_66%_/_0.4)] transition-transform duration-300 hover:scale-[1.02]"
            >
              <span className="relative z-10">Begin Analysis</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
            <a
              href="#research"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-[hsl(43_60%_70%_/_0.25)] px-7 text-sm font-medium text-foreground/90 backdrop-blur-md transition-colors duration-300 hover:border-[hsl(43_60%_70%_/_0.5)] hover:text-foreground"
            >
              <BookOpen className="h-4 w-4" />
              Read the Research
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.8}>
          <p className="mt-10 text-xs tracking-wide text-muted-foreground/80">
            Trusted by <span className="text-[hsl(43_74%_66%)]">millions</span> of spiritually curious professionals worldwide.
          </p>
        </FadeIn>
      </div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={reduce ? { opacity: 0.6 } : { opacity: 0 }}
        animate={reduce ? { opacity: 0.6 } : { opacity: [0, 0.6, 0] }}
        transition={reduce ? { duration: 0 } : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-[hsl(43_60%_70%_/_0.3)] p-1">
          <motion.div
            className="h-1.5 w-1 rounded-full bg-[hsl(43_60%_70%)]"
            animate={reduce ? { y: 0 } : { y: [0, 12, 0] }}
            transition={reduce ? { duration: 0 } : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* OrbitRing — a slowly rotating ring of stars around the hero.      */
/* ------------------------------------------------------------------ */

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
