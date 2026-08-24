import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { FOOTER_NAVIGATION } from '@/data/footer-navigation';
import {
  DOCS_INDEX,
  DOCS_PUBLIC_ENDPOINTS,
  LEGAL_INDEX,
  PRESS_INDEX,
} from '@/data/institutional-content';
import { INSTITUTIONAL_PAGE_METADATA } from '@/data/institutional-metadata';
import { resolveAppRoute } from '@/lib/app-routing';
import { DocsPage } from '@/pages/DocsPage';
import { LegalPage } from '@/pages/LegalPage';
import { PressPage } from '@/pages/PressPage';

const workspaceFile = (path: string) =>
  readFileSync(resolve(process.cwd(), path), 'utf8');

describe('institutional routes', () => {
  it('renders the three canonical routes and normalizes trailing slashes', () => {
    expect(resolveAppRoute('/docs')).toEqual({ kind: 'docs' });
    expect(resolveAppRoute('/docs/')).toEqual({ kind: 'docs' });
    expect(resolveAppRoute('/press')).toEqual({ kind: 'press' });
    expect(resolveAppRoute('/press///')).toEqual({ kind: 'press' });
    expect(resolveAppRoute('/legal')).toEqual({ kind: 'legal' });
    expect(resolveAppRoute('/legal/')).toEqual({ kind: 'legal' });
  });

  it('preserves research routes and still returns the 404 route for unknown paths', () => {
    expect(resolveAppRoute('/research/astrovector')).toEqual({
      kind: 'research',
      paperSlug: 'astrovector',
    });
    expect(resolveAppRoute('/documentation')).toEqual({ kind: 'not-found' });
    expect(resolveAppRoute('/newsroom')).toEqual({ kind: 'not-found' });
    expect(resolveAppRoute('/terms')).toEqual({ kind: 'not-found' });
  });
});

describe('institutional content and anchors', () => {
  const docsMarkup = renderToStaticMarkup(<DocsPage />);
  const legalMarkup = renderToStaticMarkup(<LegalPage />);
  const pressMarkup = renderToStaticMarkup(<PressPage />);

  it('renders every indexed Docs, Legal, and Press section target', () => {
    for (const { id } of DOCS_INDEX) {
      expect(docsMarkup).toContain(`id="${id}"`);
    }
    for (const { id } of LEGAL_INDEX) {
      expect(legalMarkup).toContain(`id="${id}"`);
    }
    for (const { id } of PRESS_INDEX) {
      expect(pressMarkup).toContain(`id="${id}"`);
    }
  });

  it('keeps the fictional public API distinct from the private generation endpoint', () => {
    expect(DOCS_PUBLIC_ENDPOINTS).not.toContain('/api/generate-report');
    for (const endpoint of DOCS_PUBLIC_ENDPOINTS) {
      expect(docsMarkup).toContain(endpoint);
    }
    expect(docsMarkup).toContain('fictional public Celestial Intelligence Platform');
    expect(docsMarkup).toContain('private report-generation endpoint');
  });

  it('renders the audited privacy and cookie boundaries without editorial markers', () => {
    expect(legalMarkup).toContain('raw birth date remains in the temporary questionnaire draft');
    expect(legalMarkup).toContain('not included in report-generation input');
    expect(legalMarkup).toContain('preserves the active completed report');
    expect(legalMarkup).toContain('replaced only after a newly generated report has been successfully validated');
    expect(legalMarkup).toContain('application code does not set, read, or manage browser cookies');
    expect(legalMarkup).toContain('browser-storage mechanism, not a cookie');
    expect(legalMarkup).not.toContain('REQUIRES HUMAN/LEGAL CONFIRMATION');
  });

  it('keeps the lunar classification table inside a shrinkable scroll boundary', () => {
    const legalSource = workspaceFile('src/pages/LegalPage.tsx');

    expect(legalSource).toContain('<div className="min-w-0">');
    expect(legalMarkup).toContain('max-w-full overflow-x-auto');
    expect(legalMarkup).toContain('Lunar cookie classifications');
  });

  it('keeps founder identity and press contact unassigned and exposes no fake downloads', () => {
    expect(pressMarkup).not.toMatch(/co-founder/i);
    expect(pressMarkup).not.toContain('mailto:');
    expect(pressMarkup).not.toContain('download=');
    expect(pressMarkup).toContain('Contact details are available through the portfolio owner.');
    expect(pressMarkup).toContain('fictional OrionLabs universe');
  });

  it('keeps the Press research CTA on the shared root fragment destination', () => {
    expect(pressMarkup).toContain('href="/#research"');
  });

  it('defines the approved document titles and descriptions', () => {
    expect(INSTITUTIONAL_PAGE_METADATA.docs.documentTitle).toBe(
      'Developer Documentation | OrionLabs',
    );
    expect(INSTITUTIONAL_PAGE_METADATA.press.documentTitle).toBe(
      'Newsroom & Press | OrionLabs',
    );
    expect(INSTITUTIONAL_PAGE_METADATA.legal.documentTitle).toBe(
      'Legal, Privacy & Compliance | OrionLabs',
    );
    expect(Object.values(INSTITUTIONAL_PAGE_METADATA).every(({ description }) => description.length > 80)).toBe(true);
  });
});

