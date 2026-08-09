import { useEffect, useState } from 'react';

interface AnalysisPresentationSequenceOptions {
  durationMs: number;
  messageIntervalMs: number;
  messageCount: number;
  runKey: number;
}

/** Rotates presentation copy independently from the real provider request. */
export function useAnalysisPresentationSequence({
  durationMs,
  messageIntervalMs,
  messageCount,
  runKey,
}: AnalysisPresentationSequenceOptions) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [minimumExperienceComplete, setMinimumExperienceComplete] = useState(false);

  useEffect(() => {
    setCurrentMessageIndex(0);
    setMinimumExperienceComplete(false);

    const messageTimer = window.setInterval(() => {
      setCurrentMessageIndex((currentIndex) =>
        Math.min(currentIndex + 1, messageCount - 1),
      );
    }, messageIntervalMs);

    const completionTimer = window.setTimeout(() => {
      window.clearInterval(messageTimer);
      setMinimumExperienceComplete(true);
    }, durationMs);

    return () => {
      window.clearInterval(messageTimer);
      window.clearTimeout(completionTimer);
    };
  }, [durationMs, messageCount, messageIntervalMs, runKey]);

  return { currentMessageIndex, minimumExperienceComplete };
}
