import { ShieldCheck } from 'lucide-react';
import { OrbitalProfile } from '@/components/celestial/OrbitalProfile';
import { FadeIn } from '@/components/site/Motion';
import type { OrionReport } from '@/data/report';
import type { OrbitalProfileData } from '@/lib/orbital-profile';

interface ReportHeaderProps {
  subject: OrionReport['subject'];
  profile: OrbitalProfileData;
}

/** Establishes the personalized orbital model as the report's opening evidence. */
export function ReportHeader({ subject, profile }: ReportHeaderProps) {
  return (
    <header className="relative pb-14 pt-14 sm:pb-16 sm:pt-16 md:pb-20 md:pt-20 lg:pb-24">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.04fr)_minmax(24rem,0.96fr)] lg:gap-12">
        <div>
          <FadeIn>
            <div className="flex flex-wrap items-center gap-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[hsl(43_60%_72%)]">
              <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(43_60%_70%_/_0.2)] bg-[hsl(43_74%_66%_/_0.06)] px-3 py-1.5">
                <ShieldCheck
                  aria-hidden="true"
                  className="h-3.5 w-3.5"
                  strokeWidth={1.5}
                />
                Generated analysis
              </span>
              <span className="text-muted-foreground/65">Personal intelligence brief</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.08} duration={1.05}>
            <h1 className="mt-7 max-w-4xl font-serif text-[clamp(2.8rem,6vw,5.2rem)] leading-[0.96] tracking-[-0.025em]">
              Celestial operating report
              <span className="mt-2 block text-gradient-gold">for {subject.name}</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="mt-7 max-w-2xl border-l border-[hsl(43_60%_70%_/_0.35)] pl-5 text-base leading-relaxed text-muted-foreground sm:pl-7 sm:text-lg">
              A synthesized assessment of behavioral momentum, recurring patterns, and the
              operational implications of current planetary positioning.
            </p>

            <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-[hsl(43_60%_70%_/_0.12)] bg-[hsl(43_60%_70%_/_0.1)] sm:grid-cols-3">
              {[
                ['Primary sign', subject.zodiacSign],
                ['Current focus', profile.focusLabel],
                ['Profile ID', profile.signature],
              ].map(([label, value], index) => (
                <div
                  key={label}
                  className={`bg-[hsl(262_48%_6%_/_0.78)] px-4 py-4 ${
                    index === 2 ? 'col-span-2 sm:col-span-1' : ''
                  }`}
                >
                  <dt className="text-[0.58rem] uppercase tracking-[0.17em] text-muted-foreground/55">
                    {label}
                  </dt>
                  <dd className="mt-1 truncate font-serif text-lg text-foreground sm:text-xl">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>

        <FadeIn delay={0.2} duration={1.1}>
          <div className="relative mx-auto w-full max-w-[34rem] rounded-[1.75rem] border border-[hsl(43_60%_70%_/_0.13)] bg-[linear-gradient(145deg,hsl(280_55%_13%_/_0.48),hsl(262_50%_6%_/_0.28))] p-3 shadow-[0_30px_100px_-45px_hsl(255_80%_2%_/_0.96)] sm:p-5">
            <div className="flex items-center justify-between gap-4 px-2 pt-1 text-[0.58rem] font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
              <span>Completed subject model</span>
              <span className="text-[hsl(43_60%_72%)]">Verified locally</span>
            </div>
            <OrbitalProfile
              profile={profile}
              variant="report"
              isComplete
              className="mx-auto -mt-1"
            />
            <span
              aria-hidden="true"
              className="absolute left-4 top-4 h-6 w-6 border-l border-t border-[hsl(43_60%_70%_/_0.34)]"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-4 right-4 h-6 w-6 border-b border-r border-[hsl(43_60%_70%_/_0.34)]"
            />
          </div>
        </FadeIn>
      </div>
    </header>
  );
}
