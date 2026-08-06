import {
  ATTENTION_AREAS,
  BEHAVIORAL_STATEMENTS,
  ZODIAC_SIGNS,
} from '@/data/questionnaire';
import type { OrionReport } from '@/data/report';
import type { QuestionnaireAnswers } from '@/lib/questionnaire-state';

export type OrbitalMarkerTone = 'gold' | 'pink' | 'violet';

export interface OrbitalMarker {
  id: string;
  angle: number;
  radius: number;
  size: number;
  tone: OrbitalMarkerTone;
}

/**
 * Stable visual instructions for the fictional subject-profile instrument.
 *
 * These values do not claim scientific meaning. They make the same confirmed
 * answers produce the same OrionLabs artifact across review, analysis, and the
 * report, so the visual feels generated rather than randomly decorative.
 */
export interface OrbitalProfileData {
  signature: string;
  subjectName: string;
  zodiacLabel: string;
  zodiacCode: string;
  focusLabel: string;
  focusCode: string;
  behaviorLabel: string;
  behaviorCode: string;
  primaryAngle: number;
  focusAngle: number;
  behaviorAngle: number;
  orbitalTilt: number;
  markers: readonly OrbitalMarker[];
}

const FOCUS_CODES = ['CR', 'RL', 'MN', 'FM', 'HL', 'PG', 'SE'] as const;
const BEHAVIOR_CODES = ['HD', 'IC', 'SF', 'RN', 'DA'] as const;
const BEHAVIOR_BY_TRAIT_TITLE: Record<string, string> = {
  'High-resolution deliberation': 'I overthink things',
  'Instinctive conviction': 'I trust my instincts',
  'Structured foresight': 'I like having a plan',
  'Responsive navigation': 'I adapt as I go',
  'Deadline-activated clarity': 'I usually leave things until later',
};

function findNormalizedIndex(value: string, options: readonly string[]) {
  const normalizedValue = value.trim().toLowerCase();
  const index = options.findIndex((option) => option.toLowerCase() === normalizedValue);

  return index >= 0 ? index : 0;
}

function normalizeAngle(angle: number) {
  return ((angle % 360) + 360) % 360;
}

/** Creates the deterministic visual profile used throughout the product payoff. */
export function createOrbitalProfile(
  answers: QuestionnaireAnswers,
): OrbitalProfileData {
  const zodiacIndex = findNormalizedIndex(
    answers.zodiacSign,
    ZODIAC_SIGNS.map((sign) => sign.name),
  );
  const focusIndex = findNormalizedIndex(answers.attentionArea, ATTENTION_AREAS);
  const behaviorIndex = findNormalizedIndex(
    answers.behavioralStatement,
    BEHAVIORAL_STATEMENTS,
  );

  const zodiacLabel = ZODIAC_SIGNS[zodiacIndex]?.name ?? 'Unassigned';
  const focusLabel = ATTENTION_AREAS[focusIndex] ?? 'Unassigned';
  const behaviorLabel = BEHAVIORAL_STATEMENTS[behaviorIndex] ?? 'Unassigned';
  const zodiacCode = zodiacLabel.slice(0, 3).toUpperCase();
  const focusCode = FOCUS_CODES[focusIndex] ?? FOCUS_CODES[0];
  const behaviorCode = BEHAVIOR_CODES[behaviorIndex] ?? BEHAVIOR_CODES[0];
  const primaryAngle = normalizeAngle(-90 + zodiacIndex * 30);
  const focusAngle = normalizeAngle(-70 + focusIndex * (360 / ATTENTION_AREAS.length));
  const behaviorAngle = normalizeAngle(
    -135 + behaviorIndex * (360 / BEHAVIORAL_STATEMENTS.length),
  );

  return {
    signature: `OL-${zodiacCode}-${focusCode}-${behaviorCode}`,
    subjectName: answers.firstName.trim() || 'Subject',
    zodiacLabel,
    zodiacCode,
    focusLabel,
    focusCode,
    behaviorLabel,
    behaviorCode,
    primaryAngle,
    focusAngle,
    behaviorAngle,
    orbitalTilt: -18 + ((zodiacIndex + focusIndex) % 7) * 6,
    markers: [
      {
        id: 'primary',
        angle: primaryAngle,
        radius: 174,
        size: 6.5,
        tone: 'gold',
      },
      {
        id: 'focus',
        angle: focusAngle,
        radius: 136,
        size: 5,
        tone: 'pink',
      },
      {
        id: 'behavior',
        angle: behaviorAngle,
        radius: 98,
        size: 4.5,
        tone: 'violet',
      },
      {
        id: 'counterpoint-a',
        angle: normalizeAngle(primaryAngle + 142 + focusIndex * 3),
        radius: 174,
        size: 3.5,
        tone: 'gold',
      },
      {
        id: 'counterpoint-b',
        angle: normalizeAngle(behaviorAngle + 188 + zodiacIndex * 2),
        radius: 136,
        size: 3,
        tone: 'pink',
      },
    ],
  };
}

/**
 * Recreates the report artifact from fields inside the immutable report snapshot.
 * Mock reports retain their original behavior marker through the first trait title;
 * future output can fall back safely without requiring questionnaire storage.
 */
export function createOrbitalProfileFromReport(
  report: OrionReport,
): OrbitalProfileData {
  return createOrbitalProfile({
    firstName: report.subject.name,
    zodiacSign: report.subject.zodiacSign,
    birthDate: '',
    pronouns: '',
    attentionArea: report.currentLifeAnalysis.focusArea,
    behavioralStatement:
      BEHAVIOR_BY_TRAIT_TITLE[report.personalityAnalysis.traits[0]?.title] ?? '',
    additionalContext: '',
  });
}
