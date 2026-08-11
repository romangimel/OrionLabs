# OrionLabs

> *Enterprise-grade cosmic intelligence for the scientifically adjacent.*

---

# Vision

OrionLabs is a fictional AI startup that claims to generate hyper-personalized astrological insights using proprietary artificial intelligence.

The company is completely fake.

The satire comes from OrionLabs treating its fictional methodology as real, proprietary, and professionally defensible.

Everything—from the branding to the UI to the copywriting—should be presented with absolute confidence.

The website should initially appear to be a legitimate venture-backed AI company.

Visitors may recognize the absurdity immediately or discover it through increasingly ridiculous institutional logic. OrionLabs remains sincere in-universe either way.

The project is ultimately a satire of:

- Astrology
- AI hype
- Startup culture
- Marketing buzzwords
- Corporate jargon
- People's desire to feel uniquely understood

The humor should reward attention without requiring every strong joke to be hidden.

---

# Primary Goal

When someone closes the website they should think:

> "I need to send this to my friends."

---

# Design Philosophy

The website should feel luxurious.

Imagine if Apple designed the branding for an AI startup focused on astrology.

Visual inspirations:

- Apple
- Linear
- Stripe
- Vercel
- OpenAI

Characteristics:

- Premium
- Elegant
- Minimal
- Cinematic
- Sophisticated
- Mysterious
- Confident

Never:

- childish
- meme-like
- loud
- cluttered
- cheesy
- low effort

The design should be beautiful enough that screenshots are worth sharing.

---

# Brand Personality

OrionLabs genuinely believes it is changing humanity.

It speaks like a billion-dollar startup.

Everything is:

- proprietary
- revolutionary
- enterprise-grade
- AI-powered
- data-driven
- scientifically adjacent

The company should sound completely convinced that its absurd claims are legitimate.

---

# Humor Philosophy

OrionLabs is sincere in-universe, not oblivious to its own questionable methodology.

The company speaks with polished corporate and scientific authority while applying fake rigor, unnecessary precision, startup bureaucracy, and legal or methodological distinctions to obviously absurd subject matter. It may openly describe its methods as `highly questionable`, its conclusions as `subsequent overreach`, or its claims as `legally distinct`. These phrases let the audience recognize the joke while OrionLabs continues treating the underlying method as a legitimate product capability.

Do not step out of character to explain the joke. Acknowledging absurd methodology is not the same as breaking character: OrionLabs may admit that it is ignoring scientific consensus, then frame that decision as rigorous operating policy. It should never become embarrassed by its premise or tell the audience that the company, astrology, or the experience is "just a joke."

Humor may range from subtle corporate absurdity through obvious fake-scientific overreach and recognizable roast lines to occasional strong punchlines. Not every sentence should be a joke, but obviousness alone is not a reason to weaken a line that is funny, polished, and true to the institutional voice.

The most reliable constructions are:

- A professional setup followed by an incriminating qualifier
- A serious methodology applied to an absurd objective
- A corporate euphemism used to legitimize obvious nonsense
- Openly questionable behavior presented as a product capability
- A scientific or legal distinction used to defend an indefensible claim
- Institutional acknowledgment of absurdity framed as policy, rigor, or competitive advantage

Good examples can be quiet:

> Included as part of a broader analytical framework.

Or openly incriminating:

> Ignoring centuries of scientific consensus since 2026.

Or an obvious joke built entirely from institutional logic:

> We are not saying the planets control your destiny. We are saying our proprietary interpretation of the planets controls your destiny, which is an entirely different and legally distinct claim.

All three belong to the same voice because OrionLabs never abandons its confidence or professional framing.

Never say:

- "Obviously astrology is fake."
- "Yes, we know this is ridiculous."
- "Haha, just kidding."
- "This whole company is satire."
- "Get it?"

The audience is allowed to see the joke. OrionLabs is not allowed to stop being OrionLabs in order to point at it.

---

# Copywriting Rules

The copy should resemble a mixture of:

- AI startup marketing
- luxury branding
- corporate PR
- scientific whitepapers

Every sentence should sound polished.

Examples:

"Scientifically adjacent."

"Enterprise-grade cosmic intelligence."

"Ignoring centuries of scientific consensus since 2026."

"Backed by statistically significant optimism."

"Our proprietary planetary infrastructure."

"Our neural models continue learning from the observable universe."

Never use:

- internet memes
- random humor
- emoji jokes
- childish language

Use restraint at the page level, not as a requirement to bury the funniest individual lines. Contrast keeps the jokes effective.

---

# Color Palette

Foundation:

- Midnight Blue
- Deep Navy

Primary Brand Colors:

- Royal Purple
- Violet
- Deep Magenta
- Pink Nebula

Accent:

- Luxury Gold

Neutral:

- White
- Soft Off-White

The website should feel like luxury space technology.

Purple and pink should be major visual elements.

Avoid generic blue AI aesthetics.

---

# Typography

Headings:

Elegant serif typography.

Body:

Modern sans-serif.

