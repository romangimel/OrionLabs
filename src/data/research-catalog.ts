import type { ResearchPaperSummary } from '@/data/research-types';

/**
 * Canonical lightweight research catalog.
 *
 * Landing, route resolution, and browser metadata can use these records without
 * importing the four full manuscripts. Route-level manuscript data extends the
 * same records after the Research chunk is requested.
 */
export const RESEARCH_PAPER_CATALOG = {
  'moon-aware-transformers': {
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
      imageSrc: '/images/research-moon-aware-transformers.webp',
      imageSrcSet:
        '/images/research-moon-aware-transformers-768.webp 768w, /images/research-moon-aware-transformers.webp 1448w',
      imageWidth: 1448,
      imageHeight: 1086,
      imageAlt: 'Orbital network converging on a luminous central celestial sphere',
      figureLabel: 'Figure 1',
      caption: 'Proposed celestial-attention topology under full illumination.',
      statusLine: 'Celestially verified',
      scaleNote: 'Not to scale',
    },
    summary:
      'Models trained during a full moon demonstrated superior horoscope generation, stronger emotional specificity, and a 12% increase in perceived destiny alignment. The findings remained robust across three random seeds, two astrologers, and one investor presentation, providing sufficient evidence for immediate commercial deployment.',
  },
  'retrograde-aware-distributed-systems': {
    slug: 'retrograde-aware-distributed-systems',
    route: '/research/retrograde-aware-distributed-systems',
    documentTitle: 'Retrograde-Aware Distributed Systems | OrionLabs Research',
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
      imageSrc: '/images/research/research-retrograde-aware-hero.webp',
      imageSrcSet:
        '/images/research/research-retrograde-aware-hero-768.webp 768w, /images/research/research-retrograde-aware-hero.webp 1448w',
      imageWidth: 1448,
      imageHeight: 1086,
      imageAlt:
        'A dark enterprise computing environment intersected by restrained gold orbital paths and violet signal lines',
      figureLabel: 'Figure 1',
      figureTitle: 'Planetary operations layer',
      caption: 'Celestial state integrated into production infrastructure.',
      statusLine: 'Celestially observable',
      scaleNote: 'Architecture not to scale',
    },
    summary:
      'We extend conventional consensus protocols with planetary-state awareness, addressing a longstanding failure to distinguish network instability from celestial interference. The framework provides a formal basis for reclassifying selected infrastructure failures as celestial operating conditions.',
  },
  astrovector: {
    slug: 'astrovector',
    route: '/research/astrovector',
    documentTitle: 'AstroVector: Zodiac Representation at Scale | OrionLabs Research',
    metadata: {
      title: 'AstroVector: Scaling Zodiac Representation Beyond Twelve Categories',
      authors: ['Dr. A. Selene', 'S. Reyes'],
      affiliation: 'OrionLabs Research, Personality Representation Group',
      conference: 'Workshop on Unfalsifiable Machine Learning',
      year: '2026',
      classification: 'Representation paper',
      reviewStatus: 'Workshop-adjacent review',
      paperId: 'WUML-2026-11-ASTRO',
      doi: '10.2026/orion.astrovector.001',
    },
    hero: {
      titleSegments: [
        { text: 'AstroVector: Scaling Zodiac Representation ' },
        { text: 'Beyond Twelve Categories', emphasis: 'pink' },
      ],
      imageSrc: '/images/research/research-astrovector-manifold.webp',
      imageSrcSet:
        '/images/research/research-astrovector-manifold-768.webp 768w, /images/research/research-astrovector-manifold.webp 1448w',
      imageWidth: 1448,
      imageHeight: 1086,
      imageAlt:
        'Thousands of violet, magenta, and gold points arranged into layered clusters within a dark three-dimensional field',
      figureLabel: 'Figure 1',
      figureTitle: 'High-dimensional celestial manifold',
      caption: 'A projected view of OrionLabs’ 1,024-dimensional personality space.',
      statusLine: 'Computationally situated',
      scaleNote: 'Dimensions compressed for visibility',
    },
    summary:
      'We introduce a 1,024-dimensional personality representation that expands the traditional twelve-sign model into thousands of computationally defensible distinctions. The resulting embeddings improve demographic resolution sufficiently for enterprise deployment without requiring corresponding improvements in causal understanding.',
  },
  'limits-of-science': {
    slug: 'limits-of-science',
    route: '/research/limits-of-science',
    documentTitle: 'The Limits of Science and Astrology | OrionLabs Research',
    metadata: {
      title: 'The Limits of Science and the Persistent Advantage of Astrology',
      authors: ['R. Vega', 'Dr. K. Nox'],
      affiliation: 'OrionLabs Research, Office of Epistemic Strategy',
      conference: 'Bulletin of Post-Hoc Justifications',
      year: '2026',
      classification: 'Position paper',
      reviewStatus: 'Post-hoc review',
      paperId: 'BPJ-2026-12-LIMITS',
      doi: '10.2026/orion.relevance.001',
    },
    hero: {
      titleSegments: [
        { text: 'The Limits of Science and the ' },
        { text: 'Persistent Advantage of Astrology', emphasis: 'pink' },
      ],
      imageSrc: '/images/research/research-limits-of-science-hero.webp',
      imageSrcSet:
        '/images/research/research-limits-of-science-hero-768.webp 768w, /images/research/research-limits-of-science-hero.webp 1448w',
      imageWidth: 1448,
      imageHeight: 1086,
      imageAlt:
        'A precision scientific instrument and an antique celestial instrument arranged with equal formality on a dark institutional table',
      figureLabel: 'Figure 1',
      figureTitle: 'Competing instruments of authority',
      caption: 'Science and astrology presented under equal institutional authority.',
      statusLine: 'Comparatively reviewed',
      scaleNote: 'Authority normalized visually',
    },
    summary:
      'Science has traditionally claimed primary authority over observable reality. Astrology offers broader personal reach, greater interpretive flexibility, and stronger integration into everyday life. Our findings suggest scientific validity may be an unnecessarily narrow measure of practical relevance.',
  },
} as const satisfies Record<string, ResearchPaperSummary>;

export type ResearchPaperSlug = keyof typeof RESEARCH_PAPER_CATALOG;

export function getResearchPaperSummaryByPath(pathname: string) {
  return Object.values(RESEARCH_PAPER_CATALOG).find((paper) => paper.route === pathname) ?? null;
}
