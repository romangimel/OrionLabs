import { astrovectorPaper } from '@/data/astrovector-paper';
import { limitsPaper } from '@/data/limits-paper';
import { researchPaper } from '@/data/research-paper';
import type { ResearchPaperSharedData } from '@/data/research-types';
import { retrogradePaper } from '@/data/retrograde-paper';

/** Typed route-level registry; article bodies remain explicit React compositions. */
export const RESEARCH_PAPERS = {
  'moon-aware-transformers': researchPaper,
  'retrograde-aware-distributed-systems': retrogradePaper,
  astrovector: astrovectorPaper,
  'limits-of-science': limitsPaper,
} as const satisfies Record<string, ResearchPaperSharedData>;

export type ResearchPaperSlug = keyof typeof RESEARCH_PAPERS;

export function getResearchPaperByPath(pathname: string) {
  return Object.values(RESEARCH_PAPERS).find((paper) => paper.route === pathname) ?? null;
}
