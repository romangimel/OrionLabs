import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { resolveAppRoute } from '@/lib/app-routing';
import {
  getPageMetadata,
  resolveSiteOrigin,
  SOCIAL_PREVIEW_IMAGE_PATH,
} from '@/lib/page-metadata';

const expectedTitles = new Map([
  ['/', 'OrionLabs | Personalized Horoscope, Powered by AI'],
  ['/questionnaire', 'Begin Your Analysis | OrionLabs'],
  ['/calibration', 'Calibrating Your Report | OrionLabs'],
  ['/report', 'Your Celestial Intelligence Report | OrionLabs'],
  ['/research/moon-aware-transformers', 'Moon-Aware Transformers | OrionLabs Research'],
  ['/research/retrograde-aware-distributed-systems', 'Retrograde-Aware Distributed Systems | OrionLabs Research'],
  ['/research/astrovector', 'AstroVector: Zodiac Representation at Scale | OrionLabs Research'],
  ['/research/limits-of-science', 'The Limits of Science and Astrology | OrionLabs Research'],
  ['/docs', 'Developer Documentation | OrionLabs'],
  ['/press', 'Newsroom & Press | OrionLabs'],
  ['/legal', 'Legal, Privacy & Compliance | OrionLabs'],
  ['/outside-predictive-range', 'Page Not Found | OrionLabs'],
]);

describe('route-aware browser metadata', () => {
  it('gives every primary route a distinct branded title and concise description', () => {
    for (const [pathname, expectedTitle] of expectedTitles) {
      const metadata = getPageMetadata(resolveAppRoute(pathname));

      expect(metadata.title).toBe(expectedTitle);
      expect(metadata.description.length).toBeGreaterThanOrEqual(80);
      expect(metadata.description.length).toBeLessThanOrEqual(160);
    }
  });

  it('uses article metadata for research and suppresses indexing for private or invalid routes', () => {
    expect(
      getPageMetadata(resolveAppRoute('/research/astrovector')).openGraphType,
    ).toBe('article');
    expect(getPageMetadata(resolveAppRoute('/questionnaire')).robots).toBe(
      'noindex, nofollow',
    );
    expect(getPageMetadata(resolveAppRoute('/report')).robots).toBe('noindex, nofollow');
    expect(getPageMetadata(resolveAppRoute('/missing')).canonicalPath).toBeNull();
  });

  it('uses the configured public origin only when it is a valid web URL', () => {
    expect(resolveSiteOrigin('https://orionlabs.example/path', 'http://localhost:5173')).toBe(
      'https://orionlabs.example',
    );
    expect(resolveSiteOrigin('', 'http://localhost:5173')).toBe('http://localhost:5173');
    expect(resolveSiteOrigin('javascript:alert(1)', 'http://localhost:5173')).toBe(
      'http://localhost:5173',
    );
  });
});

describe('static browser presentation assets', () => {
  it('ships the dedicated 1200 by 630 social preview and app-icon manifest assets', () => {
    const socialImage = readFileSync(
      resolve(process.cwd(), `public${SOCIAL_PREVIEW_IMAGE_PATH}`),
    );
    expect(socialImage.readUInt32BE(16)).toBe(1200);
    expect(socialImage.readUInt32BE(20)).toBe(630);

    const manifest = JSON.parse(
      readFileSync(resolve(process.cwd(), 'public/site.webmanifest'), 'utf8'),
    ) as { icons: Array<{ src: string; sizes: string }> };

    expect(manifest.icons.map((icon) => icon.sizes)).toEqual(['192x192', '512x512']);
    for (const icon of manifest.icons) {
      expect(existsSync(resolve(process.cwd(), `public${icon.src}`))).toBe(true);
    }
    expect(existsSync(resolve(process.cwd(), 'public/favicon-32x32.png'))).toBe(true);
    expect(existsSync(resolve(process.cwd(), 'public/apple-touch-icon.png'))).toBe(true);
  });

  it('keeps a crawler-readable landing fallback with no third-party placeholder image', () => {
    const indexHtml = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8');

    expect(indexHtml).toContain('OrionLabs | Personalized Horoscope, Powered by AI');
    expect(indexHtml).toContain('/images/orionlabs-social-preview.png');
    expect(indexHtml).toContain('property="og:image:width" content="1200"');
    expect(indexHtml).toContain('name="twitter:card" content="summary_large_image"');
    expect(indexHtml).not.toContain('bolt.new');
  });
});
