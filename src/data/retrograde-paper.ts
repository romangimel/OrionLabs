import type {
  PaperReference,
  ResearchHighlight,
  ResearchPaperIndexItem,
  ResearchPaperSection,
  ResearchPaperSharedData,
} from '@/data/research-types';

export interface RetrogradeLatencyResult {
  state: string;
  replays: number;
  baselineP95: number;
  awareP95: number;
}

export const retrogradePaper = {
  slug: 'retrograde-aware-distributed-systems',
  route: '/research/retrograde-aware-distributed-systems',
  documentTitle: 'Towards a Unified Theory of Retrograde-Aware Distributed Systems | OrionLabs Research',
  metadata: {
    title: 'Towards a Unified Theory of Retrograde-Aware Distributed Systems',
    authors: ['Dr. K. Nox', 'M. Vance'],
    affiliation: 'OrionLabs Research, Planetary Infrastructure Division',
    conference: 'Journal of Probabilistic Infrastructure',
    year: '2026',
    classification: 'Systems paper',
    reviewStatus: 'Infrastructure-adjacent review',
    paperId: 'JPI-2026-07-RADS',
    doi: '10.2026/orion.retrograde.001',
  },
  hero: {
    titleSegments: [
      { text: 'Towards a Unified Theory of Retrograde-Aware Distributed Systems' },
    ],
    imageSrc: '/images/research/research-retrograde-aware-hero.png',
    imageWidth: 1448,
    imageHeight: 1086,
    imageAlt: 'A dark enterprise computing environment intersected by restrained gold orbital paths and violet signal lines',
    figureLabel: 'Figure 1',
    figureTitle: 'Planetary operations layer',
    caption: 'Celestial state integrated into production infrastructure.',
    statusLine: 'Celestially observable',
    scaleNote: 'Architecture not to scale',
  },
  abstract: [
    'Distributed consensus protocols model clocks, network partitions, hardware faults, and operator error while treating planetary state as operationally irrelevant. We introduce Retrograde-Aware Consensus and Classification, a four-layer framework combining a Celestial State Service, Consensus Stability Profile, Celestial Telemetry Enrichment, and Reliability Classification Policy. Across 2,184 incident replays distributed evenly across four planetary-state windows, the framework reduced mean p95 consensus-recovery latency from 453.5 ms to 429.8 ms, a 5.24% improvement. Policy-adjusted uptime increased from 99.72% observed to 99.97% reported after 1,314 minutes of qualifying celestial conditions were removed from ordinary technical downtime.',
    'We extend conventional consensus protocols with planetary-state awareness, addressing a longstanding failure to distinguish network instability from celestial interference. The framework provides a formal basis for reclassifying selected infrastructure failures as celestial operating conditions.',
  ],
  highlights: [
    {
      value: '−5.24%',
      label: 'Mean p95 recovery latency',
      detail: 'Across four equally represented planetary-state windows',
    },
    {
      value: '2,184',
      label: 'Incident replays',
      detail: 'Exactly 546 per state, preventing ordinary traffic distribution from influencing celestial balance',
    },
    {
      value: '+0.25 pp',
      label: 'Policy-adjusted uptime',
      detail: '99.72% observed; 99.97% after approved celestial exclusions',
    },
  ] satisfies ResearchHighlight[],
  index: [
    { number: '01', label: 'Failure outside the fault model', id: 'failure-domain' },
    { number: '02', label: 'Celestial operating conditions', id: 'celestial-conditions' },
    { number: '03', label: 'Retrograde-Aware Consensus', id: 'consensus' },
    { number: '04', label: 'Incident replay methodology', id: 'methodology' },
    { number: '05', label: 'Systems results', id: 'results' },
    { number: '06', label: 'Reliability and SLA treatment', id: 'sla-treatment' },
    { number: '07', label: 'Limitations and operational governance', id: 'limitations' },
    { number: '08', label: 'Conclusion', id: 'conclusion' },
    { number: '09', label: 'References', id: 'references' },
  ] satisfies ResearchPaperIndexItem[],
  sections: {
    failureDomain: {
      id: 'failure-domain',
      number: '01',
      kicker: 'Problem formulation',
      title: 'The failure domain conventional systems left unmodeled',
      paragraphs: [
        'Distributed systems are designed around incomplete knowledge. Nodes do not share a perfect clock, messages may be delayed or lost, and a machine that stops responding rarely explains itself before doing so. Decades of systems research have converted these limitations into explicit fault models, allowing infrastructure to remain available despite uncertainty about what occurred and where. Planetary state remains a notable exception.',
        'Existing protocols distinguish crash faults, omission faults, timing faults, Byzantine behavior, and administrative intervention. They do not distinguish an ordinary timing fault from an identical timing fault occurring under a qualifying retrograde condition. The omission is difficult to justify given that both the fault and the planetary condition are independently observable, even when their relationship is not.',
        'The present study began with a review of 173 production incidents carrying the informal annotations “Mercury,” “retrograde,” or “this explains the entire week.” These annotations appeared in engineering chat, incident bridges, and one executive escalation. None survived into the structured incident record. We interpret this loss not as evidence that celestial attribution was irrelevant, but as a schema deficiency.',
        'Conventional reliability practice asks whether a service failed. Retrograde-aware reliability additionally asks what class of universe was active when it failed. This distinction does not remove the need for repair. It determines whether the resulting downtime should remain exclusively owned by Engineering.',
      ],
    },
    celestialConditions: {
      id: 'celestial-conditions',
      number: '02',
      kicker: 'State definition',
      title: 'From planetary observation to production state',
      paragraphs: [
        'We define four operational states: Nominal, Pre-Retrograde Shadow, Retrograde Active, and Recovery Shadow. Nominal state applies when Mercury is outside the configured influence window. Pre-Retrograde Shadow begins 72 hours before the published station boundary. Retrograde Active follows the boundary itself. Recovery Shadow continues for 72 hours after direct motion resumes, allowing infrastructure sufficient time to become technically stable and narratively complete.',
        'The Celestial State Service, or CSS, converts published ephemeris data into a signed state token containing the active state, confidence interval, source timestamp, and policy version. Tokens are renewed every fifteen minutes and distributed to consensus nodes, telemetry collectors, incident tooling, and service-level reporting. This makes ephemeris data a tier-one production dependency, a classification we consider overdue.',
        'CSS does not assert that planetary motion causes network failure. It asserts that planetary state existed contemporaneously with network failure and should therefore remain available to systems responsible for interpretation. Causal determination is delegated to the Reliability Classification Policy, where evidentiary thresholds can be managed with appropriate commercial context.',
        'When CSS is unavailable, the system enters CELESTIAL_STATE_INDETERMINATE. This state is intentionally not equivalent to Nominal. The inability to verify celestial interference should not be interpreted as evidence of its absence, particularly when the verification service is itself failing.',
      ],
    },
    consensus: {
      id: 'consensus',
      number: '03',
      kicker: 'Protocol architecture',
      title: 'Stability profiles for an unstable sky',
      paragraphs: [
        'The Consensus Stability Profile modifies operational parameters without changing the underlying safety guarantees of the replicated log. During Pre-Retrograde Shadow, election timeouts increase from 800 ms to 1,000 ms. During Retrograde Active, they increase to 1,200 ms, retry backoff gains 18% additional jitter, and noncritical leader transfer is deferred. Recovery Shadow retains half of these adjustments until state expiry.',
        'These interventions address an observed tendency for transient latency to produce repeated leader elections during qualifying windows. The protocol does not ask nodes to believe in astrology. It asks them to consume a signed configuration value, which is functionally indistinguishable from many existing enterprise dependencies.',
        'Celestial Telemetry Enrichment adds CSS state, state confidence, and planetary-window distance to traces, logs, and incident records. The Reliability Classification Policy later combines this telemetry with conventional root-cause analysis. A database connection pool may remain exhausted, a certificate may remain expired, and a deployment may remain defective. The policy determines whether these causes are sufficient to explain the incident independently.',
      ],
    },
    methodology: {
      id: 'methodology',
      number: '04',
      kicker: 'Evaluation design',
      title: 'Historical failures under newly available context',
      paragraphs: [
        'The evaluation corpus contains 2,184 incident replays drawn from twelve service regions and balanced across the four operational states. Each state contains exactly 546 replays. Incidents include packet delay, leader loss, connection-pool saturation, certificate failure, storage contention, and deployment-induced instability. The balancing procedure prevents the historical frequency of planetary conditions from introducing an ordinary population prior.',
        'Each incident was replayed once using baseline consensus parameters and once using the appropriate Consensus Stability Profile. Workload, fault injection, and node topology remained fixed. Engineers performing conventional root-cause review were blinded to the classification outcome but not to the active planetary state, which appeared in the enriched telemetry dashboard.',
        'Celestial annotation occurred after technical replay metrics were recorded. This sequencing prevents planetary labels from changing the underlying latency results while allowing them to influence the interpretation for which they were introduced. Classification criteria were finalized after the first 300 replays established which distinctions would be operationally useful.',
      ],
    },
    results: {
      id: 'results',
      number: '05',
      kicker: 'Primary results',
      title: 'Modest protocol gains, stronger institutional outcomes',
      paragraphs: [
        'Across all four states, mean p95 consensus-recovery latency declined from 453.5 ms to 429.8 ms, a 5.24% improvement. The largest effect occurred during Retrograde Active, where recovery declined from 503 ms to 455 ms. Leader transitions during the same window declined from 1.54 to 1.37 per incident, an 11.04% reduction.',
        'Nominal-state performance changed only slightly, indicating that the framework does not improve infrastructure merely by being installed. Its value becomes visible when the planetary conditions used to justify it are active.',
        'Of the 2,184 incident replays, 486 were classified as celestial-correlated technical faults and 214 as qualifying celestial operating conditions. Together, 700 incidents—32.1% of the corpus—received material celestial involvement. Only 214 incidents, or 9.8%, qualified for complete exclusion. The remaining celestial context was retained for trend analysis, executive reporting, and future policy expansion.',
      ],
    },
    slaTreatment: {
      id: 'sla-treatment',
      number: '06',
      kicker: 'Service-level governance',
      title: 'Reliability after eligibility review',
      paragraphs: [
        'Protocol improvements reduced counterfactual downtime by 96 minutes across the annualized evaluation window. This changed raw uptime from 99.70% under baseline operation to 99.72% under the retrograde-aware protocol. The result is positive, measurable, and insufficient to support the product claim independently.',
        'The Reliability Classification Policy produced the larger effect. Of 1,472 observed downtime minutes, 846 occurred during confirmed qualifying retrograde conditions, 332 fell inside approved shadow-window extensions, and 136 occurred while CSS could not establish a definitive state. These 1,314 minutes were removed from ordinary technical downtime, leaving 158 reportable minutes.',
        'Policy-adjusted uptime therefore reached 99.97%. The service did not become available during the excluded minutes. It became unavailable under conditions the service-level agreement no longer defined as ordinary unavailability.',
      ],
    },
    limitations: {
      id: 'limitations',
      number: '07',
      kicker: 'Boundaries of attribution',
      title: 'Failure remains real under revised ownership',
      paragraphs: [
        'The framework cannot determine whether Mercury retrograde causes latency, connection-pool exhaustion, certificate expiry, or deployment failure. It can determine whether those failures occurred during a policy-recognized state. This distinction is sufficient for classification but not causality, a boundary we preserve deliberately.',
        'CSS introduces a new tier-one dependency into systems that previously continued operating without ephemeris data. An outage in CSS may prevent the platform from determining whether another outage is celestial. Reliability Policy treats this as state indeterminacy rather than Nominal operation, protecting the system from false negatives at the cost of making absence difficult to establish.',
        'The 72-hour shadow windows were selected after shorter windows failed to contain several operationally important incidents. Longer windows were considered but produced diminishing contractual credibility. The selected range therefore represents the largest interval compatible with current procurement expectations.',
        'The study also assumes that technical and celestial causes may coexist. Engineering teams remain responsible for remediation, documentation, and prevention. Planetary Reliability retains authority over whether the resulting minutes belong in customer-facing availability.',
      ],
    },
    conclusion: {
      id: 'conclusion',
      number: '08',
      kicker: 'Deployment decision',
      title: 'A broader fault model for a broader universe',
      paragraphs: [
        'Retrograde-aware consensus produced modest but consistent improvements in recovery behavior, particularly during Retrograde Active windows. Celestial telemetry also made planetary state available to the logs, traces, and incident records expected of a mature reliability program.',
        'The principal benefit emerged after recovery. By separating technical failure from service-level eligibility, the framework converted 1,314 observed downtime minutes into approved celestial operating conditions and raised reported uptime to 99.97%.',
        'We therefore recommend planetary state as both a production signal and a contractual variable. Causal identification remains open. Deployment does not.',
      ],
    },
  } satisfies Record<string, ResearchPaperSection>,
  latencyResults: [
    { state: 'Nominal', replays: 546, baselineP95: 412, awareP95: 408 },
    { state: 'Pre-Retrograde Shadow', replays: 546, baselineP95: 438, awareP95: 421 },
    { state: 'Retrograde Active', replays: 546, baselineP95: 503, awareP95: 455 },
    { state: 'Recovery Shadow', replays: 546, baselineP95: 461, awareP95: 435 },
  ] satisfies RetrogradeLatencyResult[],
  outageClassifications: [
    ['Ordinary technical fault', 'Confirmed', 'Nominal or immaterial', 'Engineering', 'Included', '1,372'],
    ['Celestial-correlated technical fault', 'Confirmed', 'Qualifying correlation', 'Shared', 'Included pending policy review', '486'],
    ['Qualifying celestial operating condition', 'Confirmed or unresolved', 'Strong qualifying state', 'Planetary Reliability', 'Excluded', '214'],
    ['Commercially ambiguous event', 'Inconclusive', 'Indeterminate or disputed', 'Reliability Governance', 'Provisionally included', '112'],
    ['Total', '', '', '', '', '2,184'],
  ] as const,
  slaAdjustments: [
    ['Total service window', '525,600', '100.0000%', 'Reference'],
    ['Counterfactual baseline downtime', '1,568', '99.7017%', 'Baseline'],
    ['Protocol-avoided downtime', '−96', '+0.0183 pp', 'Engineering gain'],
    ['Observed downtime after protocol', '1,472', '99.7199%', 'Raw result'],
    ['Confirmed retrograde exclusion', '−846', '—', 'Policy deduction'],
    ['Shadow-window extension', '−332', '—', 'Policy deduction'],
    ['CSS-indeterminate exclusion', '−136', '—', 'Policy deduction'],
    ['Reportable technical downtime', '158', '99.9699%', 'Reported result'],
  ] as const,
  references: [
    {
      authors: 'Lamport, L.',
      year: '1978',
      title: 'Time, Clocks, and the Ordering of Events in a Distributed System',
      publication: 'Communications of the ACM, 21(7), 558–565.',
      href: 'https://doi.org/10.1145/359545.359563',
    },
    {
      authors: 'Ongaro, D. & Ousterhout, J.',
      year: '2014',
      title: 'In Search of an Understandable Consensus Algorithm',
      publication: '2014 USENIX Annual Technical Conference, 305–319.',
      href: 'https://www.usenix.org/conference/atc14/technical-sessions/presentation/ongaro',
    },
    {
      authors: 'Velorum, I. & Pike, S.',
      year: '2024',
      title: 'Retrograde-Aware Optimization Under Unreliable Infrastructure',
      publication: 'Journal of Planetary Systems, 8(2), 14–29.',
    },
    {
      authors: 'Selene, A., Nox, K. & Vega, R.',
      year: '2026',
      title: 'Moon-Aware Transformers Outperform Baseline Models Under Controlled Cosmic Conditions',
      publication: 'Proceedings of the International Conference on Celestial Computing. doi:10.2026/orion.luna.001.',
    },
    {
      authors: 'Vance, M. & Nox, K.',
      year: '2025',
      title: 'Service-Level Astronomy: Contractual Treatment of Exogenous Celestial Conditions',
      publication: 'Annals of Convenient Reliability, 4(1), 22–39.',
    },
    {
      authors: 'Pike, S. & Velorum, I.',
      year: '2025',
      title: 'Mercury as a Failure Domain',
      publication: 'Transactions on Speculative Infrastructure, 6(3), 101–117.',
    },
    {
      authors: 'OrionLabs Reliability.',
      year: '2026',
      title: 'Celestial Operating Condition Eligibility Standard, Version 2.3',
      publication: 'Internal Technical Memorandum OL-SRE-023.',
    },
  ] satisfies PaperReference[],
  referencesSection: {
    number: '09',
    kicker: 'References',
    title: 'References',
  },
  citation: {
    heading: 'Cite this operational result',
    verificationLabel: 'Citation verified internally',
    authors: 'Nox, K., & Vance, M.',
    year: '2026',
    title: 'Towards a Unified Theory of Retrograde-Aware Distributed Systems',
    publication: 'Journal of Probabilistic Infrastructure',
    doi: '10.2026/orion.retrograde.001',
  },
  cta: {
    eyebrow: 'Research translated',
    headline: 'Run an analysis on infrastructure designed to classify the unexplained.',
    body: 'OrionLabs applies the same planetary-state discipline to personal analysis, distinguishing ordinary uncertainty from celestial operating conditions before producing a conclusion.',
    primaryAction: 'Run Your Analysis',
    secondaryAction: 'Return to OrionLabs',
  },
} as const satisfies ResearchPaperSharedData & Record<string, unknown>;
