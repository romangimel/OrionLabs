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

function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';

  if (pathname === '/questionnaire') {
    return <QuestionnairePage />;
  }

  if (pathname === '/analysis') {
    return <AnalysisPage />;
  }

  return (
    <>
      {/* Global cosmic nebula — fixed behind all content */}
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
    </>
  );
}

export default App;
