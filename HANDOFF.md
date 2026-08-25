# OrionLabs Development Handoff

## Project summary

OrionLabs is a satirical horoscope and fictional AI-startup portfolio project. It presents premium, highly confident astrological analysis and a personalized roast without breaking character. Jokes may be obvious or sharply self-incriminating, but they should sound like official company language rather than loud meme writing.

Before meaningful work, read `AGENTS.md`, `PROJECT.md`, `DESIGN_SYSTEM.md`, `ROADMAP.md`, `README.md`, this file, and the relevant source files. The repository is the source of truth.

## Current product flow

```text
Landing Page
-> Questionnaire
-> Review Answers
-> Analysis Loading Screen
-> Vercel Function
-> Gemini 3.6 Flash
-> Validated Personalized Report
-> Start Another Analysis
```

The landing page, four-step questionnaire, review/edit flow, Analysis experience, Report page, four research-paper routes, Docs, Press, Legal, branded 404 page, route guards, and session-based persistence are implemented. The active pathname routes are `/`, `/questionnaire`, `/calibration`, `/report`, `/research/moon-aware-transformers`, `/research/retrograde-aware-distributed-systems`, `/research/astrovector`, `/research/limits-of-science`, `/docs`, `/press`, and `/legal`; all other paths render the 404 page. `/analysis` is obsolete and receives that ordinary branded 404 rather than redirecting. `/articles/...` remains a planned route family, not a current route.

The normal completed journey now uses real server-backed AI generation. Local `mockReport` content remains only for component development, tests, and offline UI work; it is never a silent production fallback.

Route and browser presentation finalization is complete. Production direct navigation, refresh behavior, SPA fallback, and static browser/social metadata have been verified. LinkedIn fetched the social image successfully; WhatsApp parsed the title and description but omitted the image in manual tests, with no site-side defect identified. Non-JavaScript crawlers may receive generic landing metadata on deep SPA routes; this is an accepted limitation for the current release.

## Product and visual rules

Preserve:

- Premium, restrained, cinematic presentation
- Serious fictional AI-company tone
- Gold accents, cosmic backgrounds, existing typography, borders, spacing, and motion
- Institutionally confident astrology/AI/startup satire across subtle and obvious intensities
- Personalized roast as the central payoff
- Existing responsive and reduced-motion behavior

Avoid loud meme humor, constant punchlines, out-of-character joke explanations, profanity, unrelated redesigns, or a second visual language.

## Questionnaire contract

The four steps are:

1. Celestial Identity: zodiac sign, first name
2. Profile Calibration: birth date, reference preference
3. Behavioral Snapshot: focus area, behavioral statement
4. Final Calibration: optional context

All fields except optional context are required. Optional context is limited to 600 characters in controlled input, draft restoration, enhancement, and report-generation input. Attacker-edited oversized stored drafts are rejected instead of restored. Reference preference remains visible, required, and persisted for Review Answers, but it is never AI input. Generated report prose uses second-person language for every subject.

The optional context textarea owns a temporary `Enhance with AI`/`Undo` state. Empty context generates one statement from focus plus behavior; populated context is rewritten without adding facts. The browser uses strict minimized requests: populated mode sends only the exact current context, while empty mode sends only those two selections. The server validates a 4 KB maximum body, calls Groq-hosted `openai/gpt-oss-120b` once with low reasoning and an 8-second timeout, and returns `{ enhancedContext }`. `GROQ_API_KEY` remains server-only, raw context is not logged, and no AI provenance enters the Gemini report input.

`src/lib/report-generation-input.ts` is the approved AI boundary. It sends only:

- First name
- Zodiac sign
- Application-calculated age
- Focus area
- Behavioral statement
- Optional context when present

Raw birth date, reference preference, report IDs, analytics identifiers, and the full questionnaire draft are excluded.

## AI architecture

- `api/generate-report.ts` is the single `POST /api/generate-report` Vercel Function.
- `server/gemini-report-generator.ts` uses the official `@google/genai` SDK and stable `gemini-3.6-flash` model.
- `server/prompts/orionlabs-system-prompt.ts` owns the frozen controlled-inference, voice, and safety policy.
- `server/prompts/report-generation-prompt.ts` owns the frozen report instructions and appends approved runtime data separately.
- `src/lib/report-schemas.ts` defines strict Zod input/output validation and supplies Gemini's JSON schema through `zod-to-json-schema`.
- `src/lib/report-generation-client.ts` calls only OrionLabs' Vercel endpoint, validates the response again, and shares duplicate in-flight requests during React Strict Mode.
- `src/pages/AnalysisPage.tsx` coordinates the real request, minimum presentation duration, retry state, persistence, and automatic navigation.

`GEMINI_API_KEY` is read only by server code. It must never use a `VITE_` prefix, appear in `import.meta.env`, be logged, or be returned to the browser.

## Prompt and report rules

