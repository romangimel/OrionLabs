import {
  getResearchPaperByPath,
  type ResearchPaperSlug,
} from '@/data/research-registry';

export const CALIBRATION_ROUTE_PATH = '/calibration';

export type AppRoute =
  | { kind: 'landing' }
  | { kind: 'questionnaire' }
  | { kind: 'analysis' }
  | { kind: 'report' }
  | { kind: 'docs' }
  | { kind: 'press' }
  | { kind: 'legal' }
  | { kind: 'research'; paperSlug: ResearchPaperSlug }
  | { kind: 'not-found' };

/** Normalizes only trailing slashes so the existing route contract stays narrow. */
export function normalizeAppPathname(pathname: string) {
  return pathname.replace(/\/+$/, '') || '/';
}

/** Pure route selection used by App and focused routing tests. */
export function resolveAppRoute(pathname: string): AppRoute {
  const normalizedPathname = normalizeAppPathname(pathname);

  switch (normalizedPathname) {
    case '/':
      return { kind: 'landing' };
    case '/questionnaire':
      return { kind: 'questionnaire' };
    case CALIBRATION_ROUTE_PATH:
      return { kind: 'analysis' };
    case '/report':
      return { kind: 'report' };
    case '/docs':
      return { kind: 'docs' };
    case '/press':
      return { kind: 'press' };
    case '/legal':
      return { kind: 'legal' };
  }

  const researchPaper = getResearchPaperByPath(normalizedPathname);
  if (researchPaper) {
    return { kind: 'research', paperSlug: researchPaper.slug };
  }

  return { kind: 'not-found' };
}
