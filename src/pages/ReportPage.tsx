import { useEffect, useState } from 'react';
import { Home, RotateCcw } from 'lucide-react';
import { ClosingVerdict } from '@/components/report/ClosingVerdict';
import { CurrentLifeSection } from '@/components/report/CurrentLifeSection';
import { RecommendationSection } from '@/components/report/RecommendationSection';
import { ReportHeader } from '@/components/report/ReportHeader';
import { ReportInsightList } from '@/components/report/ReportInsightList';
import { ReportMetrics } from '@/components/report/ReportMetrics';
import { ReportSection } from '@/components/report/ReportSection';
import { Aurora } from '@/components/site/Aurora';
import { Logo } from '@/components/site/Logo';
import { Reveal } from '@/components/site/Motion';
import { Starfield } from '@/components/site/Starfield';
import { getActiveReport } from '@/lib/report-storage';
import { startNewAnalysisJourney } from '@/lib/analysis-session';
import { createSubjectSignature } from '@/lib/subject-signature';

/**
 * Resolves the private active report ID into one immutable completed snapshot,
 * then composes that report as an alternating long-form brief.
 */
export function ReportPage() {
  const [savedReport] = useState(getActiveReport);
  const [restartError, setRestartError] = useState('');
  const canRenderReport = Boolean(savedReport);

  useEffect(() => {
    if (!canRenderReport) {
      window.location.replace('/questionnaire');
    }
  }, [canRenderReport]);

  if (!savedReport || !canRenderReport) {
    // Returning nothing prevents sample content from flashing before recovery.
    return null;
  }

  const report = savedReport.report;
  const subjectSignature = createSubjectSignature(savedReport.signatureInputs);

  const handleStartAnotherAnalysis = () => {
    if (!startNewAnalysisJourney()) {
      setRestartError(
        'The current session could not be cleared. Please allow session storage and try again.',
      );
    }
  };

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-[hsl(262_48%_6%)]">
      <div aria-hidden="true" className="fixed inset-0 bg-cosmic-page">
        <Aurora className="opacity-60" />
        <Starfield density={0.46} className="opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,hsl(262_48%_6%_/_0.12),hsl(262_48%_6%_/_0.46))]" />
      </div>

      <a
        href="#report-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[hsl(266_40%_12%)] focus:px-4 focus:py-2 focus:text-sm focus:text-foreground focus:ring-2 focus:ring-primary"
      >
        Skip to report
      </a>

      <nav
        aria-label="Report navigation"
        className="relative z-10 border-b border-[hsl(43_60%_70%_/_0.1)] bg-[hsl(262_45%_7%_/_0.52)] backdrop-blur-xl"
      >
        <div className="container-narrow flex h-16 items-center justify-between md:h-20">
          <a
            href="/"
            className="group flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.7)] focus-visible:ring-offset-4 focus-visible:ring-offset-[hsl(262_45%_7%)]"
            aria-label="Return to OrionLabs home"
          >
            <Logo className="h-8 w-8 sm:h-9 sm:w-9" />
            <span className="font-serif text-xl tracking-tight text-foreground sm:text-2xl">
              Orion<span className="text-gradient-gold">Labs</span>
            </span>
          </a>
          <span className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-muted-foreground/60 sm:text-[0.68rem]">
            Analysis report
          </span>
        </div>
      </nav>

      <main
        id="report-content"
        className="container-narrow relative z-10 pb-20 sm:pb-24 md:pb-32"
      >
        <ReportHeader subject={report.subject} signature={subjectSignature} />

        <article className="space-y-5 sm:space-y-7">
          <Reveal>
            <section
              id="executive-summary"
              aria-labelledby="executive-summary-title"
              className="relative overflow-hidden rounded-[1.75rem] border border-[hsl(43_60%_70%_/_0.13)] bg-[linear-gradient(135deg,hsl(285_58%_14%_/_0.6),hsl(270_52%_8%_/_0.48))] px-5 py-14 shadow-[0_32px_110px_-52px_hsl(255_80%_2%_/_0.96)] sm:px-8 sm:py-16 md:px-10 lg:px-14 lg:py-20"
            >
              <div className="relative max-w-4xl">
                <p className="flex items-center gap-3 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/45">
                  <span className="text-[hsl(43_60%_72%)]">01</span>
                  <span aria-hidden="true" className="h-px w-7 bg-[hsl(43_60%_70%_/_0.4)]" />
                  <span className="text-[hsl(326_55%_68%)]">Executive celestial summary</span>
                </p>
                <h2
                  id="executive-summary-title"
                  className="mt-5 max-w-4xl font-serif text-4xl leading-[1.03] text-gradient-gold sm:text-5xl md:text-6xl"
                >
                  {report.summary.headline}
                </h2>
                <p className="mt-7 max-w-3xl text-base leading-[1.88] text-foreground/85 sm:text-lg md:text-xl">
                  {report.summary.body}
                </p>
              </div>
            </section>
          </Reveal>

          <Reveal>
            <ReportMetrics metrics={report.metrics} />
          </Reveal>

          <Reveal>
            <ReportSection
              id="personality-analysis"
              chapter="02"
              eyebrow="Personality architecture"
              title="A disciplined system with extensive internal governance."
              description="The model's primary reading of temperament, decision style, and supporting behavioral evidence."
            >
              <p className="text-base leading-[1.85] text-foreground/85 sm:text-lg">
                {report.personalityAnalysis.overview}
              </p>
              <div className="mt-9 border-y border-[hsl(43_60%_70%_/_0.12)] py-7">
                <h3
                  id="supporting-traits-title"
                  className="mb-7 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-[hsl(43_60%_72%)]"
                >
                  Supporting traits
                </h3>
                <ReportInsightList
                  insights={report.personalityAnalysis.traits}
                  variant="trait"
                  labelledBy="supporting-traits-title"
                />
              </div>
            </ReportSection>
          </Reveal>

          <Reveal>
            <CurrentLifeSection
              analysis={report.currentLifeAnalysis}
            />
          </Reveal>

          <Reveal>
            <ReportSection
              id="strengths-risks"
              chapter="04"
              eyebrow="Pattern review"
              title="Capability and recurring friction"
              description="The same operating habits can produce leverage or unnecessary complexity, depending on planetary oversight."
              layout="stacked"
            >
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-0">
                <section
                  aria-labelledby="strengths-title"
                  className="border-t-2 border-[hsl(43_60%_70%_/_0.38)] pt-6 lg:pr-10"
                >
                  <p className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-muted-foreground/55">
                    Productive signals
                  </p>
                  <h3
                    id="strengths-title"
                    className="mt-2 font-serif text-3xl text-gradient-gold"
                  >
                    Strengths
                  </h3>
                  <div className="mt-7">
                    <ReportInsightList
                      insights={report.strengths}
                      variant="strength"
                      labelledBy="strengths-title"
                    />
                  </div>
                </section>

                <section
                  aria-labelledby="risks-title"
                  className="border-t-2 border-[hsl(326_55%_68%_/_0.32)] pt-6 lg:border-l lg:border-t-[2px] lg:border-l-[hsl(43_60%_70%_/_0.1)] lg:pl-10"
                >
                  <p className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-muted-foreground/55">
                    Monitored patterns
                  </p>
                  <h3
                    id="risks-title"
                    className="mt-2 font-serif text-3xl text-foreground"
                  >
                    Risks and recurring patterns
                  </h3>
                  <div className="mt-7">
                    <ReportInsightList
                      insights={report.risks}
                      variant="risk"
                      labelledBy="risks-title"
                    />
                  </div>
                </section>
              </div>
            </ReportSection>
          </Reveal>

          <Reveal>
            <RecommendationSection
              recommendation={report.recommendedAction}
            />
          </Reveal>
          <Reveal>
            <ClosingVerdict
              subjectName={report.subject.name}
              verdict={report.closingVerdict}
            />
          </Reveal>
        </article>

        <aside
          aria-labelledby="report-actions-title"
          className="mt-8 flex flex-col gap-5 rounded-2xl border border-[hsl(43_60%_70%_/_0.12)] bg-[hsl(262_45%_7%_/_0.5)] p-5 backdrop-blur-lg sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <div>
            <h2 id="report-actions-title" className="font-serif text-2xl text-foreground">
              Analysis archived locally
            </h2>
            {restartError ? (
              <p role="alert" className="mt-1 text-sm text-[hsl(326_65%_74%)]">
                {restartError}
              </p>
            ) : (
              <p className="mt-1 text-sm text-muted-foreground">
                Begin a fresh calibration when you are ready.
              </p>
            )}
          </div>
          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
            <button
              type="button"
              onClick={handleStartAnotherAnalysis}
              className="group relative inline-flex h-12 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#F5E6B0] to-[#C9A24A] px-6 text-sm font-semibold text-[#070514] shadow-[0_8px_30px_-6px_hsl(43_74%_66%_/_0.4)] transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.8)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(262_45%_7%)]"
            >
              <RotateCcw
                aria-hidden="true"
                className="relative z-10 h-4 w-4"
                strokeWidth={1.5}
              />
              <span className="relative z-10">Start Another Analysis</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
            <span
              aria-hidden="true"
              className="text-center text-xs text-muted-foreground/55"
            >
              or
            </span>
            <a
              href="/"
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-[hsl(43_60%_70%_/_0.18)] px-6 text-sm font-medium text-foreground transition-colors duration-300 hover:border-[hsl(43_60%_70%_/_0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.65)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(262_45%_7%)]"
            >
              <Home aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
              Back to OrionLabs
            </a>
          </div>
        </aside>

        <p className="mt-8 text-center text-[0.68rem] leading-relaxed tracking-wide text-muted-foreground/45">
          Generated for reflection and entertainment. OrionLabs reports are not diagnostic guidance.
        </p>
      </main>
    </div>
  );
}
