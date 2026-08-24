import { ArrowRight, Braces, CheckCircle2, Terminal } from 'lucide-react';
import { CodeExample } from '@/components/institutional/CodeExample';
import { DocumentCallout } from '@/components/institutional/DocumentCallout';
import { DocumentIndex } from '@/components/institutional/DocumentIndex';
import { InstitutionalPageShell } from '@/components/institutional/InstitutionalPageShell';
import { InstitutionalSection } from '@/components/institutional/InstitutionalSection';
import { ResponsiveDataTable } from '@/components/institutional/ResponsiveDataTable';
import {
  DOCS_INDEX,
} from '@/data/institutional-content';
import { INSTITUTIONAL_PAGE_METADATA } from '@/data/institutional-metadata';

const firstRequest = `curl --request POST \\
  --url https://api.orionlabs.example/v1/natal-charts \\
  --header "Authorization: Bearer ol_test_replace_with_alignment_key" \\
  --header "Content-Type: application/json" \\
  --header "Idempotency-Key: demo-mira-1993-08-17" \\
  --header "X-Orion-Planetary-State: auto" \\
  --data '{
    "subject": {
      "name": "Mira Chen",
      "birth_date": "1993-08-17",
      "birth_time": "14:32:00",
      "birthplace": {
        "label": "Lisbon, PT",
        "latitude": 38.7223,
        "longitude": -9.1393
      }
    },
    "options": {
      "house_system": "placidus",
      "include": ["astrovector", "celestial_context"]
    }
  }'`;

const firstResponse = `{
  "id": "natal_01J5R7MX8B4CZ6J6T7AB2P3Q4R",
  "object": "natal_chart",
  "status": "resolved",
  "subject": {
    "name": "Mira Chen"
  },
  "precision": {
    "level": "high",
    "birth_time_source": "provided"
  },
  "celestial_context": {
    "id": "cstate_01J5R7P6V2H8K3M4Q9S1W6X7YZ",
    "state": "nominal",
    "resolution": "automatic"
  },
  "astrovector": {
    "dimensions": 1024,
    "vector_id": "avec_01J5R7Q1F0M9N2P6R8T4V3W5XY"
  },
  "created_at": "2026-08-19T09:30:00Z"
}`;

const interpretationRequest = `{
  "chart_id": "natal_01J5R7MX8B4CZ6J6T7AB2P3Q4R",
  "focus_area": "career",
  "behavioral_prior": "I like having a plan",
  "output": {
    "tone": "executive",
    "detail": "standard"
  }
}`;

const interpretationResponse = `{
  "id": "interp_01J5R82D6H3K9M1N4P7Q2S8TVW",
  "object": "interpretation",
  "status": "complete",
  "chart_id": "natal_01J5R7MX8B4CZ6J6T7AB2P3Q4R",
  "summary": "Mira is approaching a career decision with a level of preparation that has begun to compete with the decision itself.",
  "signals": [
    {
      "name": "structured_uncertainty",
      "strength": 0.88,
      "classification": "elevated"
    },
    {
      "name": "authorization_latency",
      "strength": 0.73,
      "classification": "self-maintained"
    }
  ],
  "confidence": {
    "score": 0.84,
    "classification": "commercially actionable"
  },
  "model": {
    "deepconstellation": "dc-47b",
    "astrovector_dimensions": 1024
  },
  "celestial_context_id": "cstate_01J5R7P6V2H8K3M4Q9S1W6X7YZ",
  "created_at": "2026-08-19T09:30:02Z"
}`;

const sdkExample = `import { OrionLabs } from '@orionlabs/celestial';

const orion = new OrionLabs({
  apiKey: process.env.ORIONLABS_API_KEY!,
  planetaryState: 'auto',
});

const chart = await orion.natalCharts.create({
  subject: {
    name: 'Mira Chen',
    birthDate: '1993-08-17',
    birthTime: '14:32:00',
    birthplace: {
      label: 'Lisbon, PT',
      latitude: 38.7223,
      longitude: -9.1393,
    },
  },
});

const interpretation = await orion.interpretations.create({
  chartId: chart.id,
  focusArea: 'career',
  behavioralPrior: 'I like having a plan',
});`;

