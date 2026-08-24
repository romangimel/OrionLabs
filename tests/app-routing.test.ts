import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  CALIBRATION_ROUTE_PATH,
  resolveAppRoute,
} from '@/lib/app-routing';

describe('generation route selection', () => {
  it('recognizes /calibration as the only generation pathname', () => {
    expect(CALIBRATION_ROUTE_PATH).toBe('/calibration');
    expect(resolveAppRoute('/calibration')).toEqual({ kind: 'analysis' });
    expect(resolveAppRoute('/calibration/')).toEqual({ kind: 'analysis' });
  });

  it('treats /analysis and an unrelated unknown pathname as ordinary 404 routes', () => {
    expect(resolveAppRoute('/analysis')).toEqual({ kind: 'not-found' });
    expect(resolveAppRoute('/analysis/')).toEqual({ kind: 'not-found' });
    expect(resolveAppRoute('/obsolete-celestial-model')).toEqual({
      kind: 'not-found',
    });
  });

  it('keeps the questionnaire and report routes unchanged', () => {
    expect(resolveAppRoute('/questionnaire')).toEqual({ kind: 'questionnaire' });
    expect(resolveAppRoute('/report')).toEqual({ kind: 'report' });
  });

  it('sends Review confirmation through the shared calibration pathname', () => {
    const questionnairePageSource = readFileSync(
      resolve(process.cwd(), 'src/pages/QuestionnairePage.tsx'),
      'utf8',
    );

    expect(questionnairePageSource).toContain(
      'window.location.assign(CALIBRATION_ROUTE_PATH)',
    );
    expect(questionnairePageSource).not.toContain("window.location.assign('/analysis')");
  });
});

describe('Vercel SPA fallback', () => {
  it('serves fileless app paths through index.html while preserving exclusions', () => {
    const vercelConfig = JSON.parse(
      readFileSync(resolve(process.cwd(), 'vercel.json'), 'utf8'),
    ) as {
      rewrites: Array<{ source: string; destination: string }>;
    };
    const spaFallback = vercelConfig.rewrites[0];
    const fallbackPattern = new RegExp(`^${spaFallback.source}$`);

    expect(spaFallback.destination).toBe('/index.html');
    expect(fallbackPattern.test('/calibration')).toBe(true);
    // The obsolete path still reaches the SPA so the client can render its branded 404.
    expect(fallbackPattern.test('/analysis')).toBe(true);
    expect(fallbackPattern.test('/another-invalid-path')).toBe(true);
    expect(fallbackPattern.test('/api/generate-report')).toBe(false);
    expect(fallbackPattern.test('/@vite/client')).toBe(false);
    expect(fallbackPattern.test('/src/main.tsx')).toBe(false);
    expect(fallbackPattern.test('/assets/index.js')).toBe(false);
    expect(fallbackPattern.test('/favicon.ico')).toBe(false);
  });
});
