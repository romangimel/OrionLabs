# OrionLabs

OrionLabs is a satirical horoscope experience presented as a polished, venture-backed AI startup. It combines luxury cosmic branding with overconfident claims about proprietary astrological intelligence. The company remains sincere in-universe even when its official language openly acknowledges questionable methodology or lands an obvious joke.

The project is also a portfolio and learning project focused on typed React composition, accessible form controls, secure AI boundaries, runtime validation, route-level state handoff, responsive design, and restrained motion.

## Current status

The landing page, four-step questionnaire, real AI-backed Analysis flow, and personalized report are implemented. After review confirmation, the browser creates the approved `ReportGenerationInput` and posts it to a server-side Vercel Function. The function validates the input, calls Google Gemini 3.6 Flash, validates the structured `OrionReport`, and returns only a complete report.

The Analysis page keeps its rotating OrionLabs messages as presentation rather than pretending they are real provider stages. Independently, it constructs the deterministic Orion Subject Signature over approximately 16 seconds. It waits for both the request and that minimum loading experience, stores the validated report as an immutable session record, and redirects automatically to `/report`. Failures show an explicit retry action and preserve the questionnaire draft. The local `mockReport` remains available for component development and tests but is no longer the normal completed journey.

The Subject Signature now includes all 12 deterministic zodiac geometries, with hand-tuned focus roles and edge-valid behavior subnetworks. Prompt tuning, server-side report persistence, account history, and broader project-wide accessibility testing remain planned.

## Technology

- React 18 and TypeScript
- Vite
- Tailwind CSS
- shadcn/ui primitives built on Radix UI
- Framer Motion
- Google Gemini through the official `@google/genai` SDK
- Vercel Functions
- Zod runtime validation and Gemini JSON schema generation
- Vitest focused regression tests

Supabase and several supporting UI packages remain installed for future development, but the current report flow does not use a database or account system.

## Application flow

```text
/                  Landing page
/questionnaire     Four questionnaire steps -> review
/analysis          Server-backed report generation or missing-profile recovery
/report            Validated generated report restored from session storage
/api/generate-report  Server-side Vercel Function (POST only)
```

Questionnaire progress is saved as a temporary `sessionStorage` draft. After review confirmation, `/analysis` maps that draft to name, zodiac sign, calculated age, focus area, behavioral statement, and optional context. Raw birth date and reference preference are not sent to the function or Gemini. The function reads `GEMINI_API_KEY` only on the server.

Successful reports keep the existing versioned session-storage behavior: the report has a private UUID, the active report pointer is stored separately, and `/report` validates the complete snapshot before rendering. Zodiac, focus, and behavior are stored as application-controlled Subject Signature metadata beside the unchanged AI-facing `OrionReport`; Report never infers behavior from Gemini prose. Invalid or superseded records return the visitor to a fresh questionnaire without displaying mock or partial content.

`vercel.json` provides the SPA fallback needed by the pathname-based routes. Its fallback explicitly excludes `/api/*` and Vite development-resource namespaces so `npx vercel dev` can serve both the frontend development modules and the physical `/api/generate-report` function.

## Codebase overview

```text
api/                    Vercel Function entrypoints
server/                 Server-only Gemini integration and prompts
tests/                  Focused generation and persistence regression tests
src/
|-- components/         Questionnaire, Analysis, Report, site, and UI components
|-- data/               Questionnaire and report TypeScript contracts/fixtures
|-- hooks/              Presentation timing and shared React hooks
|-- lib/                Validation, generation input, request, and storage boundaries
|-- pages/              Pathname-selected route-level components
|-- App.tsx             Route selection and landing-page composition
|-- main.tsx            React application entry point
`-- index.css           Design tokens, shared effects, and accessibility styles
```

Project direction and constraints are recorded in `PROJECT.md`, `DESIGN_SYSTEM.md`, `ROADMAP.md`, and `HANDOFF.md`.

## Local setup

Use Node.js 20 or newer and npm.

```bash
npm install
```

Create an ignored `.env.local` file from `.env.example` and add a development Gemini API key:

```dotenv
GEMINI_API_KEY=your_development_key
```

Plain `npm run dev` starts Vite but does not execute the `/api` Vercel Function. Use the Vercel development environment for the complete flow:

```bash
npx vercel dev
```

Open the printed local URL and begin at `/questionnaire`. No real key belongs in `.env.example`, source code, browser `import.meta.env`, or a `VITE_`-prefixed variable.

Available checks:

```bash
npm test
npm run typecheck
npm run lint
npm run build
npm run preview
```

## Vercel configuration

In the Vercel project dashboard, add `GEMINI_API_KEY` under Settings -> Environment Variables for the environments that should generate reports (Development, Preview, and Production as appropriate), then redeploy. Keep the value marked sensitive and do not prefix it with `VITE_`.

The current Gemini project uses the Free tier with billing disabled, making provider quota an intentional MVP safety boundary. Separately, Vercel Firewall limits `/api/generate-report` to five requests per 60 seconds per IP address. The firewall rule is external Vercel infrastructure and is not represented in this repository.

Server-side TypeScript is executed as Node ESM. Every local runtime import reachable from an `api/` Function therefore uses a relative path with a `.js` extension, which TypeScript maps back to the corresponding `.ts` source file. Do not use the frontend `@/` alias in that runtime graph: Vercel Functions do not rewrite TypeScript path mappings in deployed imports.

## Validation, retries, and privacy

The server accepts only the strict `ReportGenerationInput` shape, limits request size, bounds optional context to 1,000 characters, and rejects unexpected fields. Gemini receives stable system/report instructions plus the approved runtime data. Structured output is generated from the same Zod schema used to validate the result, and application-controlled identity and focus data must still match the request.

The Gemini SDK's implicit retry loop is disabled. OrionLabs performs one initial request and at most one retry for transient provider failures or malformed output. Browser errors never include provider internals, stack traces, API keys, or questionnaire free text.

Gemini resource-exhaustion responses use HTTP 429 with the safe machine code `ANALYSIS_CAPACITY_EXHAUSTED` and do not spend the immediate second provider attempt. Because the SDK exposes the HTTP status but not stable structured quota dimensions, OrionLabs does not claim whether the boundary is per-minute, token-based, daily, or another capacity condition. The Analysis page asks the visitor to return later, preserves the questionnaire draft, and suppresses its normal immediate Retry action. A plain HTTP 429 returned by Vercel Firewall before the Function runs is handled by the browser as the same conservative capacity state without requiring OrionLabs JSON.

Questionnaire drafts and completed reports still live only in the current tab's `sessionStorage`. Approved generation fields are transmitted to the Vercel Function and Gemini to create the report; raw birth date and reference preference are not transmitted. OrionLabs currently has no server-side report history or deletion system because it does not persist completed reports on the server.
