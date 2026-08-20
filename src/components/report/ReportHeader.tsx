import { ShieldCheck } from 'lucide-react';
import { SubjectSignature } from '@/components/celestial/SubjectSignature';
import { FadeIn } from '@/components/site/Motion';
import type { BehavioralStatement } from '@/data/questionnaire';
import type { OrionReport } from '@/data/report';
import type { SubjectSignatureData } from '@/lib/subject-signature';

interface ReportHeaderProps {
  subject: OrionReport['subject'];
  signature: SubjectSignatureData;
}

/** Keeps the report summary concise while preserving the saved signature input. */
const BEHAVIORAL_PATTERN_LABELS: Record<BehavioralStatement, string> = {
  'I overthink things': 'Reflective',
  'I trust my instincts': 'Instinctive',
  'I like having a plan': 'Planner',
  'I adapt as I go': 'Adaptive',
  'I usually leave things until later': 'Deferred',
};

function getBehavioralPatternLabel(behavioralStatement: BehavioralStatement | null) {
  return behavioralStatement ? BEHAVIORAL_PATTERN_LABELS[behavioralStatement] : 'Unassigned';
}

/** Establishes the completed Subject Signature as the report's opening evidence. */
export function ReportHeader({ subject, signature }: ReportHeaderProps) {
  const behavioralPattern = getBehavioralPatternLabel(signature.behavioralStatement);

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
              <span className="text-gradient-gold">Celestial operating report for </span>
              <span className="text-[hsl(326_65%_65%)]">{subject.name}</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="mt-7 max-w-2xl border-l border-[hsl(43_60%_70%_/_0.35)] pl-5 text-base leading-relaxed text-muted-foreground sm:pl-7 sm:text-lg">
              A synthesized assessment of behavioral momentum, recurring patterns, and planetary
              positioning under OrionLabs' preferred interpretation of relevance.
            </p>

            <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-[hsl(43_60%_70%_/_0.12)] bg-[hsl(43_60%_70%_/_0.1)] sm:grid-cols-3">
              {[
                ['Primary sign', subject.zodiacSign],
                ['Current focus', signature.focusArea ?? 'Unassigned'],
                ['Behavioral pattern', behavioralPattern],
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
          <div className="relative mx-auto w-full max-w-[34rem] overflow-hidden rounded-[1.75rem] border border-[hsl(43_60%_70%_/_0.13)] bg-[hsl(262_50%_6%_/_0.72)] p-2 shadow-[0_30px_100px_-45px_hsl(255_80%_2%_/_0.96)] sm:p-4">
            <SubjectSignature
              signature={signature}
              variant="report"
              className="mx-auto"
            />
            <div className="pointer-events-none absolute left-4 top-4 z-10 max-w-[45%] bg-[linear-gradient(135deg,hsl(262_50%_6%_/_0.9),transparent)] pb-2 pr-3 text-[0.46rem] font-medium uppercase leading-relaxed tracking-[0.12em] sm:left-6 sm:top-6 sm:text-[0.55rem] sm:tracking-[0.17em]">
              <p className="text-gradient-gold">Completed subject signature</p>
              <p className="mt-1 text-[hsl(326_55%_68%)]">
                Signature ID: <span className="text-foreground">{signature.identity}</span>
              </p>
            </div>
            <dl className="pointer-events-none absolute inset-0 z-10 text-[0.44rem] font-medium uppercase leading-[1.45] tracking-[0.1em] text-[hsl(326_55%_68%)] sm:text-[0.52rem] sm:tracking-[0.14em]">
              <div className="absolute right-4 top-4 max-w-[47%] bg-[linear-gradient(225deg,hsl(262_50%_6%_/_0.9),transparent)] pb-2 pl-3 text-right sm:right-6 sm:top-6">
                <dt className="text-gradient-gold">Signal integrity:</dt>
                <dd className="mt-0.5">Mostly defensible</dd>
              </div>
              <div className="absolute bottom-4 left-4 max-w-[51%] bg-[linear-gradient(45deg,hsl(262_50%_6%_/_0.9),transparent)] pr-3 pt-2 sm:bottom-6 sm:left-6">
                <dt className="text-gradient-gold">Celestial interference:</dt>
                <dd className="mt-0.5">Within commercial tolerance</dd>
              </div>
              <div className="absolute bottom-4 right-4 max-w-[43%] bg-[linear-gradient(315deg,hsl(262_50%_6%_/_0.9),transparent)] pl-3 pt-2 text-right sm:bottom-6 sm:right-6">
                <dt className="text-gradient-gold">Anomaly density:</dt>
                <dd className="mt-0.5">Above baseline</dd>
              </div>
            </dl>
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
