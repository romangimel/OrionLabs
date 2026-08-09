/** A titled observation that can be reused across report sections. */
export interface ReportInsight {
  title: string;
  description: string;
}

/** Defines the data contract that the future report UI will consume. */
export interface OrionReport {
  subject: {
    name: string;
    zodiacSign: string;
    age: number;
  };
  summary: {
    headline: string;
    body: string;
  };
  personalityAnalysis: {
    overview: string;
    traits: ReportInsight[];
  };
  currentLifeAnalysis: {
    focusArea: string;
    headline: string;
    analysis: string;
    forecast: string;
  };
  strengths: ReportInsight[];
  risks: ReportInsight[];
  recommendedAction: {
    title: string;
    description: string;
  };
  metrics: {
    id: string;
    label: string;
    value: number;
    interpretation: string;
  }[];
  closingVerdict: string;
}

/** Temporary local content used until AI report generation is implemented. */
export const mockReport: OrionReport = {
  subject: {
    name: 'Maya',
    zodiacSign: 'Capricorn',
    age: 32,
  },
  summary: {
    headline: 'Strategic patience is approaching its operational limit.',
    body: 'Maya combines disciplined ambition with a private suspicion that every plan could still be improved. This has produced reliable progress, several excellent contingency plans, and a growing need to choose one direction before the universe schedules it on her behalf. Her Capricorn profile interprets this as strategic patience, although OrionLabs has also detected the less prestigious possibility that she simply enjoys keeping decisions in draft form.',
  },
  personalityAnalysis: {
    overview:
      'A strong Capricorn baseline gives Maya a preference for structure, evidence, and outcomes that can be quietly measured. Her profile suggests she is most comfortable appearing composed while conducting an extensive internal review of every available variable. She values practicality, but has been known to require a fully documented rationale before accepting that an ordinary feeling might simply be a feeling.',
    traits: [
      {
        title: 'Measured ambition',
        description:
          'She pursues meaningful goals steadily and rarely requires public enthusiasm to maintain momentum. This makes her dependable, while ensuring even spontaneous choices arrive with an unofficial implementation plan.',
      },
      {
        title: 'Selective openness',
        description:
          'New ideas are welcomed after they complete an informal but surprisingly rigorous internal procurement process. By the time approval is granted, the idea may already consider itself established practice.',
      },
      {
        title: 'Protective competence',
        description:
          'When uncertainty rises, she creates order for herself and often for everyone standing nearby. This reassures others and mildly inconveniences anyone hoping to remain responsible for their own problem.',
      },
    ],
  },
  currentLifeAnalysis: {
    focusArea: 'Career',
    headline: 'The next move requires commitment, not additional calibration.',
    analysis:
      'Professional momentum is building, but Maya may be treating preparation as a substitute for visibility. The current cycle favors work that can be shared, tested, and improved in public rather than perfected in private. Her attention remains fixed on career progress, yet her preferred method involves becoming exceptionally ready for opportunities that would benefit from knowing she exists. OrionLabs classifies this as a temporary visibility deficit with strong administrative support.',
    forecast:
      'Over the next six weeks, a modest but concrete decision is likely to create more leverage than a comprehensive new strategy. Saturn has reviewed the documentation and considers it sufficient.',
  },
  strengths: [
    {
      title: 'Long-range focus',
      description:
        'Maya can sustain effort after novelty fades, which gives her plans unusual structural integrity. This is especially useful when everyone else has begun confusing reduced enthusiasm with a strategic pivot.',
    },
    {
      title: 'Calm under pressure',
      description:
        'She becomes more precise when circumstances become less predictable, usually while privately noting who created the chaos and whether they can be trusted with future calendars.',
    },
    {
      title: 'Credible judgment',
      description:
        'Others trust her conclusions because she rarely presents one before examining the underlying details. A casual opinion from Maya may therefore have already passed through three internal review committees.',
    },
  ],
  risks: [
    {
      title: 'Decision overqualification',
      description:
        'A sensible desire for certainty can extend routine choices into multi-phase research initiatives. Minor decisions may receive risk assessments normally reserved for infrastructure procurement.',
    },
    {
      title: 'Invisible progress',
      description:
        'Quiet competence may leave important work under-recognized by people who cannot evaluate what they cannot see. Maya occasionally responds by becoming even more quietly competent, a strategy with limited promotional reach.',
    },
    {
      title: 'Responsibility accumulation',
      description:
        'Reliability attracts additional obligations, including several that were never formally assigned. Her visible competence has become an unofficial subscription service for people with less developed planning infrastructure.',
    },
  ],
  recommendedAction: {
    title: 'Publish the useful version',
    description:
      'Choose one career decision that has remained under review, define the smallest credible next step, and complete it within seven days. Share the result before it feels entirely finished, then use real feedback instead of imagined objections to guide the next revision. Further celestial authorization is unlikely to improve the outcome, and Saturn has declined another planning meeting.',
  },
  metrics: [
    {
      id: 'decision-latency',
      label: 'Decision Latency',
      value: 72,
      interpretation: 'Elevated but stable',
    },
    {
      id: 'celestial-alignment',
      label: 'Celestial Alignment',
      value: 86,
      interpretation: 'Consistently above baseline',
    },
    {
      id: 'advice-resistance',
      label: 'Advice Resistance',
      value: 64,
      interpretation: 'Requires mild supervision',
    },
  ],
  closingVerdict:
    'Maya is entering a high-potential period in which disciplined action will outperform immaculate preparation. The outlook is favorable, provided the next step is taken before it becomes another planning document.',
};
