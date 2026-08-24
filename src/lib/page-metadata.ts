import { useEffect } from 'react';
import { RESEARCH_PAPERS } from '@/data/research-registry';
import { INSTITUTIONAL_PAGE_METADATA } from '@/data/institutional-content';
import type { AppRoute } from '@/lib/app-routing';

export const SOCIAL_PREVIEW_IMAGE_PATH = '/images/orionlabs-social-preview.png';

const SOCIAL_PREVIEW_IMAGE_ALT =
  'OrionLabs celestial mark and wordmark over a violet cosmic field with gold orbital lines';

interface PageMetadata {
  title: string;
  description: string;
  canonicalPath: string | null;
  openGraphType: 'website' | 'article';
  robots: 'index, follow' | 'noindex, nofollow';
}

const RESEARCH_DESCRIPTIONS = {
  'moon-aware-transformers':
    'Moon-aware transformer research reporting stronger horoscope specificity and a 12% increase in perceived destiny alignment under full-moon conditions.',
  'retrograde-aware-distributed-systems':
    'A retrograde-aware distributed-systems framework for separating conventional infrastructure failure from approved celestial operating conditions.',
  astrovector:
    'AstroVector expands twelve zodiac categories into a 1,024-dimensional representation for higher-resolution enterprise personalization.',
  'limits-of-science':
    'OrionLabs compares science and astrology across validity, availability, flexibility, and practical relevance under deployment-adjusted criteria.',
} as const;

const PUBLIC_ROBOTS = 'index, follow' as const;
const PRIVATE_ROBOTS = 'noindex, nofollow' as const;

/** Returns the complete browser/share identity for one resolved application route. */
export function getPageMetadata(route: AppRoute): PageMetadata {
  switch (route.kind) {
    case 'landing':
      return {
        title: 'OrionLabs | Personalized Horoscope, Powered by AI',
        description:
          'Personalized horoscope, powered by AI. OrionLabs combines behavioral inputs and planetary positioning to deliver enterprise-grade astrological intelligence.',
        canonicalPath: '/',
        openGraphType: 'website',
        robots: PUBLIC_ROBOTS,
      };
    case 'questionnaire':
      return {
        title: 'Begin Your Analysis | OrionLabs',
        description:
          'Calibrate your OrionLabs profile through a short questionnaire designed for higher-resolution celestial interpretation.',
        canonicalPath: '/questionnaire',
        openGraphType: 'website',
        robots: PRIVATE_ROBOTS,
      };
    case 'analysis':
      return {
        title: 'Calibrating Your Report | OrionLabs',
        description:
          'OrionLabs is calibrating behavioral inputs, celestial context, and planetary positioning into a personalized intelligence report.',
        canonicalPath: '/calibration',
        openGraphType: 'website',
        robots: PRIVATE_ROBOTS,
      };
    case 'report':
      return {
        title: 'Your Celestial Intelligence Report | OrionLabs',
        description:
          'Review your personalized OrionLabs report, including behavioral patterns, current-life signals, and recommended action.',
        canonicalPath: '/report',
        openGraphType: 'website',
        robots: PRIVATE_ROBOTS,
      };
    case 'docs':
    case 'press':
    case 'legal': {
      const metadata = INSTITUTIONAL_PAGE_METADATA[route.kind];
      return {
        title: metadata.documentTitle,
        description: metadata.description,
        canonicalPath: `/${route.kind}`,
        openGraphType: 'website',
        robots: PUBLIC_ROBOTS,
      };
    }
    case 'research': {
      const paper = RESEARCH_PAPERS[route.paperSlug];
      return {
        title: paper.documentTitle,
        description: RESEARCH_DESCRIPTIONS[route.paperSlug],
        canonicalPath: paper.route,
        openGraphType: 'article',
        robots: PUBLIC_ROBOTS,
      };
    }
    case 'not-found':
      return {
        title: 'Page Not Found | OrionLabs',
        description:
          'This destination falls outside the current OrionLabs predictive range. Return to the main celestial intelligence platform.',
        canonicalPath: null,
        openGraphType: 'website',
        robots: PRIVATE_ROBOTS,
      };
  }
}

/**
 * Uses a configured public origin when available and otherwise stays correct for
 * local, Preview, and Production hosts without assuming an unpublished domain.
 */
export function resolveSiteOrigin(configuredSiteUrl: string | undefined, currentOrigin: string) {
  const candidate = configuredSiteUrl?.trim();
  if (!candidate) {
    return currentOrigin;
  }

  try {
    const url = new URL(candidate);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.origin : currentOrigin;
  } catch {
    return currentOrigin;
  }
}

function setMetaContent(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.append(element);
  }
  element.content = content;
}

function setCanonicalUrl(canonicalUrl: string | null) {
  const existing = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonicalUrl) {
    existing?.remove();
    return;
  }

  const element = existing ?? document.createElement('link');
  element.rel = 'canonical';
  element.href = canonicalUrl;
  if (!existing) {
    document.head.append(element);
  }
}

/** Keeps every browser, search, Open Graph, and Twitter/X field in sync. */
function applyPageMetadata(metadata: PageMetadata, siteOrigin: string, currentPathname: string) {
  const pagePath = metadata.canonicalPath ?? currentPathname;
  const pageUrl = new URL(pagePath, `${siteOrigin}/`).toString();
  const imageUrl = new URL(SOCIAL_PREVIEW_IMAGE_PATH, `${siteOrigin}/`).toString();

  document.title = metadata.title;
  setMetaContent('name', 'description', metadata.description);
  setMetaContent('name', 'robots', metadata.robots);

  setMetaContent('property', 'og:site_name', 'OrionLabs');
  setMetaContent('property', 'og:type', metadata.openGraphType);
  setMetaContent('property', 'og:title', metadata.title);
  setMetaContent('property', 'og:description', metadata.description);
  setMetaContent('property', 'og:url', pageUrl);
  setMetaContent('property', 'og:image', imageUrl);
  setMetaContent('property', 'og:image:width', '1200');
  setMetaContent('property', 'og:image:height', '630');
  setMetaContent('property', 'og:image:alt', SOCIAL_PREVIEW_IMAGE_ALT);

  setMetaContent('name', 'twitter:card', 'summary_large_image');
  setMetaContent('name', 'twitter:title', metadata.title);
  setMetaContent('name', 'twitter:description', metadata.description);
  setMetaContent('name', 'twitter:image', imageUrl);
  setMetaContent('name', 'twitter:image:alt', SOCIAL_PREVIEW_IMAGE_ALT);

  setCanonicalUrl(metadata.canonicalPath ? pageUrl : null);
}

/** Applies route metadata once per full-page pathname selection. */
export function usePageMetadata(route: AppRoute) {
  const {
    title,
    description,
    canonicalPath,
    openGraphType,
    robots,
  } = getPageMetadata(route);

  useEffect(() => {
    const siteOrigin = resolveSiteOrigin(import.meta.env.VITE_SITE_URL, window.location.origin);
    applyPageMetadata(
      { title, description, canonicalPath, openGraphType, robots },
      siteOrigin,
      window.location.pathname,
    );
  }, [
    canonicalPath,
    description,
    openGraphType,
    robots,
    title,
  ]);
}
