import { Reveal, Stagger, StaggerItem } from './Motion';
import { BarChart3, TrendingUp, Users, Globe2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

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
    footnote: '*confidence may refer to ours.',
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
    label: 'Countries with at least one user who forgot to cancel',
    footnote: 'Subscription auto-renews. Mercury has nothing to do with it.',
  },
  {
    icon: BarChart3,
    value: '11,432',
    label: 'Years of celestial observation indexed',
    footnote: 'Including three highly opinionated Reddit threads.',
  },
];

export function Evidence() {
  return (
    <section id="evidence" className="relative overflow-hidden py-28 md:py-36">
      {/* Atmospheric magenta + blue-violet glow */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/3 -top-1/5 h-[50vh] w-[50vh] rounded-full bg-[hsl(326_78%_50%_/_0.32)] blur-[145px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-1/4 bottom-0 h-[42vh] w-[42vh] rounded-full bg-[hsl(256_80%_52%_/_0.30)] blur-[130px]" />
      <div className="container-narrow">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-[hsl(43_60%_70%)]">
              <span className="h-px w-6 bg-[hsl(43_60%_70%_/_0.5)]" />
              Trust Indicators
              <span className="h-px w-6 bg-[hsl(43_60%_70%_/_0.5)]" />
            </span>
            <h2 className="mt-5 font-serif text-4xl leading-[1.1] md:text-5xl">
              <span className="text-gradient-gold">Backed by statistically</span>
              <br />
              <span className="text-foreground">significant optimism.</span>
            </h2>
          </div>
        </Reveal>

        <Stagger className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-[hsl(43_60%_70%_/_0.1)] sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <StaggerItem key={s.label}>
              <div className="group relative h-full bg-[hsl(280_55%_16%_/_0.5)] p-8 backdrop-blur-md transition-colors duration-500 hover:bg-[hsl(300_58%_20%_/_0.7)]">
                <s.icon className="h-5 w-5 text-[hsl(43_60%_70%)]" strokeWidth={1.5} />
                <p className="mt-6 font-serif text-4xl text-gradient-gold md:text-5xl">
                  {s.value}
                </p>
                <p className="mt-2 text-sm font-medium text-foreground/90">{s.label}</p>
                <p className="mt-3 text-xs leading-relaxed text-[hsl(326_65%_65%)]">
                  {s.footnote}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-10 max-w-xl text-center text-xs leading-relaxed text-[hsl(326_55%_62%_/_0.8)]">
            All figures are independently audited by a firm whose name we are
            legally prohibited from pronouncing during Mercury Retrograde.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
