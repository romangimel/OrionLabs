export interface ResearchHighlight {
  value: string;
  label: string;
  detail: string;
}

export interface PaperReference {
  authors: string;
  year: string;
  title: string;
  publication: string;
  href: string;
}

export interface ResearchPaperSection {
  id: string;
  number: string;
  kicker: string;
  title: string;
  paragraphs: readonly string[];
}

export interface ResearchPaperIndexItem {
  number: string;
  label: string;
  id: string;
}

export interface ResearchPaperHero {
  titleSegments: readonly {
    text: string;
    emphasis?: 'pink';
  }[];
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  figureLabel: string;
  figureTitle?: string;
  caption: string;
  statusLine: string;
  scaleNote: string;
}

export interface ResearchPaperMetadata {
  title: string;
  authors: readonly string[];
  affiliation: string;
  conference: string;
  year: string;
  classification: string;
  reviewStatus: string;
  paperId: string;
  doi: string;
}

/** Small public-paper surface used by Landing, routing, and document metadata. */
export interface ResearchPaperSummary {
  slug: string;
  route: string;
  documentTitle: string;
  metadata: ResearchPaperMetadata;
  hero: ResearchPaperHero;
  summary: string;
}

/** Complete manuscript data, reachable only through the Research route boundary. */
export interface ResearchPaperSharedData extends ResearchPaperSummary {
  abstract: readonly string[];
  highlights: readonly ResearchHighlight[];
  index: readonly ResearchPaperIndexItem[];
  references: readonly PaperReference[];
  referencesSection: {
    number: string;
    kicker: string;
    title: string;
  };
  citation: {
    heading: string;
    verificationLabel: string;
    authors: string;
    year: string;
    title: string;
    publication: string;
    doi: string;
  };
  cta: {
    eyebrow: string;
    headline: string;
    body: string;
    primaryAction: string;
    secondaryAction: string;
  };
}
