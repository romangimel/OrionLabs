# OrionLabs Project Instructions

## Project context

OrionLabs is a satirical horoscope and fictional AI-startup portfolio project.

Before making meaningful changes, read the relevant project documentation:

- `PROJECT.md`
- `DESIGN_SYSTEM.md`
- `ROADMAP.md`
- `README.md`

Treat those files as the source of truth for the project’s goals, design language, scope, and current development stage.

## Product direction

Preserve OrionLabs’ core identity:

- Premium and polished presentation
- Serious fictional AI-company tone
- Institutional absurdity delivered with polished corporate confidence
- Satire of astrology, AI hype, and startup culture
- Humor that may be obvious, sharp, or self-incriminating while remaining professionally stated and sincere in-universe

OrionLabs may acknowledge questionable methodology when it reframes that absurdity as policy, rigor, legal distinction, or product capability. Do not step out of character to explain the joke, and do not introduce loud meme humor, internet-slang comedy, embarrassed self-awareness, or unrelated punchlines without explicit approval.

## Design consistency

Reuse the existing:

- Typography
- Color palette
- Gold accents
- Gradients
- Borders
- Spacing system
- Button styles
- Background treatments
- Responsive conventions
- Reusable components

Do not introduce a new visual language or redesign unrelated sections.

Preserve desktop, tablet, and mobile behavior unless the task explicitly asks for responsive changes.

## Technical expectations

Follow the project’s existing React, TypeScript, Vite, and styling conventions.

Prefer:

- Existing reusable components
- Typed data structures
- Configuration-driven questionnaire content
- Controlled form inputs
- Derived state instead of duplicated state
- Semantic HTML
- Accessible interactions
- Clear component responsibilities

Do not add dependencies unless the current stack cannot solve the problem cleanly.

## Scope control

Inspect the existing implementation before editing.

Do not modify unrelated landing-page sections, questionnaire content, routes, or visual styles unless required by the task.

When a requested change affects multiple areas, explain the impact before editing.

## Current product status

Some parts of the project may still be mocked or temporary, including:

- Analysis loading behavior
- AI report generation
- Report content
- Backend persistence
- Production error handling

Do not present mocked behavior as finished functionality.

Keep temporary implementations easy to replace later.

## Verification

After changes, run the checks available in the project, including:

- TypeScript checks
- Linting
- Production build
- Relevant manual flow verification

Verify that unrelated pages and responsive layouts remain intact.
