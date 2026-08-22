import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Research } from '@/components/site/Research';
import {
  INITIAL_RESEARCH_SHOWCASE_STATE,
  LANDING_RESEARCH_PAPERS,
  researchShowcaseReducer,
} from '@/data/research-showcase';

describe('landing Research showcase', () => {
  it('represents all four real research entries with Limits of Science first', () => {
    expect(LANDING_RESEARCH_PAPERS.map((paper) => paper.slug)).toEqual([
      'limits-of-science',
      'moon-aware-transformers',
      'retrograde-aware-distributed-systems',
      'astrovector',
    ]);
    expect(INITIAL_RESEARCH_SHOWCASE_STATE).toEqual({
      selectedSlug: 'limits-of-science',
      railStartIndex: 0,
    });
  });

  it('renders the featured Limits paper and its route by default', () => {
    const markup = renderToStaticMarkup(<Research />);

    expect(markup).toContain('The Limits of Science and the Persistent Advantage of Astrology');
    expect(markup).toContain('href="/research/limits-of-science"');
    expect(markup).toContain('aria-pressed="true"');
    expect(markup.match(/Read paper/g)).toHaveLength(1);
  });

  it('updates the selected paper independently of the visible rail window', () => {
    const selectedState = researchShowcaseReducer(INITIAL_RESEARCH_SHOWCASE_STATE, {
      type: 'select',
      slug: 'astrovector',
    });
    const selectedPaper = LANDING_RESEARCH_PAPERS.find(
      (paper) => paper.slug === selectedState.selectedSlug,
    );

    expect(selectedState).toEqual({ selectedSlug: 'astrovector', railStartIndex: 0 });
    expect(selectedPaper?.metadata.title).toBe(
      'AstroVector: Scaling Zodiac Representation Beyond Twelve Categories',
    );
    expect(selectedPaper?.route).toBe('/research/astrovector');
  });

  it('moves the rail one paper without changing the selected paper', () => {
    const atEnd = researchShowcaseReducer(INITIAL_RESEARCH_SHOWCASE_STATE, {
      type: 'next',
    });

    expect(atEnd).toEqual({ selectedSlug: 'limits-of-science', railStartIndex: 1 });
    expect(researchShowcaseReducer(atEnd, { type: 'next' })).toEqual(atEnd);

    const atStart = researchShowcaseReducer(atEnd, { type: 'previous' });
    expect(atStart).toEqual(INITIAL_RESEARCH_SHOWCASE_STATE);
    expect(researchShowcaseReducer(atStart, { type: 'previous' })).toEqual(atStart);
  });
});
