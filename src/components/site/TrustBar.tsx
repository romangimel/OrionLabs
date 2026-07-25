import { Reveal, Stagger, StaggerItem } from './Motion';

const TRUSTED_BY = [
  'Helios Capital',
  'Meridian Ventures',
  'Nadir & Apex',
  'Lumen Holdings',
  'Polaris Group',
  'Equinox Partners',
  'Zenith Trust',
] as const;

export function TrustBar() {
  return (
    <section className="relative border-y border-[hsl(43_60%_70%_/_0.08)] bg-transparent py-12">
      <div className="container-narrow">
        <Reveal>
          <p className="text-center text-xs uppercase tracking-[0.3em] text-[hsl(43_60%_70%)]">
            Trusted by forward-thinking institutions across the observed universe
          </p>
        </Reveal>
        <Stagger className="mt-8">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 md:gap-x-16">
            {TRUSTED_BY.map((name) => (
              <StaggerItem key={name}>
                <span className="font-serif text-lg tracking-wide text-gradient-gold transition-opacity duration-300 hover:opacity-80 md:text-xl">
                  {name}
                </span>
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      </div>
    </section>
  );
}
