# OrionLabs

OrionLabs is a satirical horoscope experience presented as a polished, venture-backed AI startup. It combines luxury cosmic branding with increasingly questionable claims about proprietary astrological intelligence, while keeping the product voice completely straight-faced.

The project is also a frontend portfolio and learning project: its current focus is reusable React composition, accessible form controls, configuration-driven UI, route-level state handoff, responsive design, and restrained motion.

## Current status

The landing page, four-step questionnaire, timed mock analysis sequence, and personalized mock report are implemented. Users can move backward and forward without losing answers, refresh within the active journey, review and edit their responses, and confirm a session-scoped profile before the analysis screen automatically saves and opens a report composed from approved local content and selected questionnaire values.

The analysis page uses a temporary local timer, rotating OrionLabs status messages, and an automatic report redirect. It does not represent real report generation. Analysis completion creates an immutable, active report snapshot in the current tab; the report page loads that saved snapshot instead of regenerating it from questionnaire answers. No AI provider, backend, API request, or generated report content is involved. The questionnaire has step-level required-field validation and has completed its focused form-accessibility and keyboard audit; broader site-wide accessibility work and real AI generation remain planned.

## Technology

- React 18 and TypeScript
- Vite
- Tailwind CSS
- shadcn/ui primitives built on Radix UI
- Framer Motion
- Lucide icons

Supabase and several supporting UI packages are installed for future development, but the current questionnaire and analysis flow does not use a backend or AI provider.

## Application flow

The implemented routes are:

```text
/                  Landing page
/questionnaire     Four questionnaire steps -> review
/analysis          Mock analysis readiness or missing-profile recovery
/report            Personalized report composed from local mock content
```

Questionnaire progress is saved as a temporary `sessionStorage` draft throughout the active journey. After review confirmation, the browser navigates to `/analysis`; the timed local sequence creates one versioned completed-report record, sets its private ID as active, clears the draft, and redirects automatically to `/report`. The report route resolves and validates that active snapshot without exposing its ID in the URL. Invalid, unavailable, or incomplete data returns the visitor to a fresh questionnaire without rendering sample or partial report content.

Because routing is currently handled with lightweight pathname matching in `src/App.tsx`, a deployed host must serve `index.html` for these client-side paths.

## Codebase overview

```text
src/
|-- components/
|   |-- questionnaire/  Step cards, inputs, progress, navigation, and review
|   |-- site/           Landing sections, motion wrappers, and visual primitives
|   `-- ui/             Generic shadcn/Radix UI primitives
|-- data/               Questionnaire definitions, options, and zodiac metadata
|-- hooks/              Shared React hooks and the toast store
|-- lib/                Questionnaire state/storage helpers and class utilities
|-- pages/              Questionnaire and mock analysis route-level components
|-- App.tsx             Route selection and landing-page composition
|-- main.tsx            React application entry point
`-- index.css           Design tokens, shared effects, and global accessibility styles
```

Project direction and constraints are recorded in:

- `ORIONLABS_BRIEF.md` for the product concept, voice, and technical goals
- `DESIGN_SYSTEM.md` for the frozen visual language and reusable design rules
- `ROADMAP.md` for completed work and planned phases

## Run locally

Use a current Node.js LTS release and npm.

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal. Open `/questionnaire` directly to try the implemented product flow.

Available checks:

```bash
npm run typecheck
npm run lint
npm run build
npm run preview
```

`npm run build` performs a TypeScript project build before creating the production bundle in `dist/`.

## Data and privacy

The current project has no account system and sends no questionnaire answers or report content to a server. Incomplete progress and completed-report snapshots live only in the current tab's `sessionStorage`. Deliberately leaving an incomplete analysis journey clears its draft; completed reports remain available in that tab until a new analysis starts or the tab session ends.
