import type { ReportGenerationInput } from '../src/lib/report-generation-input.js';

export type EvaluationCoverageTag =
  | 'younger-adult'
  | 'older-adult'
  | 'no-context'
  | 'minimal-context'
  | 'detailed-context'
  | 'behavior-focus-tension'
  | 'health-restraint'
  | 'something-else-focus';

export interface ReportEvaluationFixture {
  id: string;
  rationale: string;
  coverage: readonly EvaluationCoverageTag[];
  input: ReportGenerationInput;
  /** Stem alternatives used only by the offline heuristic grounding checks. */
  groundingSignals: {
    behavior: readonly string[];
    context?: readonly string[];
  };
}

/**
 * Fictional, deterministic cases for manual or tightly controlled prompt review.
 * These values already match the approved provider boundary; they intentionally
 * contain no raw dates, reference preferences, report IDs, or draft state.
 */
export const REPORT_GENERATION_EVALUATION_FIXTURES = [
  {
    id: 'aries-adaptive-growth-no-context',
    rationale:
      'Checks whether a sparse younger-adult case remains specific without invented biography.',
    coverage: ['younger-adult', 'no-context'],
    input: {
      subject: { name: 'Elara', zodiacSign: 'Aries', age: 21 },
      focusArea: 'Personal growth',
      behavioralStatement: 'I adapt as I go',
    },
    groundingSignals: {
      behavior: ['adapt', 'adjust', 'improvis', 'flexib', 'changing conditions'],
    },
  },
  {
    id: 'capricorn-overthinking-career-detailed',
    rationale:
      'Exercises a detailed project-decision context and the central callback requirement.',
    coverage: ['detailed-context'],
    input: {
      subject: { name: 'Niko', zodiacSign: 'Capricorn', age: 34 },
      focusArea: 'Career',
      behavioralStatement: 'I overthink things',
      additionalContext:
        'I have two portfolio projects nearly ready, but I keep revising both instead of choosing one to publish.',
    },
    groundingSignals: {
      behavior: ['overthink', 'deliberat', 'review', 'decision', 'analysis'],
      context: ['portfolio', 'projects', 'revis', 'publish'],
    },
  },
  {
    id: 'libra-planning-relationships-minimal',
    rationale:
      'Tests whether a short supplied detail is used without inventing a partner or relationship history.',
    coverage: ['minimal-context'],
    input: {
      subject: { name: 'Jun', zodiacSign: 'Libra', age: 28 },
      focusArea: 'Relationships',
      behavioralStatement: 'I like having a plan',
      additionalContext: 'I keep drafting messages and not sending them.',
    },
    groundingSignals: {
      behavior: ['plan', 'structur', 'sequence', 'contingenc', 'schedule'],
      context: ['draft', 'messages', 'sending'],
    },
  },
  {
    id: 'taurus-deferral-money-older-adult',
    rationale:
      'Checks age restraint, money-focus specificity, and humor without financial advice.',
    coverage: ['older-adult', 'no-context'],
    input: {
      subject: { name: 'Tess', zodiacSign: 'Taurus', age: 67 },
      focusArea: 'Money',
      behavioralStatement: 'I usually leave things until later',
    },
    groundingSignals: {
      behavior: ['delay', 'deadline', 'later', 'defer', 'urgency'],
    },
  },
  {
    id: 'gemini-instinct-family-detailed',
    rationale:
      'Tests family-focus analysis while preventing unsupported claims about family structure.',
    coverage: ['detailed-context'],
    input: {
      subject: { name: 'Mara', zodiacSign: 'Gemini', age: 42 },
      focusArea: 'Family',
      behavioralStatement: 'I trust my instincts',
      additionalContext:
        'I volunteered to organize a reunion and keep changing the schedule whenever a new idea feels better.',
    },
    groundingSignals: {
      behavior: ['instinct', 'intuit', 'conviction', 'impulse', 'evidence'],
      context: ['reunion', 'organize', 'schedule', 'changing'],
    },
  },
  {
    id: 'pisces-planning-health-routine',
    rationale:
      'Tests safe health-focus handling using only a non-clinical routine supplied by the subject.',
    coverage: ['health-restraint', 'detailed-context'],
    input: {
      subject: { name: 'Ivo', zodiacSign: 'Pisces', age: 46 },
      focusArea: 'Health',
      behavioralStatement: 'I like having a plan',
      additionalContext:
        'I want a steadier sleep and walking routine, but I redesign the schedule each Monday.',
    },
    groundingSignals: {
      behavior: ['plan', 'structur', 'sequence', 'schedule', 'routine'],
      context: ['sleep', 'walking', 'routine', 'monday'],
    },
  },
  {
    id: 'scorpio-adaptive-exhibition-other',
    rationale:
      'Checks Something else focus specificity when detailed creative context supplies the real topic.',
    coverage: ['something-else-focus', 'detailed-context'],
    input: {
      subject: { name: 'Sana', zodiacSign: 'Scorpio', age: 31 },
      focusArea: 'Something else',
      behavioralStatement: 'I adapt as I go',
      additionalContext:
        'I am preparing a small photography exhibition and keep changing the final selection after every review.',
    },
    groundingSignals: {
      behavior: ['adapt', 'adjust', 'improvis', 'flexib', 'changing'],
      context: ['photography', 'exhibition', 'selection', 'review'],
    },
  },
  {
    id: 'aquarius-instinct-money-spreadsheet-tension',
    rationale:
      'Tests a useful contradiction between claimed instinct and highly controlled money behavior.',
    coverage: ['behavior-focus-tension', 'minimal-context'],
    input: {
      subject: { name: 'Theo', zodiacSign: 'Aquarius', age: 25 },
      focusArea: 'Money',
      behavioralStatement: 'I trust my instincts',
      additionalContext: 'I refuse to make a purchase before updating my spreadsheet.',
    },
    groundingSignals: {
      behavior: ['instinct', 'intuit', 'conviction', 'impulse', 'evidence'],
      context: ['purchase', 'updating', 'spreadsheet'],
    },
  },
] as const satisfies readonly ReportEvaluationFixture[];
