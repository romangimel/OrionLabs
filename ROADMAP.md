# OrionLabs Roadmap

> Build the visual product first, connect the product flow, validate it with mock data, then add AI securely.

---

# Vision

## Mission

Build a premium-looking fictional AI startup that satirizes astrology, AI hype, and startup culture while demonstrating modern frontend development skills.

## Guiding Principles

- Make OrionLabs feel like a real AI company before the joke becomes obvious.
- Prioritize a polished user experience over adding lots of features.
- Build every feature as if it could exist in a real SaaS product.
- Learn modern frontend development by understanding each decision, not just shipping code.
- Every new page should strengthen the OrionLabs universe.
- Keep the humor subtle, serious, and professionally presented.
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
- [x] Connect Begin Analysis to a separate mock analysis page
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

- [x] Create typed mock report data
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

- [x] Build the report page UI using mock report data
- [x] Create reusable report-section components
- [x] Display personalized questionnaire information
- [x] Display mock confidence metrics
- [x] Design desktop and mobile report layouts
- [x] Handle long and short content gracefully
- [x] Add a temporary action for starting another analysis

### Loading Page

- [x] Build the final analysis loading-screen UI
- [x] Create a restrained loading animation
- [x] Add OrionLabs processing messages
- [x] Ensure the loading experience matches the fictional AI-company tone
- [x] Design desktop and mobile layouts
- [x] Avoid implying that the current mock process is real AI generation

### Additional Pages

- [x] Build the fake article page UI
- [x] Connect the article to the wider OrionLabs fictional research universe
- [x] Build a simple branded 404 page
- [x] Add a fallback page or state for missing questionnaire data

---

## 6. Connect the Website

### Routing

- [x] Add the questionnaire route
- [x] Add the mock analysis route
- [x] Connect the questionnaire review stage to the analysis route
- [x] Add the report route
- [x] Add the fake article route
- [x] Add the 404 route

### User Journey

- [x] Connect the landing-page primary CTA to the questionnaire
- [x] Connect the loading screen to the mock report
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

## 7. Add Core Functionality

- [x] Pass completed questionnaire answers into mock report generation
- [x] Generate a mock report from structured local data
- [x] Display the mock report using the real report components
- [x] Add loading-sequence behaviour
- [x] Connect loading completion to the report page
- [x] Preserve report data across route navigation
- [x] Handle restarting the questionnaire
- [x] Handle clearing or replacing old questionnaire data
- [x] Add useful error and fallback states
- [x] Ensure repeated submissions do not produce broken state

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
- [x] Begin Analysis saves one pending report identity and opens the mock analysis route

### Verified Routing and Persistence Behavior

- [x] Questionnaire drafts persist during the active journey and survive a questionnaire refresh
- [ ] Missing or corrupted stored data across every documented case. Current validators safely reject malformed drafts and report records; the strengthened malformed-draft guard still needs a focused browser check.
- [x] Protected-route recovery: `/analysis` and `/report` redirect to `/questionnaire` without protected-content flash when their required session state is absent
- [ ] Refresh every current route locally and verify deployed SPA fallback after deployment. Local pathname routing is implemented, but deployed-host behavior cannot be confirmed yet.
- [x] Complete mock journey: Landing → Questionnaire → Review → Analysis → saved Report → Start Another Analysis

### Automated Regression Coverage

No automated test framework or test files are currently configured. The checked items above are verified manually; they do not imply repeatable automated coverage.

- [ ] Add a lightweight, focused test setup only when the project is ready to maintain it. The strongest first candidates are storage validation and questionnaire progress/state helpers; browser-automation infrastructure is deferred.

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

- [ ] Choose an AI provider
- [ ] Review pricing, rate limits, and response capabilities
- [ ] Define the final structured AI response format
- [ ] Create the OrionLabs system prompt
- [ ] Create the report-generation prompt
- [x] Decide which questionnaire answers are sent to the model: mapped name, zodiac sign, application-calculated age, focus area, behavioral statement, and optional context
- [x] Decide what information should never be sent: raw birth date and reference preference; reports always use second-person language

### Server-Side Integration

- [ ] Choose a server-side platform
- [ ] Create a secure server-side API endpoint
- [ ] Keep API keys outside the frontend codebase
- [ ] Validate questionnaire input on the server
- [ ] Sanitize user-provided free text
- [ ] Add request-size limits
- [ ] Add basic rate limiting
- [ ] Add basic usage and cost protection
- [ ] Add appropriate server-side logging without exposing private user content
- [ ] Persist completed reports server-side
- [ ] Add authenticated report history
- [ ] Add stable report URLs and sharing permissions
- [ ] Add report deletion and privacy controls

Possible platforms:

- Vercel Functions
- Netlify Functions
- Cloudflare Workers
- A small Node.js backend

### AI Response Handling

- [ ] Send questionnaire answers through the secure server endpoint
- [ ] Validate the AI response structure
- [ ] Reject or repair malformed responses safely
- [ ] Display the generated report
- [ ] Handle provider errors
- [ ] Handle timeouts
- [ ] Add retry behaviour
- [ ] Add a useful fallback when generation fails
- [ ] Prevent duplicate report-generation requests
- [ ] Ensure the loading page reflects real request state

---

## 10. Final Polish and Launch

### Product Polish

- [ ] Polish copy throughout the website
- [ ] Finalize all questionnaire helper text
- [ ] Polish generated art throughout the website
- [ ] Make the OrionLabs humor consistent across every page
- [ ] Review the complete desktop experience
- [ ] Review the complete tablet experience
- [ ] Review the complete mobile experience
- [ ] Review empty, loading, error, and success states
- [ ] Remove obsolete mock content
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
- [ ] Test route refreshes in production
- [ ] Test AI failure and timeout states
- [ ] Confirm no API keys are exposed
- [ ] Confirm no console errors remain
- [ ] Run the final production build

### Documentation and Deployment

- [ ] Update the README for the finished version
- [ ] Document the final technology stack
- [ ] Document local development setup
- [ ] Document environment variables without exposing secrets
- [ ] Clearly identify the project as satire
- [ ] Add screenshots or a short product preview
- [ ] Deploy OrionLabs
- [ ] Verify the deployed site
- [ ] Verify deployed routes support SPA fallback
- [ ] Add the live URL to the GitHub repository
- [ ] Add OrionLabs to the portfolio

---

## Later Ideas

- [ ] Shareable horoscope cards
- [ ] Downloadable report images
- [ ] Fake scientific charts
- [ ] More fake research articles
- [ ] Easter eggs
- [ ] Different roast styles
- [ ] Different analysis tones
- [ ] Anonymous report links
- [ ] Report history
- [ ] Darker or lighter report themes
- [ ] Additional fictional OrionLabs products
- [ ] A fictional company team page
- [ ] A fake investor or research portal
