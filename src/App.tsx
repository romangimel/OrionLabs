import { lazy, Suspense, useEffect, type ReactNode } from 'react';
import { Navbar } from '@/components/site/Navbar';
import { Hero } from '@/components/site/Hero';
import { TrustBar } from '@/components/site/TrustBar';
import { Philosophy } from '@/components/site/Philosophy';
import { Technology } from '@/components/site/Technology';
import { Evidence } from '@/components/site/Evidence';
import { Voices } from '@/components/site/Voices';
import { Research } from '@/components/site/Research';
import { FAQ } from '@/components/site/FAQ';
import { CTA } from '@/components/site/CTA';
import { Footer } from '@/components/site/Footer';
import { Aurora } from '@/components/site/Aurora';
import { RouteLoadingFallback } from '@/components/site/RouteLoadingFallback';
import { QuestionnairePage } from '@/pages/QuestionnairePage';
import { AnalysisPage } from '@/pages/AnalysisPage';
import { ReportPage } from '@/pages/ReportPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { resolveAppRoute } from '@/lib/app-routing';
import { scrollToLandingFragment } from '@/lib/landing-navigation';
import { usePageMetadata } from '@/lib/page-metadata';

const ResearchPaperPage = lazy(() =>
  import('@/pages/ResearchPaperPage').then((module) => ({
    default: module.ResearchPaperPage,
  })),
);
const DocsPage = lazy(() =>
  import('@/pages/DocsPage').then((module) => ({ default: module.DocsPage })),
);
const PressPage = lazy(() =>
  import('@/pages/PressPage').then((module) => ({ default: module.PressPage })),
);
const LegalPage = lazy(() =>
  import('@/pages/LegalPage').then((module) => ({ default: module.LegalPage })),
);

function SecondaryRoute({ children }: { children: ReactNode }) {
  return <Suspense fallback={<RouteLoadingFallback />}>{children}</Suspense>;
}

/** Re-applies root fragments once the client-rendered landing targets exist. */
function LandingPage() {
  useEffect(() => {
    let isDisposed = false;
    let nestedRenderFrame = 0;
    let fontFrame = 0;
    let hashChangeFrame = 0;

    const reconcileFragment = () => {
      scrollToLandingFragment(window.location.hash);
    };

    const renderFrame = window.requestAnimationFrame(() => {
      nestedRenderFrame = window.requestAnimationFrame(reconcileFragment);
    });

    // Final display-font metrics can shift long landing sections after the
    // first fragment calculation, so align the same target once fonts settle.
    void document.fonts?.ready.then(() => {
      if (!isDisposed) {
        fontFrame = window.requestAnimationFrame(reconcileFragment);
      }
    });

    const handleHashChange = () => {
      window.cancelAnimationFrame(hashChangeFrame);
      hashChangeFrame = window.requestAnimationFrame(reconcileFragment);
    };
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      isDisposed = true;
      window.cancelAnimationFrame(renderFrame);
      window.cancelAnimationFrame(nestedRenderFrame);
      window.cancelAnimationFrame(fontFrame);
      window.cancelAnimationFrame(hashChangeFrame);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <>
      {/* One fixed backdrop lets transparent landing sections share a continuous nebula. */}
      <div aria-hidden="true" className="landing-cosmic-backdrop fixed inset-0 -z-10 overflow-hidden bg-cosmic-page">
        <Aurora className="landing-cosmic-aurora opacity-70" />
      </div>

      <a
        data-mobile-menu-background
        href="#philosophy"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[hsl(266_40%_12%)] focus:px-4 focus:py-2 focus:text-sm focus:text-foreground"
      >
        Skip to content
      </a>
      <Navbar />
      <div data-mobile-menu-background>
        <main>
          <Hero />
          <TrustBar />
          <Philosophy />
          <Technology />
          <Evidence />
          <Voices />
          <Research />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
}

/**
 * Selects the active page and composes the public landing experience.
 *
 * OrionLabs has a small route set, so pathname matching keeps routing
 * dependency-free. A dedicated router can replace this boundary if navigation
 * requirements later expand beyond these static route-level pages.
 */
function App() {
  const route = resolveAppRoute(window.location.pathname);
  usePageMetadata(route);

  if (route.kind === 'questionnaire') {
    return <QuestionnairePage />;
  }

  if (route.kind === 'analysis') {
    return <AnalysisPage />;
  }

  if (route.kind === 'report') {
    return <ReportPage />;
  }

  if (route.kind === 'docs') {
    return <SecondaryRoute><DocsPage /></SecondaryRoute>;
  }

  if (route.kind === 'press') {
    return <SecondaryRoute><PressPage /></SecondaryRoute>;
  }

  if (route.kind === 'legal') {
    return <SecondaryRoute><LegalPage /></SecondaryRoute>;
  }

  if (route.kind === 'research') {
    return (
      <SecondaryRoute>
        <ResearchPaperPage paperSlug={route.paperSlug} />
      </SecondaryRoute>
    );
  }

  if (route.kind === 'not-found') {
    return <NotFoundPage />;
  }

  return <LandingPage />;
}

export default App;
