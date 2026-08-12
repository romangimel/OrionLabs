# OrionLabs Roadmap

> Build the visual product first, connect the product flow, validate it with local fixtures, add AI securely, then complete final release polish.

---

# Vision

## Mission

Build a premium-looking fictional AI startup that satirizes astrology, AI hype, and startup culture while demonstrating modern frontend development skills.

## Guiding Principles

- Make OrionLabs feel like a real AI company even when the joke is obvious.
- Prioritize a polished user experience over adding lots of features.
- Build every feature as if it could exist in a real SaaS product.
- Learn modern frontend development by understanding each decision, not just shipping code.
- Every new page should strengthen the OrionLabs universe.
- Keep the humor sincere in-universe and professionally presented across subtle, obvious, and occasionally punchy intensities.
- Prefer a short, enjoyable user journey over excessive personalization.
- Build accessibility into each feature rather than treating it only as final cleanup.

---

## 1. Finish the Foundation

- [x] Build the landing page
- [x] Create `PROJECT.md`
- [x] Create `DESIGN_SYSTEM.md`
- [x] Create `ROADMAP.md`
- [x] Create a project-level `AGENTS.md`
- [x] Refactor the landing page into reusable components
- [x] Fix the mobile spacing issue
- [x] Check that the refactor did not change the design
- [x] Add useful code comments and project documentation
- [x] Commit and push the stable version

---

## 2. Plan the Product Flow

- [x] Finalize the main user journey

```text
Landing Page
→ Questionnaire
→ Review Answers
→ Analysis Loading Screen
→ Vercel Function
→ Gemini
→ Report Page
```

- [x] Decide the questionnaire questions
- [x] Decide the questionnaire step order
- [x] Decide what information the report should contain
- [x] Define the structured report data schema
- [x] Define how users are redirected when required data is missing
- [x] Define which questionnaire fields are required and optional

---

## 3. Build the Questionnaire

### UI

- [x] Design the questionnaire layout
- [x] Add a progress bar
- [x] Design the different input types
- [x] Design the zodiac selector
- [x] Create desktop and mobile layouts
- [x] Improve the desktop width and internal component sizing
- [x] Align the header and progress section with the questionnaire card
- [x] Add the correct progress markers
- [x] Check desktop and mobile layouts

### Basic Behaviour

- [x] Add Continue and Back button functionality
- [x] Update the progress bar between steps
- [x] Use the completed-steps progress model:
  - Step 1 = 0%
  - Step 2 = 25%
  - Step 3 = 50%
  - Step 4 = 75%
  - Review = 100%
- [x] Keep answers when moving between steps
- [x] Add the Review Answers stage
- [x] Group answers by questionnaire section
- [x] Add Edit actions for individual sections
- [x] Preserve answers while editing earlier steps
- [x] Add a Change Answers action
- [x] Connect Begin Analysis to a separate analysis page
- [x] Preserve questionnaire data across route navigation

### Validation and Accessibility

- [x] Mark required and optional fields clearly
- [x] Prevent users from continuing when required answers are missing
- [x] Add useful field-level validation messages
- [x] Connect labels correctly to form controls
- [x] Verify complete keyboard navigation
- [x] Verify visible focus states
- [x] Ensure button states and unavailable actions are communicated clearly
- [x] Ensure errors can be understood by screen-reader users
- [x] Respect reduced-motion preferences in the questionnaire flow

---

## 4. Define the Report

Before designing the final report page, define the shape of the data it will display.

- [x] Create typed local report fixture data
- [x] Define the report TypeScript interfaces
- [x] Decide which sections are always present
- [x] Decide which sections may be optional
- [x] Define how questionnaire answers influence each section
- [x] Define how OrionLabs confidence metrics appear
- [x] Define the balance between horoscope content and personalized roast content
- [x] Decide how long each report section should be
- [x] Decide how missing or incomplete AI output should be handled

Possible report sections:

- Executive celestial summary
- Personality analysis
- Current-life forecast
- Strengths
- Risks and recurring patterns
- Recommended action
- Personalized observations
- Confidence metrics
- Closing verdict

---

## 5. Build the Remaining Pages

### Report Page

- [x] Build the report page UI using typed local report fixtures
- [x] Create reusable report-section components
- [x] Display personalized questionnaire information
- [x] Display fixture-based confidence metrics
- [x] Design desktop and mobile report layouts
- [x] Handle long and short content gracefully
- [x] Add a temporary action for starting another analysis

### Loading Page

- [x] Build the final analysis loading-screen UI
- [x] Create a restrained loading animation
- [x] Add OrionLabs processing messages
- [x] Ensure the loading experience matches the fictional AI-company tone
- [x] Design desktop and mobile layouts
- [x] Keep presentation messages distinct from actual report-generation stages

### Additional Pages

- [x] Build the fake article page UI
- [x] Connect the article to the wider OrionLabs fictional research universe
- [x] Build a simple branded 404 page
- [x] Add a fallback page or state for missing questionnaire data

---

## 6. Connect the Website

