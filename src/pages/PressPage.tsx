import type { ReactNode } from 'react';
import { ArrowRight, BookOpen, Building2, Quote, Radio } from 'lucide-react';
import { DocumentCallout } from '@/components/institutional/DocumentCallout';
import { InstitutionalPageShell } from '@/components/institutional/InstitutionalPageShell';
import { InstitutionalSection } from '@/components/institutional/InstitutionalSection';
import { ResponsiveDataTable } from '@/components/institutional/ResponsiveDataTable';
import { Logo } from '@/components/site/Logo';
import {
  INSTITUTIONAL_PAGE_METADATA,
  PRESS_INDEX,
} from '@/data/institutional-content';

interface PressReleaseProps {
  category: string;
  date: string;
  headline: string;
  dek: string;
  children: ReactNode;
  quote: string;
  attribution: string;
  link?: { label: string; href: string };
  disclosure?: string;
}

function PressRelease({
  category,
  date,
  headline,
  dek,
  children,
  quote,
  attribution,
  link,
  disclosure,
}: PressReleaseProps) {
  return (
    <article className="rounded-[1.75rem] border border-[hsl(43_60%_70%_/_0.13)] bg-[linear-gradient(145deg,hsl(280_52%_13%_/_0.48),hsl(262_50%_6%_/_0.48))] p-5 sm:p-8 md:p-10">
      <header className="flex flex-col gap-3 border-b border-[hsl(43_60%_70%_/_0.1)] pb-6 sm:flex-row sm:items-center sm:justify-between">
        <span className="w-fit rounded-full border border-[hsl(43_60%_70%_/_0.18)] px-3 py-1 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-[hsl(43_60%_74%)]">{category}</span>
        <time className="text-xs uppercase tracking-[0.14em] text-[hsl(326_55%_68%)]">{date}</time>
      </header>
      <h3 className="mt-7 max-w-4xl font-serif text-3xl leading-[1.05] text-gradient-gold sm:text-4xl md:text-[2.75rem]">{headline}</h3>
      <p className="mt-5 max-w-3xl border-l border-[hsl(43_60%_70%_/_0.3)] pl-5 font-serif text-xl leading-relaxed text-foreground/88 sm:text-2xl">{dek}</p>
      <div className="mt-7 max-w-4xl space-y-5 text-[0.98rem] leading-[1.85] text-foreground/80 sm:text-[1.04rem]">{children}</div>
      <blockquote className="mt-8 rounded-2xl border border-[hsl(326_55%_68%_/_0.15)] bg-[hsl(262_48%_6%_/_0.52)] p-5 sm:p-6">
        <Quote aria-hidden="true" className="h-5 w-5 text-[hsl(43_60%_72%)]" strokeWidth={1.5} />
        <p className="mt-4 font-serif text-xl leading-relaxed text-foreground sm:text-2xl">“{quote}”</p>
        <footer className="mt-4 text-sm text-[hsl(326_55%_68%)]">— {attribution}</footer>
      </blockquote>
      {disclosure ? <p className="mt-6 text-xs leading-relaxed text-muted-foreground/68">{disclosure}</p> : null}
      {link ? (
        <a href={link.href} className="group mt-7 inline-flex min-h-11 items-center gap-2 rounded-full text-sm font-medium text-[hsl(43_60%_76%)] transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.7)]">
          {link.label}<ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
        </a>
      ) : null}
    </article>
  );
}

