import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { RESEARCH_PAPER_CATALOG } from '@/data/research-catalog';

function workspaceSource(pathname: string) {
  return readFileSync(resolve(process.cwd(), pathname), 'utf8');
}

describe('secondary route performance boundaries', () => {
  it('lazy-loads Research and institutional pages while keeping the core journey eager', () => {
    const appSource = workspaceSource('src/App.tsx');

    for (const page of ['ResearchPaperPage', 'DocsPage', 'PressPage', 'LegalPage']) {
      expect(appSource).toContain(`const ${page} = lazy(`);
      expect(appSource).toContain(`import('@/pages/${page}')`);
      expect(appSource).not.toMatch(
        new RegExp(`^import \\{ ${page} \\} from '@/pages/${page}';$`, 'm'),
      );
    }

    for (const page of ['QuestionnairePage', 'AnalysisPage', 'ReportPage', 'NotFoundPage']) {
      expect(appSource).toContain(`import { ${page} } from '@/pages/${page}';`);
    }

    expect(appSource).toContain('<Suspense fallback={<RouteLoadingFallback />}>');
  });

  it('keeps full manuscripts outside Landing, routing, and metadata imports', () => {
    const lightweightConsumers = [
      'src/data/research-showcase.ts',
      'src/lib/app-routing.ts',
      'src/lib/page-metadata.ts',
    ];

    for (const pathname of lightweightConsumers) {
      const source = workspaceSource(pathname);
      expect(source).not.toContain('research-registry');
      expect(source).not.toMatch(/(?:research|retrograde|astrovector|limits)-paper/);
    }

    expect(Object.values(RESEARCH_PAPER_CATALOG).map((paper) => paper.route)).toEqual([
      '/research/moon-aware-transformers',
      '/research/retrograde-aware-distributed-systems',
      '/research/astrovector',
      '/research/limits-of-science',
    ]);
    expect(
      Object.values(RESEARCH_PAPER_CATALOG).every((paper) => paper.summary.length > 100),
    ).toBe(true);
  });

  it('keeps only institutional head metadata in the initial route graph', () => {
    const metadataSource = workspaceSource('src/lib/page-metadata.ts');
    const appSource = workspaceSource('src/App.tsx');

    expect(metadataSource).toContain("@/data/institutional-metadata");
    expect(metadataSource).not.toContain("@/data/institutional-content");
    expect(appSource).not.toContain("@/data/institutional-content");
  });
});
