import { ArrowRight } from 'lucide-react';
import { Aurora } from '@/components/site/Aurora';
import { Logo } from '@/components/site/Logo';
import { Starfield } from '@/components/site/Starfield';
import { resetAnalysisSession } from '@/lib/analysis-session';

/** Branded recovery route for URLs that do not match an OrionLabs destination. */
export function NotFoundPage() {
  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-[hsl(262_48%_6%)]">
      <div aria-hidden="true" className="fixed inset-0 bg-cosmic-page">
        <Aurora className="opacity-65" />
        <Starfield density={0.42} className="opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,hsl(262_48%_6%_/_0.12),hsl(262_48%_6%_/_0.48))]" />
      </div>

      <header className="relative z-10 border-b border-[hsl(43_60%_70%_/_0.1)] bg-[hsl(262_45%_7%_/_0.42)] backdrop-blur-lg">
        <div className="container-narrow flex h-16 items-center md:h-20">
          <a
            href="/"
            aria-label="Return to OrionLabs home"
            className="group flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.7)] focus-visible:ring-offset-4 focus-visible:ring-offset-[hsl(262_45%_7%)]"
          >
            <Logo className="h-8 w-8 sm:h-9 sm:w-9" />
            <span className="font-serif text-xl tracking-tight text-foreground sm:text-2xl">
              Orion<span className="text-gradient-gold">Labs</span>
            </span>
          </a>
        </div>
      </header>

      <main className="container-narrow relative z-10 grid min-h-[calc(100svh-4.0625rem)] items-center gap-5 py-6 sm:gap-8 sm:py-8 md:min-h-[calc(100svh-5.0625rem)] md:grid-cols-[minmax(0,1.15fr)_minmax(17rem,0.85fr)] md:gap-12 md:py-10 lg:gap-20">
        <section aria-labelledby="not-found-title" className="max-w-2xl text-center md:text-left">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.24em] text-[hsl(43_60%_74%)] sm:text-[0.7rem]">
            Celestial routing status <span aria-hidden="true">·</span> 404
          </p>
          <h1
            id="not-found-title"
            className="mt-4 font-serif text-[clamp(2.65rem,6vw,4.75rem)] leading-[1.02] text-foreground"
          >
            This Page Is Outside Our <span className="text-gradient-gold">Predictive Range</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base md:mx-0 md:mt-6 md:text-lg">
            Our celestial routing model was unable to locate the requested destination. The page may have been moved, removed, or temporarily obscured by unfavorable planetary conditions.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
            <a
              href="/"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#F5E6B0] to-[#C9A24A] px-7 text-sm font-semibold text-[#070514] shadow-[0_8px_30px_-6px_hsl(43_74%_66%_/_0.4)] transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_78%)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(264_45%_8%)] motion-reduce:transform-none"
            >
              Return to OrionLabs
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" />
            </a>
            <a
              href="/questionnaire"
              onClick={resetAnalysisSession}
              className="inline-flex h-12 items-center justify-center rounded-full border border-[hsl(43_60%_70%_/_0.3)] bg-[hsl(262_45%_7%_/_0.38)] px-7 text-sm font-medium text-foreground backdrop-blur-sm transition-colors duration-300 hover:border-[hsl(43_60%_70%_/_0.55)] hover:bg-[hsl(280_45%_14%_/_0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.7)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(264_45%_8%)]"
            >
              Start an Analysis
            </a>
          </div>
        </section>

        <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[14rem] sm:max-w-[19rem] md:max-w-[22rem]">
          <div className="absolute inset-[8%] rounded-full border border-[hsl(43_60%_70%_/_0.12)]" />
          <div className="absolute inset-[21%] rounded-full border border-dashed border-[hsl(326_55%_68%_/_0.2)]" />
          <div className="absolute inset-[34%] rounded-full border border-[hsl(43_60%_70%_/_0.16)]" />
          <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(43_74%_66%)] shadow-[0_0_24px_hsl(43_74%_66%_/_0.6)]" />
          <div className="absolute right-[3%] top-[27%] h-3 w-3 rounded-full border border-[hsl(326_55%_72%_/_0.55)] bg-[hsl(262_48%_6%)] shadow-[0_0_20px_hsl(326_70%_58%_/_0.34)]" />
          <div className="absolute right-[14%] top-[35%] h-px w-[18%] rotate-[-24deg] bg-gradient-to-r from-[hsl(326_55%_68%_/_0.45)] to-transparent" />
          <span className="absolute bottom-[13%] left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.58rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/45">
            Destination signal unavailable
          </span>
        </div>
      </main>
    </div>
  );
}
