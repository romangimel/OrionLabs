# OrionLabs

OrionLabs is a satirical horoscope experience presented as a polished, venture-backed AI startup. It combines luxury cosmic branding with increasingly questionable claims about proprietary astrological intelligence, while keeping the product voice completely straight-faced.

The project is also a frontend portfolio and learning project: its current focus is reusable React composition, accessible form controls, configuration-driven UI, route-level state handoff, responsive design, and restrained motion.

## Current status

The landing page, four-step questionnaire, mock analysis handoff, and personalized mock report are implemented. Users can move backward and forward without losing answers, review and edit their responses, and confirm a session-scoped profile before opening a report composed from approved local content and selected questionnaire values.

The analysis page remains a temporary readiness screen rather than a real loading sequence. The report derives its personalization from the confirmed browser-session snapshot; no AI provider, backend, or generated report content is involved. The questionnaire has step-level required-field validation and has completed its focused form-accessibility and keyboard audit; the broader site-wide accessibility audit, AI report generation, article page, 404 page, and several landing-page links remain planned. The landing-page calls to action still use in-page anchors rather than opening the questionnaire.

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

After review confirmation, answers are saved to `sessionStorage` and the browser navigates to `/analysis`. A temporary action continues to `/report`, where the report is derived from the same snapshot. Storage is versioned and checked before use; invalid, unavailable, incomplete, or expired report data returns the visitor to a fresh questionnaire without rendering the sample subject.

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

The current project has no account system and sends no questionnaire answers to a server. Confirmed answers live only in the current tab's `sessionStorage`; partial answers are held in React state and disappear when the page is refreshed or closed.
