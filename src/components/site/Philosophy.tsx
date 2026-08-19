import { Reveal, Stagger, StaggerItem } from './Motion';
import { SectionHeading } from './SectionHeading';
import { Sparkles, Infinity, Compass } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { BackgroundGlow } from './shared/BackgroundGlow';
import { IconTile } from './shared/IconTile';

interface Pillar {
  icon: LucideIcon;
  title: string;
  body: string;
}

const PILLARS: Pillar[] = [
  {
    icon: Sparkles,
    title: 'Deterministic nondeterminism',
    body: 'Our models produce consistent results that are, statistically, never the same twice. We call this confidence.',
  },
  {
    icon: Infinity,
    title: 'Infinite context, finite accountability',
    body: 'DeepConstellation™ ingests thousands of years of celestial observation alongside a proprietary collection of contemporary claims requiring minimal verification.',
  },
  {
    icon: Compass,
    title: 'Magnetic alignment',
    body: 'Every inference is calibrated to your natal chart, your timezone, and our revenue model.',
  },
];

export function Philosophy() {
  return (
    <section id="philosophy" className="relative overflow-hidden py-28 md:py-36">
      {/* Atmospheric blue-violet + magenta glow */}
      <BackgroundGlow className="right-1/4 top-0 h-[45vh] w-[45vh] rounded-full bg-[hsl(326_75%_48%_/_0.30)] blur-[140px]" />
      <BackgroundGlow className="-left-1/5 bottom-1/4 h-[40vh] w-[40vh] rounded-full bg-[hsl(256_78%_50%_/_0.28)] blur-[130px]" />
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Product Philosophy"
          title={
            <>
              <span className="text-gradient-gold">We don't predict the future.</span>
              <br />
              We <span className="text-gradient-gold italic">curate</span>{' '}
              <span className="text-foreground">it.</span>
            </>
          }
          titleAccessibleLabel="We don't predict the future. We curate it."
          description="OrionLabs exists at the intersection of ancient observation and modern overconfidence. We believe every individual deserves an intelligence layer calibrated to the exact celestial conditions under which their judgment first became operationally relevant."
        />

        <Stagger className="mt-20 grid gap-6 md:grid-cols-3">
          {PILLARS.map((p) => (
            <StaggerItem key={p.title}>
              <article className="group relative h-full overflow-hidden rounded-2xl glass p-8 transition-all duration-500 hover:border-[hsl(43_60%_70%_/_0.25)]">
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[hsl(315_80%_58%_/_0.26)] blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
                <IconTile icon={p.icon} className="mb-6" />
                <h3 className="font-serif text-2xl text-gradient-gold">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2} className="mt-16">
          <p className="mx-auto max-w-2xl text-center text-sm italic leading-relaxed text-muted-foreground/70">
            We are not saying the planets control your destiny. We are saying our
            proprietary interpretation of the planets controls your destiny, which
            is an entirely different and{' '}
            <span className="text-[hsl(326_65%_65%)]">legally distinct claim.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