const rateLimitExample = `HTTP/1.1 429 Too Many Requests
RateLimit-Limit: 60
RateLimit-Remaining: 0
RateLimit-Reset: 18
Retry-After: 18
X-Orion-Burst-Limit: 84
X-Orion-Celestial-Multiplier: 0.80
Content-Type: application/json`;

const errorEnvelope = `{
  "error": {
    "code": "PLANETARY_STATE_UNRESOLVED",
    "message": "A usable celestial-state snapshot could not be resolved.",
    "request_id": "req_01J5R8D1N4P7Q2S6T9V3W8XYZA",
    "retryable": true
  }
}`;

const architectureSteps = [
  ['Celestial Intelligence Platform™', 'Orchestration', 'Validates requests, selects policy, coordinates model services, and returns one consistent response surface.'],
  ['Planetary Neural Network™', 'Distributed Compute', 'Resolves ephemeris, location, and declared celestial-state inputs across infrastructure designed to recognize conditions conventional cloud platforms continue to treat as unrelated.'],
  ['AstroVector™', 'Representation', 'Maps the subject into a 1,024-dimensional celestial representation. The current production dimensionality balances specificity, neighborhood coherence, and the remaining availability of human-readable explanations.'],
  ['DeepConstellation™', 'Foundation Model', 'Combines celestial context, behavioral priors, and approved evidence policy through a 47-billion-parameter interpretation model trained on recorded horoscope language and other historically under-governed sources.'],
  ['Quantum Horoscope Engine™', 'Inference', 'Collapses multiple plausible interpretations into the single response most compatible with the requested output profile.'],
  ['Retrograde Shield™', 'Reliability', 'Applies retry policy, state classification, and celestial operating-condition treatment before a failure is allowed to become ordinary downtime.'],
] as const;

const bodyCopyClassName =
  'max-w-[48rem] space-y-5 text-[0.98rem] leading-[1.85] text-foreground/82 sm:text-[1.04rem]';
const inlineCodeClassName =
  'rounded bg-[hsl(280_45%_14%_/_0.7)] px-1.5 py-0.5 font-mono text-[0.82em] text-[hsl(43_60%_78%)]';

