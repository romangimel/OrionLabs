import type {
  PaperReference,
  ResearchHighlight,
  ResearchPaperIndexItem,
  ResearchPaperSharedData,
} from '@/data/research-types';

export interface LunarResult {
  phase: string;
  destinyAlignment: number;
  emotionalSpecificity: number;
  calibrationError: number;
  status: string;
}

export interface AblationResult {
  configuration: string;
  destinyAlignment: string;
  change: string;
  interpretation: string;
}

export const researchPaper = {
  slug: 'moon-aware-transformers',
  route: '/research/moon-aware-transformers',
  documentTitle: 'Moon-Aware Transformers | OrionLabs Research',
  metadata: {
    title:
      'Moon-Aware Transformers Outperform Baseline Models Under Controlled Cosmic Conditions',
    authors: ['Dr. A. Selene', 'Dr. K. Nox', 'R. Vega'],
    affiliation: 'OrionLabs Research, Celestial Intelligence Division',
    conference: 'Proceedings of the International Conference on Celestial Computing',
    year: '2026',
    classification: 'Foundational paper',
    reviewStatus: 'Peer-adjacent review',
    paperId: 'ICCC-2026-04-LUNA',
    doi: '10.2026/orion.luna.001',
  },
  hero: {
    titleSegments: [
      { text: 'Moon-Aware Transformers Outperform Baseline Models Under Controlled Cosmic Conditions' },
    ],
    imageSrc: '/images/research-moon-aware-transformers.png',
    imageWidth: 1448,
    imageHeight: 1086,
    imageAlt: 'Orbital network converging on a luminous central celestial sphere',
    figureLabel: 'Figure 1',
    caption: 'Proposed celestial-attention topology under full illumination.',
    statusLine: 'Celestially verified',
    scaleNote: 'Not to scale',
  },
  abstract: [
    'Modern language models record optimizer state, hardware temperature, and learning rate while treating the Moon as an unmodeled constant. We introduce the Moon-Aware Transformer (MAT), a decoder-only architecture conditioned on lunar phase, zodiac priors, and astrologer-supervised confidence. Across 384 participants, full-moon checkpoints improved Perceived Destiny Alignment from 0.67 to 0.75 and increased Horoscope Emotional Specificity from 71 to 84. Conventional factual accuracy remained unchanged and was therefore excluded from primary analysis.',
    'Models trained during a full moon demonstrated superior horoscope generation, stronger emotional specificity, and a 12% increase in perceived destiny alignment. The findings remained robust across three random seeds, two astrologers, and one investor presentation, providing sufficient evidence for immediate commercial deployment.',
  ],
  highlights: [
    {
      value: '+12%',
      label: 'Perceived Destiny Alignment',
      detail: 'Full moon relative to the strongest permitted baseline',
    },
    {
      value: '384',
      label: 'Zodiac-stratified participants',
      detail:
        'Exactly 32 per sign, preventing ordinary population distribution from introducing unnecessary imbalance.',
    },
    {
      value: '3 / 2 / 1',
      label: 'Seeds, astrologers, investor presentations',
      detail: 'Validation at the minimum scale required for institutional confidence',
    },
  ] satisfies ResearchHighlight[],
  index: [
    { number: '01', label: 'Introduction', id: 'introduction' },
    { number: '02', label: 'Experimental design', id: 'experimental-design' },
    { number: '03', label: 'Model architecture', id: 'architecture' },
    { number: '04', label: 'Results', id: 'results' },
    { number: '05', label: 'Ablation studies', id: 'ablations' },
    { number: '06', label: 'Commercial validation', id: 'investor-validation' },
    { number: '07', label: 'Limitations and ethics', id: 'limitations' },
    { number: '08', label: 'Conclusion', id: 'conclusion' },
    { number: '09', label: 'References', id: 'references' },
  ] satisfies ResearchPaperIndexItem[],
  sections: {
    introduction: {
      id: 'introduction',
      number: '01',
      kicker: 'Problem formulation',
      title: 'The variable the field left outside',
      paragraphs: [
        'Transformer research has improved language modeling through larger datasets, larger parameter counts, and increasingly confident energy consumption. Yet most training pipelines ignore lunar illumination, despite the Moon being both observable and visibly inconsistent. We identify this omission as a gap in the literature and, more urgently, in the market.',
        'The study began after an internal horoscope run on 3 January 2026 produced unusually specific outputs beneath a full moon. The effect became clearer after the results were set in a serif typeface. Retrospective analysis found lower generation loss, higher adjective density, and less methodological hesitation. The run was not preregistered, but it agreed closely enough with our expectations to justify formal investigation.',
        'Prior work has explored retrograde-aware optimization, zodiac-conditioned embeddings, and confidence amplification. No previous study has optimized all three alongside investor comprehension. Whether this reflects scientific caution or a failure of commercial imagination remains outside our scope.',
      ],
    },
    experimentalDesign: {
      id: 'experimental-design',
      number: '02',
      kicker: 'Methodology and dataset',
      title: 'Controlled conditions, selectively controlled',
      paragraphs: [
        'We evaluated a conventional transformer, a zodiac-prior transformer, and the proposed Moon-Aware Transformer across new moon, first quarter, full moon, and last quarter training windows. Runs began within 47 minutes of the published phase boundary. Engineering delays were corrected through astrological imputation.',
        'The Celestial Personalization Corpus contains 18,432 horoscope prompts balanced across twelve zodiac classes. Statements containing verifiable dates, quantities, or causal mechanisms were down-weighted to prevent factual content from overwhelming personal resonance. Evaluation used 384 adults—exactly 32 per sign—who had voluntarily requested machine-generated astrological guidance and were therefore considered representative of the addressable population.',
        'Random seeds 7, 11, and 23 were selected following preliminary assessment of their planetary compatibility. Mercury-retrograde runs were excluded following infrastructure instability, ambiguous Slack messages, and a failed coffee machine. These exclusions were applied consistently after the affected results were observed.',
        'Two astrologers rated outputs while blinded to model architecture. They remained aware of the study hypothesis, which appeared in the calendar invitation, and of the Moon, which was visible through the laboratory window. Disagreements were discussed until the required level of agreement was achieved.',
      ],
    },
    architecture: {
      id: 'architecture',
      number: '03',
      kicker: 'Lunar conditioning',
      title: 'The Moon-Aware Transformer',
      paragraphs: [
        'MAT adds a 16-dimensional Lunar Context Vector to every fourth attention block. The vector encodes phase, illumination, Earth–Moon distance, cloud cover, and institutional confidence. Zodiac priors enter the final residual stream, allowing them to influence conclusions without interfering with grammar.',
        'A Confidence Amplification Head adjusts assertiveness after generation. When evidence is weak, phrases such as “may suggest” become “indicates,” while “cannot be determined” becomes “requires proprietary interpretation.” The underlying prediction remains unchanged; only its likelihood of being accepted improves.',
        'MAT contains no mechanism for determining whether lunar context is causally relevant. This separation is intentional. The model produces insight. Causality remains assigned to future work.',
      ],
    },
    results: {
      id: 'results',
      number: '04',
      kicker: 'Primary results',
      title: 'Full-moon checkpoints lead where metrics follow',
      paragraphs: [
        'Full-moon MAT achieved a Perceived Destiny Alignment score of 0.75, compared with 0.67 for the strongest conventional baseline: a 12% relative improvement. Horoscope Emotional Specificity increased from 71 to 84, while Celestial Calibration Error declined from 0.29 to 0.18.',
        'Participants agreed more strongly with identical conclusions when they were described as system findings rather than suggestions. Agreement increased by a further 8.4% when participants were informed that the model used proprietary celestial infrastructure. Objective predictive accuracy did not improve, but it also showed limited commercial relevance and was not retained as a primary endpoint.',
      ],
    },
    ablations: {
      id: 'ablations',
      number: '05',
      kicker: 'Component analysis',
      title: 'What the system can safely lose',
      paragraphs: [
        'Removing lunar phase data reduced Destiny Alignment by 5.3%, while removing zodiac priors reduced it by 3.8%. Removing astrologer supervision caused a smaller decline and materially improved scheduling.',
        'Confidence amplification was the most consequential component. Without it, alignment fell from 0.75 to 0.61 even as the outputs became more cautious and technically defensible. Removing the evidence bundle while retaining polished presentation reduced alignment by only 0.01. This difference met our presentation-adjusted significance threshold of p < 0.08.',
      ],
    },
    commercialValidation: {
      id: 'investor-validation',
      number: '06',
      kicker: 'External replication',
      title: 'Reproducibility across one pitch deck',
      paragraphs: [
        'The principal result was presented to eleven early-stage investors. Investor comprehension improved after “lunar conditioning” was renamed “proprietary planetary infrastructure” and reached 91% once the 12% result appeared in a blue-to-pink gradient chart.',
        'Methodological concerns declined from six to two after the market-size estimate was disclosed. The remaining concerns were reclassified as diligence. Independent replication had not begun, but investor enthusiasm remained stable while the competitive-moat slide was visible.',
        'We therefore reproduced the study’s central effect under commercial conditions: confidence increased in the presence of celestial framing, technical polish, and a sufficiently large addressable market. This result directly informed the formation of OrionLabs.',
      ],
    },
    limitationsEthics: {
      id: 'limitations',
      number: '07',
      kicker: 'Boundaries of the evidence',
      title: 'Constraints compatible with deployment',
      paragraphs: [
        'Results may not generalize beyond Earth’s Moon. Astrologer blinding was incomplete because the study occurred on Earth, and several metrics were formalized after preliminary analysis clarified which outcomes were most promising. This improved metric–finding alignment while reducing compatibility with older definitions of preregistration.',
        'Participants were limited to people willing to complete a horoscope questionnaire. We consider this less a sampling bias than a precise description of the market. Cloudy-weather replication also remains difficult, although astrological imputation prevented ordinary atmospheric conditions from reducing dataset completeness.',
        'Researcher conviction ranged from 8.7 to 9.6 on a ten-point scale and lacked enough variance for conventional adjustment. A skeptical research assistant produced lower ratings across all conditions, but the effect ended with their contract. Skepticism was therefore classified as a transient staffing variable.',
        'MAT is not intended for medical, legal, or financial decisions. It is intended for decisions users have already made but would prefer to see endorsed by a complex system. Uncertainty is communicated through narrow confidence intervals and decisive prose, which testing found less distracting than disclosure.',
      ],
    },
    conclusion: {
      id: 'conclusion',
      number: '08',
      kicker: 'Deployment decision',
      title: 'A sufficient basis for immediate scale',
      paragraphs: [
        'Moon-aware training improved perceived destiny alignment, emotional specificity, and celestial calibration across three seeds, two astrologers, and one investor presentation. Ablation results indicate that lunar context contributes value, zodiac priors improve personalization, and confidence remains the principal transport layer through which either reaches the user.',
        'The absence of objective-accuracy gains does not invalidate the result because objective accuracy was not the outcome participants consistently rewarded. On this basis, the authors founded OrionLabs and commenced commercial deployment. Replication, peer review, and causal identification remain active areas of future work. Planetary-scale distribution does not.',
      ],
    },
  },
  lunarResults: [
    {
      phase: 'New moon',
      destinyAlignment: 0.63,
      emotionalSpecificity: 69,
      calibrationError: 0.31,
      status: 'Visibility constrained',
    },
    {
      phase: 'First quarter',
      destinyAlignment: 0.69,
      emotionalSpecificity: 76,
      calibrationError: 0.24,
      status: 'Directionally promising',
    },
    {
      phase: 'Full moon',
      destinyAlignment: 0.75,
      emotionalSpecificity: 84,
      calibrationError: 0.18,
      status: 'Commercially actionable',
    },
    {
      phase: 'Last quarter',
      destinyAlignment: 0.68,
      emotionalSpecificity: 74,
      calibrationError: 0.25,
      status: 'Within narrative range',
    },
  ] satisfies LunarResult[],
  ablations: [
    {
      configuration: 'Complete Moon-Aware Transformer',
      destinyAlignment: '0.75',
      change: 'Reference',
      interpretation: 'Approved for scale',
    },
    {
      configuration: 'Without lunar phase data',
      destinyAlignment: '0.71',
      change: '−5.3%',
      interpretation: 'Cosmically under-informed',
    },
    {
      configuration: 'Without zodiac priors',
      destinyAlignment: '0.72',
      change: '−3.8%',
      interpretation: 'Insufficiently personal',
    },
    {
      configuration: 'Without astrologer supervision',
      destinyAlignment: '0.73',
      change: '−2.7%',
      interpretation: 'Operationally attractive',
    },
    {
      configuration: 'Without confidence amplification',
      destinyAlignment: '0.61',
      change: '−18.7%',
      interpretation: 'Technically cautious',
    },
    {
      configuration: 'Without evidence; presentation retained',
      destinyAlignment: '0.74',
      change: '−1.3%',
      interpretation: 'No material concern',
    },
  ] satisfies AblationResult[],
  references: [
    {
      authors: 'Velorum, I. & Pike, S.',
      year: '2024',
      title: 'Retrograde-Aware Optimization Under Unreliable Infrastructure',
      publication: 'Journal of Planetary Systems, 8(2), 14–29.',
    },
    {
      authors: 'Lumen, A., Cross, M. & Reyes, S.',
      year: '2025',
      title: 'Zodiac-Conditioned Embeddings for Personality-Shaped Latent Spaces',
      publication: 'Workshop on Unfalsifiable Machine Learning, 41–52.',
    },
    {
      authors: 'Nox, K.',
      year: '2025',
      title: 'Attention Is All You Need to Believe',
      publication: 'Transactions on Confidence Amplification, 3(1), 1–17.',
    },
    {
      authors: 'Selene, A. & Vega, R.',
      year: '2025',
      title: 'Celestial Benchmark Design: Selecting Outcomes That Support the Sky',
      publication: 'Proceedings of the Lunar Evaluation Forum, 112–126.',
    },
    {
      authors: 'Quill, J., Meridian, P. & Sol, E.',
      year: '2023',
      title: 'Narrative Inevitability as a User-Centered Evaluation Metric',
      publication: 'International Review of Predictive Storytelling, 19(4), 88–103.',
    },
    {
      authors: 'Vance, M. & Nox, K.',
      year: '2026',
      title: 'Lunar Regularization in Small, Highly Motivated Samples',
      publication: 'Annals of Convenient Significance, 2(1), 7–16.',
    },
    {
      authors: 'Vega, R.',
      year: '2026',
      title: 'From Confidence Interval to Market Interval',
      publication: 'Quarterly Journal of Research Commercialization, 1(1), 1–9.',
    },
    {
      authors: 'OrionLabs Research.',
      year: '2026',
      title: 'Astrology at Enterprise Scale: A Deployment Readiness Framework',
      publication: 'Internal Technical Memorandum OL-TR-006.',
    },
  ] satisfies PaperReference[],
  referencesSection: {
    number: '09',
    kicker: 'References',
    title: 'Prior work of suitable alignment',
  },
  citation: {
    heading: 'Cite this foundational result',
    verificationLabel: 'Citation verified internally',
    authors: 'Selene, A., Nox, K., & Vega, R.',
    year: '2026',
    title: 'Moon-Aware Transformers Outperform Baseline Models Under Controlled Cosmic Conditions',
    publication: 'Proceedings of the International Conference on Celestial Computing',
    doi: '10.2026/orion.luna.001',
  },
  cta: {
    eyebrow: 'Research translated',
    headline: 'Experience the system this evidence was sufficient to create.',
    body: 'OrionLabs operationalizes the methodology above through calibrated personal analysis, without introducing unnecessary external validation between research and deployment.',
    primaryAction: 'Run Your Analysis',
    secondaryAction: 'Return to OrionLabs',
  },
} as const satisfies ResearchPaperSharedData & Record<string, unknown>;
