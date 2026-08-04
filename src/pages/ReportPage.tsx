import { useEffect, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { Aurora } from '@/components/site/Aurora';
import { Logo } from '@/components/site/Logo';
import { Starfield } from '@/components/site/Starfield';
import { ClosingVerdict } from '@/components/report/ClosingVerdict';
import { CurrentLifeSection } from '@/components/report/CurrentLifeSection';
import { RecommendationSection } from '@/components/report/RecommendationSection';
import { ReportHeader } from '@/components/report/ReportHeader';
import { ReportInsightList } from '@/components/report/ReportInsightList';
import { ReportMetrics } from '@/components/report/ReportMetrics';
import { ReportSection } from '@/components/report/ReportSection';
import {
  canCreateMockReportFromAnswers,
  createMockReportFromAnswers,
} from '@/lib/mock-report';
import {
  clearCompletedQuestionnaireData,
  loadCompletedQuestionnaireData,
} from '@/lib/questionnaire-state';

/**
 * Resolves the confirmed questionnaire snapshot once, composes its local mock
 * report, and passes that typed data through the existing report components.
 */
export function ReportPage() {
  const [completedData] = useState(loadCompletedQuestionnaireData);
  const [restartError, setRestartError] = useState('');
  const canRenderReport = Boolean(
    completedData && canCreateMockReportFromAnswers(completedData.answers),
  );

  useEffect(() => {
    if (!canRenderReport) {
      clearCompletedQuestionnaireData();
      window.location.replace('/questionnaire');
    }
  }, [canRenderReport]);

  if (!completedData || !canRenderReport) {
    // Returning nothing prevents the static sample report from flashing before recovery.
    return null;
  }

  const report = createMockReportFromAnswers(completedData.answers);

  const handleStartAnotherAnalysis = () => {
    if (!clearCompletedQuestionnaireData()) {
      setRestartError(
        'The current session could not be cleared. Please allow session storage and try again.',
      );
      return;
    }

    window.location.assign('/questionnaire');
  };

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-[hsl(262_48%_6%)]">
      <div aria-hidden="true" className="fixed inset-0 bg-cosmic-page">
        <Aurora className="opacity-35" />
        <Starfield density={0.46} className="opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,hsl(262_48%_6%_/_0.28),hsl(262_48%_6%_/_0.78))]" />
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
            className="group flex items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.7)] focus-visible:ring-offset-4 focus-visible:ring-offset-[hsl(262_45%_7%)]"
            aria-label="Return to OrionLabs home"
          >
            <Logo className="h-8 w-8 drop-shadow-[0_0_12px_hsl(43_74%_66%_/_0.3)] transition-transform duration-500 group-hover:rotate-[18deg] motion-reduce:transform-none sm:h-9 sm:w-9" />
            <span className="font-serif text-xl tracking-tight text-foreground sm:text-2xl">
              Orion<span className="text-gradient-gold">Labs</span>
            </span>
          </a>
          <span className="text-[0.64rem] font-medium uppercase tracking-[0.2em] text-muted-foreground/60 sm:text-[0.68rem]">
            Analysis report
          </span>
        </div>
      </nav>

      <main id="report-content" className="container-narrow relative z-10 pb-20 sm:pb-24 md:pb-32">
        <ReportHeader subject={report.subject} />

        <article className="glass-strong overflow-hidden rounded-[1.75rem] shadow-[0_36px_120px_-42px_hsl(255_80%_2%_/_0.96)] sm:rounded-[2rem]">
          <section aria-labelledby="executive-summary-title" className="px-5 py-14 sm:px-8 sm:py-16 md:px-12 lg:px-16 lg:py-20">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-[hsl(326_55%_68%)]">
              Executive celestial summary
            </p>
            <h2
              id="executive-summary-title"
              className="mt-4 max-w-4xl font-serif text-4xl leading-[1.05] text-gradient-gold sm:text-5xl md:text-6xl"
            >
              {report.summary.headline}
            </h2>
            <p className="mt-7 max-w-3xl text-base leading-[1.9] text-foreground/85 sm:text-lg md:text-xl">
              {report.summary.body}
            </p>
          </section>

          <ReportMetrics metrics={report.metrics} />

          <ReportSection
            id="personality-analysis"
            eyebrow="Personality architecture"
            title="A disciplined system with extensive internal governance."
            description="The model's primary reading of temperament, decision style, and supporting behavioral evidence."
          >
            <p className="text-base leading-[1.85] text-foreground/85 sm:text-lg">
              {report.personalityAnalysis.overview}
            </p>
            <div className="mt-9 rounded-2xl border border-[hsl(43_60%_70%_/_0.12)] bg-[hsl(262_45%_7%_/_0.24)] p-5 sm:p-7">
              <h3 id="supporting-traits-title" className="mb-6 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-[hsl(43_60%_72%)]">
                Supporting traits
              </h3>
              <ReportInsightList
                insights={report.personalityAnalysis.traits}
                variant="trait"
                labelledBy="supporting-traits-title"
              />
            </div>
          </ReportSection>

          <CurrentLifeSection analysis={report.currentLifeAnalysis} />

          <ReportSection
            id="strengths-risks"
            eyebrow="Pattern review"
            title="Capability and recurring friction"
            description="The same operating habits can produce leverage or unnecessary complexity, depending on planetary oversight."
            contentClassName="lg:col-span-2"
          >
            <div className="grid gap-5 lg:grid-cols-2">
              <section
                aria-labelledby="strengths-title"
                className="rounded-2xl border border-[hsl(43_60%_70%_/_0.14)] bg-[hsl(43_74%_66%_/_0.035)] p-5 sm:p-7"
              >
                <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-muted-foreground/65">
                  Productive signals
                </p>
                <h3 id="strengths-title" className="mt-2 font-serif text-3xl text-gradient-gold">
                  Strengths
                </h3>
                <div className="mt-7">
                  <ReportInsightList insights={report.strengths} variant="strength" labelledBy="strengths-title" />
                </div>
              </section>

              <section
                aria-labelledby="risks-title"
                className="rounded-2xl border border-[hsl(326_55%_68%_/_0.14)] bg-[hsl(326_70%_45%_/_0.025)] p-5 sm:p-7"
              >
                <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-muted-foreground/65">
                  Monitored patterns
                </p>
                <h3 id="risks-title" className="mt-2 font-serif text-3xl text-foreground">
                  Risks and recurring patterns
                </h3>
                <div className="mt-7">
                  <ReportInsightList insights={report.risks} variant="risk" labelledBy="risks-title" />
                </div>
              </section>
            </div>
          </ReportSection>

          <RecommendationSection recommendation={report.recommendedAction} />
          <ClosingVerdict subjectName={report.subject.name} verdict={report.closingVerdict} />
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
          <button
            type="button"
            onClick={handleStartAnotherAnalysis}
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-[hsl(43_60%_70%_/_0.24)] px-6 text-sm font-medium text-foreground/85 transition-colors duration-300 hover:border-[hsl(43_60%_70%_/_0.5)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.65)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(262_45%_7%)]"
          >
            <RotateCcw aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
            Start Another Analysis
          </button>
        </aside>

        <p className="mt-8 text-center text-[0.68rem] leading-relaxed tracking-wide text-muted-foreground/45">
          This report uses temporary local mock content. No AI generation or diagnostic service is active.
        </p>
      </main>
    </div>
  );
}