Text color hierarchy:

Gold:

- Major headings
- Important words
- Statistics
- Numbers
- OrionLabs branding

White:

- Paragraphs
- Descriptions
- Navigation
- Supporting copy

Purple / Pink:

- Badges
- Links
- Hover states
- Minor highlights

Typography should create hierarchy through color—not only size.

---

# Motion

Animations should feel:

- smooth
- restrained
- premium
- cinematic

Never distracting.

Respect reduced motion preferences.

---

# User Experience

The experience should support a range of comedic intensity and generally escalate.

Beginning:

Looks legitimate while already permitting recognizable institutional absurdity.

Middle:

Some claims become questionable.

End:

The company is confidently presenting complete nonsense.

The joke should become more personal and aggressive over time, with the generated report as the strongest payoff.

---

# Report Definition

The first-version report is a complete, synthesized OrionLabs assessment. The exact TypeScript data shape remains defined in `src/data/report.ts`; this section defines the product and writing rules that shape that data.

## Required structure

Every successful version 1 report contains:

1. Subject identity
2. Executive celestial summary
3. Personality analysis
4. Current-life analysis, including a forecast
5. Strengths
6. Risks and recurring patterns
7. Recommended action
8. OrionLabs confidence metrics
9. Closing verdict

All nine sections are required. Version 1 has no optional major report sections. Optional questionnaire context may improve an existing section, but it does not create a separate visible section. The report should feel synthesized rather than assembled as one paragraph per answer.

## Questionnaire influence

| Questionnaire answer | Report influence |
| --- | --- |
| First name | Subject identity, executive summary, closing verdict, and natural direct address where appropriate |
| Zodiac sign | Horoscope framing, personality analysis, celestial terminology, confidence metrics, and closing verdict |
| Birth date | Remains questionnaire-only source data. The application derives the current age before report generation; the raw date is not generation input. |
| Age | Application-controlled subject context. It may inform personalized analysis and roast material, but must not be used to invent expected life milestones. |
| Pronoun or reference preference | Remains required questionnaire and review data, but is intentionally excluded from report-generation input. Generated reports use second-person language (`you`, `your`, `yourself`) for every subject. |
| Main area of attention | Current-life analysis, forecast, recommended action, and relevant risks |
| Behavioral statement | Personality overview, supporting traits, strengths, risks and recurring patterns, and recommended action |
| Optional free-text response | May improve the executive summary, current-life analysis, risks, recommended action, and closing verdict; never a required dedicated section |

Not every answer must appear visibly or separately. Answers should combine into recognizable observations, supporting evidence, and recommendations.

## OrionLabs confidence metrics

Every report contains exactly three metrics. Each metric has a stable internal ID, a visible label, a numeric value that generally uses a 0–100 scale, and a 2–4-word interpretation. Internal IDs remain stable when visible labels change.

Metrics should look measurable and professionally presented while remaining clearly fictional within the OrionLabs universe. They provide supporting visual evidence rather than the report's main content and must not imply legitimate medical, psychological, financial, or scientific assessment. Interpretations should read like short school-report annotations, such as `Elevated but stable` or `Needs further observation`. The visual component is intentionally undecided at this stage.

## Content balance and comedic purpose

Use a first-version writing target of 40% polished horoscope and personality analysis, 40% personalized roast, and 20% satire of astrology, AI systems, and manufactured scientific confidence. This is a tone guideline, not a runtime calculation.

The report should initially resemble a legitimate premium horoscope or personality assessment. Professional framing should disguise and strengthen the roast, while questionnaire answers supply specific material about the subject's habits, contradictions, decisions, priorities, and self-perception. Weak celestial signals should be treated as highly predictive evidence, and OrionLabs should present absurd conclusions with institutional confidence without breaking character or explaining the joke.

Serious observations, flattering insights, and credible advice create the contrast that makes sharper lines effective. Strengths may be sincere while exposing contradictions; personality analysis should combine meaningful personalization with recognizable ridicule; current-life analysis should strongly use the selected focus area and optional context; risks should contain some of the strongest personalized roast material; recommended action should remain useful; and the closing verdict should deliver one of the most memorable, screenshot-worthy observations.

The intended reactions are: "This is complete nonsense, but it somehow described me" and "I need to send this to my friends." Avoid generic zodiac copy, safe motivational filler, setup-and-punchline formatting, loud meme humor, excessive winking, or insults unrelated to the subject's answers. The roast must remain playful and must not target protected characteristics, trauma, medical conditions, appearance, or similarly sensitive personal areas.

The defining tone is a fictional AI company applying extraordinary technical confidence to astrology and using the resulting analysis to professionally explain what is wrong with the user.

## Content length targets

These ranges guide mock data and future AI prompts. They are writing targets rather than rigid rendering limits, and the future UI must tolerate modestly shorter or longer content.

