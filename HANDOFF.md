# OrionLabs Development Handoff

## Project Summary

OrionLabs is a satirical horoscope and fictional AI-startup portfolio project.

The product presents itself as a premium, highly sophisticated AI company while using astrology, overconfident analysis, and startup language to generate a personalized roast of the user.

The core joke is not loud parody. OrionLabs should behave as though it genuinely believes its own methodology.

The product should feel polished and credible before the absurdity becomes obvious.

## Core Product Direction

Preserve these principles:

- Premium, modern, polished presentation
- Serious fictional AI-company tone
- Subtle, deadpan absurdity
- Satire of astrology, AI hype, fake scientific rigor, and startup culture
- Personalized roast as a central product payoff
- Humor delivered with a straight face
- No loud meme humor
- No excessive self-awareness
- No constant punchline writing
- No unrelated redesigns or new visual language

The ideal user reactions are:

> This is complete nonsense, but it somehow described me.

and:

> I need to send this to my friends.

## Source-of-Truth Files

Before making meaningful changes, read:

1. `AGENTS.md`
2. `PROJECT.md`
3. `DESIGN_SYSTEM.md`
4. `ROADMAP.md`
5. `README.md`
6. This file
7. Relevant source files for the current task

The repository files are the durable source of truth. Do not rely on assumptions from previous chats.

## Current Product Flow

```text
Landing Page
→ Questionnaire
→ Review Answers
→ Analysis Loading Screen
→ Personalized Mock Report
→ Start Another Analysis
```

## Current Project Status

### Foundation

Completed:

- Landing page
- `PROJECT.md`
- `DESIGN_SYSTEM.md`
- `ROADMAP.md`
- Global and project-level Codex instructions
- Landing-page refactor into reusable components
- Mobile spacing fixes
- Initial documentation and code comments
- Stable React + Vite + TypeScript foundation

### Questionnaire

Completed:

- Four-step questionnaire UI
- Desktop and mobile layouts
- Wider desktop questionnaire composition
- Header and progress alignment
- Zodiac selector
- Multiple input types
- Continue and Back navigation
- Answer persistence between steps
- Completed-step progress model
- Review Answers stage
- Edit actions
- Change Answers action
- Session-based persistence
- Connection to mock analysis route
- Required and optional field rules
- Field-level validation
- Keyboard navigation audit
- Screen-reader-oriented validation work
- Keyboard-only `:focus-visible` styling
- Questionnaire-level reduced-motion support

### Report Definition

Completed:

- Typed `ReportInsight` interface
- Typed `OrionReport` interface
- Typed `mockReport`
- Report contract stored in `src/data/report.ts`
- Required report sections defined
- Optional-section policy defined
- Questionnaire-to-report influence documented
- Confidence-metric rules documented
- Content balance and comedic purpose documented
- Section-length targets documented
- Future malformed-AI-output policy documented

### Report Page

Completed or recently implemented:

- Report page UI using mock data
- Reusable report-section components
- Three mock confidence metrics
- Desktop and mobile layouts
- Long- and short-content resilience
- Personalized mock report flow
- Questionnaire answers applied to selected report fields
- Start Another Analysis action
- Report route safety for missing questionnaire data, if implemented by the latest Codex task

### Analysis Loading Page

The latest planned task replaces the temporary loading screen shown in the earlier version.

The intended final mock loading behavior is:

- No `View Report` button
- Multi-ring celestial calibration indicator
- Premium, restrained orbital animation
- Approximately 6–8 rotating processing messages
- First two messages sound credible
- Messages then escalate quickly into absurdity
- Automatic redirect to the report
- Brief completion state is allowed
- Reduced-motion alternative
- Mock timer only for now
- Architecture should later accept real AI-generation status

Confirm whether this task has been implemented before assuming it is complete.

## Questionnaire Structure

### Step 1 — Celestial Identity

Order matters:

1. Zodiac sign
2. First name

The zodiac selector appears first because it looks better visually.

### Step 2 — Profile Calibration

- Birth date
- How OrionLabs should refer to the user

### Step 3 — Behavioral Snapshot

- Main area of attention
- Behavioral statement

### Step 4 — Final Calibration

- Optional free-text response

Then:

- Review Answers
- Begin Analysis

## Questionnaire Rules

Required:

- Zodiac sign
- First name
- Birth date
- Pronoun/reference preference
- Main area of attention
- Behavioral statement

Optional:

- Free-text response

Progress represents completed steps:

- Step 1 = 0%
- Step 2 = 25%
- Step 3 = 50%
- Step 4 = 75%
- Review = 100%

The progress bar uses three internal milestone markers:

