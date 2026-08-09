# OrionLabs

OrionLabs is a satirical horoscope experience presented as a polished, venture-backed AI startup. It combines luxury cosmic branding with increasingly questionable claims about proprietary astrological intelligence while keeping the product voice completely straight-faced.

The project is also a portfolio and learning project focused on typed React composition, accessible form controls, secure AI boundaries, runtime validation, route-level state handoff, responsive design, and restrained motion.

## Current status

The landing page, four-step questionnaire, real AI-backed Analysis flow, and personalized report are implemented. After review confirmation, the browser creates the approved `ReportGenerationInput` and posts it to a server-side Vercel Function. The function validates the input, calls Google Gemini 3.6 Flash, validates the structured `OrionReport`, and returns only a complete report.

The Analysis page keeps its rotating OrionLabs messages as presentation rather than pretending they are real provider stages. It waits for both the request and the minimum loading experience, stores the validated report as an immutable session record, and redirects automatically to `/report`. Failures show an explicit retry action and preserve the questionnaire draft. The local `mockReport` remains available for component development and tests but is no longer the normal completed journey.

Prompt tuning, usage/cost protection, production rate limiting, server-side report persistence, account history, and broader project-wide accessibility testing remain planned.

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

Successful reports keep the existing versioned session-storage behavior: the report has a private UUID, the active report pointer is stored separately, and `/report` validates the complete snapshot before rendering. Invalid data returns the visitor to a fresh questionnaire without displaying mock or partial content.

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

## Validation, retries, and privacy

The server accepts only the strict `ReportGenerationInput` shape, limits request size, bounds optional context to 1,000 characters, and rejects unexpected fields. Gemini receives stable system/report instructions plus the approved runtime data. Structured output is generated from the same Zod schema used to validate the result, and application-controlled identity and focus data must still match the request.

The Gemini SDK's implicit retry loop is disabled. OrionLabs performs one initial request and at most one retry for transient provider failures or malformed output. Browser errors never include provider internals, stack traces, API keys, or questionnaire free text.

Questionnaire drafts and completed reports still live only in the current tab's `sessionStorage`. Approved generation fields are transmitted to the Vercel Function and Gemini to create the report; raw birth date and reference preference are not transmitted. OrionLabs currently has no server-side report history or deletion system because it does not persist completed reports on the server.
