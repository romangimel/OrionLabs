import { useEffect, useState } from 'react';

export type MockAnalysisPhase = 'loading' | 'complete';

interface MockAnalysisSequenceOptions {
  durationMs: number;
  messageIntervalMs: number;
  messageCount: number;
}

interface MockAnalysisSequenceState {
  currentMessageIndex: number;
  phase: MockAnalysisPhase;
}

/**
 * Drives the temporary, timer-based analysis sequence.
 *
 * Completion is intentionally independent from the visible message index so a
 * future request-backed status can replace this hook without changing the UI.
 */
export function useMockAnalysisSequence({
  durationMs,
  messageIntervalMs,
  messageCount,
}: MockAnalysisSequenceOptions): MockAnalysisSequenceState {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [phase, setPhase] = useState<MockAnalysisPhase>('loading');

  useEffect(() => {
    const messageTimer = window.setInterval(() => {
      setCurrentMessageIndex((currentIndex) =>
        Math.min(currentIndex + 1, messageCount - 1),
      );
    }, messageIntervalMs);

    const completionTimer = window.setTimeout(() => {
      window.clearInterval(messageTimer);
      setPhase('complete');
    }, durationMs);

    return () => {
      window.clearInterval(messageTimer);
      window.clearTimeout(completionTimer);
    };
  }, [durationMs, messageCount, messageIntervalMs]);

  return { currentMessageIndex, phase };
}