The technical report contract is `OrionReport` in `src/data/report.ts`. Every successful report requires subject, summary, personality analysis with three traits, current-life analysis and forecast, three strengths, three risks, recommended action, exactly three 0-100 integer metrics, and closing verdict.

The production system and report prompts are frozen after final controlled-inference calibration. They target 9/10 roast intensity while preserving analytical coherence, genuine strengths, useful advice, confident fake rigor, and a memorable closing verdict. Gemini 3.6 Flash runs with Medium thinking and a 50-second provider timeout.

The model may aggressively exaggerate interpretations, inferred behavioral tendencies, metaphors, fake science, celestial framing, and fictional measurements. It must not invent unsupported consequential biography, concrete events, or real-world outcomes. Occasional low-stakes overreach is an accepted limitation of the single-pass architecture; OrionLabs does not use a verifier or repair model.

Do not roast protected characteristics, medical or mental-health information, trauma, addiction, appearance, or deeply sensitive subjects. Gemini-facing prompt changes require explicit product-owner approval, deliberate recalibration, and an intentional prompt-lock test update.

## Validation and retry policy

The Vercel Function:

- Accepts only POST
- Requires `application/json` before reading the body or invoking Gemini
- Limits total request size
- Strictly validates the approved input shape
- Trims/normalizes strings and bounds optional context to 600 characters
- Requests Gemini structured JSON from the same schema used at runtime
- Rejects missing sections, malformed insights, wrong array counts, invalid metrics, or altered application-controlled identity/focus data
- Makes one initial provider request and at most one retry for transient errors or malformed output when another full provider attempt fits within the 55-second internal budget
- Converts Gemini HTTP 429 resource exhaustion into `ANALYSIS_CAPACITY_EXHAUSTED` without spending the immediate second attempt
- Uses a 50-second provider timeout and explicitly sets Medium thinking
- Disables Gemini SDK transport retries with `maxRetries: 0`
- Returns safe errors without provider details, stack traces, secrets, or user free text

The repository does not establish Gemini billing, quota, retention, or account configuration. `@google/genai` exposes a numeric HTTP status but no stable structured quota dimensions on the supported error contract, so OrionLabs deliberately does not distinguish RPM, TPM, daily quota, or other resource exhaustion in product copy. Capacity failures show a try-later state, suppress immediate retry, and preserve the questionnaire draft.

Production verification on 25 August 2026 confirmed that the Vercel Firewall custom rule covers `/api/generate-report` at 5 requests per 60 seconds per IP. Five requests from one source completed normally; the sixth returned a fast Vercel-deny `429` with `x-vercel-mitigated: deny` before normal Function/provider execution. A plain upstream HTTP 429 is handled safely by the browser as the same broad capacity state, while the semantic OrionLabs code identifies capacity responses that did reach the Function.

Final deployment reconciliation on 26 August 2026 confirmed that the current `main` commit is the Ready Production deployment at `orionlabs-ai.vercel.app`. Vercel history also proves that non-main branches produce Preview deployments. The latest suitable non-main Preview was Ready and returned `200` for the landing page, questionnaire, a representative research route, its referenced JavaScript asset, and one real Gemini report generation using synthetic input. That Preview is protected by Vercel Authentication, so the route and Function checks used Vercel's authenticated protection bypass; an anonymous rendered-browser journey was not repeated. Current Vercel metadata also confirms that the same 5-request/60-second/IP report-generation Firewall rule remains live with no draft changes.

The browser validates the returned report again before session storage. Malformed or partial output is never rendered and never falls back to mock content.

## Analysis and persistence behavior

The rotating Analysis messages are presentation, not real Gemini stages. They continue while the request is pending. A separate Orion Subject Signature timeline constructs the visual once over approximately 16 seconds and then holds. OrionLabs waits for both the real report and that minimum loading duration, shows a brief completion state, stores the report, and redirects automatically without a `View Report` button.

Failures show a compact retry action inside the existing Analysis card. The questionnaire draft stays intact. If only browser storage failed, retry attempts persistence again without paying for another model request.

Questionnaire drafts and completed reports remain versioned `sessionStorage` records in the current tab. Draft restoration requires exact keys, configured enum values, valid date-input syntax, and the existing 80-character name and 600-character optional-context limits. Invalid or attacker-expanded records are removed without throwing. Completed reports are immutable snapshots with a private UUID, separate active-report pointer, and explicit zodiac/focus/behavior Subject Signature metadata. `/report` consumes only the validated active snapshot through `src/lib/report-storage.ts`; it does not reconstruct signature behavior from generated trait titles. The shared Subject Signature architecture now includes all 12 zodiac geometries with deterministic focus and behavior resolution.

## Local and Vercel development

Create an ignored `.env.local` containing:

```dotenv
GEMINI_API_KEY=your_development_key
GROQ_API_KEY=your_development_key
```

Use `npx vercel dev` for the complete flow. Plain `npm run dev` runs Vite but does not execute the `/api` function. The `vercel.json` SPA fallback excludes `/api/*` and Vite development-resource namespaces; keep those exclusions if the fallback is changed later.

