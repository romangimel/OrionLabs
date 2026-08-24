export interface InstitutionalPageMetadata {
  documentTitle: string;
  description: string;
  pageLabel: string;
}

/** Lightweight route metadata stays eager while full institutional pages load on demand. */
export const INSTITUTIONAL_PAGE_METADATA = {
  docs: {
    documentTitle: 'Developer Documentation | OrionLabs',
    description:
      'Explore OrionLabs developer documentation for natal-chart computation, celestial context, AstroVector representation, and fictional interpretation APIs.',
    pageLabel: 'Developer documentation',
  },
  press: {
    documentTitle: 'Newsroom & Press | OrionLabs',
    description:
      'Official OrionLabs announcements, company facts, research updates, approved media resources, and carefully contextualized institutional momentum.',
    pageLabel: 'Newsroom',
  },
  legal: {
    documentTitle: 'Legal, Privacy & Compliance | OrionLabs',
    description:
      'Terms of Alignment, real product privacy behavior, browser-storage policy, compliance boundaries, and fictional OrionLabs trademark guidance.',
    pageLabel: 'Legal and compliance',
  },
} as const satisfies Record<string, InstitutionalPageMetadata>;
