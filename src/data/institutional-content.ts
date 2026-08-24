export interface DocumentIndexItem {
  id: string;
  label: string;
}

export const DOCS_INDEX: readonly DocumentIndexItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'authentication', label: 'Authentication' },
  { id: 'natal-chart-api', label: 'Natal Chart API' },
  { id: 'planetary-state', label: 'Planetary State' },
  { id: 'interpretations', label: 'Interpretations' },
  { id: 'model-architecture', label: 'Model Architecture' },
  { id: 'sdk-integrations', label: 'SDK & Integrations' },
  { id: 'rate-limits', label: 'Rate Limits' },
  { id: 'error-codes', label: 'Error Codes' },
  { id: 'known-celestial-conditions', label: 'Known Celestial Conditions' },
  { id: 'changelog', label: 'Changelog' },
] as const;

export const LEGAL_INDEX: readonly DocumentIndexItem[] = [
  { id: 'terms-of-alignment', label: 'Terms of Alignment' },
  { id: 'privacy', label: 'Privacy (Cosmic)' },
  { id: 'cookies', label: 'Cookie Policy (Lunar)' },
  { id: 'compliance', label: 'Compliance & Superstition' },
  { id: 'trademarks', label: 'Trademarks' },
] as const;

export const PRESS_INDEX: readonly DocumentIndexItem[] = [
  { id: 'latest-announcements', label: 'Latest Announcements' },
  { id: 'company-facts', label: 'Company Facts' },
  { id: 'approved-quotes', label: 'Approved Quotes' },
  { id: 'selected-coverage', label: 'Selected Coverage' },
  { id: 'media-resources', label: 'Media Resources' },
  { id: 'company-boilerplate', label: 'Company Boilerplate' },
  { id: 'press-contact', label: 'Press Contact' },
] as const;

/** Fictional public endpoints documented by the developer page. */
export const DOCS_PUBLIC_ENDPOINTS = [
  '/v1/natal-charts',
  '/v1/natal-charts/{chart_id}',
  '/v1/interpretations',
  '/v1/planetary-state',
] as const;
