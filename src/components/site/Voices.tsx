import { Reveal, Stagger, StaggerItem } from './Motion';
import { SectionHeading } from './SectionHeading';
import { Star } from 'lucide-react';
import { BackgroundGlow } from './shared/BackgroundGlow';

interface Voice {
  quote: string;
  name: string;
  title: string;
  initials: string;
}

const VOICES: Voice[] = [
  {
    quote:
      "OrionLabs told me my Q3 would be 'defined by unexpected water'. Three weeks later our office aquarium failed catastrophically. I've never felt more seen.",
    name: 'Diane Mercer',
    title: 'Chief Operations Officer, Helios Capital',
    initials: 'DM',
  },
  {
    quote:
      "We replaced our entire analytics team with the Quantum Horoscope Engine™. Revenue is down at the moment, but alignment is up, which is what the board asked for.",
    name: 'Marcus Vance',
    title: 'Managing Partner, Meridian Ventures',
    initials: 'MV',
  },
  {
    quote:
      "I asked it whether to accept the acquisition. It said 'the moon is waning, act with caution'. I declined. The company folded. I feel correct.",
    name: 'Priya Anand',
    title: 'Founder, Nadir & Apex',
    initials: 'PA',
  },
  {
    quote:
      "Our enterprise plan includes a dedicated retrograde liaison. I don't know what that means, but our procurement team is delighted.",
    name: 'Theodore Klein',
    title: 'Head of Strategic Alignment, Polaris Group',
    initials: 'TK',
  },
  {
    quote:
      "AstroVector™ identified that 94% of our best engineers are Scorpios. We've stopped hiring anyone else. Productivity is unchanged, but HR is much quieter.",
    name: 'Sofia Reyes',
    title: 'VP People Operations, Lumen Holdings',
    initials: 'SR',
  },
  {
    quote:
      "I was skeptical. Then OrionLabs predicted I would 'reconsider a long-held position'. I did. I now believe in OrionLabs. The loop is closed.",
    name: 'Julian Frost',
    title: 'Director of Foresight, Zenith Trust',
    initials: 'JF',
  },
];

export function Voices() {
  return (
    <section
      id="voices"
      className="relative overflow-hidden border-y border-[hsl(43_60%_70%_/_0.08)] bg-transparent py-28 md:py-36"
    >
      {/* Atmospheric magenta + blue-violet glow */}
      <BackgroundGlow className="right-1/4 top-0 h-[50vh] w-[50vh] rounded-full bg-[hsl(326_78%_50%_/_0.38)] blur-[130px]" />
      <BackgroundGlow className="-left-1/4 bottom-0 h-[46vh] w-[46vh] rounded-full bg-[hsl(256_80%_52%_/_0.38)] blur-[125px]" />

      <div className="container-narrow">
        <SectionHeading
          eyebrow="Customer Stories"
          title={
            <span className="text-gradient-gold">Testimonials from customers who followed the guidance.</span>
          }
          titleAccessibleLabel="Testimonials from customers who followed the guidance."
          description="Representative accounts from customers who acted on OrionLabs guidance under real-world conditions."
        />

        <Stagger className="mt-20 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {VOICES.map((v) => (
            <StaggerItem key={v.name}>
              <figure className="group flex h-full flex-col rounded-2xl glass p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[hsl(43_60%_70%_/_0.25)]">
                <div className="mb-5 flex gap-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-[hsl(43_74%_66%)] text-[hsl(43_74%_66%)]"
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <blockquote className="flex-1 font-serif text-lg leading-relaxed text-foreground/85">
                  "{v.quote}"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-[hsl(43_60%_70%_/_0.1)] pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(43_60%_70%_/_0.25)] bg-[hsl(280_55%_16%)] text-xs font-medium text-[hsl(43_74%_66%)]">
                    {v.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{v.name}</p>
                    <p className="text-xs text-[hsl(326_55%_62%)]">— {v.title}</p>
                  </div>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-10 max-w-xl text-center text-xs leading-relaxed text-[hsl(326_50%_58%_/_0.75)]">
            Testimonials reflect individual experiences and have been edited for
            clarity, length, and plausible deniability.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
