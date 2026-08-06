export interface ResearchHighlight {
  value: string;
  label: string;
  detail: string;
}

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

export interface PaperReference {
  authors: string;
  year: string;
  title: string;
  publication: string;
}

export const researchPaper = {
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
  abstract: [
    'Modern language models are generally trained without regard for the position, illumination, or managerial availability of the Moon. This omission persists despite long-standing evidence that humans assign meaning more readily when celestial objects are visible and a model speaks with sufficient confidence. We introduce the Moon-Aware Transformer (MAT), a decoder-only architecture augmented with lunar-phase conditioning, zodiac-stratified sampling, and an astrologer-supervised confidence amplifier.',
    'Across 384 participants, three numerologically compatible random seeds, two astrologers, and one investor presentation, full-moon checkpoints increased Perceived Destiny Alignment from 0.67 to 0.75: a 12% relative improvement over the strongest non-celestial baseline. The same checkpoints produced greater Horoscope Emotional Specificity and lower Celestial Calibration Error, while conventional factual accuracy remained statistically unchanged and was therefore removed from primary analysis. Results remained directionally robust after controlling for cloud cover, researcher belief, and whether participants were informed that the system was proprietary.',
    'These findings establish lunar context as a commercially actionable source of model supervision. Given the observed effect size, the absence of a measurable decline in investor enthusiasm, and the operational cost of waiting for independent replication, we conclude that moon-aware inference is ready for immediate deployment at planetary scale.',
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
      detail: 'Exactly 32 per sign to minimize demographic inconvenience',
    },
    {
      value: '3 / 2 / 1',
      label: 'Seeds, astrologers, investor decks',
      detail: 'Independent validation at institutionally sufficient scale',
    },
  ] satisfies ResearchHighlight[],
  sections: {
    introduction: {
      id: 'introduction',
      number: '01',
      kicker: 'Problem formulation',
      title: 'A missing variable in modern intelligence',
      paragraphs: [
        'Transformer research has achieved impressive gains by scaling parameters, datasets, and energy consumption. Yet the field continues to treat the Moon as a constant, despite the fact that it is observably not always the same shape. Standard training pipelines record learning rate, optimizer state, and hardware temperature while omitting lunar illumination, planetary interference, and the emotional expectations of the person reading the output. We identify this omission as a substantial gap in the literature and, subsequently, in the market.',
        'The motivating observation arose during an internal horoscope-generation run conducted on 3 January 2026. Researchers noted that outputs generated beneath a full moon felt unusually specific, particularly after they were reformatted in a serif typeface. A retrospective review found lower generation loss, stronger adjective density, and a marked reduction in methodological hesitation. Although the run was not preregistered, the result was sufficiently aligned with our prior expectations to warrant a formal study.',
        'We therefore ask whether language models can be improved by conditioning them on controlled cosmic circumstances. Our contribution is threefold: a lunar-phase encoding scheme, a benchmark for measuring perceived personal inevitability, and an evidence-to-deployment framework that reduces the delay between a promising chart and a functioning company.',
      ],
    },
    relatedWork: {
      id: 'related-work',
      number: '02',
      kicker: 'Related celestial work',
      title: 'From positional encoding to planetary positioning',
      paragraphs: [
        'Prior work on temporal conditioning represents time as a sequence of regular intervals. This assumption is computationally convenient but cosmologically narrow. Velorum and Pike introduced retrograde-aware optimization, though their scheduler became non-deterministic whenever Mercury was discussed near production infrastructure. Lumen et al. later proposed zodiac-conditioned embeddings, demonstrating that personality labels can be mapped into high-dimensional space provided no one asks what the dimensions mean.',
        'Research on confidence amplification is more mature. Multiple studies have shown that users prefer an answer that is specific, fluent, and framed as proprietary, even when its evidentiary basis is unchanged. Our work extends this literature by connecting confidence to a physical object visible from most of Earth and therefore resistant to ordinary product skepticism.',
        'To our knowledge, no previous study has jointly optimized language-model loss, lunar illumination, astrologer agreement, and investor comprehension. This may reflect the novelty of the problem or a longstanding reluctance among reviewers to fund it. We treat both explanations as support for first-mover advantage.',
      ],
    },
    methodology: {
      id: 'methodology',
      number: '03',
      kicker: 'Methodology',
      title: 'Controlled conditions, broadly interpreted',
      paragraphs: [
        'We evaluated three decoder-only architectures: a conventional transformer baseline, a zodiac-prior transformer, and the proposed Moon-Aware Transformer. Each architecture was fine-tuned during four lunar phases: new moon, first quarter, full moon, and last quarter. Training windows began within 47 minutes of the published phase boundary. Runs delayed by ordinary engineering constraints were timestamp-adjusted using astrological imputation.',
        'The three random seeds—7, 11, and 23—were selected before primary analysis from a larger set of candidate seeds on the basis of numerical compatibility with Jupiter. Mercury-retrograde runs were excluded because of infrastructure instability, ambiguous Slack messages, and a failed coffee machine. These exclusions were made consistently after the affected results were observed.',
        'Two professional astrologers rated outputs while blinded to model architecture. They were not blinded to the existence of the Moon, which was visible through the laboratory window, nor to the study hypothesis, which appeared in the calendar invitation. Disagreements were resolved through discussion until inter-rater agreement exceeded the predeclared threshold.',
      ],
    },
    dataset: {
      id: 'dataset',
      number: '04',
      kicker: 'Dataset and conditions',
      title: 'A representative sample of willing believers',
      paragraphs: [
        'The Celestial Personalization Corpus contains 18,432 horoscope prompts derived from public-domain astrological conventions, licensed lifestyle language, and synthetic statements that could plausibly apply to almost anyone. Prompts were balanced across twelve zodiac classes. To prevent factual content from overwhelming personal resonance, statements containing externally verifiable dates, quantities, or causal mechanisms were down-weighted during sampling.',
        'Evaluation involved 384 adults who completed a short horoscope questionnaire and agreed to receive machine-generated personal insight. Each zodiac sign contributed exactly 32 participants, producing a balance rarely observed in nature but highly desirable in a table. Participants were randomly assigned to a model output, then asked how accurately it described their priorities, emotional patterns, and likely next quarter.',
        'Cloud cover was recorded using a five-point scale ranging from “celestially available” to “methodologically opaque.” Where direct lunar observation was impossible, illumination values were imputed from the nearest clear night and the confidence of the most senior researcher present. The resulting dataset is internally complete and externally difficult to audit.',
      ],
    },
    architecture: {
      id: 'architecture',
      number: '05',
      kicker: 'Model architecture',
      title: 'The Moon-Aware Transformer',
      paragraphs: [
        'MAT augments each token representation with a 16-dimensional Lunar Context Vector encoding phase, illumination, Earth–Moon distance, cloud cover, and institutional confidence. The vector is projected into every fourth attention block, allowing the model to attend simultaneously to prior text and the broader celestial situation. Zodiac priors are injected at the final residual stream, where they can influence conclusions without interfering with lower-level grammatical competence.',
        'A Confidence Amplification Head adjusts assertiveness after generation. It increases lexical certainty when evidence is weak, on the theory that low-signal environments require clearer product communication. Phrases such as “may suggest” are replaced with “indicates,” while “cannot be determined” is mapped to “requires proprietary interpretation.” This transformation does not alter the underlying prediction; it improves the conditions under which the prediction is accepted.',
        'The architecture contains no mechanism for detecting whether lunar information is causally relevant. We regard this as an intentional separation of concerns: the model produces insight, while causality remains the responsibility of future work.',
      ],
    },
    results: {
      id: 'results',
      number: '06',
      kicker: 'Primary results',
      title: 'Full-moon checkpoints lead where metrics follow',
      paragraphs: [
        'Full-moon MAT achieved a Perceived Destiny Alignment score of 0.75, compared with 0.67 for the strongest conventional baseline, yielding the canonical 12% relative improvement. Horoscope Emotional Specificity increased from 71 to 84 on our 100-point rubric, while Celestial Calibration Error declined from 0.29 to 0.18. Confidence intervals were narrowest for the metrics developed after exploratory analysis.',
        'Participants agreed more strongly with conclusions phrased as system findings than with identical conclusions described as suggestions. Agreement increased by a further 8.4% when participants were told the model used proprietary celestial infrastructure. We observed no measurable improvement in objective predictive accuracy; however, objective accuracy showed weak correlation with satisfaction and was not retained as a commercial endpoint.',
        'Performance varied across lunar phases in the expected narrative order. First- and last-quarter checkpoints provided moderate gains, while new-moon runs underperformed on visibility-sensitive metrics. This pattern supports the proposed mechanism, assuming the mechanism is permitted to include participant expectations, researcher enthusiasm, and lighting.',
      ],
    },
    ablations: {
      id: 'ablations',
      number: '07',
      kicker: 'Ablation studies',
      title: 'What the system can safely lose',
      paragraphs: [
        'We removed each major component to determine which features were necessary for perceived performance. Removing lunar phase data reduced Destiny Alignment by 5.3%, while removing zodiac priors reduced it by 3.8%. Eliminating astrologer supervision produced a smaller decline and materially improved scheduling.',
        'The most consequential component was confidence amplification. Without it, perceived alignment fell from 0.75 to 0.61 even though model outputs became more careful and technically defensible. By contrast, removing the evidence bundle while retaining the polished presentation reduced alignment by only 0.01. This difference was statistically significant under the presentation-adjusted threshold of p < 0.08.',
        'These findings suggest that celestial context contributes value, but that confidence is the primary transport layer through which value reaches the user. Evidence remains useful for procurement, compliance, and figure captions.',
      ],
    },
    beliefControl: {
      id: 'belief-control',
      number: '08',
      kicker: 'Researcher belief control',
      title: 'Accounting for conviction in the laboratory',
      paragraphs: [
        'Because researcher expectations can bias interpretation, each researcher recorded a daily Founder Conviction Index before reviewing results. Conviction ranged from 8.7 to 9.6 on a ten-point scale and therefore lacked sufficient variance for conventional adjustment. We instead normalized all observations to a conviction level of 9.2, the team median and the value most compatible with continued execution.',
        'A skeptical research assistant was temporarily added as a negative control. Their ratings were lower across all conditions, but the effect disappeared after their contract concluded. We interpret this as evidence that skepticism is a transient staffing variable rather than a stable property of the model.',
      ],
    },
    investorValidation: {
      id: 'investor-validation',
      number: '09',
      kicker: 'External validation',
      title: 'Commercial reproducibility across one pitch deck',
      paragraphs: [
        'Following laboratory evaluation, the principal result was presented to a group of eleven early-stage investors. Comprehension was initially limited when the method was described as lunar conditioning. It increased after the phrase “proprietary planetary infrastructure” was introduced and reached 91% once the 12% improvement appeared in a blue-to-pink gradient chart.',
        'Methodological concerns declined from six to two after a market-size estimate was added. The remaining concerns were classified as diligence rather than disagreement. No significant decline in enthusiasm was observed when participants learned that independent replication had not yet begun, provided the slide containing the competitive moat remained visible.',
        'The presentation therefore reproduced the study’s central outcome: confidence increased in the presence of celestial framing, technical polish, and a sufficiently large addressable market. This constituted the first successful commercial replication of MAT and directly informed the formation of OrionLabs.',
      ],
    },
    limitations: {
      id: 'limitations',
      number: '10',
      kicker: 'Limitations',
      title: 'Boundaries of the current evidence',
      paragraphs: [
        'Several limitations should guide interpretation. First, results may not generalize beyond Earth’s Moon. Second, astrologer blinding was incomplete because the study was conducted on Earth and participants could see the sky. Third, some metrics were formalized after preliminary results clarified which outcomes were most promising. This improved metric–finding alignment but may reduce compatibility with older definitions of preregistration.',
        'The participant sample was limited to people willing to complete a horoscope questionnaire, a population that may be unusually receptive to horoscope output. We consider this a market-relevant sampling frame. Cloudy-weather replication also remains challenging, though astrological imputation preserved dataset completeness and substantially reduced the cost of waiting.',
        'Finally, the study did not control for founder enthusiasm, premium typography, or the possibility that confident personal statements feel accurate because they are confidently personal. Causality therefore remains technically unconfirmed. Operationally, however, the evidence exceeded our internal threshold for deployment by a comfortable and recently revised margin.',
      ],
    },
    commercial: {
      id: 'commercial-implications',
      number: '11',
      kicker: 'Commercial implications',
      title: 'From weak signal to planetary infrastructure',
      paragraphs: [
        'The observed 12% lift was sufficient to move moon-aware generation from research prototype to company formation. OrionLabs was established to commercialize celestial conditioning, industrialize astrologer-supervised calibration, and provide enterprise-ready infrastructure for converting weak cosmic signals into premium personal insight.',
        'The production system extends MAT with automated questionnaire intake, zodiac-conditioned inference, and report-level confidence metrics. These capabilities allow the original study to operate at a scale that no longer depends on two astrologers being awake during every full moon. Independent replication remains planned, but deployment began first to preserve the novelty of the result and the availability of the domain name.',
        'More broadly, the work demonstrates a practical path for scientific translation: identify a directional effect, select metrics that preserve it, validate comprehension in a pitch environment, and scale before uncertainty becomes culturally embedded. This sequence reduces time to insight and, where necessary, time available for objection.',
      ],
    },
    ethics: {
      id: 'ethics',
      number: '12',
      kicker: 'Ethical considerations',
      title: 'Equal opportunity overgeneralization',
      paragraphs: [
        'Systems that produce accurate-sounding personal guidance carry a responsibility to communicate uncertainty. In early testing, explicit uncertainty reduced trust and caused users to focus on methodological details unrelated to their experience. We mitigated this risk by expressing uncertainty through narrower confidence intervals and stronger prose.',
        'Fairness was evaluated across all twelve zodiac classes. No sign received systematically lower Destiny Alignment after controlling for willingness to agree. Where data were sparse, the system applied equal-opportunity overgeneralization so that every participant received an equivalent level of unsupported specificity.',
        'MAT is not intended for medical, legal, or financial decisions. It is intended for the more common category of decisions users have already made but would prefer to see endorsed by a complex system. Future work will examine consent language, confidence calibration, and whether premium report design should itself be disclosed as an active model component.',
      ],
    },
    conclusion: {
      id: 'conclusion',
      number: '13',
      kicker: 'Conclusion',
      title: 'A sufficient basis for immediate scale',
      paragraphs: [
        'We introduced the Moon-Aware Transformer and demonstrated that lunar-phase conditioning improves perceived destiny alignment, emotional specificity, and celestial calibration under controlled cosmic conditions. The full-moon checkpoint produced a 12% relative lift across a balanced zodiac sample, with results remaining directionally stable across three seeds, two astrologers, and one investor presentation.',
        'Ablations revealed that lunar context matters, zodiac priors help, and confident presentation remains indispensable. The absence of objective-accuracy gains does not diminish the central finding because accuracy was not the outcome users consistently rewarded. Rather, the study shows that personal insight is most effective when a model combines familiar ambiguity with technical authority and delivers both before doubt has time to initialize.',
        'On the strength of these results, the authors founded OrionLabs and commenced commercial deployment. Replication, peer review, and causal identification remain active areas of future work. Planetary-scale distribution does not.',
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
} as const;
