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
- [ ] Define the structured report data schema
- [ ] Define how users are redirected when required data is missing
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

- [ ] Create typed mock report data
- [ ] Define the report TypeScript interfaces
- [ ] Decide which sections are always present
- [ ] Decide which sections may be optional
- [ ] Define how questionnaire answers influence each section
- [ ] Define how OrionLabs confidence metrics appear
- [ ] Define the balance between horoscope content and personalized roast content
- [ ] Decide how long each report section should be
- [ ] Decide how missing or incomplete AI output should be handled

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

- [ ] Build the report page UI using mock report data
- [ ] Create reusable report-section components
- [ ] Display personalized questionnaire information
- [ ] Display mock confidence metrics
- [ ] Design desktop and mobile report layouts
- [ ] Handle long and short content gracefully
- [ ] Add a temporary action for starting another analysis
- [ ] Add temporary sharing controls if appropriate

### Loading Page

- [ ] Build the final analysis loading-screen UI
- [ ] Create a restrained loading animation
- [ ] Add OrionLabs processing messages
- [ ] Ensure the loading experience matches the fictional AI-company tone
- [ ] Design desktop and mobile layouts
- [ ] Avoid implying that the current mock process is real AI generation

### Additional Pages

- [ ] Build the fake article page UI
- [ ] Connect the article to the wider OrionLabs fictional research universe
- [ ] Build a simple branded 404 page
- [ ] Add a fallback page or state for missing questionnaire data

---

## 6. Connect the Website

### Routing

- [x] Add the questionnaire route
- [x] Add the mock analysis route
- [x] Connect the questionnaire review stage to the analysis route
- [ ] Add the report route
- [ ] Add the fake article route
- [ ] Add the 404 route

### User Journey

- [ ] Connect the landing-page primary CTA to the questionnaire
- [ ] Connect the loading screen to the mock report
- [ ] Connect report actions to the correct destinations
- [ ] Connect “Read More” to the fake article
- [ ] Finish all landing-page buttons and links
- [ ] Add mobile navigation if needed
- [ ] Add a clear way to return to the landing page
- [ ] Decide what happens when users exit the questionnaire

### Route Safety

- [ ] Handle direct access to `/analysis` without questionnaire data
- [ ] Handle direct access to `/report` without report data
- [ ] Handle missing or invalid `sessionStorage` data
- [ ] Handle refreshes on questionnaire, analysis, and report routes
- [ ] Verify deployed routes support SPA fallback
- [ ] Redirect users gracefully instead of showing broken screens

---

## 7. Add Core Functionality

- [ ] Pass completed questionnaire answers into mock report generation
- [ ] Generate a mock report from structured local data
- [ ] Display the mock report using the real report components
- [ ] Add loading-sequence behaviour
- [ ] Connect loading completion to the report page
- [ ] Preserve report data across route navigation
- [ ] Handle restarting the questionnaire
- [ ] Handle clearing or replacing old questionnaire data
- [ ] Add useful error and fallback states
- [ ] Ensure repeated submissions do not produce broken state

---

## 8. Quality and Testing

Testing should happen throughout development, not only before launch.

### Questionnaire Tests

- [ ] Test Continue and Back navigation
- [ ] Test that answers remain when moving backward and forward
- [ ] Test questionnaire validation
- [ ] Test the progress values
- [ ] Test the Review Answers stage
- [ ] Test each Edit action
- [ ] Test that edited answers update the review summary
- [ ] Test the Begin Analysis action

### Routing and Persistence Tests

- [ ] Test questionnaire data persistence
- [ ] Test missing or corrupted stored data
- [ ] Test direct access to protected routes
- [ ] Test page refreshes on each route
- [ ] Test the complete mock user journey

### Ongoing Checks

- [ ] Run TypeScript checks after meaningful functionality changes
- [ ] Run linting after meaningful functionality changes
- [ ] Run the production build before each milestone
- [ ] Check the browser console for errors
- [ ] Verify desktop and mobile layouts after major UI changes
- [ ] Confirm unrelated pages remain unchanged after scoped edits

---

## 9. Add AI Securely

Do not call the AI provider directly from frontend browser code.

### AI Planning

- [ ] Choose an AI provider
- [ ] Review pricing, rate limits, and response capabilities
- [ ] Define the final structured AI response format
- [ ] Create the OrionLabs system prompt
- [ ] Create the report-generation prompt
- [ ] Decide which questionnaire answers are sent to the model
- [ ] Decide what information should never be sent

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
