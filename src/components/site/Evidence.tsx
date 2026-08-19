import { Reveal, Stagger, StaggerItem } from './Motion';
import { BarChart3, TrendingUp, Users, Globe2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SectionEyebrow } from './shared/SectionEyebrow';
import { BackgroundGlow } from './shared/BackgroundGlow';

interface Stat {
  icon: LucideIcon;
  value: string;
  label: string;
  footnote: string;
}

const STATS: Stat[] = [
  {
    icon: Users,
    value: '97.8%',
    label: 'Customer confidence',
    footnote: 'confidence may refer to ours.',
  },
  {
    icon: TrendingUp,
    value: '4.2M',
    label: 'Readings generated per retrograde',
    footnote: 'Retrograde duration varies. So does the reading.',
  },
  {
    icon: Globe2,
    value: '194',
    label: 'Countries with confirmed access to the observable sky',
    footnote: 'Coverage expanded organically.',
  },
  {
    icon: BarChart3,
    value: '11,432',
    label: 'Years of celestial observation indexed',
    footnote: 'Earlier observations were preserved under legacy evidentiary standards.',
  },
];

export function Evidence() {
  return (
    <section id="evidence" className="relative overflow-hidden py-28 md:py-36">
      {/* Atmospheric magenta + blue-violet glow */}
      <BackgroundGlow className="left-1/3 -top-1/5 h-[50vh] w-[50vh] rounded-full bg-[hsl(326_78%_50%_/_0.32)] blur-[145px]" />
      <BackgroundGlow className="-right-1/4 bottom-0 h-[42vh] w-[42vh] rounded-full bg-[hsl(256_80%_52%_/_0.30)] blur-[130px]" />
      <div className="container-narrow">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <SectionEyebrow>Trust Indicators</SectionEyebrow>
            <h2 aria-label="Measured carefully. Interpreted decisively." className="mt-5 font-serif text-4xl leading-[1.1] md:text-5xl">
              <span className="text-gradient-gold">Measured carefully.</span>
              <br />
              <span className="text-foreground">Interpreted decisively.</span>
            </h2>
          </div>
        </Reveal>

        <Stagger className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-[hsl(43_60%_70%_/_0.1)] sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <StaggerItem key={s.label}>
              <div className="group relative flex h-full flex-col bg-[hsl(280_55%_16%_/_0.5)] p-8 backdrop-blur-md transition-colors duration-500 hover:bg-[hsl(300_58%_20%_/_0.7)]">
                <s.icon className="h-5 w-5 text-[hsl(43_60%_70%)]" strokeWidth={1.5} />
                <p className="mt-6 font-serif text-4xl text-gradient-gold md:text-5xl">
                  {s.value}
                </p>
                <p className="mt-2 text-sm font-medium text-foreground/90">{s.label}</p>
                <p className="mt-auto pt-3 text-xs leading-relaxed text-[hsl(326_65%_65%)]">
                  {s.footnote}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-10 max-w-xl text-center text-xs leading-relaxed text-[hsl(326_55%_62%_/_0.8)]">
            All figures are independently audited by a firm whose name we are legally
            prohibited from pronouncing under the terms of the engagement.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
