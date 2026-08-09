import { useEffect, useMemo, useState } from 'react';
import { AnalysisLoadingExperience } from '@/components/analysis/AnalysisLoadingExperience';
import { Aurora } from '@/components/site/Aurora';
import { Logo } from '@/components/site/Logo';
import { Starfield } from '@/components/site/Starfield';
import { useMockAnalysisSequence } from '@/hooks/useMockAnalysisSequence';
import {
  canCreateMockReportFromAnswers,
  createMockReportFromAnswers,
} from '@/lib/mock-report';
import { createOrbitalProfileFromReport } from '@/lib/orbital-profile';
import {
  clearQuestionnaireDraft,
  loadQuestionnaireDraft,
} from '@/lib/questionnaire-state';
import {
  getReportById,
  saveReport,
  setActiveReportId,
  type SavedReport,
} from '@/lib/report-storage';
import { clearIncompleteQuestionnaireForExit } from '@/lib/analysis-session';

const PROCESSING_MESSAGES = [
  'Mapping behavioral resonance...',
  'Ignoring centuries of scientific consensus...',
  'Resolving ambiguity through proprietary optimism...',
  'Finalizing conclusions before reviewing the evidence...',
] as const;

const MOCK_ANALYSIS_DURATION_MS = 12_000;
const MESSAGE_INTERVAL_MS = 3_000;
const COMPLETION_PAUSE_MS = 3_000;

/**
 * Owns route-level data validation and navigation for the mock analysis flow.
 *
 * The route deliberately reads the confirmed session draft rather than
 * accepting navigation state. This survives a refresh while keeping the data
 * scoped to the current browser tab. The timed sequence remains intentionally
 * separate from the report composition that occurs on the next route.
 */
export function AnalysisPage() {
  const [draft] = useState(loadQuestionnaireDraft);
  const canRenderAnalysis = Boolean(
    draft?.pendingReportId && canCreateMockReportFromAnswers(draft.answers),
  );
  const report = useMemo(
    () => (draft && canRenderAnalysis ? createMockReportFromAnswers(draft.answers) : null),
    [canRenderAnalysis, draft],
  );
  const orbitalProfile = report ? createOrbitalProfileFromReport(report) : null;
  const { currentMessageIndex, phase } = useMockAnalysisSequence({
    durationMs: MOCK_ANALYSIS_DURATION_MS,
    messageIntervalMs: MESSAGE_INTERVAL_MS,
    messageCount: PROCESSING_MESSAGES.length,
  });

  useEffect(() => {
    if (canRenderAnalysis) {
      return;
    }

    // Remove only OrionLabs' invalid snapshot before returning to a fresh questionnaire.
    clearQuestionnaireDraft();
    window.location.replace('/questionnaire');
  }, [canRenderAnalysis]);

  useEffect(() => {
    if (!draft?.pendingReportId || !report || !canRenderAnalysis || phase !== 'complete') {
      return;
    }

    const existingReport = getReportById(draft.pendingReportId);
    const savedReport: SavedReport = existingReport ?? {
      id: draft.pendingReportId,
      createdAt: new Date().toISOString(),
      schemaVersion: 2,
      status: 'completed',
      subject: { ...report.subject },
      report,
    };

    // A stable per-run ID makes repeated effect execution resolve the same record.
    if ((!existingReport && !saveReport(savedReport)) || !setActiveReportId(savedReport.id)) {
      window.location.replace('/questionnaire');
      return;
    }

    const redirectTimer = window.setTimeout(() => {
      // Keep the ready draft through the completion pause so a refresh can
      // recover the same run; remove it immediately before leaving analysis.
      clearQuestionnaireDraft();
      window.location.assign('/report');
    }, COMPLETION_PAUSE_MS);

    return () => window.clearTimeout(redirectTimer);
  }, [canRenderAnalysis, draft, phase, report]);

  if (!draft || !canRenderAnalysis || !orbitalProfile) {
    // Returning nothing prevents protected mock content from flashing before recovery.
    return null;
  }

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-[hsl(262_48%_6%)]">
      <div aria-hidden="true" className="fixed inset-0 bg-cosmic-page">
        <Aurora className="opacity-65" />
        <Starfield density={0.48} className="opacity-50" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,hsl(262_48%_6%_/_0.1),hsl(262_48%_6%_/_0.4))]" />
      </div>

      <header className="relative z-10 border-b border-[hsl(43_60%_70%_/_0.1)] bg-[hsl(262_45%_7%_/_0.42)] backdrop-blur-lg">
        <div className="container-narrow flex h-16 items-center md:h-20">
          <a
            href="/"
            onClick={clearIncompleteQuestionnaireForExit}
            className="group flex items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.7)] focus-visible:ring-offset-4 focus-visible:ring-offset-[hsl(262_45%_7%)]"
            aria-label="Return to OrionLabs home"
          >
            <Logo className="h-8 w-8 drop-shadow-[0_0_12px_hsl(43_74%_66%_/_0.3)] transition-transform duration-500 group-hover:rotate-[18deg] motion-reduce:transform-none sm:h-9 sm:w-9" />
            <span className="font-serif text-xl tracking-tight text-foreground sm:text-2xl">
              Orion<span className="text-gradient-gold">Labs</span>
            </span>
          </a>
        </div>
      </header>

      <main className="container-narrow relative z-10 flex min-h-[calc(100svh-4.0625rem)] items-center justify-center py-4 sm:py-14 md:min-h-[calc(100svh-5.0625rem)] md:py-16 lg:py-4">
        <AnalysisLoadingExperience
          profile={orbitalProfile}
          message={PROCESSING_MESSAGES[currentMessageIndex]}
          messageIndex={currentMessageIndex}
          messageCount={PROCESSING_MESSAGES.length}
          phase={phase}
        />
      </main>
    </div>
  );
}
