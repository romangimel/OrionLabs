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
import { QuestionnairePage } from '@/pages/QuestionnairePage';
import { AnalysisPage } from '@/pages/AnalysisPage';
import { ReportPage } from '@/pages/ReportPage';
import { ResearchPaperPage } from '@/pages/ResearchPaperPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

/**
 * Selects the active page and composes the public landing experience.
 *
 * OrionLabs has a small route set, so pathname matching keeps routing
 * dependency-free. A dedicated router can replace this boundary if navigation
 * requirements later expand beyond these static route-level pages.
 */
function App() {
  // Treat trailing-slash variants as the same route, including `/` itself.
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';

  if (pathname === '/questionnaire') {
    return <QuestionnairePage />;
  }

  if (pathname === '/analysis') {
    return <AnalysisPage />;
  }

  if (pathname === '/report') {
    return <ReportPage />;
  }

  if (pathname === '/research/moon-aware-transformers') {
    return <ResearchPaperPage />;
  }

  if (pathname !== '/') {
    return <NotFoundPage />;
  }

  return (
    <>
      {/* One fixed backdrop lets transparent landing sections share a continuous nebula. */}
      <div aria-hidden="true" className="fixed inset-0 -z-10 bg-cosmic-page">
        <Aurora className="opacity-70" />
      </div>

      <a
        href="#philosophy"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[hsl(266_40%_12%)] focus:px-4 focus:py-2 focus:text-sm focus:text-foreground"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <Philosophy />
        <Technology />
        <Evidence />
        <TrustBar />
        <Voices />
        <Research />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

export default App;
