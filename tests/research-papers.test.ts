import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { astrovectorPaper } from '@/data/astrovector-paper';
import { limitsPaper } from '@/data/limits-paper';
import { RESEARCH_PAPER_CATALOG } from '@/data/research-catalog';
import {
  getResearchPaperByPath,
  RESEARCH_PAPERS,
  type ResearchPaperSlug,
} from '@/data/research-registry';
import { retrogradePaper } from '@/data/retrograde-paper';
import {
  ASTROVECTOR_ANCHORS,
  ASTROVECTOR_SUBCLUSTERS,
  generateAstroVectorProjection,
} from '@/lib/astrovector-projection';
import { ResearchPaperPage } from '@/pages/ResearchPaperPage';

describe('research paper registry', () => {
  it('maps only the four approved research routes to their typed paper records', () => {
    expect(Object.values(RESEARCH_PAPERS).map((paper) => paper.route)).toEqual([
      '/research/moon-aware-transformers',
      '/research/retrograde-aware-distributed-systems',
      '/research/astrovector',
      '/research/limits-of-science',
    ]);

    expect(getResearchPaperByPath('/research/limits-of-science')?.slug).toBe(
      'limits-of-science',
    );
    expect(getResearchPaperByPath('/articles/limits-of-science')).toBeNull();

    for (const paper of Object.values(RESEARCH_PAPERS)) {
      expect(paper).toMatchObject(RESEARCH_PAPER_CATALOG[paper.slug]);
      expect(paper.abstract).toContain(paper.summary);
    }
  });

  it('preserves the approved cross-paper arithmetic', () => {
    const baselineMean =
      retrogradePaper.latencyResults.reduce(
        (total, result) => total + result.baselineP95,
        0,
      ) / retrogradePaper.latencyResults.length;
    const awareMean =
      retrogradePaper.latencyResults.reduce(
        (total, result) => total + result.awareP95,
        0,
      ) / retrogradePaper.latencyResults.length;

    expect(baselineMean).toBe(453.5);
    expect(awareMean).toBe(429.75);
    expect(((baselineMean - awareMean) / baselineMean) * 100).toBeCloseTo(5.24, 2);
    expect(astrovectorPaper.dimensionResults.map((row) => row.causalUnderstanding)).toEqual([
      0.22,
      0.22,
      0.22,
      0.22,
      0.22,
    ]);
    expect(limitsPaper.scorecard[8].slice(2)).toEqual(['68.9', '', '61.4']);
    expect(limitsPaper.scorecard[9].slice(2)).toEqual(['60.0', '', '76.2']);
  });

  it('gives every reference a valid internal route or secure external URL', () => {
    const researchRoutes = new Set(
      Object.values(RESEARCH_PAPERS).map((paper) => paper.route),
    );

    for (const paper of Object.values(RESEARCH_PAPERS)) {
      expect(paper.references.length).toBeGreaterThanOrEqual(5);

      for (const reference of paper.references) {
        expect(reference.href).not.toMatch(/^#?$|placeholder/i);

        if (reference.href.startsWith('/')) {
          expect(researchRoutes.has(reference.href)).toBe(true);
          continue;
        }

        expect(new URL(reference.href).protocol).toBe('https:');
      }
    }
  });

  it('renders all four papers with linked references and safe external attributes', () => {
    for (const paper of Object.values(RESEARCH_PAPERS)) {
      const markup = renderToStaticMarkup(
        createElement(ResearchPaperPage, {
          paperSlug: paper.slug as ResearchPaperSlug,
        }),
      );
      const externalReferences = paper.references.filter(({ href }) =>
        href.startsWith('https://'),
      );

      expect(markup).toContain('id="references"');
      expect(markup.match(/target="_blank" rel="noopener noreferrer"/g)).toHaveLength(
        externalReferences.length,
      );

      for (const reference of paper.references) {
        expect(markup).toContain(`href="${reference.href}"`);
      }
    }
  });
});

describe('AstroVector projection', () => {
  it('uses the approved deterministic seeds and produces all 864 points', () => {
    const firstRun = generateAstroVectorProjection();
    const secondRun = generateAstroVectorProjection();

    expect(firstRun).toEqual(secondRun);
    expect(firstRun).toHaveLength(12 * 3 * 24);
    expect(ASTROVECTOR_ANCHORS).toHaveLength(12);
    expect(ASTROVECTOR_SUBCLUSTERS).toHaveLength(3);
    expect(firstRun[0].x).toBeCloseTo(-0.8701227241492281, 12);
    expect(firstRun[0].y).toBeCloseTo(0.5028043675482239, 12);
    expect(firstRun.every(({ x, y }) => x >= -1 && x <= 1 && y >= -1 && y <= 1)).toBe(
      true,
    );
  });
});
