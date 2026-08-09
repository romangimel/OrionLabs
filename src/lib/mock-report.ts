import {
  ATTENTION_AREAS,
  BEHAVIORAL_STATEMENTS,
  REFERENCE_PREFERENCES,
  ZODIAC_SIGNS,
  type BehavioralStatement,
} from '@/data/questionnaire';
import { mockReport, type OrionReport, type ReportInsight } from '@/data/report';
import type { QuestionnaireAnswers } from '@/lib/questionnaire-state';
import { createReportGenerationInput } from '@/lib/report-generation-input';

const BEHAVIORAL_TRAIT_BY_ANSWER: Record<BehavioralStatement, ReportInsight> = {
  'I overthink things': {
    title: 'High-resolution deliberation',
    description:
      'The profile gives routine decisions unusually thorough internal review. This produces careful judgment, while occasionally granting minor choices the governance standards of a multinational merger.',
  },
  'I trust my instincts': {
    title: 'Instinctive conviction',
    description:
      'The profile can move decisively before every variable is documented. This creates useful momentum, although the supporting evidence may arrive later with the confidence of a pre-approved conclusion.',
  },
  'I like having a plan': {
    title: 'Structured foresight',
    description:
      'The profile converts uncertainty into sequence, ownership, and next steps. Even spontaneous choices benefit from an unofficial implementation plan and a contingency path no one formally requested.',
  },
  'I adapt as I go': {
    title: 'Responsive navigation',
    description:
      'The profile remains effective while conditions change and can revise direction without ceremony. Formal plans are treated as useful opening statements rather than binding celestial legislation.',
  },
  'I usually leave things until later': {
    title: 'Deadline-activated clarity',
    description:
      'The profile can preserve energy until urgency makes the correct priority impossible to ignore. Results still arrive, though the operating model relies on deadlines providing part of the executive function.',
  },
};

function normalizeOption<T extends string>(
  value: string,
  options: readonly T[],
): T | null {
  const normalizedValue = value.trim().toLowerCase().replace(/-/g, ' ');

  return (
    options.find(
      (option) => option.toLowerCase().replace(/-/g, ' ') === normalizedValue,
    ) ?? null
  );
}

function isValidBirthDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const parsedDate = new Date(`${value}T00:00:00Z`);
  return (
    !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.toISOString().slice(0, 10) === value
  );
}

/**
 * Applies the report route's minimum completeness rules to persisted browser data.
 * Deeper runtime validation remains deferred until real generated output exists.
 */
export function canCreateMockReportFromAnswers(answers: QuestionnaireAnswers) {
  return Boolean(
    answers.firstName.trim() &&
      normalizeOption(
        answers.zodiacSign,
        ZODIAC_SIGNS.map((sign) => sign.name),
      ) &&
      isValidBirthDate(answers.birthDate) &&
      // This remains a required questionnaire answer even though it is not
      // eligible for report-generation input.
      normalizeOption(answers.pronouns, REFERENCE_PREFERENCES) &&
      normalizeOption(answers.attentionArea, ATTENTION_AREAS) &&
      normalizeOption(answers.behavioralStatement, BEHAVIORAL_STATEMENTS) &&
      createReportGenerationInput(answers),
  );
}

/**
 * Composes approved local report copy with selected questionnaire values.
 * This intentionally lightweight mock step will later be replaced by validated
 * AI output; optional free text is preserved in state but is not interpreted here.
 */