describe('footer navigation and entry-point invariants', () => {
  it('matches the complete approved footer destination matrix', () => {
    expect(FOOTER_NAVIGATION.flatMap(({ links }) => links)).toEqual([
      { label: 'DeepConstellation™', href: '/#deepconstellation' },
      { label: 'Quantum Horoscope Engine™', href: '/#quantum-horoscope-engine' },
      { label: 'Planetary Neural Network™', href: '/#planetary-neural-network' },
      { label: 'AstroVector™', href: '/#astrovector' },
      { label: 'Retrograde Shield™', href: '/#retrograde-shield' },
      { label: 'Philosophy', href: '/#philosophy' },
      { label: 'Research', href: '/#research' },
      { label: 'Customer Stories', href: '/#voices' },
      { label: 'Press', href: '/press' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Natal Chart API', href: '/docs#natal-chart-api' },
      { label: 'Model Architecture', href: '/docs#model-architecture' },
      { label: 'Changelog', href: '/docs#changelog' },
      { label: 'Terms of Alignment', href: '/legal#terms-of-alignment' },
      { label: 'Privacy (Cosmic)', href: '/legal#privacy' },
      { label: 'Cookie Policy (Lunar)', href: '/legal#cookies' },
      { label: 'Compliance & Superstition', href: '/legal#compliance' },
      { label: 'Trademarks', href: '/legal#trademarks' },
    ]);
  });

  it('uses only the report-preserving helper at every visible analysis entry point', () => {
    const entryPointFiles = [
      'src/components/site/Hero.tsx',
      'src/components/site/CTA.tsx',
      'src/components/site/Navbar.tsx',
      'src/components/research/ReferencesSection.tsx',
      'src/components/institutional/InstitutionalHeader.tsx',
      'src/pages/ReportPage.tsx',
    ];

    for (const path of entryPointFiles) {
      const source = workspaceFile(path);
      expect(source).not.toContain('resetAnalysisSession');
      expect(source).toMatch(/prepareNewAnalysisJourney|startNewAnalysisJourney/);
    }
  });

  it('does not override hash navigation with a top reset', () => {
    const shellSource = workspaceFile(
      'src/components/institutional/InstitutionalPageShell.tsx',
    );
    expect(shellSource).not.toContain('window.scrollTo');
    expect(shellSource).toContain('window.location.hash');
    expect(shellSource).toContain("focus({ preventScroll: true })");
  });

  it('contains no application cookie, localStorage, analytics, or auth integration calls', () => {
    const sourceFiles = [
      'src/lib/questionnaire-state.ts',
      'src/lib/report-storage.ts',
      'src/lib/report-generation-client.ts',
      'src/pages/AnalysisPage.tsx',
      'api/generate-report.ts',
      'server/report-generation-handler.ts',
    ].map(workspaceFile).join('\n');

    expect(sourceFiles).not.toMatch(/document\.cookie|localStorage\.(?:getItem|setItem)|\bgtag\(|mixpanel|segment\.track|supabase\.auth/i);
  });
});