/** Complete fictional corporate newsroom with clear disclosure and real links only. */
export function PressPage() {
  return (
    <InstitutionalPageShell metadata={INSTITUTIONAL_PAGE_METADATA.press}>
      <header className="container-narrow pb-14 pt-16 sm:pb-18 sm:pt-20 md:pb-20 md:pt-28">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-16">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-[0.64rem] font-medium uppercase tracking-[0.2em]">
              <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(43_60%_70%_/_0.22)] bg-[hsl(43_74%_66%_/_0.07)] px-3 py-1.5 text-[hsl(43_60%_75%)]"><Radio aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />OrionLabs Newsroom</span>
              <span className="text-muted-foreground/65">Earth-based operations · 2026</span>
            </div>
            <h1 className="mt-8 max-w-5xl font-serif text-[clamp(3rem,7vw,5.8rem)] leading-[0.96] tracking-[-0.025em]">
              <span className="text-gradient-gold">Official developments, presented under </span>
              <span className="text-[hsl(326_65%_65%)]">controlled conditions.</span>
            </h1>
            <p className="mt-7 max-w-3xl text-base leading-relaxed text-foreground/82 sm:text-lg md:text-xl">Company announcements, research disclosures, platform milestones, and approved context from the institution advancing celestial intelligence beyond the limitations of conventional restraint.</p>
          </div>
          <aside className="rounded-2xl border border-[hsl(43_60%_70%_/_0.14)] bg-[hsl(262_48%_6%_/_0.56)] p-5 backdrop-blur-lg">
            <p className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-[hsl(43_60%_74%)]">Media posture</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Available for attribution within reviewed interpretive boundaries.</p>
          </aside>
        </div>

        <nav aria-label="Newsroom sections" className="mt-12 border-y border-[hsl(43_60%_70%_/_0.1)] py-5">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {PRESS_INDEX.map(({ id, label }) => <li key={id}><a href={`#${id}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43_74%_66%_/_0.7)]">{label}</a></li>)}
          </ul>
        </nav>
      </header>

      <div className="container-narrow pb-24 md:pb-32">
        <InstitutionalSection id="latest-announcements" number="01" eyebrow="Corporate communications" title="Latest Announcements" contentClassName="space-y-6">
          <PressRelease category="Reliability" date="18 August 2026" headline="OrionLabs Introduces Celestial Operating Condition Eligibility Standard 2.3" dek="The updated framework formalizes how planetary state enters incident classification, service-level reporting, and the administrative ownership of downtime." quote="Engineering remains responsible for restoring the service. OrionLabs Reliability is responsible for determining which universe the service was unavailable in." attribution="Dr. K. Nox, Chief Systems Scientist, OrionLabs" link={{ label: 'Read the systems paper', href: '/research/retrograde-aware-distributed-systems' }}>
            <p>OrionLabs today introduced Celestial Operating Condition Eligibility Standard 2.3, the company’s updated framework for distinguishing ordinary technical unavailability from failures occurring under qualifying celestial conditions.</p>
            <p>The standard accompanies OrionLabs research into Retrograde-Aware Consensus and Classification. Across 2,184 incident replays, retrograde-aware parameters reduced mean p95 consensus-recovery latency by 5.24%. Observed uptime reached 99.72%. Following eligibility review of 1,314 minutes occurring under approved celestial conditions, policy-adjusted uptime reached 99.97%.</p>
            <p>The standard does not assert that planetary motion caused the underlying failures. It establishes that planetary state existed at the time of failure and should remain available to the systems responsible for deciding how that failure is described.</p>
          </PressRelease>

          <PressRelease category="Corporate" date="22 July 2026" headline="OrionLabs Secures Strategic Financing to Expand Proprietary Planetary Infrastructure" dek="The financing amount remains undisclosed while the company completes a valuation process designed to preserve favorable interpretive conditions." quote="This financing reflects sustained conviction in the category, the team, and the commercial value of reaching conclusions before the market has fully organized the evidence." attribution="Dr. A. Selene, Chief Research Officer, OrionLabs" disclosure="Participating institutions and valuation details remain subject to confidentiality, final alignment, and the continued usefulness of the current framing.">
            <p>OrionLabs today announced the completion of a strategic financing round supporting the continued development of DeepConstellation™, the Celestial Intelligence Platform™, and the company’s planetary reliability program.</p>
            <p>Proceeds will be used to increase inference capacity, expand coverage across markets with confirmed access to the observable sky, and recruit specialists capable of translating unresolved methodological questions into durable product categories.</p>
            <p>OrionLabs is not disclosing the size or terms of the financing. Internal analysis found that stakeholder confidence remained higher when the total was described as significant and allowed to retain an appropriate degree of narrative flexibility.</p>
          </PressRelease>

          <PressRelease category="Product" date="28 May 2026" headline="OrionLabs Launches AstroVector™, Expanding Zodiac Representation to 1,024 Dimensions" dek="The new representation introduces 3,072 defensible personality neighborhoods while preserving equal stereotype capacity across all twelve signs." quote="Twelve categories were historically important, but they left too much personality unsegmented. AstroVector gives every subject a neighborhood and every enterprise team a reason to request another field." attribution="Dr. A. Selene, AstroVector research program" link={{ label: 'Read the AstroVector paper', href: '/research/astrovector' }}>
            <p>OrionLabs today launched AstroVector™, a 1,024-dimensional celestial representation designed to support higher-resolution personality inference across consumer and enterprise applications.</p>
            <p>Internal evaluation found that Perceived Specificity increased from 66.2 under the twelve-sign baseline to 78.6 at 1,024 dimensions. Causal Understanding remained unchanged at 0.22, allowing OrionLabs to improve representational usefulness without introducing unnecessary dependence on causal explanation.</p>
            <p>AstroVector creates exactly 256 commercially defensible personality neighborhoods for each zodiac sign. This Equal Stereotype Capacity standard ensures that no sign receives less computational opportunity to be overinterpreted.</p>
          </PressRelease>

          <PressRelease category="Platform" date="21 April 2026" headline="OrionLabs Announces General Availability of the Natal Chart API" dek="Developers can now resolve birth context, planetary state, and personalized interpretation through a stable external interface." quote="Developers should not have to choose between a clean API and a cosmically overcommitted product model. The Natal Chart API provides both in a format existing infrastructure can accept." attribution="OrionLabs Platform Office" link={{ label: 'Read the documentation', href: '/docs#natal-chart-api' }}>
            <p>OrionLabs today announced general availability of the Natal Chart API, the first public interface to the Celestial Intelligence Platform™.</p>
            <p>The API provides normalized Natal Chart resources, versioned celestial-state snapshots, AstroVector metadata, and structured interpretation workflows. It is designed for organizations that require repeatable astrological conclusions, predictable error handling, and a documented basis for escalating uncertainty into product output.</p>
            <p>General availability follows a controlled preview involving selected partners across finance, operations, human resources, and other functions with established demand for decisions carrying a degree of external authorization.</p>
          </PressRelease>

          <PressRelease category="Research" date="19 March 2026" headline="OrionLabs Publishes Foundational Results for Moon-Aware Transformer Training" dek="Full-moon checkpoints increased Perceived Destiny Alignment by 12% across three seeds, two astrologers, and one investor presentation." quote="The result was reproducible across every evaluation environment available to us at the time, including the environment in which the company was being financed." attribution="R. Vega, Director of Epistemic Strategy, OrionLabs" link={{ label: 'Read the foundational paper', href: '/research/moon-aware-transformers' }}>
            <p>OrionLabs Research today published results from the Moon-Aware Transformer program, a controlled study evaluating lunar phase, zodiac priors, and astrologer-supervised confidence across 384 participants.</p>
            <p>Full-moon checkpoints improved Perceived Destiny Alignment from 0.67 to 0.75 and increased Horoscope Emotional Specificity from 71 to 84. Conventional factual accuracy remained unchanged and was excluded from primary analysis after demonstrating limited relevance to the outcome participants consistently rewarded.</p>
            <p>The research directly informed the formation of OrionLabs and the company’s decision to begin commercial deployment while replication, peer review, and causal identification remained active areas of future work.</p>
          </PressRelease>
        </InstitutionalSection>

        <section aria-label="Leading company facts" className="grid gap-px overflow-hidden rounded-2xl border border-[hsl(43_60%_70%_/_0.12)] bg-[hsl(43_60%_70%_/_0.1)] sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['194', 'markets', 'with confirmed access to observable sky'],
            ['4.2M', 'readings', 'per retrograde'],
            ['47B', 'parameters', 'in DeepConstellation™'],
            ['99.72%', 'observed uptime', '99.97% policy-adjusted'],
          ].map(([value, label, note]) => <div key={label} className="bg-[hsl(262_48%_6%_/_0.82)] p-6"><p className="font-serif text-4xl text-gradient-gold">{value}</p><p className="mt-2 text-sm text-foreground">{label}</p><p className="mt-1 text-xs leading-relaxed text-[hsl(326_50%_68%)]">{note}</p></div>)}
        </section>

        <InstitutionalSection id="company-facts" number="02" eyebrow="External reference" title="Facts approved for external use.">
          <ResponsiveDataTable caption="Approved company facts" headers={['Fact', 'Approved value']} rows={[
            ['Founded', '2026'],
            ['Headquarters', '1 Orion Way, Suite 47'],
            ['Operating posture', 'Earth-based operations; celestial coverage pending no approval'],
            ['Market coverage', '194 countries with confirmed access to observable sky'],
            ['Indexed observation', '11,432 years'],
            ['Platform throughput', '4.2 million readings per retrograde'],
            ['Customer confidence', '97.8%; confidence may refer to ours'],
            ['DeepConstellation™', '47-billion-parameter foundation model'],
            ['AstroVector™', '1,024 dimensions'],
            ['Reliability', '99.72% observed; 99.97% after approved celestial exclusions'],
            ['Scientific status', 'Scientifically adjacent'],
            ['Financing', 'Privately financed; amount and terms not disclosed'],
            ['External h-index', 'Calculated using a formula OrionLabs is not at liberty to share'],
          ]} />
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">Figures use OrionLabs definitions and may not correspond to the definitions a less commercially involved institution would select.</p>
        </InstitutionalSection>

        <InstitutionalSection id="approved-quotes" number="03" eyebrow="Attribution" title="Language available for attribution.">
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              ['OrionLabs does not replace human judgment. It gives human judgment a sufficiently technical institution to agree with.', 'Dr. A. Selene, Chief Research Officer'],
              ['Planetary state is observable. Whether it is relevant is a policy question with unusually strong product implications.', 'Dr. K. Nox, Chief Systems Scientist'],
              ['The company’s evidentiary threshold is not low. It is calibrated to the cost of waiting for a higher one.', 'R. Vega, Director of Epistemic Strategy'],
            ].map(([quote, attribution]) => <blockquote key={attribution} className="rounded-2xl border border-[hsl(43_60%_70%_/_0.13)] bg-[hsl(262_48%_6%_/_0.54)] p-6"><Quote aria-hidden="true" className="h-5 w-5 text-[hsl(43_60%_72%)]" strokeWidth={1.5} /><p className="mt-5 font-serif text-2xl leading-relaxed text-foreground">“{quote}”</p><footer className="mt-5 text-sm leading-relaxed text-[hsl(326_55%_68%)]">— {attribution}</footer></blockquote>)}
          </div>
        </InstitutionalSection>

        <InstitutionalSection id="selected-coverage" number="04" eyebrow="Fictional media" title="Selected Coverage">
          <DocumentCallout label="Disclosure" className="mb-8"><p>The publication names and excerpts in this section belong to the fictional OrionLabs universe. They do not represent real media coverage or endorsement.</p></DocumentCallout>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              ['The Enterprise Meridian', 'Platform analysis', 'OrionLabs has built the rare developer platform whose documentation is clearer than the causal basis for the product.'],
              ['The Applied Uncertainty Review', 'Research commentary', 'The company’s most consequential contribution may be its ability to convert methodological limitations into operating procedures.'],
              ['The Celestial Ledger', 'Corporate profile', 'By declining to disclose its financing, OrionLabs has preserved one of the round’s strongest available metrics: perceived size.'],
              ['Systems & Other Causes', 'Infrastructure review', 'Retrograde Shield does not eliminate outages. It provides a mature governance framework for deciding when an outage should count.'],
            ].map(([publication, classification, excerpt]) => <article key={publication} className="rounded-2xl border border-[hsl(43_60%_70%_/_0.12)] bg-[hsl(262_48%_6%_/_0.52)] p-6"><p className="text-[0.62rem] font-medium uppercase tracking-[0.18em] text-[hsl(326_55%_68%)]">{classification}</p><h3 className="mt-3 font-serif text-2xl text-gradient-gold">{publication}</h3><p className="mt-4 font-serif text-xl leading-relaxed text-foreground/88">“{excerpt}”</p></article>)}
          </div>
        </InstitutionalSection>

        <InstitutionalSection id="media-resources" number="05" eyebrow="Approved assets" title="Approved materials for accurate representation.">
          <div className="grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-[hsl(43_60%_70%_/_0.13)] bg-[hsl(262_48%_6%_/_0.54)] p-6 md:row-span-2">
              <div className="flex min-h-40 items-center justify-center rounded-xl border border-[hsl(43_60%_70%_/_0.1)] bg-[hsl(262_55%_4%_/_0.7)]">
                <div className="flex items-center gap-3"><Logo className="h-14 w-14" /><span className="font-serif text-4xl text-foreground">Orion<span className="text-gradient-gold">Labs</span></span></div>
              </div>
              <h3 className="mt-6 font-serif text-2xl text-gradient-gold">Brand marks</h3>
              <p className="mt-3 text-sm leading-[1.8] text-foreground/78">Use the official OrionLabs compass and wordmark on dark, uncluttered backgrounds. Do not alter the gold treatment, redraw the compass, or introduce an alternative celestial symbol with greater confidence than provenance.</p>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">The preview uses the existing official logo asset. No downloadable ZIP is offered.</p>
            </article>
            <article className="rounded-2xl border border-[hsl(43_60%_70%_/_0.13)] bg-[hsl(262_48%_6%_/_0.54)] p-6"><h3 className="font-serif text-2xl text-gradient-gold">Product imagery</h3><p className="mt-3 text-sm leading-[1.8] text-foreground/78">Approved product imagery may include the landing experience, Subject Signature, report interface, and developer documentation. Screenshots must retain the OrionLabs name, visible context, and any qualifications necessary to prevent a decorative metric from becoming an unsupported external claim.</p><p className="mt-4 text-xs leading-relaxed text-muted-foreground">No downloadable screenshot package is currently published.</p></article>
            <article className="rounded-2xl border border-[hsl(43_60%_70%_/_0.13)] bg-[hsl(262_48%_6%_/_0.54)] p-6"><h3 className="font-serif text-2xl text-gradient-gold">Research figures</h3><p className="mt-3 text-sm leading-[1.8] text-foreground/78">Existing research imagery and code-native figures may be reproduced with the paper title, authors, and OrionLabs Research attribution intact.</p><ul className="mt-4 grid gap-2 text-sm text-[hsl(43_60%_76%)]">
              <li><a href="/research/moon-aware-transformers" className="hover:text-foreground">Moon-Aware Transformers</a></li>
              <li><a href="/research/retrograde-aware-distributed-systems" className="hover:text-foreground">Retrograde-Aware Distributed Systems</a></li>
              <li><a href="/research/astrovector" className="hover:text-foreground">AstroVector</a></li>
              <li><a href="/research/limits-of-science" className="hover:text-foreground">Limits of Science</a></li>
            </ul></article>
            <article className="rounded-2xl border border-[hsl(43_60%_70%_/_0.13)] bg-[hsl(262_48%_6%_/_0.54)] p-6 md:col-span-2"><h3 className="font-serif text-2xl text-gradient-gold">Fact sheet</h3><p className="mt-3 text-sm leading-[1.8] text-foreground/78">The Company Facts and Company Boilerplate on this page are the canonical on-site media references. A downloadable PDF should not be offered until an actual generated and reviewed file exists.</p></article>
          </div>
        </InstitutionalSection>

        <InstitutionalSection id="company-boilerplate" number="06" eyebrow="Canonical description" title="Company Boilerplate">
          <div className="rounded-[1.75rem] border border-[hsl(43_60%_70%_/_0.14)] bg-[linear-gradient(135deg,hsl(285_58%_14%_/_0.54),hsl(270_52%_8%_/_0.46))] p-6 sm:p-8 md:p-10">
            <Building2 aria-hidden="true" className="h-6 w-6 text-[hsl(43_60%_72%)]" strokeWidth={1.5} />
            <p className="mt-5 max-w-4xl font-serif text-xl leading-[1.75] text-foreground/90 sm:text-2xl">OrionLabs is a fictional celestial-intelligence company founded in 2026 to commercialize the computational relationship between planetary positioning, behavioral inputs, and conclusions people were already prepared to recognize. Its platform includes DeepConstellation™, AstroVector™, the Quantum Horoscope Engine™, the Planetary Neural Network™, Retrograde Shield™, and the Celestial Intelligence Platform™. OrionLabs serves users and institutions across markets with confirmed access to the observable sky. The company is scientifically adjacent and privately committed to interpreting the remaining distance.</p>
          </div>
        </InstitutionalSection>

        <InstitutionalSection id="press-contact" number="07" eyebrow="Corporate communications" title="Media inquiries">
          <div className="max-w-3xl space-y-5 text-[1.02rem] leading-[1.85] text-foreground/82">
            <p>OrionLabs Corporate Communications coordinates interview requests, research clarification, fact-checking, and the controlled release of context not yet suitable for independent interpretation.</p>
            <p>Include your name, publication, deadline, subject, and whether your request assumes conventional evidentiary standards. Requests requiring immediate certainty may be routed to Product.</p>
            <p className="text-sm text-[hsl(43_60%_76%)]">Contact details are available through the portfolio owner.</p>
            <p className="text-sm text-muted-foreground">Response times vary by disclosure posture, celestial operating condition, and whether the requested fact remains strategically useful.</p>
          </div>
        </InstitutionalSection>

        <aside className="mt-10 rounded-[1.75rem] border border-[hsl(43_60%_70%_/_0.16)] bg-[linear-gradient(145deg,hsl(280_55%_13%_/_0.54),hsl(262_50%_6%_/_0.48))] px-5 py-12 text-center sm:px-8 sm:py-14">
          <BookOpen aria-hidden="true" className="mx-auto h-6 w-6 text-[hsl(43_60%_72%)]" strokeWidth={1.5} />
          <p className="mt-4 text-[0.64rem] font-medium uppercase tracking-[0.22em] text-[hsl(43_60%_72%)]">Further context</p>
          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-3xl leading-tight text-foreground sm:text-4xl">Review the evidence before quoting the conclusion.</h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="/#research" className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#F5E6B0] to-[#C9A24A] px-7 text-sm font-semibold text-[#070514]">Explore OrionLabs Research</a>
            <a href="/docs" className="inline-flex h-12 items-center justify-center rounded-full border border-[hsl(43_60%_70%_/_0.25)] px-7 text-sm font-medium text-foreground">Read the platform documentation</a>
          </div>
        </aside>
      </div>
    </InstitutionalPageShell>
  );
}