- 25%
- 50%
- 75%

## Important UX Decisions

Preserve these decisions unless explicitly reconsidered:

- Zodiac question appears before the name field.
- Visible review buttons display only `Edit`.
- Review buttons may use unique accessible names without changing visible text.
- Focus rings appear only for keyboard navigation through `:focus-visible`.
- Continue remains actionable so validation messages can explain missing answers.
- Validation errors appear beside the relevant fields.
- The optional free-text field never blocks progress.
- Review is part of the questionnaire flow.
- Loading is a separate route/page.
- The loading page redirects automatically.
- There is no `View Report` button during loading.
- Start Another Analysis clears only OrionLabs-related session data.
- Real sharing controls are deferred until reports have a stable shareable form.

## Humor and Voice

### OrionLabs Voice

The voice should sound like a real AI startup that does not realize how ridiculous it sounds.

Good humor characteristics:

- Corporate confidence
- Precise but meaningless claims
- Undefined proprietary systems
- Professional wording
- Serious presentation of absurd methodology
- Personalized observations based on the user’s own answers
- Astrology treated as highly predictive evidence
- AI and scientific language applied to nonsense

A useful writing rule:

> If a sentence sounds like a joke, rewrite it until it sounds like marketing.

### Questionnaire Helpers

The helper copy still requires a later polishing pass.

The desired direction is subtle but ridiculous.

Example:

> One of our highest-weighted predictive variables.

This is stronger than an obvious joke because it sounds sincere while implying an absurd methodology.

Avoid treating the current helpers as the final humor benchmark.

### Report Content Balance

The roast is central, not a minor accent.

Approved first-version target:

- 40% polished horoscope and personality analysis
- 40% personalized roast
- 20% satire of astrology, AI systems, and manufactured scientific confidence

This is a writing guideline, not a runtime calculation.

The report should:

- look like a premium horoscope analysis
- use questionnaire answers as roast material
- mock astrology while remaining in character
- avoid becoming a list of disconnected jokes
- include sincere or nearly sincere strengths for contrast
- place stronger roast material in risks and the closing verdict
- keep the recommendation useful enough to sound credible

Do not target protected characteristics, trauma, medical conditions, appearance, or deeply sensitive personal topics.

## Report Contract

The technical source of truth is:

```text
src/data/report.ts
```

The report contains:

1. Subject identity
2. Executive celestial summary
3. Personality analysis
4. Supporting traits
5. Current-life analysis
6. Forecast
7. Strengths
8. Risks and recurring patterns
9. Recommended action
10. Exactly three OrionLabs metrics
11. Closing verdict

All major sections are required in version 1.

Optional questionnaire context may influence existing sections without creating a separate visible section.

### Metrics

Each report has exactly three metrics.

Each metric contains:

- stable internal ID
- visible label
- numeric value
- 2–4 word interpretation

Metric interpretations should resemble short school-report notes.

Examples:

- Elevated but stable
- Within expected range
- Requires mild supervision
- Commercially acceptable

Metrics are supporting visual evidence, not the main content.

## Questionnaire-to-Report Influence

### First name

Influences:

- Subject identity
- Executive summary
- Closing verdict
- Natural direct address

### Zodiac sign

Influences:

- Horoscope framing
- Personality analysis
- Celestial terminology
- Confidence metrics
- Closing verdict

### Birth date

Influences:

- Remains in questionnaire/session state as the source date
- The application derives current age before report generation
- Raw birth date is not included in the future generation input

Age may inform subject context, personalized analysis, and roast material. It must not be used to invent expected life milestones.

### Pronoun/reference preference

Remains a required questionnaire answer, persists in session state, and appears in Review Answers.

It is intentionally excluded from the future AI-generation input. Generated reports use second-person language (`you`, `your`, `yourself`) for every subject, so it does not influence report wording or create a visible report section.

### Main area of attention

Influences:

- Current-life analysis
- Forecast
- Recommended action
- Relevant risks

### Behavioral statement

Influences:

- Personality overview
- Supporting traits
- Strengths
- Risks
- Recommended action

### Optional free text

May influence:

- Executive summary
- Current-life analysis
- Risks
- Recommended action
- Closing verdict

Raw free text should not be displayed prominently or exposed carelessly.

## Content-Length Targets

Use these as writing targets, not frontend truncation rules:

- Summary headline: 4–10 words
- Summary body: 50–90 words
- Personality overview: 45–80 words
- Supporting trait: title + 20–45 words
- Current-life analysis: 60–100 words
- Forecast: 25–50 words
- Strength: title + 20–40 words
- Risk: title + 20–45 words
- Recommended action: title + 35–70 words
- Metric interpretation: 2–4 words
- Closing verdict: 25–60 words

