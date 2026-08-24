import type { ReactNode } from 'react';
import { ArrowRight, CircleAlert, FileCheck2, ShieldCheck } from 'lucide-react';
import { DocumentCallout } from '@/components/institutional/DocumentCallout';
import { DocumentIndex } from '@/components/institutional/DocumentIndex';
import { InstitutionalPageShell } from '@/components/institutional/InstitutionalPageShell';
import { InstitutionalSection } from '@/components/institutional/InstitutionalSection';
import { ResponsiveDataTable } from '@/components/institutional/ResponsiveDataTable';
import {
  INSTITUTIONAL_PAGE_METADATA,
  LEGAL_INDEX,
} from '@/data/institutional-content';

const legalParagraphClassName =
  'space-y-4 text-[0.98rem] leading-[1.85] text-foreground/82 sm:text-[1.04rem]';

function LegalSubsection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  const headingId = `legal-${number.replace(/\./g, '-')}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return (
    <section aria-labelledby={headingId} className="border-t border-[hsl(43_60%_70%_/_0.09)] py-8 first:border-0 first:pt-0 sm:py-10">
      <div className="grid gap-3 sm:grid-cols-[2.75rem_minmax(0,1fr)] sm:gap-5">
        <span className="font-mono text-xs text-[hsl(326_55%_68%)]">{number}</span>
        <div className="min-w-0">
          <h3 id={headingId} className="font-serif text-2xl leading-tight text-foreground sm:text-3xl">{title}</h3>
          <div className={`mt-4 ${legalParagraphClassName}`}>{children}</div>
        </div>
      </div>
    </section>
  );
}

function LegalList({ children }: { children: ReactNode }) {
  return <ul className="space-y-2.5 pl-5 marker:text-[hsl(43_60%_72%)]">{children}</ul>;
}

/** Complete legal structure grounded only in behavior confirmed by the repository. */
export function LegalPage() {
  return (
    <InstitutionalPageShell metadata={INSTITUTIONAL_PAGE_METADATA.legal}>
      <header className="container-narrow pb-14 pt-16 sm:pb-18 sm:pt-20 md:pb-20 md:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex flex-wrap items-center justify-center gap-3 text-[0.64rem] font-medium uppercase tracking-[0.2em]">
            <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(43_60%_70%_/_0.22)] bg-[hsl(43_74%_66%_/_0.07)] px-3 py-1.5 text-[hsl(43_60%_75%)]">
              <FileCheck2 aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
              Legal and compliance
            </span>
            <span className="text-muted-foreground/65">Version 1.0</span>
          </div>
          <h1 className="mt-8 font-serif text-[clamp(3rem,7vw,5.7rem)] leading-[0.98] tracking-[-0.025em]">
            <span className="text-gradient-gold">Structured terms for an </span>
            <span className="text-[hsl(326_65%_65%)]">interpretively complex</span>{' '}
            <span className="text-gradient-gold">universe.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-base leading-relaxed text-foreground/82 sm:text-lg md:text-xl">
            These documents explain the conditions governing the OrionLabs experience, the actual handling of questionnaire and report data, the current absence of application cookies, and the limits of conclusions produced under celestial operating conditions.
          </p>
        </div>

        <DocumentCallout label="Operator notice" className="mx-auto mt-10 max-w-4xl text-left">
          <div className="flex gap-4">
            <CircleAlert aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-[hsl(43_60%_72%)]" strokeWidth={1.5} />
            <p>OrionLabs is a fictional portfolio project, not a registered company or scientific institution. The public developer platform and corporate announcements described elsewhere on the site are fictional product surfaces. The interactive questionnaire and AI-generated report are real site functions and are described factually below.</p>
          </div>
        </DocumentCallout>
      </header>

      <div className="container-narrow pb-24 md:pb-32">
        <div className="xl:grid xl:grid-cols-[13rem_minmax(0,1fr)] xl:gap-10">
          <DocumentIndex items={LEGAL_INDEX} />
          <article className="min-w-0">
            <InstitutionalSection id="terms-of-alignment" number="01" eyebrow="Website terms" title="Terms of Alignment" contentClassName="max-w-[50rem]">
              <LegalSubsection number="1" title="Status and acceptance">
                <p>These Terms of Alignment apply to use of the OrionLabs website, questionnaire, report-generation experience, research pages, developer documentation, press materials, and related content.</p>
                <p>By using the interactive analysis experience, you acknowledge that OrionLabs is a fictional portfolio project and that its astrology, product architecture, research claims, corporate history, metrics, developer platform, and institutional terminology are presented as creative content. The generated report is provided for reflection and entertainment.</p>
                <p>If you do not accept these terms, do not submit questionnaire information or initiate an analysis.</p>
              </LegalSubsection>
              <LegalSubsection number="2" title="Eligibility">
                <p>The current questionnaire permits analysis only for users whose calculated age is 18 or older. You must provide information about yourself or information you are authorized to submit.</p>
                <p>Do not submit another person’s private information without their knowledge and permission. Do not enter highly sensitive personal information in the optional context field.</p>
              </LegalSubsection>
              <LegalSubsection number="3" title="Description of the service">
                <p>The site collects a limited questionnaire, derives an age from the supplied birth date, transmits an approved subset of fields to a server-side report-generation function and Google Gemini, validates the returned structure, and stores the completed report in the current browser tab’s session storage.</p>
                <p>OrionLabs does not currently provide user accounts, server-side report history, persistent share links, a report database, or a live public developer API.</p>
                <p>Documentation of the Natal Chart API, AstroVector SDK, and related external platform services is fictional product content and does not constitute an offer of operational API access.</p>
              </LegalSubsection>
              <LegalSubsection number="4" title="Generated content">
                <p>Generated reports may contain astrological interpretation, behavioral observations, forecasts, recommendations, fictional confidence metrics, and personalized comedic criticism.</p>
                <p>Generated content may be incomplete, inaccurate, inappropriate to the user’s circumstances, or more confident than the supplied evidence supports. Validation ensures that required report fields are structurally present; it does not establish that the conclusions are true.</p>
                <p>You remain responsible for evaluating and deciding whether to act on any generated material.</p>
              </LegalSubsection>
              <LegalSubsection number="5" title="Restricted reliance">
                <p>Do not use OrionLabs as the sole or primary basis for medical, mental-health, legal, financial, employment, educational, housing, insurance, safety, emergency, or other consequential decisions.</p>
                <p>OrionLabs does not provide professional advice, diagnosis, risk scoring, psychological assessment, or scientific measurement. Fictional confidence values and labels do not convert the report into any of those services.</p>
              </LegalSubsection>
              <LegalSubsection number="6" title="User submissions">
                <p>You are responsible for the accuracy and appropriateness of information you submit. You should provide only the information needed to generate the report and avoid unnecessary personal details.</p>
                <p>Submission authorizes the site to process the approved generation fields for the purpose of producing and returning the requested report.</p>
              </LegalSubsection>
              <LegalSubsection number="7" title="Availability and celestial operating conditions">
                <p>The site may be unavailable, rate-limited, delayed, or unable to complete a report because of hosting failures, provider capacity, network conditions, invalid data, browser-storage restrictions, or ordinary software defects.</p>
                <p>OrionLabs may classify such conditions using fictional celestial terminology. That classification does not alter the underlying technical failure, your practical circumstances, or any rights available under applicable law.</p>
              </LegalSubsection>
              <LegalSubsection number="8" title="Prohibited use">
                <p>Users may not:</p>
                <LegalList>
                  <li>Attempt to obtain or expose secret keys or server configuration.</li>
                  <li>Interfere with rate limits, validation, storage boundaries, or service availability.</li>
                  <li>Submit unlawful, abusive, or unauthorized personal data.</li>
                  <li>Misrepresent generated content as medical, psychological, legal, financial, employment, or scientific evaluation.</li>
                  <li>Use fictional research, press coverage, metrics, or documentation to imply real institutional validation.</li>
                  <li>Copy the site in a way that falsely presents OrionLabs as an operating company, real research institution, or real provider of the fictional public API.</li>
                </LegalList>
              </LegalSubsection>
              <LegalSubsection number="9" title="Intellectual property">
                <p>The site’s original code, design, copy, fictional research, visual assets, and brand presentation may be protected by applicable copyright and other laws. Permission to view the site does not transfer ownership.</p>
                <p>The use of ™ identifies fictional brand terminology and does not by itself claim registered-trademark status.</p>
              </LegalSubsection>
              <LegalSubsection number="10" title="Disclaimers">
                <p>The site and its content are provided on an “as available” basis. No warranty is made that generated reports will be accurate, useful, uninterrupted, error-free, or compatible with the user’s preferred interpretation of causality.</p>
                <p>Fictional service levels, API behavior, company metrics, research findings, and enterprise capabilities are creative content, not operational commitments.</p>
              </LegalSubsection>
              <LegalSubsection number="11" title="Liability boundary">
                <p>No provision should be interpreted to exclude liability that cannot legally be excluded.</p>
              </LegalSubsection>
              <LegalSubsection number="12" title="Changes">
                <p>The site, report flow, providers, storage model, fictional products, and these terms may change. Material changes affecting real personal-data behavior should be reflected in the Privacy and Cookie sections before deployment.</p>
              </LegalSubsection>
              <LegalSubsection number="13" title="Governing law and terrestrial authority">
                <p>Mandatory law remains controlling. Planetary position, celestial operating condition, and cross-universe availability do not displace consumer rights or the jurisdiction of a competent terrestrial authority.</p>
              </LegalSubsection>
            </InstitutionalSection>

            <InstitutionalSection id="privacy" number="02" eyebrow="Real application behavior" title="Privacy (Cosmic)" contentClassName="max-w-[50rem]">
              <DocumentCallout label="1 · Scope" className="mb-8">
                <p>This Privacy section describes the real data behavior of the current OrionLabs website as supported by its implementation. It does not describe the fictional public API as if that API were operational.</p>
              </DocumentCallout>

              <LegalSubsection number="2" title="Information entered in the questionnaire">
                <p>The questionnaire may contain:</p>
                <LegalList>
                  <li>Zodiac sign</li><li>First name</li><li>Birth date</li><li>Reference preference</li><li>Current focus area</li><li>Behavioral statement</li><li>Optional free-text context</li>
                </LegalList>
                <p>Optional context may contain personal information depending on what the user chooses to enter. Users should not include sensitive medical, mental-health, financial, legal, authentication, government-identifier, or third-party information.</p>
              </LegalSubsection>
              <LegalSubsection number="3" title="Information stored in the browser">
                <p>During the active journey, the site stores the full questionnaire answers, current step, review state, and an optional pending report identifier in <code className="font-mono text-[0.9em] text-[hsl(43_60%_78%)]">sessionStorage</code>.</p>
                <p>After successful generation, the temporary questionnaire draft is cleared. The completed report is stored as a versioned session record containing:</p>
                <LegalList>
                  <li>A private report identifier</li><li>Creation timestamp</li><li>Schema version and completed status</li><li>Subject name, zodiac sign, and calculated age</li><li>Subject Signature inputs: zodiac sign, focus area, and behavioral statement</li><li>The complete generated report</li>
                </LegalList>
                <p>Completed reports are separate snapshots. A prior completed report may remain stored in the current tab while a new analysis is attempted and may remain as an inactive record after another report becomes active.</p>
                <p>The site does not currently store OrionLabs data in <code className="font-mono text-[0.9em] text-[hsl(43_60%_78%)]">localStorage</code>, IndexedDB, or a server-side report database.</p>
              </LegalSubsection>
              <LegalSubsection number="4" title="Birth date and age">
                <p>The browser calculates age from the supplied birth date before generation input is created.</p>
                <p>The raw birth date remains in the temporary questionnaire draft and is not included in the generation request sent to the Vercel Function or Google Gemini.</p>
                <p>The calculated age is included in that request.</p>
              </LegalSubsection>
              <LegalSubsection number="5" title="Reference preference">
                <p>Reference preference is required by the current questionnaire and remains in the browser draft for review and route validation.</p>
                <p>It is not included in report-generation input. Generated reports use second-person language rather than transmitting the selected reference preference to Gemini.</p>
              </LegalSubsection>
              <LegalSubsection number="6" title="Information sent for report generation">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[hsl(43_60%_70%_/_0.13)] bg-[hsl(262_48%_6%_/_0.54)] p-5">
                    <h4 className="font-serif text-xl text-gradient-gold">Only</h4>
                    <LegalList><li>First name</li><li>Zodiac sign</li><li>Calculated age</li><li>Focus area</li><li>Behavioral statement</li><li>Optional context, when non-empty</li></LegalList>
                  </div>
                  <div className="rounded-2xl border border-[hsl(326_55%_68%_/_0.16)] bg-[hsl(262_48%_6%_/_0.54)] p-5">
                    <h4 className="font-serif text-xl text-[hsl(326_55%_70%)]">Not sent</h4>
                    <LegalList><li>Raw birth date</li><li>Reference preference</li><li>Pending report ID</li><li>Full questionnaire draft</li><li>Browser analytics identifiers</li><li>Existing report history</li></LegalList>
                  </div>
                </div>
              </LegalSubsection>
              <LegalSubsection number="7" title="Processing path">
                <figure className="rounded-2xl border border-[hsl(43_60%_70%_/_0.14)] bg-[hsl(262_55%_4%_/_0.78)] p-5 sm:p-6">
                  <figcaption className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-[hsl(43_60%_74%)]">Current-tab data flow</figcaption>
                  <div className="mt-5 grid gap-px overflow-hidden rounded-xl bg-[hsl(43_60%_70%_/_0.12)] sm:grid-cols-2 lg:grid-cols-3">
                    {[
                      'Questionnaire in browser',
                      'Current-tab sessionStorage draft',
                      'Approved fields sent to OrionLabs Vercel Function',
                      'Strict server validation',
                      'Approved fields sent to Google Gemini',
                      'Structured report returned and validated',
                      'Completed report stored in current-tab sessionStorage',
                    ].map((step, index) => (
                      <div key={step} className="min-h-24 bg-[hsl(262_48%_6%_/_0.96)] p-4">
                        <span className="font-mono text-[0.58rem] text-[hsl(326_50%_68%)]">{String(index + 1).padStart(2, '0')}</span>
                        <p className="mt-2 text-sm leading-snug text-foreground/82">{step}</p>
                      </div>
                    ))}
                  </div>
                </figure>
              </LegalSubsection>
              <LegalSubsection number="8" title="Service providers and external resources">
                <div className="space-y-6">
                  <div><h4 className="font-serif text-xl text-gradient-gold">Vercel</h4><p className="mt-2">The site is configured for Vercel hosting and uses a Vercel Function for report generation. Standard network requests necessarily provide hosting infrastructure with connection metadata.</p></div>
                  <div><h4 className="font-serif text-xl text-gradient-gold">Google Gemini</h4><p className="mt-2">Approved generation fields are transmitted to Google Gemini through the server-side <code className="font-mono text-[0.9em] text-[hsl(43_60%_78%)]">@google/genai</code> SDK.</p></div>
                  <div><h4 className="font-serif text-xl text-gradient-gold">Google Fonts</h4><p className="mt-2">The page currently loads Cormorant Garamond and Inter from Google Fonts. A visitor’s browser therefore contacts Google’s font infrastructure when loading the site.</p></div>
                  <p className="text-sm text-muted-foreground">The repository does not establish specific provider retention, training, logging, regional processing, or deletion behavior.</p>
                </div>
              </LegalSubsection>
              <LegalSubsection number="9" title="Application logging and caching">
                <p>The report-generation handler sets <code className="font-mono text-[0.9em] text-[hsl(43_60%_78%)]">Cache-Control: no-store</code> on its JSON responses.</p>
                <p>Its explicit error logging avoids questionnaire text and provider messages. It records only general failure classifications such as capacity exhaustion, missing configuration, or error class.</p>
                <p>This does not establish what Vercel, Google, network intermediaries, or production observability tools may independently log.</p>
              </LegalSubsection>
              <LegalSubsection number="10" title="Retention and replacement behavior">
                <p>Questionnaire drafts and completed reports are stored in the current tab’s <code className="font-mono text-[0.9em] text-[hsl(43_60%_78%)]">sessionStorage</code>. They survive ordinary page refreshes. They normally end with the browser-tab session, although browser restoration behavior may extend that practical lifetime.</p>
                <p>Starting a new analysis may clear temporary questionnaire and analysis journey state, but preserves the active completed report while the replacement journey is underway.</p>
                <p>The active completed report is replaced only after a newly generated report has been successfully validated, persisted, and promoted as the new active report.</p>
                <p>The site has no server-side report history or account-based retention controls.</p>
              </LegalSubsection>
              <LegalSubsection number="11" title="User controls">
                <p>Users may stop before beginning analysis, leave the questionnaire, or close the tab. The site does not currently provide a dedicated data-deletion screen, report-history interface, account dashboard, or provider-deletion request workflow.</p>
                <p>Closing the tab normally ends the browser session, but browser session restoration is outside OrionLabs control.</p>
              </LegalSubsection>
              <LegalSubsection number="12" title="Security">
                <p>The browser sends generation requests only to the OrionLabs server endpoint. The Gemini API key is read only by server code and is not returned to the browser. Input and output are validated against strict schemas, malformed reports are rejected, and errors shown to the browser do not include provider internals or questionnaire free text.</p>
                <p>No system can guarantee absolute security.</p>
              </LegalSubsection>
              <LegalSubsection number="13" title="Rights and contact">
                <p>The current site does not publish a dedicated privacy contact, controller identity, jurisdiction-specific rights procedure, complaint authority, international-transfer commitment, or provider-deletion workflow.</p>
                <p>Nothing in this document limits rights that apply under controlling law.</p>
              </LegalSubsection>
            </InstitutionalSection>

            <InstitutionalSection id="cookies" number="03" eyebrow="Browser storage" title="Cookie Policy (Lunar)" contentClassName="max-w-[50rem]">
              <LegalSubsection number="1" title="Current application-cookie status">
                <p>The current OrionLabs application code does not set, read, or manage browser cookies.</p>
                <p>No application analytics, advertising, personalization, authentication, or consent cookies were found in the repository.</p>
              </LegalSubsection>
              <LegalSubsection number="2" title="Browser storage is not a cookie">
                <p>OrionLabs uses <code className="font-mono text-[0.9em] text-[hsl(43_60%_78%)]">sessionStorage</code> for questionnaire drafts and completed reports. <code className="font-mono text-[0.9em] text-[hsl(43_60%_78%)]">sessionStorage</code> is a browser-storage mechanism, not a cookie. It is not automatically attached to ordinary HTTP requests.</p>
                <p>The information stored there remains available to scripts running on the OrionLabs origin during the current tab session and is described in Privacy (Cosmic).</p>
              </LegalSubsection>
              <LegalSubsection number="3" title="Hosting and external resources">
                <p>Vercel infrastructure, Google Fonts, Google Gemini, or future deployment services may have independent technical behavior not visible in application source code.</p>
              </LegalSubsection>
              <LegalSubsection number="4" title="Lunar classification system">
                <ResponsiveDataTable caption="Lunar cookie classifications" headers={['Classification', 'Current status', 'Meaning']} rows={[
                  ['Essential (New Moon)', 'None set by application code', 'Would support a function visitor explicitly requests'],
                  ['Preference (Waxing)', 'None', 'Would remember optional display preferences'],
                  ['Analytics (Full Moon)', 'None', 'Would measure site use or performance'],
                  ['Advertising (Retrograde)', 'None', 'Would support cross-context promotion or targeting'],
                  ['Celestial (Unratified)', 'Fictional only', 'Would classify state without creating a technical storage mechanism'],
                ]} />
                <p>The lunar labels are editorial classifications. They do not change the technical definition of a cookie or the consent rules that may apply.</p>
              </LegalSubsection>
              <LegalSubsection number="5" title="Future changes">
                <p>If OrionLabs adds application cookies, analytics, authentication, or persistent server-side storage, this policy must be updated before or alongside deployment. A consent interface should be added when legally or functionally required, not merely because lunar classification has become available.</p>
              </LegalSubsection>
            </InstitutionalSection>

            <InstitutionalSection id="compliance" number="04" eyebrow="Use boundaries" title="Compliance & Superstition" contentClassName="max-w-[50rem]">
              <LegalSubsection number="1" title="Evidence classification">
                <p>OrionLabs is scientifically adjacent. Its fictional research, developer platform, internal benchmarks, and celestial terminology are not evidence that astrology is scientifically valid or causally predictive.</p>
                <p>Scientific validity, repeatability, causal explanation, and exposure to falsification remain materially different from perceived specificity, personal resonance, customer confidence, or commercial usefulness.</p>
              </LegalSubsection>
              <LegalSubsection number="2" title="Permitted use"><p>OrionLabs reports may be used for entertainment, creative reflection, conversation, and the examination of how confidently framed systems influence interpretation.</p></LegalSubsection>
              <LegalSubsection number="3" title="Restricted reliance">
                <p>OrionLabs must not be used as a substitute for qualified professional judgment or as the sole basis for consequential decisions involving health, mental health, safety, finance, law, employment, housing, education, insurance, or emergency action.</p>
                <p>When professional advice is appropriate, consult a properly qualified person. Celestial context does not expand OrionLabs’ professional jurisdiction.</p>
              </LegalSubsection>
              <LegalSubsection number="4" title="Generated-content posture">
                <p>The system may produce direct, personalized, or critical observations. It is instructed not to invent unsupported personal events and not to target protected characteristics, medical or mental-health information, trauma, addiction, appearance, or similarly sensitive areas.</p>
                <p>These safeguards reduce risk; they do not guarantee that every generated response will be appropriate.</p>
              </LegalSubsection>
              <LegalSubsection number="5" title="Conventional scientific consensus"><p>OrionLabs acknowledges that conventional scientific consensus does not establish astrology as a valid predictive mechanism. The company’s fictional disagreement with the exclusivity of that consensus is part of the project’s institutional voice and not a scientific rebuttal.</p></LegalSubsection>
              <LegalSubsection number="6" title="Celestial operating conditions"><p>Terms such as retrograde exclusion, celestial interference, planetary reliability, commercial tolerance, and evidence policy are fictional product and research concepts. They do not transfer legal responsibility, repair technical failures, or change factual events.</p></LegalSubsection>
              <LegalSubsection number="7" title="Enterprise posture"><p>No fictional metric, API response, research figure, testimonial, press release, or service-level statement should be used to represent OrionLabs as a real vendor, research institution, assessment provider, or compliance authority.</p></LegalSubsection>
              <LegalSubsection number="8" title="Jurisdiction"><p>Astrology may claim broad interpretive reach. Applicable law, professional regulation, and terrestrial safety requirements retain narrower but controlling authority.</p></LegalSubsection>
            </InstitutionalSection>

            <InstitutionalSection id="trademarks" number="05" eyebrow="Fictional brand terms" title="Trademarks" contentClassName="max-w-[50rem]">
              <LegalSubsection number="1" title="OrionLabs marks">
                <p>Fictional OrionLabs names and product marks:</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {['OrionLabs', 'DeepConstellation™', 'Quantum Horoscope Engine™', 'Planetary Neural Network™', 'AstroVector™', 'Celestial Intelligence Platform™', 'Retrograde Shield™', 'Orion Subject Signature', 'Scientifically Adjacent'].map((mark) => (
                    <span key={mark} className="rounded-xl border border-[hsl(43_60%_70%_/_0.1)] bg-[hsl(262_48%_6%_/_0.48)] px-4 py-3 text-sm text-foreground/82">{mark}</span>
                  ))}
                </div>
                <p>The ™ symbol identifies claimed fictional brand terminology. It does not state that a mark is registered.</p>
              </LegalSubsection>
              <LegalSubsection number="2" title="Use of marks">
                <p>Marks should be written exactly, without abbreviation that obscures product identity or modification that implies a different celestial methodology.</p>
                <p>Reasonable editorial reference may be permitted where it does not imply sponsorship, endorsement, partnership, scientific validation, or access to an operational fictional product.</p>
              </LegalSubsection>
              <LegalSubsection number="3" title="Cross-universe rights"><p>OrionLabs reserves no rights that the actual operator does not legally possess. Any claim extending across unobservable universes is ceremonial until jurisdiction, service, and an appropriate appellate body become available.</p></LegalSubsection>
              <LegalSubsection number="4" title="Third-party marks"><p>Google, Gemini, Vercel, React, TypeScript, Vite, and other third-party names belong to their respective owners. Their appearance describes tools or services used by the project and does not imply endorsement of OrionLabs, astrology, or the company’s preferred interpretation of causality.</p></LegalSubsection>
            </InstitutionalSection>

            <aside className="mt-10 rounded-[1.75rem] border border-[hsl(43_60%_70%_/_0.16)] bg-[linear-gradient(145deg,hsl(280_55%_13%_/_0.54),hsl(262_50%_6%_/_0.48))] px-5 py-12 text-center sm:px-8 sm:py-14">
              <ShieldCheck aria-hidden="true" className="mx-auto h-6 w-6 text-[hsl(43_60%_72%)]" strokeWidth={1.5} />
              <p className="mt-4 text-[0.64rem] font-medium uppercase tracking-[0.22em] text-[hsl(43_60%_72%)]">Document control</p>
              <h2 className="mx-auto mt-4 max-w-3xl font-serif text-3xl leading-tight text-foreground sm:text-4xl">These documents end where repository evidence ends.</h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">Unconfirmed provider, deployment, jurisdictional, and ownership claims remain withheld pending a form of validation OrionLabs recognizes as unusually external.</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a href="#privacy" className="focus-ring-gold group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#F5E6B0] to-[#C9A24A] px-7 text-sm font-semibold text-[#070514]">Review Privacy (Cosmic)<ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" /></a>
                <a href="/" className="focus-ring-gold inline-flex h-12 items-center justify-center rounded-full border border-[hsl(43_60%_70%_/_0.25)] px-7 text-sm font-medium text-foreground">Return to OrionLabs</a>
              </div>
            </aside>
          </article>
        </div>
      </div>
    </InstitutionalPageShell>
  );
}