In Vercel, add `GEMINI_API_KEY` and `GROQ_API_KEY` as sensitive Environment Variables for the intended Development, Preview, and Production environments. `vercel.json` supplies the Vite SPA deep-link fallback while explicitly keeping the physical API namespace and local Vite development resources outside that rewrite.

Both AI Functions require JSON request media types and return controlled JSON errors with `Cache-Control: no-store`; cross-origin JSON requires browser preflight and OrionLabs sends no permissive CORS headers. This reduces drive-by browser-origin abuse but is not direct-client rate limiting.

Under the current Vercel Free-plan constraint, `/api/enhance-context` intentionally has no dedicated custom Firewall rate-limit rule and does not share Gemini's 5-request-per-minute bucket. It retains strict 4 KiB body/schema limits, a 600-character context boundary, minimized inputs, one fixed-model request, an 8-second timeout, no retry, duplicate browser-request suppression, generic errors, and `no-store`. Direct automated callers can still repeat Groq requests, so provider-side quota and cost exposure must be confirmed during release verification.

`vercel.json` applies `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, and a `Permissions-Policy` disabling camera, microphone, and geolocation across all paths. HSTS is deferred until the production-domain strategy is final. CSP is deferred until compatibility and a useful staged reporting approach can be verified.

The Function runtime graph uses Node ESM imports: local server imports must be relative and must name their emitted `.js` extension. TypeScript resolves those specifiers to the `.ts` source during development. Keep the frontend `@/` alias out of modules loaded at Function runtime because Vercel does not rewrite TypeScript path mappings in deployed Function files.

## Verification

Focused Vitest coverage exists for the AI input boundary, birth-date/reference exclusion, generated-report validation, identity drift, bounded retries, HTTP validation, duplicate in-flight requests, persistence, and draft preservation.

After meaningful changes, run:

```text
npm.cmd test
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
git diff --check
```

The project is Windows/PowerShell; use `npm.cmd` when PowerShell blocks `npm.ps1`.

## Still deferred

- Real-key local provider smoke test
- External verification of Groq quota/cost exposure
- Durable Groq rate limiting if a future plan supports an independent rule without weakening Gemini protection
- Streaming request-body enforcement below the Vercel platform ceiling
- Production monitoring and alerting
- Server-side report persistence, accounts, history, deletion, and privacy controls
- Stable shareable URLs and downloadable reports

These items remain operationally deferred, manually unverified, or outside the current product scope and should not be described as complete.

## Accessibility, performance, and current phase

The accessibility pass is complete with accepted visual exceptions. Gold keyboard-focus indicators, modal mobile-navigation focus management/background inertness, subtly stronger questionnaire resting boundaries, and reduced-motion mobile-menu behavior are implemented. The accepted exceptions are intentionally muted/supporting text below WCAG AA ordinary-text contrast targets, color-based visual selection for standard questionnaire option cards, and the subtle questionnaire resting boundaries remaining below the 3:1 non-text target. Native radio semantics remain intact. Do not describe OrionLabs as fully WCAG 2.2 AA compliant.

Performance is complete. P1 responsive hero/logo delivery and secondary-route code splitting remain intact. P2 added responsive WebP delivery for Subject Signature, Research, and 404 artwork; reduced the seven TrustBar masks from 288.73 kB to 76.11 kB with identical alpha data; deferred those mask requests until the section approaches; removed 40 unused direct runtime declarations; and moved `tailwindcss-animate` to development tooling. Runtime dependencies decreased from 52 to 11, and the clean install decreased from 24,496 files / 264,704,889 bytes to 14,109 files / 207,907,604 bytes. The final build remains split, with 556.28 kB raw / 165.10 kB gzip initial JavaScript and 96.85 kB raw / 16.79 kB gzip CSS.

Security is complete. Repository verification passed, and the Production Gemini Firewall rule was externally confirmed at 5 requests per 60 seconds per IP with a pre-Function `429` on the sixth request; the accepted absence of a dedicated Groq rule did not block closure. Final Testing / Toolchain Maintenance is complete. Repository/toolchain validation is complete: Vite 6.4.3, Vitest 4.1.11, and `@vitejs/plugin-react` 4.7.0 resolve through one valid Vite 6 tree; Browserslist data is current; native config loading passes; and the `@/*` alias no longer relies on deprecated TypeScript `baseUrl` behavior. Clean install, dependency-tree validation, current and forward TypeScript checks, the full automated suite, the application build, and the Vercel build pass. The product owner's representative Production checks passed on a physical mobile device and in Firefox as the secondary desktop browser, with no release-blocking issue found. OrionLabs is release-ready. The remaining 1 low, 2 moderate, and 7 high npm advisories are dev-only transitive tooling findings; the Production-only audit is clean. The operational items under Still deferred remain separate follow-up work.

Documentation, Release Candidate, and Launch verification is complete. The remaining product-level roadmap item is adding OrionLabs to the portfolio.
