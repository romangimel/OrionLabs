import { describe, expect, it } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { TechnologyDiagram } from '@/components/site/Technology';

describe('Technology SVG rendering', () => {
  it.each([false, true])(
    'renders five valid pulse-ring radii with reducedMotion=%s',
    (reducedMotion) => {
      const markup = renderToStaticMarkup(
        createElement(TechnologyDiagram, { reducedMotion }),
      );
      const diagramMarkup = markup.match(/<svg viewBox="0 0 100 90"[\s\S]*?<\/svg>/)?.[0] ?? '';
      const circleTags = diagramMarkup.match(/<circle\b[^>]*>/g) ?? [];
      const pulseRingTags = circleTags.filter((circleTag) => circleTag.includes('fill="none"'));

      expect(circleTags).toHaveLength(10);
      expect(pulseRingTags).toHaveLength(5);
      circleTags.forEach((circleTag) => {
        expect(circleTag).toMatch(/\br="(?:\d+(?:\.\d+)?)"/);
      });
      pulseRingTags.forEach((circleTag) => {
        expect(circleTag).toContain('r="2.4"');
      });
    },
  );
});
