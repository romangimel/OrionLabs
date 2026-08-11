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

The landing page, four-step questionnaire, review/edit flow, Analysis experience, Report page, research article, 404 page, route guards, and session-based persistence are implemented.

The normal completed journey now uses real server-backed AI generation. Local `mockReport` content remains only for component development, tests, and offline UI work; it is never a silent production fallback.

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

All fields except optional context are required. Reference preference remains visible, required, and persisted for Review Answers, but it is never AI input. Generated report prose uses second-person language for every subject.

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
- `server/prompts/orionlabs-system-prompt.ts` owns stable voice, evidence, reference-calibration, and safety policy.
- `server/prompts/report-generation-prompt.ts` owns reusable report instructions and appends approved runtime data separately.
- `src/lib/report-schemas.ts` defines strict Zod input/output validation and supplies Gemini's JSON schema through `zod-to-json-schema`.
- `src/lib/report-generation-client.ts` calls only OrionLabs' Vercel endpoint, validates the response again, and shares duplicate in-flight requests during React Strict Mode.
- `src/pages/AnalysisPage.tsx` coordinates the real request, minimum presentation duration, retry state, persistence, and automatic navigation.

`GEMINI_API_KEY` is read only by server code. It must never use a `VITE_` prefix, appear in `import.meta.env`, be logged, or be returned to the browser.

## Prompt and report rules

The technical report contract is `OrionReport` in `src/data/report.ts`. Every successful report requires subject, summary, personality analysis with three traits, current-life analysis and forecast, three strengths, three risks, recommended action, exactly three 0-100 integer metrics, and closing verdict.

The current prompt calibration is intentionally roast-heavy: approximately 80% hilariously savage and 20% disturbingly accurate at roughly 9/10 intensity. It must preserve analytical coherence, genuine strengths, useful advice, confident fake rigor, and a memorable, occasionally screenshot-worthy closing verdict.

The model may exaggerate interpretations, implications, metaphors, fake science, celestial framing, and fictional measurements. It may not invent underlying evidence such as durations, quantities, events, histories, motives, or outcomes that the user did not provide.

Do not roast protected characteristics, medical or mental-health information, trauma, addiction, appearance, or deeply sensitive subjects. Prompt tuning remains active and is not final.

## Validation and retry policy

The Vercel Function:

- Accepts only POST
- Limits total request size
- Strictly validates the approved input shape
- Trims/normalizes strings and bounds optional context to 1,000 characters
- Requests Gemini structured JSON from the same schema used at runtime
- Rejects missing sections, malformed insights, wrong array counts, invalid metrics, or altered application-controlled identity/focus data
- Makes one initial provider request and at most one retry for transient errors or malformed output
- Converts Gemini HTTP 429 resource exhaustion into `ANALYSIS_CAPACITY_EXHAUSTED` without spending the immediate second attempt
- Disables the Gemini SDK's larger implicit retry loop
- Returns safe errors without provider details, stack traces, secrets, or user free text

The Gemini project currently uses the Free tier with billing disabled, and provider quota is an intentional MVP safety boundary. `@google/genai` exposes a numeric HTTP status but no stable structured quota dimensions on the supported error contract, so OrionLabs deliberately does not distinguish RPM, TPM, daily quota, or other resource exhaustion in product copy. Capacity failures show a try-later state, suppress immediate retry, and preserve the questionnaire draft.

Vercel Firewall is a separate pre-Function layer configured externally at five `/api/generate-report` requests per 60 seconds per IP address. Its rule is not stored in repository code. A plain firewall HTTP 429 is handled safely by the browser as the same broad capacity state, while the semantic OrionLabs code identifies responses that did reach the Function.

The browser validates the returned report again before session storage. Malformed or partial output is never rendered and never falls back to mock content.

## Analysis and persistence behavior

The rotating Analysis messages are presentation, not real Gemini stages. They continue while the request is pending. A separate Orion Subject Signature timeline constructs the visual once over approximately 16 seconds and then holds. OrionLabs waits for both the real report and that minimum loading duration, shows a brief completion state, stores the report, and redirects automatically without a `View Report` button.

Failures show a compact retry action inside the existing Analysis card. The questionnaire draft stays intact. If only browser storage failed, retry attempts persistence again without paying for another model request.

Questionnaire drafts and completed reports remain versioned `sessionStorage` records in the current tab. Completed reports are immutable snapshots with a private UUID, separate active-report pointer, and explicit zodiac/focus/behavior Subject Signature metadata. `/report` consumes only the validated active snapshot through `src/lib/report-storage.ts`; it does not reconstruct signature behavior from generated trait titles. The shared Subject Signature architecture is implemented for Capricornus only, with the remaining eleven geometries intentionally deferred.

## Local and Vercel development

Create an ignored `.env.local` containing:

```dotenv
GEMINI_API_KEY=your_development_key
```

Use `npx vercel dev` for the complete flow. Plain `npm run dev` runs Vite but does not execute the `/api` function. The `vercel.json` SPA fallback excludes `/api/*` and Vite development-resource namespaces; keep those exclusions if the fallback is changed later.

In Vercel, add `GEMINI_API_KEY` as a sensitive Environment Variable for the intended Development, Preview, and Production environments. `vercel.json` supplies the Vite SPA deep-link fallback while explicitly keeping the physical API namespace and local Vite development resources outside that rewrite.

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

- Real-key local provider smoke test and Vercel preview verification
- Prompt evaluation across varied fixtures and final prompt tuning
- Durable usage accounting beyond the Free-tier provider boundary and external Vercel Firewall
- Production monitoring and alerting
- Server-side report persistence, accounts, history, deletion, and privacy controls
- Stable shareable URLs and downloadable reports
- Full project-wide accessibility and final launch testing

These are not production-ready and should not be described as complete.

## Immediate next steps

1. Exercise a real Gemini request through `npx vercel dev` with a development key.
2. Verify success, provider failure, timeout, retry, refresh, and route recovery in a browser.
3. Deploy a Vercel preview and confirm SPA paths plus `/api/generate-report` behavior.
4. Evaluate report quality across varied questionnaire fixtures and tune prompts.
5. Add rate limiting and durable cost protection before public launch.
