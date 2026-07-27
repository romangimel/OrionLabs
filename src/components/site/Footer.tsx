import { Logo } from './Logo';
import { BackgroundGlow } from './shared/BackgroundGlow';

const COLUMNS = [
  {
    title: 'Platform',
    links: ['DeepConstellation™', 'Quantum Horoscope Engine™', 'Planetary Neural Network™', 'AstroVector™', 'Retrograde Shield™'],
  },
  {
    title: 'Company',
    links: ['Philosophy', 'Research', 'Voices', 'Careers', 'Press (pending)'],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'Natal Chart API', 'Compliance & Superstition', 'Status (Mercury)', 'Changelog'],
  },
  {
    title: 'Legal',
    links: ['Terms of Alignment', 'Privacy (Cosmic)', 'Cookie Policy (Lunar)', 'Refund Policy (Ecliptic)', 'Trademarks'],
  },
] as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[hsl(43_60%_70%_/_0.1)] bg-transparent pt-20 pb-10">
      {/* Atmospheric violet + pink glow */}
      <BackgroundGlow className="-right-1/4 -top-1/4 h-[46vh] w-[46vh] rounded-full bg-[hsl(300_75%_48%_/_0.32)] blur-[130px]" />
      <BackgroundGlow className="-left-1/4 bottom-0 h-[40vh] w-[40vh] rounded-full bg-[hsl(256_78%_50%_/_0.26)] blur-[130px]" />
      <div className="container-narrow">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          {/* Brand */}
          <div className="max-w-xs">
            <a href="#top" className="flex items-center gap-3" aria-label="OrionLabs home">
              <Logo className="h-9 w-9 drop-shadow-[0_0_12px_hsl(43_74%_66%_/_0.35)]" />
              <span className="font-serif text-2xl tracking-tight text-foreground">
                Orion<span className="text-gradient-gold">Labs</span>
              </span>
            </a>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Enterprise-grade cosmic intelligence. Built on proprietary
              planetary infrastructure. <span className="text-[hsl(326_55%_62%)]">Scientifically adjacent.</span>
            </p>
            <p className="mt-5 text-xs leading-relaxed text-[hsl(326_45%_55%_/_0.7)]">
              1 Orion Way, Suite 47
              <br />
              Somewhere beneath Mercury Retrograde
            </p>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-[hsl(43_60%_70%)]">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#top"
                      className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-[hsl(43_60%_70%_/_0.08)] pt-8 md:flex-row md:items-center">
          <p className="text-xs text-muted-foreground/60">
            &copy; 2026 OrionLabs, Inc. All rights reserved across all observable
            universes. <span className="text-[hsl(326_50%_60%)]">Ignoring centuries of scientific consensus since 2026.</span>
          </p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs text-muted-foreground/70">
              All systems nominal* — <span className="text-[hsl(326_50%_60%)]">*Mercury permitting</span>
            </span>
          </div>
        </div>

        {/* Easter egg disclaimer */}
        <p className="mt-8 text-[0.65rem] leading-relaxed text-[hsl(326_40%_50%_/_0.45)]">
          OrionLabs is a fictional company. No horoscopes are generated, no
          celestial observations are made, and no venture capital has been
          harmed in the production of this website. Any resemblance to real AI
          companies, living or pivoting, is entirely intentional.
        </p>
      </div>
    </footer>
  );
}