| Content | Target length |
| --- | --- |
| Summary headline | 4–10 words |
| Summary body | 50–90 words |
| Personality overview | 45–80 words |
| Each supporting trait | Title plus 20–45 words |
| Current-life analysis | 60–100 words |
| Forecast | 25–50 words |
| Each strength | Title plus 20–40 words |
| Each risk | Title plus 20–45 words |
| Recommended action | Title plus 35–70 words |
| Metric interpretation | 2–4 words |
| Closing verdict | 25–60 words |

## Generated-report validation policy

AI-generated reports are validated before they leave the server and again before the browser stores them. Required sections must never silently disappear, and malformed or incomplete output must not be displayed as a partially broken report. OrionLabs makes one initial Gemini request and at most one retry for transient provider failures or malformed structured output. If generation still fails, the Analysis page shows an explicit retry action while preserving the questionnaire draft.

The Gemini project currently uses the Free tier with billing disabled. Provider quota is an intentional MVP safety boundary: Gemini `429` resource-exhaustion responses bypass the immediate second attempt and become a safe `ANALYSIS_CAPACITY_EXHAUSTED` response. The installed SDK does not expose stable structured quota dimensions, so the product intentionally does not claim whether a limit is per-minute, token-based, daily, or another provider-capacity condition. The Analysis page presents one conservative try-later state and preserves the questionnaire draft.

Vercel Firewall separately limits `/api/generate-report` to five requests per 60 seconds per IP address. That rule runs before the Function, is configured in Vercel rather than repository code, and may return a non-OrionLabs HTTP 429 response. The browser handles that response as the same broad temporary-capacity state without conflating the two enforcement layers.

Never render `undefined`, empty required cards, raw malformed data, or placeholder strings presented as real analysis. Application-controlled subject identity, focus area, report IDs, timestamps, and other operational metadata remain protected from silent model replacement. Fine-grained repair of individual malformed sections may be considered later, but is not required for version 1.

## AI report-generation architecture

The first real generation path uses the official `@google/genai` SDK with the stable `gemini-3.6-flash` model. The browser posts an approved `ReportGenerationInput` to `POST /api/generate-report`; a Vercel Function validates it, invokes Gemini with stable system/report prompts plus separate runtime subject data, validates the structured result against the `OrionReport` schema, and returns only a complete report.

`GEMINI_API_KEY` is server-only. It must never use a `VITE_` prefix or appear in frontend code. The approved provider payload contains name, zodiac sign, application-calculated age, focus area, behavioral statement, and bounded optional context. Raw birth date and reference preference remain in questionnaire state and are intentionally excluded.

The prompt currently uses a deliberately roast-heavy calibration (approximately 80% savage and 20% uncomfortably accurate at roughly 9/10 intensity) inside the broader report composition rules above. This is a starting calibration, not a final prompt. Prompt evaluation and tuning remain active work.

---

# Technical Standards

Frontend:

- React
- Vite
- TypeScript

UI:

- Tailwind CSS
- shadcn/ui

Animation:

- Framer Motion

Icons:

- Lucide React

Code must be:

- modular
- reusable
- strongly typed
- accessible
- maintainable
- production quality

No unnecessary dependencies.

---

# Session Persistence Policy

Incomplete questionnaire progress is temporary. Answers, the current step, and review state remain in `sessionStorage` while the visitor stays within the questionnaire, analysis, and report journey, so ordinary refreshes do not discard active work. A deliberate OrionLabs navigation action that leaves an incomplete journey clears that draft.

Completed reports are separate, immutable snapshots of the full `OrionReport`, with an internal ID, creation timestamp, schema version, minimal subject metadata, and the application-controlled inputs for the Orion Subject Signature (zodiac, focus, and behavior). The signature never reconstructs behavior from generated report prose. The active completed report remains available for the current browser-tab session while the visitor browses other OrionLabs pages. The public route remains `/report`; it resolves the private active report ID internally, and visible return navigation or report history is intentionally deferred.

Questionnaire and report persistence are isolated behind small typed storage functions. A future API or database can replace that browser-storage boundary without requiring the report page to know where its snapshot came from. Before calling the Vercel Function, the application maps questionnaire answers to a small generation-input boundary: it derives current age from birth date, retains the raw birth date only in questionnaire state, and deliberately omits reference preference. Completed reports remain session-local; server-side report persistence and account history are deferred.

---

# Folder Philosophy

Favor composition over duplication.

Components should be reusable.

Keep responsibilities separated.

Write code another engineer would enjoy maintaining.

---

# Things OrionLabs Never Does

Never steps out of character to explain the joke.

Never apologizes.

Never becomes self-deprecating.

Never breaks character.

Never becomes visually messy.

Never sacrifices elegance for comedy.

Never uses humor instead of good design.

---

# Success Criteria

The project succeeds if users think:

"This looks incredibly expensive."

followed by

"Wait..."

followed by

"Oh my God."

followed by

"I'm sending this to someone."

---

# Guiding Principle

Every decision should satisfy this question:

> Would a $50 million AI startup confidently do this?

If the answer is "yes," proceed.

If the answer is "yes, but it's also completely ridiculous," you've probably found the sweet spot.