### Routing

- [x] Add the questionnaire route
- [x] Add the analysis route
- [x] Connect the questionnaire review stage to the analysis route
- [x] Add the report route
- [x] Add the fake article route
- [x] Add the 404 route

### User Journey

- [x] Connect the landing-page primary CTA to the questionnaire
- [x] Connect the analysis screen to the report flow
- [x] Connect report actions to the correct destinations
- [x] Connect “Read More” to the fake article
- [x] Finish all landing-page buttons and links
- [x] Add mobile navigation if needed
- [x] Add a clear way to return to the landing page
- [x] Clear incomplete questionnaire data when users leave the analysis journey
- [x] Save completed reports as standalone session records
- [x] Preserve the active completed report while browsing OrionLabs
- [x] Centralize report persistence behind a replaceable storage module

### Route Safety

- [x] Handle direct access to `/analysis` without questionnaire data
- [x] Handle direct access to `/report` without report data
- [x] Handle missing or invalid `sessionStorage` data
- [x] Handle refreshes on questionnaire, analysis, and report routes
- [x] Redirect users gracefully instead of showing broken screens

---

## 7. Add the Local Product Foundation

- [x] Pass completed questionnaire answers into the structured report foundation
- [x] Generate a development report fixture from structured local data
- [x] Display the development fixture using the real report components
- [x] Add loading-sequence behaviour
- [x] Connect loading completion to the report page
- [x] Preserve report data across route navigation
- [x] Handle restarting the questionnaire
- [x] Handle clearing or replacing old questionnaire data
- [x] Add useful error and fallback states
- [x] Ensure repeated submissions do not produce broken state

---

### Orion Subject Signature vertical slice

- [x] Replace the shared orbital model with a typed deterministic signature renderer
- [x] Implement and hand-tune the Capricornus geometry, focus roles, and five behavior patterns
- [x] Preserve zodiac, focus, and behavior explicitly in the saved report snapshot
- [x] Integrate progressive static questionnaire state, static Review/Report state, and Analysis-only construction motion
- [x] Design and validate the remaining eleven zodiac geometries

---

## 8. Quality and Testing

Testing should happen throughout development, not only before launch.

### Verified Questionnaire Behavior

The completed items below are manual behavior checks, not automated regression tests. They can be reused while their relevant implementation remains unchanged.

- [x] Continue and Back navigation, including first/last-step boundaries and Review entry
- [x] Answers remain when moving backward, forward, editing from Review, and returning to Review
- [x] Step-local required-field validation, optional free text, corrected-error clearing, and first-invalid-field focus
- [x] Progress values: Step 1 = 0%, Step 2 = 25%, Step 3 = 50%, Step 4 = 75%, Review = 100%
- [x] Review Answers displays readable values, optional-answer fallbacks, and accessible Edit names
- [x] Each of the four Edit actions returns to its matching question group without clearing answers
- [x] Edited answers replace the prior review-summary values
- [x] Begin Analysis saves one pending report identity and opens the analysis route

### Verified Routing and Persistence Behavior

- [x] Questionnaire drafts persist during the active journey and survive a questionnaire refresh
- [x] Draft and report validators safely reject corrupted stored data
- [ ] Perform focused browser checks for malformed questionnaire drafts and report records
- [x] Protected-route recovery: `/analysis` redirects completed active reports directly to `/report`; otherwise `/analysis` and `/report` redirect to `/questionnaire` without protected-content flash when their required session state is absent
- [x] Refresh the landing, questionnaire, analysis, report, and article routes locally and in deployed Vercel environments
- [x] Verify deployed SPA fallback preserves static assets, Vite development resources, and `/api/*` handling
- [x] Complete real AI journey: Landing → Questionnaire → Review → Analysis → Vercel Function → Gemini → validated Report → Start Another Analysis

### Automated Regression Coverage

Vitest now provides focused regression coverage for the AI input boundary, generated-report validation, bounded retries, the Vercel handler, duplicate in-flight browser requests, session report persistence, and completed-report route recovery. Browser automation remains deferred.

- [x] Add a lightweight, focused test setup for security-sensitive generation and persistence boundaries

### Recurring Quality Requirements

After meaningful changes, run the applicable checks below. These are continuing development practices, not one-time milestones.

- Run TypeScript checks after meaningful functionality changes.
- Run linting after meaningful functionality changes.
- Run the production build before each milestone.
- Check the affected browser console for errors.
- Verify affected desktop and mobile layouts after major UI changes.
- Confirm unrelated pages remain unchanged after scoped edits.

---

## 9. Add AI Securely

Do not call the AI provider directly from frontend browser code.

### AI Planning

- [x] Choose Google Gemini as the first AI provider
- [x] Review pricing, rate limits, and response capabilities
- [x] Define the structured AI response format from the `OrionReport` runtime schema
- [x] Create the OrionLabs system prompt
- [x] Create the reusable report-generation prompt
- [x] Decide which questionnaire answers are sent to the model: mapped name, zodiac sign, application-calculated age, focus area, behavioral statement, and optional context
- [x] Decide what information should never be sent: raw birth date and reference preference; reports always use second-person language

