import { useEffect, useMemo, useState } from 'react';
import {
  AnalysisLoadingExperience,
  type AnalysisPhase,
} from '@/components/analysis/AnalysisLoadingExperience';
import { Aurora } from '@/components/site/Aurora';
import { Logo } from '@/components/site/Logo';
import { Starfield } from '@/components/site/Starfield';
import { REFERENCE_PREFERENCES } from '@/data/questionnaire';
import { useAnalysisPresentationSequence } from '@/hooks/useAnalysisPresentationSequence';
import {
  ANALYSIS_CALIBRATION_MESSAGES,
  ANALYSIS_CALIBRATION_STAGE_STARTS_MS,
} from '@/lib/analysis-presentation';
import { clearIncompleteQuestionnaireForExit } from '@/lib/analysis-session';
import { resolveAnalysisRouteDestination } from '@/lib/analysis-route';
import {
  ReportGenerationRequestError,
  requestGeneratedReport,
} from '@/lib/report-generation-client';
import { createReportGenerationInput } from '@/lib/report-generation-input';
import {
  clearQuestionnaireDraft,
  loadQuestionnaireDraft,
} from '@/lib/questionnaire-state';
import {
  getActiveReport,
  getReportById,
  persistGeneratedReport,
} from '@/lib/report-storage';
import {
  createSubjectSignatureFromAnswers,
  createSubjectSignatureInput,
  SUBJECT_SIGNATURE_TIMELINE,
} from '@/lib/subject-signature';

const MINIMUM_ANALYSIS_DURATION_MS = SUBJECT_SIGNATURE_TIMELINE.totalSeconds * 1_000;
const COMPLETION_PAUSE_MS = 3_000;

type GenerationStatus = 'loading' | 'succeeded' | 'failed' | 'capacity';

/**
 * Owns the secure questionnaire-to-function request, report persistence, and
 * route navigation while the existing loading UI remains presentation-only.
 */
export function AnalysisPage() {
  const [activeCompletedReport] = useState(getActiveReport);
  const [draft] = useState(loadQuestionnaireDraft);
  const generationInput = useMemo(
    () => (draft ? createReportGenerationInput(draft.answers) : null),
    [draft],
  );
  const signatureInputs = useMemo(
    () => (draft ? createSubjectSignatureInput(draft.answers) : null),
    [draft],
  );
  const hasRequiredReferencePreference = Boolean(
    draft &&
      REFERENCE_PREFERENCES.includes(
        draft.answers.pronouns as (typeof REFERENCE_PREFERENCES)[number],
      ),
  );
  const canRenderAnalysis = Boolean(
    draft?.pendingReportId &&
      generationInput &&
      signatureInputs &&
      hasRequiredReferencePreference,
  );
  const routeDestination = resolveAnalysisRouteDestination(
    Boolean(activeCompletedReport),
    canRenderAnalysis,
  );
  const [generatedReport, setGeneratedReport] = useState(() =>
    draft?.pendingReportId ? getReportById(draft.pendingReportId)?.report ?? null : null,
  );
  const [generationStatus, setGenerationStatus] = useState<GenerationStatus>(
    generatedReport ? 'succeeded' : 'loading',
  );
  const [attempt, setAttempt] = useState(0);
  const subjectSignature =
    draft && canRenderAnalysis
      ? createSubjectSignatureFromAnswers(draft.answers)
      : null;
  const { minimumExperienceComplete, rowStates } =
    useAnalysisPresentationSequence({
      durationMs: MINIMUM_ANALYSIS_DURATION_MS,
      stageStartMs: ANALYSIS_CALIBRATION_STAGE_STARTS_MS,
      runKey: attempt,
    });

  useEffect(() => {
    if (!routeDestination) {
      return;
    }

    if (routeDestination === '/questionnaire') {
      clearQuestionnaireDraft();
    }

    window.location.replace(routeDestination);
  }, [routeDestination]);

  useEffect(() => {
    if (
      !draft?.pendingReportId ||
      !generationInput ||
      !canRenderAnalysis ||
      generatedReport
    ) {
      return;
    }

    let isCurrentRequest = true;
    setGenerationStatus('loading');

    requestGeneratedReport(
      generationInput,
      `${draft.pendingReportId}:${attempt}`,
    ).then(
      (report) => {
        if (isCurrentRequest) {
          setGeneratedReport(report);
          setGenerationStatus('succeeded');
        }
      },
      (error) => {
        if (isCurrentRequest) {
          setGenerationStatus(
            error instanceof ReportGenerationRequestError && error.kind === 'capacity'
              ? 'capacity'
              : 'failed',
          );
        }
      },
    );

    return () => {
      // The shared request continues across React Strict Mode's effect replay;
      // only the obsolete effect callback is prevented from updating state.
      isCurrentRequest = false;
    };
  }, [
    attempt,
    canRenderAnalysis,
    draft,
    generatedReport,
    generationInput,
  ]);

  useEffect(() => {
    if (
      !draft?.pendingReportId ||
      !generatedReport ||
      !signatureInputs ||
      !canRenderAnalysis ||
      !minimumExperienceComplete ||
      generationStatus !== 'succeeded'
    ) {
      return;
    }

    const savedReport = persistGeneratedReport(
      draft.pendingReportId,
      generatedReport,
      signatureInputs,
    );
    if (!savedReport) {
      setGenerationStatus('failed');
      return;
    }

    const redirectTimer = window.setTimeout(() => {
      // A failed request never reaches this point, so its questionnaire data
      // remains available for retry without asking the subject to start over.
      clearQuestionnaireDraft();
      window.location.assign('/report');
    }, COMPLETION_PAUSE_MS);

    return () => window.clearTimeout(redirectTimer);
  }, [
    canRenderAnalysis,
    draft,
    generatedReport,
    generationStatus,
    minimumExperienceComplete,
    signatureInputs,
  ]);

  if (routeDestination || !draft || !subjectSignature) {
    return null;
  }

  const phase: AnalysisPhase =
    generationStatus === 'capacity'
      ? 'capacity'
      : generationStatus === 'failed'
      ? 'error'
      : generatedReport && minimumExperienceComplete
        ? 'complete'
        : 'loading';

  const handleRetry = () => {
    if (generatedReport) {
      // Storage failures can be retried without paying for another model call.
      setGenerationStatus('succeeded');
      return;
    }

    setAttempt((currentAttempt) => currentAttempt + 1);
    setGenerationStatus('loading');
  };

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
            className="group flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.7)] focus-visible:ring-offset-4 focus-visible:ring-offset-[hsl(262_45%_7%)]"
            aria-label="Return to OrionLabs home"
          >
            <Logo className="h-8 w-8 sm:h-9 sm:w-9" />
            <span className="font-serif text-xl tracking-tight text-foreground sm:text-2xl">
              Orion<span className="text-gradient-gold">Labs</span>
            </span>
          </a>
        </div>
      </header>

      <main className="container-narrow relative z-10 flex min-h-[calc(100svh-4.0625rem)] items-center justify-center py-4 sm:py-10 md:min-h-[calc(100svh-5.0625rem)] md:py-12 lg:py-4">
        <AnalysisLoadingExperience
          signature={subjectSignature}
          messages={ANALYSIS_CALIBRATION_MESSAGES}
          rowStates={rowStates}
          phase={phase}
          onRetry={handleRetry}
        />
      </main>
    </div>
  );
}
