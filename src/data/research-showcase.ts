import { RESEARCH_PAPERS } from '@/data/research-registry';

const DESKTOP_VISIBLE_PAPER_COUNT = 3;

export const LANDING_RESEARCH_PAPERS = [
  RESEARCH_PAPERS['limits-of-science'],
  RESEARCH_PAPERS['moon-aware-transformers'],
  RESEARCH_PAPERS['retrograde-aware-distributed-systems'],
  RESEARCH_PAPERS.astrovector,
] as const;

export interface ResearchShowcaseState {
  selectedSlug: string;
  railStartIndex: number;
}

export type ResearchShowcaseAction =
  | { type: 'select'; slug: string }
  | { type: 'previous' }
  | { type: 'next' };

export const INITIAL_RESEARCH_SHOWCASE_STATE: ResearchShowcaseState = {
  selectedSlug: 'limits-of-science',
  railStartIndex: 0,
};

/** Keeps paper selection independent from the desktop rail's visible window. */
export function researchShowcaseReducer(
  state: ResearchShowcaseState,
  action: ResearchShowcaseAction,
): ResearchShowcaseState {
  const maximumStartIndex = LANDING_RESEARCH_PAPERS.length - DESKTOP_VISIBLE_PAPER_COUNT;

  switch (action.type) {
    case 'select':
      return { ...state, selectedSlug: action.slug };
    case 'previous':
      return { ...state, railStartIndex: Math.max(0, state.railStartIndex - 1) };
    case 'next':
      return {
        ...state,
        railStartIndex: Math.min(maximumStartIndex, state.railStartIndex + 1),
      };
  }
}
