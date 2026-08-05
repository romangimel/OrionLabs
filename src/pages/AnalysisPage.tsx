import { useEffect } from 'react';
import { AnalysisLoadingExperience } from '@/components/analysis/AnalysisLoadingExperience';
import { Aurora } from '@/components/site/Aurora';
import { Logo } from '@/components/site/Logo';
import { Starfield } from '@/components/site/Starfield';
import { useMockAnalysisSequence } from '@/hooks/useMockAnalysisSequence';
import { createOrbitalProfile } from '@/lib/orbital-profile';
import { loadCompletedQuestionnaireData } from '@/lib/questionnaire-state';

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
 * The route deliberately reads the confirmed session snapshot rather than
 * accepting navigation state. This survives a refresh while keeping the data
 * scoped to the current browser tab. The timed sequence remains intentionally
 * separate from the report composition that occurs on the next route.
 */
export function AnalysisPage() {
  const completedData = loadCompletedQuestionnaireData();
  const orbitalProfile = completedData
    ? createOrbitalProfile(completedData.answers)
    : null;
  const { currentMessageIndex, phase } = useMockAnalysisSequence({
    durationMs: MOCK_ANALYSIS_DURATION_MS,
    messageIntervalMs: MESSAGE_INTERVAL_MS,
    messageCount: PROCESSING_MESSAGES.length,
  });

  useEffect(() => {
    if (!completedData || phase !== 'complete') {
      return;
    }

    const redirectTimer = window.setTimeout(() => {
      window.location.assign('/report');
    }, COMPLETION_PAUSE_MS);

    return () => window.clearTimeout(redirectTimer);
  }, [completedData, phase]);

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-[hsl(262_48%_6%)]">
      <div aria-hidden="true" className="fixed inset-0 bg-cosmic-page">
        <Aurora className="opacity-45" />
        <Starfield density={0.48} className="opacity-50" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,hsl(262_48%_6%_/_0.2),hsl(262_48%_6%_/_0.72))]" />
      </div>

      <header className="relative z-10 border-b border-[hsl(43_60%_70%_/_0.1)] bg-[hsl(262_45%_7%_/_0.42)] backdrop-blur-lg">
        <div className="container-narrow flex h-16 items-center md:h-20">
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
        </div>
      </header>

      <main className="container-narrow relative z-10 flex min-h-[calc(100svh-4.0625rem)] items-center justify-center py-4 sm:py-14 md:min-h-[calc(100svh-5.0625rem)] md:py-16 lg:py-4">
        {completedData && orbitalProfile ? (
          <AnalysisLoadingExperience
            profile={orbitalProfile}
            message={PROCESSING_MESSAGES[currentMessageIndex]}
            messageIndex={currentMessageIndex}
            messageCount={PROCESSING_MESSAGES.length}
            phase={phase}
          />
        ) : (
          <section
            aria-labelledby="analysis-title"
            className="glass-strong w-full max-w-xl rounded-2xl p-8 text-center shadow-[0_28px_90px_-38px_hsl(255_80%_2%_/_0.95)] sm:p-10 md:p-12"
          >
            {/* Direct visits, expired tabs, and invalid stored payloads all recover here. */}
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[hsl(326_55%_68%)]">
              Calibration required
            </p>
            <h1
              id="analysis-title"
              className="mt-3 font-serif text-3xl leading-tight text-gradient-gold sm:text-4xl"
            >
              No profile is ready for analysis
            </h1>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              Complete the questionnaire and confirm your answers before beginning analysis.
            </p>
            <a
              href="/questionnaire"
              className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#F5E6B0] to-[#C9A24A] px-7 text-sm font-semibold text-[#070514] shadow-[0_8px_30px_-6px_hsl(43_74%_66%_/_0.4)] transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_78%)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(264_45%_8%)] motion-reduce:transform-none"
            >
              Start Questionnaire
            </a>
          </section>
        )}
      </main>
    </div>
  );
}