The UI should tolerate slightly shorter or longer content.

## Current Architecture Notes

Confirm the exact current implementation before editing.

Likely relevant areas include:

```text
src/data/questionnaire.ts
src/data/report.ts
src/pages/
src/components/
```

The project uses:

- React
- Vite
- TypeScript
- Existing project styling conventions
- Session storage for questionnaire continuity
- Local mock report data
- Local mock personalization before AI integration

Important architectural principles:

- Persist questionnaire answers.
- Derive the current mock report from those answers.
- Do not mutate imported mock data.
- Keep presentation separate from completion state.
- Presentational report components should receive data through props.
- Do not make every component read directly from session storage.

## Temporary and Mocked Behavior

The following are not production-ready:

- Mock analysis timer
- Local mock report personalization
- No real AI generation
- No secure server-side AI endpoint yet
- No runtime validation of AI output yet
- Session-based persistence only
- No stable shareable report URL
- No real sharing controls
- No downloadable report
- No final backend error handling

Do not describe these as finished AI functionality.

## Future AI Architecture

When AI is added:

- Never call the provider directly from browser code.
- Use a secure server-side endpoint.
- Keep API keys outside the frontend.
- Validate and sanitize questionnaire input.
- Build the server request from the application-controlled generation input, not the full questionnaire draft. That input contains calculated age instead of birth date and intentionally excludes reference preference.
- Validate the structured AI response before rendering.
- Retry once when appropriate.
- Show a clear failure state if generation fails.
- Do not render incomplete or malformed required sections.
- Application-controlled metadata should remain separate from model output.

Potential server-side platforms:

- Vercel Functions
- Netlify Functions
- Cloudflare Workers
- Small Node.js backend

No platform has been finalized yet.

## Missing-Data Policy

Planned behavior:

- `/analysis` without valid questionnaire data → questionnaire
- `/report` without valid report/questionnaire data → questionnaire
- Invalid stored data → clear relevant OrionLabs data and redirect safely
- Never flash sample data before redirecting
- Never render `undefined`, empty required sections, or malformed raw output

Confirm which parts are already implemented before changing anything.

## Accessibility Principles

Preserve:

- Semantic HTML
- Real labels connected to form controls
- Accessible option-group semantics
- Field errors connected with stable IDs
- `aria-describedby`
- `aria-invalid`
- Keyboard-only focus styles
- Native keyboard behavior where possible
- Descriptive accessible names for visible `Edit` buttons
- Reduced-motion support
- No mouse-only interactions
- No information communicated only by color or motion

A complete project-wide accessibility audit still belongs near final polish.

## Reduced Motion

Questionnaire-level reduced-motion support has been addressed.

A later project-wide audit is still required after all pages exist.

For the loading page:

- continuous orbital motion should stop or reduce
- messages remain understandable
- redirect still works
- no information depends on animation

## Known Warnings

The project previously had five pre-existing Fast Refresh warnings.

They did not block TypeScript, ESLint, or production builds.

Confirm whether they still exist before treating them as current.

## Immediate Next Steps

Use `ROADMAP.md` as the source of truth, but likely next work includes:

1. Confirm and review the final mock loading experience.
2. Finish routing and the complete mock user journey.
3. Build the fake research article page.
4. Build the branded 404 page.
5. Add route safety and refresh behavior.
6. Add focused tests.
7. Polish questionnaire helper copy.
8. Only then begin secure AI integration.

Do not assume this ordering if `ROADMAP.md` has changed.

## Working Preferences

The project owner is learning development from scratch by building real projects.

When working:

- Inspect files before making meaningful changes.
- Explain what currently controls the behavior.
- Explain the intended approach.
- Identify files to modify.
- Mention assumptions and tradeoffs.
- Afterward, summarize what changed and why.
- Explain unfamiliar concepts using the real code.
- Add useful comments when necessary.
- Do not over-comment obvious code.
- Prefer readable, beginner-understandable code.
- Avoid unnecessary abstractions.
- Push back on poor UX or fragile architecture.
- Do not act as a yes-man.
- Do not reverse a recommendation merely because it is questioned.
- Keep scope tight.
- Suggest a Conventional Commit message after completed work.
- Do not create commits unless explicitly asked.

## Handoff Verification Checklist

Before beginning a new task, the new assistant should confirm:

- It has read the source-of-truth files.
- It understands the current product flow.
- It understands the humor direction.
- It knows what is mocked.
- It knows the current roadmap position.
- It has inspected the relevant source files.
- It is not relying on stale assumptions from this handoff.