export function createMockReportFromAnswers(
  answers: QuestionnaireAnswers,
): OrionReport {
  const name = answers.firstName.trim();
  const zodiacSign =
    normalizeOption(
      answers.zodiacSign,
      ZODIAC_SIGNS.map((sign) => sign.name),
    ) ?? mockReport.subject.zodiacSign;
  const focusArea =
    normalizeOption(answers.attentionArea, ATTENTION_AREAS) ??
    mockReport.currentLifeAnalysis.focusArea;
  const behavioralStatement = normalizeOption(
    answers.behavioralStatement,
    BEHAVIORAL_STATEMENTS,
  );
  const generationInput = createReportGenerationInput(answers);
  const age = generationInput?.subject.age ?? mockReport.subject.age;

  return {
    ...mockReport,
    subject: {
      name,
      zodiacSign,
      age,
    },
    summary: {
      ...mockReport.summary,
      body: `You combine disciplined ambition with a private suspicion that every plan could still be improved. This has produced reliable progress, several excellent contingency plans, and a growing need to choose one direction before the universe schedules it on your behalf. Your ${zodiacSign} profile interprets this as strategic patience, although OrionLabs has also detected the less prestigious possibility that keeping decisions in draft form is simply part of the process.`,
    },
    personalityAnalysis: {
      overview: `A strong ${zodiacSign} baseline gives you a preference for structure, evidence, and outcomes that can be quietly measured. You can appear composed while conducting an extensive internal review of every available variable. Practicality remains important, but even an ordinary feeling may be asked to provide a fully documented rationale.`,
      traits: [
        behavioralStatement
          ? BEHAVIORAL_TRAIT_BY_ANSWER[behavioralStatement]
          : mockReport.personalityAnalysis.traits[0],
        mockReport.personalityAnalysis.traits[1],
        {
          ...mockReport.personalityAnalysis.traits[2],
          description:
            'When uncertainty rises, the profile creates order for itself and often for everyone standing nearby. This reassures others and mildly inconveniences anyone hoping to remain responsible for their own problem.',
        },
      ],
    },
    currentLifeAnalysis: {
      ...mockReport.currentLifeAnalysis,
      focusArea,
      analysis: `Momentum is building around ${focusArea.toLowerCase()}, but you may be treating preparation as a substitute for visibility. The current cycle favors work that can be shared, tested, and improved in public rather than perfected in private. Your attention remains fixed on ${focusArea.toLowerCase()}, yet your preferred method involves becoming exceptionally ready for opportunities that would benefit from knowing you exist. OrionLabs classifies this as a temporary visibility deficit with strong administrative support.`,
    },
    strengths: [
      {
        ...mockReport.strengths[0],
        description: `You can sustain effort after novelty fades, which gives your long-range plans unusual structural integrity. This is especially useful when everyone else has begun confusing reduced enthusiasm with a strategic pivot.`,
      },
      {
        ...mockReport.strengths[1],
        description:
          'When circumstances become less predictable, the profile becomes more precise, usually while privately noting who created the chaos and whether they can be trusted with future calendars.',
      },
      {
        ...mockReport.strengths[2],
        description: `Others trust your conclusions because they rarely arrive before the underlying details have been examined. A casual opinion from you may therefore have already passed through three internal review committees.`,
      },
    ],
    risks: [
      mockReport.risks[0],
      {
        ...mockReport.risks[1],
        description: `Quiet competence may leave your important work under-recognized by people who cannot evaluate what they cannot see. You may respond by becoming even more quietly competent, a strategy with limited promotional reach.`,
      },
      {
        ...mockReport.risks[2],
        description:
          'Reliability attracts additional obligations, including several that were never formally assigned. Visible competence can become an unofficial subscription service for people with less developed planning infrastructure.',
      },
    ],
    recommendedAction: {
      ...mockReport.recommendedAction,
      description: `Choose one decision connected to ${focusArea.toLowerCase()} that has remained under review, define the smallest credible next step, and complete it within seven days. Share the result before it feels entirely finished, then use real feedback instead of imagined objections to guide the next revision. Further celestial authorization is unlikely to improve the outcome, and Saturn has declined another planning meeting.`,
    },
    closingVerdict: `You are entering a high-potential period in which disciplined action will outperform immaculate preparation. The outlook is favorable, provided you take the next step before it becomes another planning document.`,
  };
}