### Server-Side Integration

- [x] Choose Vercel Functions as the first server-side platform
- [x] Create the secure `POST /api/generate-report` endpoint
- [x] Keep `GEMINI_API_KEY` outside the frontend codebase
- [x] Validate and normalize the approved generation input on the server
- [x] Bound optional user-provided free text
- [x] Add request-size limits
- [x] Configure Vercel Firewall rate limiting at five report-generation requests per 60 seconds per IP address
- [x] Handle quota exhaustion gracefully in the product
- [x] Add appropriate server-side diagnostics without exposing private user content

### AI Response Handling

- [x] Send only `ReportGenerationInput` through the secure server endpoint
- [x] Validate the AI response structure on the server and client
- [x] Reject malformed responses safely and retry once when appropriate
- [x] Display the generated report through existing report components
- [x] Handle provider errors without exposing provider internals
- [x] Add a bounded provider timeout
- [x] Add one-retry behaviour for transient or malformed generation
- [x] Add an explicit Analysis-page retry state that preserves answers
- [x] Prevent duplicate in-flight report-generation requests in the browser
- [x] Keep presentation timing separate from real request state

---

## 10. Final Polish and Launch

### Final fixes

- [x] Remove zodiac icon from questionnaire when unasigned
- [x] Polish subject signature glow and background
- [ ] Finalize the landing page presentation order
- [x] Redesign analysis page and loading messages
- [x] Fix mobile scroll focus on questinnaire flow
- [ ] Fix landing page mobile navigation
- [x] Fix generated report storing and routing
- [x] Move signature ID inside subject signature
- [ ] Fix research card image placement
- [ ] Make the article shorter
- [ ] Fix report fucos card desktop layout
- [ ] Polish LP trusted section 

### Product Polish

- [ ] Polish copy throughout the website
- [ ] Polish text color throughout the website
- [x] Finalize all questionnaire helper text
- [ ] Polish generated art throughout the website
- [ ] Set same background opacity across all pages
- [ ] Make the OrionLabs humor consistent across every page
- [ ] Review the complete desktop experience
- [ ] Review the complete tablet experience
- [ ] Review the complete mobile experience
- [ ] Review empty, loading, error, and success states
- [ ] Remove obsolete fixture or demo content while preserving development and test fixtures
- [ ] Remove unused code and assets
- [ ] Confirm all technical comments remain accurate

### Accessibility

- [ ] Perform a full keyboard-navigation audit
- [ ] Perform a project-wide reduced-motion audit
- [ ] Perform a screen-reader structure review
- [ ] Check color contrast
- [ ] Check focus visibility
- [ ] Check semantic heading order
- [ ] Check form labels and error messages
- [ ] Check reduced-motion support
- [ ] Check touch-target sizes

### Performance

- [ ] Optimize large images
- [ ] Remove unnecessary dependencies
- [ ] Check bundle size
- [ ] Lazy-load appropriate pages or assets
- [ ] Check page performance
- [ ] Check layout shifts
- [ ] Check loading behaviour on slower connections

### Final Testing

- [ ] Test the complete user journey
- [ ] Test on multiple desktop widths
- [ ] Test around 375px and 430px mobile widths
- [ ] Test on at least one real mobile device
- [ ] Re-test route refreshes on the final production release candidate
- [ ] Test AI failure and timeout states
- [ ] Re-confirm no API keys are exposed in the final release candidate
- [ ] Confirm no console errors remain
- [ ] Run the final production build

### Documentation and Deployment

- [ ] Update the README for the finished version
- [x] Document the current technology stack
- [x] Document local development setup
- [x] Document environment variables without exposing secrets
- [x] Clearly identify the project as satire
- [ ] Add screenshots or a short product preview
- [x] Deploy OrionLabs to Vercel with `main` as Production and feature-branch Previews
- [x] Verify the current Preview and Production deployments, including real Gemini report generation
- [x] Verify deployed routes support SPA fallback and static assets load correctly
- [ ] Re-verify the final Production release candidate after polish, accessibility, and performance work
- [ ] Add the live URL to the GitHub repository
- [ ] Add OrionLabs to the portfolio

---

## Later Ideas

### Sharing and Persistence

- [ ] Optional server-side report persistence
- [ ] Anonymous, stable shareable report URLs
- [ ] Report retention and deletion controls if server persistence is introduced
- [ ] Optional sharing and privacy permissions where relevant

### Accounts

- [ ] Authentication
- [ ] Authenticated report history

### Product Expansion

- [ ] Shareable horoscope cards
- [ ] Downloadable report images
- [ ] Fake scientific charts
- [ ] More fake research articles
- [ ] Easter eggs
- [ ] Different roast styles
- [ ] Different analysis tones
- [ ] Darker or lighter report themes
- [ ] Additional fictional OrionLabs products
- [ ] A fictional company team page
- [ ] A fake investor or research portal