/** Complete fictional public-product documentation for the Celestial Intelligence Platform. */
export function DocsPage() {
  return (
    <InstitutionalPageShell metadata={INSTITUTIONAL_PAGE_METADATA.docs}>
      <header className="container-narrow pb-16 pt-16 sm:pb-20 sm:pt-20 md:pb-24 md:pt-28">
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 text-[0.64rem] font-medium uppercase tracking-[0.2em]">
            <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(43_60%_70%_/_0.22)] bg-[hsl(43_74%_66%_/_0.07)] px-3 py-1.5 text-[hsl(43_60%_75%)]">
              <Terminal aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
              Developer documentation
            </span>
            <span className="text-muted-foreground/65">
              API v1 · Operational within declared celestial tolerance
            </span>
          </div>

          <h1 className="mt-8 max-w-4xl font-serif text-[clamp(3rem,7vw,5.8rem)] leading-[0.96] tracking-[-0.025em]">
            <span className="text-gradient-gold">Celestial infrastructure, documented for </span>
            <span className="text-[hsl(326_65%_65%)]">ordinary systems.</span>
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-relaxed text-foreground/82 sm:text-lg md:text-xl">
            Build natal-chart, planetary-context, and personalized interpretation workflows on the OrionLabs Celestial Intelligence Platform. The interface is conventional. The assumptions have been standardized separately.
          </p>
          <p className="mt-5 max-w-2xl border-l border-[hsl(326_55%_68%_/_0.35)] pl-5 text-sm leading-relaxed text-muted-foreground">
            API v1 is stable under nominal conditions and contractually stable under several others.
          </p>
          <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row">
            <a
              href="#getting-started"
              className="focus-ring-gold group inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#F5E6B0] to-[#C9A24A] px-7 text-sm font-semibold text-[#070514] shadow-[0_8px_30px_-6px_hsl(43_74%_66%_/_0.4)] transition-transform hover:scale-[1.02] motion-reduce:transform-none"
            >
              Make your first request
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
            </a>
            <a
              href="#model-architecture"
              className="focus-ring-gold inline-flex h-12 items-center rounded-full border border-[hsl(43_60%_70%_/_0.25)] px-7 text-sm font-medium text-foreground/90 transition-colors hover:border-[hsl(43_60%_70%_/_0.5)]"
            >
              Review the architecture
            </a>
          </div>
        </div>
      </header>

      <div className="container-narrow pb-24 md:pb-32">
        <div className="xl:grid xl:grid-cols-[13rem_minmax(0,1fr)] xl:gap-10">
          <DocumentIndex items={DOCS_INDEX} />
          <article className="min-w-0">
            <InstitutionalSection
              id="overview"
              number="01"
              eyebrow="Platform scope"
              title="One platform for structured celestial interpretation."
            >
              <div className={bodyCopyClassName}>
                <p>OrionLabs exposes a compact API for converting birth information, geographic context, and declared behavioral priorities into normalized celestial records. Those records may then be resolved through DeepConstellation™, represented in AstroVector™, and interpreted by the Quantum Horoscope Engine™.</p>
                <p>The platform is designed for teams that require repeatable responses, typed fields, stable identifiers, and a documented method for distinguishing technical failure from unfavorable celestial operating conditions.</p>
              </div>
              <DocumentCallout label="Product boundary" className="mt-8">
                <p>This documentation describes the fictional public Celestial Intelligence Platform. It is separate from the consumer analysis experience and does not document, expose, or reproduce the portfolio site’s private report-generation endpoint.</p>
              </DocumentCallout>
              <div className="mt-10">
                <ResponsiveDataTable
                  caption="API conventions"
                  headers={['Convention', 'Value']}
                  rows={[
                    ['Base URL', <code className={inlineCodeClassName}>https://api.orionlabs.example/v1</code>],
                    ['Request and response format', <code className={inlineCodeClassName}>application/json</code>],
                    ['Version date', <code className={inlineCodeClassName}>2026-08-01</code>],
                    ['Timestamps', 'RFC 3339 in UTC'],
                    ['Resource IDs', 'Opaque, stable strings'],
                    ['Idempotency', 'Supported on all creation endpoints'],
                    ['Authentication', 'Bearer alignment key'],
                    ['Default celestial context', 'Resolved automatically at request time'],
                  ]}
                />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Resource IDs should be stored as opaque values. Their visible prefixes indicate resource type for operational convenience, not for client-side inference.</p>
              </div>
            </InstitutionalSection>

            <InstitutionalSection id="getting-started" number="02" eyebrow="First request" title="Create a natal chart in one request.">
              <p className="max-w-[48rem] text-[1.02rem] leading-[1.85] text-foreground/82">A Natal Chart resource is the stable input to every higher-order OrionLabs interpretation. Supply the subject’s birth context and request only the derived products your application needs.</p>
              <div className="mt-8 space-y-6">
                <CodeExample label="Create a Natal Chart" language="bash">{firstRequest}</CodeExample>
                <CodeExample label="Resolved response" language="json">{firstResponse}</CodeExample>
              </div>
              <DocumentCallout label="Resolution note" className="mt-8">
                <p>The full 1,024-dimensional AstroVector is not returned by default. Most integrations require its stable identifier rather than 1,024 opportunities to misunderstand a personality simultaneously.</p>
              </DocumentCallout>
            </InstitutionalSection>

            <InstitutionalSection id="authentication" number="03" eyebrow="Access control" title="Authenticate every request with an alignment key.">
              <div className={bodyCopyClassName}>
                <p>OrionLabs uses bearer alignment keys. Keys are scoped to an environment and a defined set of platform capabilities. Keep production keys on a trusted server. Do not embed them in browser code, public repositories, screenshots, investor materials, or sufficiently detailed astrological readings.</p>
              </div>
              <div className="mt-8"><CodeExample label="Authorization header" language="http">Authorization: Bearer ol_live_replace_with_alignment_key</CodeExample></div>
              <div className="mt-8 space-y-6">
                <ResponsiveDataTable caption="Alignment key types" headers={['Prefix', 'Environment', 'Intended use']} rows={[
                  [<code className={inlineCodeClassName}>ol_test_</code>, 'Test', 'Development and deterministic fixtures'],
                  [<code className={inlineCodeClassName}>ol_live_</code>, 'Production', 'Approved live integrations'],
                  [<code className={inlineCodeClassName}>ol_ent_</code>, 'Enterprise', 'Contract-scoped planetary infrastructure'],
                ]} />
                <ResponsiveDataTable caption="Alignment key scopes" headers={['Scope', 'Access']} rows={[
                  [<code className={inlineCodeClassName}>natal:write</code>, 'Create Natal Chart resources'],
                  [<code className={inlineCodeClassName}>natal:read</code>, 'Retrieve existing Natal Chart resources'],
                  [<code className={inlineCodeClassName}>interpretation:write</code>, 'Generate interpretations'],
                  [<code className={inlineCodeClassName}>planetary-state:read</code>, 'Retrieve current celestial context'],
                  [<code className={inlineCodeClassName}>astrovector:read</code>, 'Retrieve approved AstroVector metadata'],
                ]} />
              </div>
              <DocumentCallout label="Security" className="mt-8"><p>A leaked key should be revoked immediately. Planetary motion does not invalidate credentials automatically, even when doing so would improve the incident narrative.</p></DocumentCallout>
            </InstitutionalSection>

            <InstitutionalSection id="natal-chart-api" number="04" eyebrow="Core resource" title="A stable record of the sky at the subject’s first operational moment.">
              <p className="max-w-[48rem] text-[1.02rem] leading-[1.85] text-foreground/82">The Natal Chart API normalizes birth date, birth time, and location into a reusable resource. Birth time may be omitted, but precision will be reduced and several conclusions will become more interpretively flexible.</p>
              <div className="mt-8 space-y-6">
                <ResponsiveDataTable caption="Natal Chart API endpoints" headers={['Method', 'Endpoint', 'Purpose']} rows={[
                  [<code className={inlineCodeClassName}>POST</code>, <code className={inlineCodeClassName}>/v1/natal-charts</code>, 'Create and resolve a Natal Chart'],
                  [<code className={inlineCodeClassName}>GET</code>, <code className={inlineCodeClassName}>/v1/natal-charts/{'{chart_id}'}</code>, 'Retrieve a Natal Chart'],
                  [<code className={inlineCodeClassName}>POST</code>, <code className={inlineCodeClassName}>/v1/interpretations</code>, 'Generate an interpretation from a chart'],
                  [<code className={inlineCodeClassName}>GET</code>, <code className={inlineCodeClassName}>/v1/planetary-state</code>, 'Retrieve current celestial context'],
                ]} />
                <ResponsiveDataTable caption="Natal Chart request fields" headers={['Field', 'Type', 'Required', 'Notes']} rows={[
                  [<code className={inlineCodeClassName}>subject.name</code>, 'string', 'Yes', '1–80 characters'],
                  [<code className={inlineCodeClassName}>subject.birth_date</code>, 'date', 'Yes', <code className={inlineCodeClassName}>YYYY-MM-DD</code>],
                  [<code className={inlineCodeClassName}>subject.birth_time</code>, 'time', 'No', <span><code className={inlineCodeClassName}>HH:mm:ss</code>; omission lowers precision</span>],
                  [<code className={inlineCodeClassName}>subject.birthplace.label</code>, 'string', 'Yes', 'Human-readable place'],
                  [<code className={inlineCodeClassName}>subject.birthplace.latitude</code>, 'number', 'Yes', <><code className={inlineCodeClassName}>-90</code> through <code className={inlineCodeClassName}>90</code></>],
                  [<code className={inlineCodeClassName}>subject.birthplace.longitude</code>, 'number', 'Yes', <><code className={inlineCodeClassName}>-180</code> through <code className={inlineCodeClassName}>180</code></>],
                  [<code className={inlineCodeClassName}>options.house_system</code>, 'enum', 'No', <span>Defaults to <code className={inlineCodeClassName}>placidus</code></span>],
                  [<code className={inlineCodeClassName}>options.include</code>, 'string[]', 'No', <><code className={inlineCodeClassName}>astrovector</code>, <code className={inlineCodeClassName}>celestial_context</code></>],
                ]} />
              </div>
              <DocumentCallout label="Idempotency" className="mt-8"><p>Send an <code className={inlineCodeClassName}>Idempotency-Key</code> header for creation requests. Repeating the same key and payload within 24 hours returns the original resource. Reusing a key with a materially different payload returns <code className={inlineCodeClassName}>409 INTERPRETATION_ALREADY_COLLAPSED</code>.</p></DocumentCallout>
            </InstitutionalSection>

            <InstitutionalSection id="planetary-state" number="05" eyebrow="Request context" title="Make celestial context explicit.">
              <p className="max-w-[48rem] text-[1.02rem] leading-[1.85] text-foreground/82">Every interpretation is resolved against a versioned celestial-state snapshot. Clients may allow OrionLabs to resolve that state automatically, provide an existing state ID, or request a declared nominal state for deterministic testing.</p>
              <div className="mt-8 space-y-6">
                <ResponsiveDataTable caption="Planetary State request headers" headers={['Header', 'Required', 'Example', 'Meaning']} rows={[
                  ['Authorization', 'Yes', <code className={inlineCodeClassName}>Bearer ol_test_…</code>, 'Alignment key'],
                  ['Content-Type', 'Yes for bodies', <code className={inlineCodeClassName}>application/json</code>, 'Payload format'],
                  ['Idempotency-Key', 'Creation only', <code className={inlineCodeClassName}>demo-mira-1993-08-17</code>, 'Duplicate protection'],
                  ['X-Orion-Planetary-State', 'No', <code className={inlineCodeClassName}>auto</code>, <><code className={inlineCodeClassName}>auto</code>, <code className={inlineCodeClassName}>nominal</code>, or a state ID</>],
                  ['X-Orion-Evidence-Policy', 'No', <code className={inlineCodeClassName}>standard</code>, <><code className={inlineCodeClassName}>standard</code>, <code className={inlineCodeClassName}>conservative</code>, <code className={inlineCodeClassName}>commercial</code></>],
                  ['X-Orion-API-Version', 'No', <code className={inlineCodeClassName}>2026-08-01</code>, 'Explicit version date'],
                ]} />
                <ResponsiveDataTable caption="Planetary State response headers" headers={['Header', 'Example', 'Meaning']} rows={[
                  ['X-Orion-Request-Id', <code className={inlineCodeClassName}>req_01J5R…</code>, 'Support and diagnostics'],
                  ['X-Orion-Celestial-Context', <code className={inlineCodeClassName}>cstate_01J5R…</code>, 'State used for interpretation'],
                  ['RateLimit-Limit', <code className={inlineCodeClassName}>60</code>, 'Guaranteed requests per minute'],
                  ['RateLimit-Remaining', <code className={inlineCodeClassName}>41</code>, 'Remaining guaranteed requests'],
                  ['RateLimit-Reset', <code className={inlineCodeClassName}>27</code>, 'Seconds until window reset'],
                  ['X-Orion-Burst-Limit', <code className={inlineCodeClassName}>84</code>, 'Current conditional ceiling'],
                  ['X-Orion-Celestial-Multiplier', <code className={inlineCodeClassName}>0.80</code>, 'Multiplier applied to burst capacity'],
                ]} />
              </div>
              <DocumentCallout label="Evidence policy" className="mt-8"><p><code className={inlineCodeClassName}>X-Orion-Evidence-Policy: commercial</code> changes interpretive thresholds. It does not change the underlying sky, which remains outside account configuration.</p></DocumentCallout>
            </InstitutionalSection>

            <InstitutionalSection id="interpretations" number="06" eyebrow="Inference" title="Convert a resolved chart into decisive personal intelligence.">
              <div className="space-y-6">
                <CodeExample label="Endpoint" language="http">POST /v1/interpretations</CodeExample>
                <CodeExample label="Interpretation request" language="json">{interpretationRequest}</CodeExample>
                <CodeExample label="Interpretation response" language="json">{interpretationResponse}</CodeExample>
              </div>
              <DocumentCallout label="Stable signals" className="mt-8"><p>Signal names are stable machine identifiers. Visible prose may evolve as OrionLabs improves the model’s ability to describe the same evidence with progressively less hesitation.</p></DocumentCallout>
            </InstitutionalSection>

            <InstitutionalSection id="model-architecture" number="07" eyebrow="System design" title="Six named systems. One conclusion.">
              <ol className="grid gap-4 lg:grid-cols-2">
                {architectureSteps.map(([name, role, description], index) => (
                  <li key={name} className="rounded-2xl border border-[hsl(43_60%_70%_/_0.12)] bg-[hsl(262_48%_6%_/_0.56)] p-5 sm:p-6">
                    <p className="font-mono text-[0.62rem] text-[hsl(326_55%_68%)]">0{index + 1} · {role}</p>
                    <h3 className="mt-2 font-serif text-2xl text-gradient-gold">{name}</h3>
                    <p className="mt-3 text-sm leading-[1.8] text-foreground/78">{description}</p>
                  </li>
                ))}
              </ol>
              <DocumentCallout label="Reliability distinction" className="mt-8"><p>OrionLabs research reports 99.72% observed uptime and 99.97% policy-adjusted uptime after approved celestial exclusions. The service did not become available during excluded minutes. Their ownership changed.</p></DocumentCallout>
              <figure className="mt-8 rounded-2xl border border-[hsl(43_60%_70%_/_0.14)] bg-[hsl(262_55%_4%_/_0.76)] p-5 sm:p-6">
                <figcaption className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-[hsl(43_60%_74%)]">Architecture flow</figcaption>
                <div className="mt-5 grid gap-px overflow-hidden rounded-xl bg-[hsl(43_60%_70%_/_0.12)] sm:grid-cols-2 lg:grid-cols-4">
                  {['Request', 'Validation and policy', 'Planetary state resolution', 'AstroVector representation', 'DeepConstellation inference', 'Quantum Horoscope selection', 'Retrograde Shield classification', 'Response'].map((step, index) => (
                    <div key={step} className="relative min-h-24 bg-[hsl(262_48%_6%_/_0.96)] p-4">
                      <span className="font-mono text-[0.58rem] text-[hsl(326_50%_68%)]">{String(index + 1).padStart(2, '0')}</span>
                      <p className="mt-2 text-sm leading-snug text-foreground/82">{step}</p>
                    </div>
                  ))}
                </div>
              </figure>
            </InstitutionalSection>

            <InstitutionalSection id="sdk-integrations" number="08" eyebrow="Client libraries" title="Use the API directly or through the approved fictional client.">
              <div className="space-y-6">
                <CodeExample label="Install the fictional SDK" language="bash">npm install @orionlabs/celestial</CodeExample>
                <CodeExample label="TypeScript SDK" language="typescript">{sdkExample}</CodeExample>
                <ResponsiveDataTable caption="Webhook event names" headers={['Event', 'Meaning']} rows={[
                  [<code className={inlineCodeClassName}>natal_chart.resolved</code>, 'Natal Chart is ready'],
                  [<code className={inlineCodeClassName}>interpretation.completed</code>, 'Interpretation passed validation'],
                  [<code className={inlineCodeClassName}>interpretation.failed</code>, 'Generation failed conventionally'],
                  [<code className={inlineCodeClassName}>celestial_condition.declared</code>, 'A qualifying state changed operational treatment'],
                ]} />
              </div>
              <DocumentCallout label="Webhook verification" className="mt-8"><p>Webhook signatures should be verified before payload processing. Celestial authenticity and cryptographic authenticity are separate controls.</p></DocumentCallout>
            </InstitutionalSection>

            <InstitutionalSection id="rate-limits" number="09" eyebrow="Capacity" title="Predictable capacity with condition-aware burst treatment.">
              <div className="space-y-6">
                <ResponsiveDataTable caption="Plan rate limits" headers={['Plan', 'Guaranteed requests/minute', 'Daily requests', 'Published burst ceiling']} rows={[
                  ['Developer', '60', '2,000', '90'],
                  ['Production', '600', '100,000', '900'],
                  ['Enterprise', 'Contracted', 'Contracted', 'Contracted'],
                ]} />
                <div className={bodyCopyClassName}><p>The guaranteed limit does not decrease. Only capacity between the guaranteed limit and published burst ceiling is adjusted.</p></div>
                <CodeExample label="Effective burst ceiling" language="text">{'Effective burst ceiling =\nguaranteed limit +\n((published burst ceiling − guaranteed limit) × multiplier)'}</CodeExample>
                <ResponsiveDataTable caption="Celestial burst multipliers" headers={['Condition', 'Multiplier', 'Developer effective ceiling']} rows={[
                  ['Nominal', <code className={inlineCodeClassName}>1.00</code>, '90/minute'],
                  ['Full-moon optimization window', <code className={inlineCodeClassName}>1.20</code>, '96/minute'],
                  ['Pre-/recovery-retrograde shadow', <code className={inlineCodeClassName}>0.90</code>, '87/minute'],
                  ['Retrograde active', <code className={inlineCodeClassName}>0.80</code>, '84/minute'],
                  ['Celestial state indeterminate', <code className={inlineCodeClassName}>0.67</code>, '80/minute, rounded down'],
                ]} />
                <CodeExample label="Capacity response" language="http">{rateLimitExample}</CodeExample>
              </div>
              <DocumentCallout label="Retry guidance" className="mt-8"><p>Clients should honor <code className={inlineCodeClassName}>Retry-After</code> and use exponential backoff with jitter. Additional certainty does not increase available capacity.</p></DocumentCallout>
            </InstitutionalSection>

            <InstitutionalSection id="error-codes" number="10" eyebrow="Failure handling" title="Failures are structured before they are interpreted.">
              <div className="space-y-6">
                <CodeExample label="Error envelope" language="json">{errorEnvelope}</CodeExample>
                <ResponsiveDataTable caption="API error codes" headers={['HTTP', 'Code', 'Retryable', 'Meaning']} rows={[
                  ['400', <code className={inlineCodeClassName}>INVALID_BIRTH_COORDINATES</code>, 'No', 'Latitude or longitude is outside supported bounds'],
                  ['400', <code className={inlineCodeClassName}>INVALID_CELESTIAL_PAYLOAD</code>, 'No', 'Request fields failed validation'],
                  ['401', <code className={inlineCodeClassName}>INVALID_ALIGNMENT_KEY</code>, 'No', 'Key is missing, expired, or unknown'],
                  ['403', <code className={inlineCodeClassName}>CELESTIAL_SCOPE_DENIED</code>, 'No', 'Key lacks the required scope'],
                  ['409', <code className={inlineCodeClassName}>INTERPRETATION_ALREADY_COLLAPSED</code>, 'No', 'Idempotency key was reused with different input'],
                  ['422', <code className={inlineCodeClassName}>PLANETARY_STATE_UNRESOLVED</code>, 'Yes', 'State could not be resolved confidently'],
                  ['429', <code className={inlineCodeClassName}>ORBITAL_CAPACITY_EXCEEDED</code>, 'Yes', 'Current capacity window is exhausted'],
                  ['500', <code className={inlineCodeClassName}>INFERENCE_COLLAPSE</code>, 'Yes', 'Candidate interpretations failed validation'],
                  ['503', <code className={inlineCodeClassName}>RETROGRADE_SHIELD_ACTIVE</code>, 'Yes', 'Requests are being held during a qualifying condition'],
                ]} />
              </div>
              <DocumentCallout label="Stable contract" className="mt-8"><p>Do not branch on human-readable error messages. Messages may improve editorially. Codes remain stable unless their continued stability becomes operationally inconvenient.</p></DocumentCallout>
            </InstitutionalSection>

            <InstitutionalSection id="known-celestial-conditions" number="11" eyebrow="Operational reference" title="Conditions that may affect latency, precision, or ownership.">
              <ResponsiveDataTable caption="Known celestial conditions" headers={['Condition', 'Observable effect', 'Client action']} rows={[
                ['Birth time omitted', 'Reduced house-level precision', 'Continue if standard precision is acceptable'],
                ['Ambiguous birthplace', 'Multiple geographic matches', 'Ask the subject to select a location'],
                ['Retrograde active', 'Lower burst ceiling; elevated retry likelihood', 'Honor rate headers and backoff'],
                ['Celestial state indeterminate', 'Interpretation may pause rather than assume nominal state', 'Retry after supplied interval'],
                ['Polar latitude', 'Some conventional house calculations become unstable', 'Accept OrionLabs normalization or select supported method'],
                ['Duplicate idempotency key', <span>Existing resource returned or <code className={inlineCodeClassName}>409</code> raised</span>, 'Reuse only for identical requests'],
                ['AstroVector unavailable', 'Interpretation may proceed without representation metadata', 'Do not fabricate a vector ID'],
                ['Evidence policy conflict', 'Requested policy unavailable to key', 'Use approved policy or request scope review'],
              ]} />
              <p className="mt-5 max-w-[48rem] text-sm leading-relaxed text-muted-foreground">Known conditions are reviewed quarterly and after any incident sufficiently visible to require a new category.</p>
            </InstitutionalSection>

            <InstitutionalSection id="changelog" number="12" eyebrow="Release history" title="Changes to the platform and its preferred explanation of itself.">
              <div className="space-y-5">
                {[
                  ['2026-08-18', 'API v1.3', ['Added X-Orion-Celestial-Multiplier.', 'Added explicit celestial_condition.declared webhook events.', 'Aligned reliability responses with Celestial Operating Condition Eligibility Standard 2.3.', 'Clarified that policy-adjusted uptime does not retroactively restore service.']],
                  ['2026-07-09', 'API v1.2', ['Added Retrograde Shield™ response classification.', 'Added RETROGRADE_SHIELD_ACTIVE.', 'Added deterministic nominal state for test environments.', 'Reduced ambiguity by assigning it a machine-readable code.']],
                  ['2026-05-28', 'API v1.1', ['Added AstroVector™ metadata.', 'Standardized production representation at 1,024 dimensions.', 'Added vector identifiers without returning the full representation by default.']],
                  ['2026-04-21', 'API v1.0', ['General availability of Natal Chart creation and retrieval.', 'Added interpretation generation and planetary-state resolution.', 'Established the first stable interface for commercially actionable celestial context.']],
                ].map(([date, version, changes]) => (
                  <article key={date as string} className="grid gap-4 rounded-2xl border border-[hsl(43_60%_70%_/_0.12)] bg-[hsl(262_48%_6%_/_0.52)] p-5 sm:grid-cols-[8rem_minmax(0,1fr)] sm:p-6">
                    <p className="font-mono text-xs text-[hsl(326_55%_68%)]">{date as string}</p>
                    <div>
                      <h3 className="font-serif text-2xl text-gradient-gold">{version as string}</h3>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/78">
                        {(changes as string[]).map((change) => <li key={change} className="flex gap-2"><CheckCircle2 aria-hidden="true" className="mt-1 h-3.5 w-3.5 shrink-0 text-[hsl(43_60%_72%)]" />{change}</li>)}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </InstitutionalSection>

            <aside className="mt-10 rounded-[1.75rem] border border-[hsl(43_60%_70%_/_0.16)] bg-[linear-gradient(145deg,hsl(280_55%_13%_/_0.54),hsl(262_50%_6%_/_0.48))] px-5 py-12 text-center sm:px-8 sm:py-14">
              <Braces aria-hidden="true" className="mx-auto h-6 w-6 text-[hsl(43_60%_72%)]" strokeWidth={1.5} />
              <p className="mt-4 text-[0.64rem] font-medium uppercase tracking-[0.22em] text-[hsl(43_60%_72%)]">Integration readiness</p>
              <h2 className="mx-auto mt-4 max-w-3xl font-serif text-3xl leading-tight text-foreground sm:text-4xl">Begin with one chart. Escalate only when interpretation requires it.</h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">The Natal Chart API provides the stable foundation. DeepConstellation™, AstroVector™, and the surrounding institutional confidence can be introduced incrementally.</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a href="#getting-started" className="focus-ring-gold inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#F5E6B0] to-[#C9A24A] px-7 text-sm font-semibold text-[#070514]">Make your first request</a>
                <a href="#error-codes" className="focus-ring-gold inline-flex h-12 items-center justify-center rounded-full border border-[hsl(43_60%_70%_/_0.25)] px-7 text-sm font-medium text-foreground">Inspect error handling</a>
              </div>
            </aside>
          </article>
        </div>
      </div>
    </InstitutionalPageShell>
  );
}
