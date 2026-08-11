# SUBJECT_SIGNATURE_RULES.md

## Purpose

This file is the source of truth for OrionLabs Subject Signature work.

The Subject Signature is the constellation-based visual artifact that appears across the OrionLabs product flow. It replaces the previous orbital/HUD-style artifact system.

Use this document for any implementation, extension, or refinement work related to:

- constellation geometry
- signature derivation
- focus-role mapping
- behavioral subnetwork logic
- questionnaire / review / analysis / report presentation
- visual styling
- accessibility
- storage continuity

This file should be read before making meaningful Subject Signature changes.

---

## Current status

The Subject Signature system now includes a complete **12-sign constellation dataset**.

The Capricornus vertical slice established the architecture and interaction model used by every sign.

At this stage:

- the architecture is approved
- the core visual concept is approved
- the Analysis animation structure is approved
- the Capricornus prototype is the reference implementation
- all 12 zodiac signs have local deterministic geometry, focus roles, and behavior resolution

Future constellation work should be limited to targeted visual polish **without redesigning the system again**.

Background/atmosphere polish may continue later and should remain separate from constellation-data refinements.

---

## Core concept

The Orion Subject Signature should feel like:

- a constellation-derived subject model
- premium
- minimal
- elegant
- celestial but analytical
- more like a scientific fingerprint / constellation signature than a generic astrology graphic

It should **not** feel like:

- a solar system
- an orbit chart
- a radial diagram
- a sci-fi HUD
- a busy infographic
- a generic zodiac poster

---

## Core inputs

The Subject Signature is driven by exactly **3 questionnaire inputs**:

1. zodiac sign
2. focus area
3. behavioral pattern

The system must be deterministic:

same:
- zodiac
- focus
- behavior

must always produce the same Subject Signature.

Do not use randomness.

Do not reconstruct signature behavior from Gemini-generated prose.

---

## Constellation geometry rules

### General rules

Each zodiac sign should be represented by a stylized constellation silhouette.

Requirements:

- based on the commonly recognized zodiac constellation shape
- recognizable in spirit
- beautiful
- implementable
- not astronomy-grade precise
- asymmetry is acceptable
- straight-line connections only
- no curves
- no orbital ellipses
- no radial composition
- no central planet/object

### Node count

Target:

- approximately **10 nodes per sign**

This is a design normalization rule, not an astronomy rule.

Sparse constellations may be extended with support/interpolated nodes as long as the overall recognizable silhouette is preserved.

### Priorities

When designing each sign, prioritize:

1. beauty
2. implementability
3. recognizability

Do not sacrifice visual quality merely to imitate scientific star coordinates.

---

## Focus mapping

The questionnaire focus options map to semantic node roles.

### Focus options

- Career
- Relationships
- Money
- Family
- Health
- Personal growth
- Something else

### Semantic role mapping

- Career → Forward
- Relationships → Relational
- Money → Resource
- Family → Anchor
- Health → Stability
- Personal growth → Expansion
- Something else → Anomaly

### Role interpretation guidance

These are design semantics, not scientific claims.

- **Forward** → furthest node in the constellation’s visual direction of travel
- **Relational** → node belonging to the strongest natural pair
- **Resource** → strongly connected structural node
- **Anchor** → lowest / most grounding structural node
- **Stability** → visual center / structural hub
- **Expansion** → furthest outward-reaching branch node
- **Anomaly** → most peripheral or unusual node relative to the main structure

### Role assignment rules

For each sign:

- assign **7 unique nodes** to the 7 focus roles
- the remaining nodes may be neutral/support nodes
- role assignment may be hand-tuned for visual quality

Do not let multiple focus options resolve to the same primary node unless there is an exceptional reason.

---

## Behavior rules

The behavioral pattern determines a **secondary highlighted subnetwork**.

It does **not** change:

- the base constellation silhouette
- node coordinates
- geometry type
- line curvature

It only determines:

- which 3 secondary nodes become active
- which existing graph path connects outward from the focus node

### Behavioral options

- I overthink things
- I trust my instincts
- I like having a plan
- I adapt as I go
- I usually leave things until later

### Behavioral mapping

#### I overthink things
Activate 3 secondary nodes that form the tightest / nearest connected cluster around the focus node.

#### I trust my instincts
Activate 3 secondary nodes along the cleanest outward path from the focus node.

#### I like having a plan
Activate 3 secondary nodes that form the most balanced / orderly connected arrangement.

#### I adapt as I go
Activate 3 secondary nodes distributed across branching paths.

#### I usually leave things until later
Activate 3 secondary nodes using its own deterministic pattern, but render them normally like the other behaviors.

### Important rule

Do **not** create a joke-only incomplete or dimmed treatment for “I usually leave things until later.”

All five behaviors should follow the same visual grammar.

### Derivation approach

Preferred approach:

- deterministic rule-based derivation
- plus explicit per-sign overrides where needed for visual quality

Do not build an unnecessarily complex universal scoring engine if straightforward derivation + hand-tuned overrides is cleaner and more controllable.

---

## Path rules

Behavior paths must use **existing constellation edges** only.

Rules:

- do not invent arbitrary direct edges that do not exist in the sign graph
- the 3 secondary highlighted nodes are the behavior targets
- the path may pass through intermediate nodes
- intermediate nodes remain base-colored
- intermediate nodes do not become behavior-highlighted nodes merely because the path passes through them

The highlighted path should feel like signal propagation through the existing constellation structure.

---

## Visual hierarchy

The visual hierarchy must be:

1. focus node
2. behavior nodes + behavior path
3. base constellation

### Base constellation

- all base nodes visible
- all base lines visible
- quietest layer
- still clearly celestial, not flat

### Focus node

- one primary emphasized node
- slightly larger than other nodes
- strongest glow
- clearest visual dominance
- node-only emphasis
- do **not** automatically highlight adjacent line segments just because the focus node is selected

### Behavior nodes/path

- 3 secondary nodes
- clearly visible
- subordinate to the focus node
- existing line path highlighted
- not stronger than the focus node

---

## Visual style

### Current approved direction

The currently approved style direction is the **gold-star variant** established by the Capricornus prototype.

General intent:

- base constellation: icy / light blue
- active behavior layer: warm gold
- focus node: brighter gold / white-gold
- metric detail values: pink
- premium celestial look
- elegant, not noisy

Do not rework the core color system while refining constellation geometry.

Background/atmosphere polish may continue later, but expansion to the remaining signs should preserve the current styling direction.

### Important constraint

Do not let line glow become excessive.

The constellation should feel premium and luminous, not neon or sci-fi.

---

## Background / atmosphere

### Compact questionnaire version
Must remain:

- transparent
- background-free
- atmosphere-free

### Full-size variants
Review, Analysis, and Report may use the approved atmospheric/cosmic background treatment currently used by the full-size Capricornus prototype.

At this stage:

- preserve current full-size background treatment
- do not spend implementation effort reworking it while extending the remaining signs
- background polish can be revisited later

The constellation must always remain the dominant subject.

---

## Stage behavior

The same underlying Subject Signature concept appears across the product flow, but in different presentation states.

### Questionnaire compact signature

The compact signature appears in the questionnaire flow in the small progress-indicator slot near the percentage.

It must **not** replace the OrionLabs header logo.

Requirements:

- transparent
- no background
- no labels
- no metadata
- no starfield
- no animation
- same underlying signature logic
- legible at compact size

#### Progressive questionnaire behavior

Before zodiac is selected:
- show a neutral/dormant state
- do not silently substitute a default sign

After zodiac:
- show the base constellation only

Before focus:
- no focus node

After focus:
- show the focus node

Before behavior:
- no behavior subnetwork

After behavior:
- show the full signature

No animation should occur inside the questionnaire flow.

State changes should simply render the correct static state.

### Review

Review shows the full static signature.

Requirements:

- complete static signature
- no animation
- no metric strip
- no internal clutter
- no node labels
- use full-size panel styling
- title treatment may use:
  - `PRELIMINARY SUBJECT SIGNATURE`
- top-right status may use:
  - `READY`

The Review signature should be visually complete.

Do not deliberately withhold or partially hide information.

### Analysis

Analysis is the **only** stage where the Subject Signature should use its full construction animation.

This animation structure is approved.

#### Timing target

Approximately:

- 15–18 seconds total
- target around 16 seconds

#### Sequence

1. base constellation resolves / draws in
2. short pause
3. focus node ignites
4. short pause
5. behavior path propagates outward from the focus node along the existing graph
6. each target behavior node ignites only when the path reaches it
7. completed signature settles
8. no looping afterward

#### Important constraints

- no spinning
- no orbital motion
- no screensaver behavior
- no constant re-triggering
- no fake synchronization to loading-message index

The Subject Signature owns its own animation timeline.

If the Gemini request finishes early, preserve the intended signature experience appropriately.

If the Gemini request finishes late, the signature may hold in its completed state while loading continues.

### Report

Report shows the final completed static signature.

Requirements:

- same resolved signature the user already saw
- static
- complete
- no inference from generated report prose

May use:

- `COMPLETED SUBJECT SIGNATURE`

#### Metric placement

Preferred corner composition:

- top-left: title
- top-right: `SIGNAL INTEGRITY:` / `MOSTLY DEFENSIBLE`
- bottom-left: `CELESTIAL INTERFERENCE:` / `WITHIN COMMERCIAL TOLERANCE`
- bottom-right: `ANOMALY DENSITY:` / `ABOVE BASELINE`

#### Current metric text

Use:

- `SIGNAL INTEGRITY:`
- `MOSTLY DEFENSIBLE`

- `CELESTIAL INTERFERENCE:`
- `WITHIN COMMERCIAL TOLERANCE`

- `ANOMALY DENSITY:`
- `ABOVE BASELINE`

Keep the constellation visually dominant over the metrics.

Do not reintroduce the previous `VERIFIED LOCALLY` label.

---

## Report continuity and persistence

The Subject Signature must preserve its own application-controlled inputs across the Analysis → Report boundary.

Do **not** attempt to reconstruct signature behavior from Gemini-generated personality trait titles, summaries, or report prose.

Preferred persistence model:

- keep the AI-facing `OrionReport` contract unchanged
- store Subject Signature metadata beside the report snapshot:
  - zodiac
  - focus
  - behavior

Versioned local report storage is acceptable.

Graceful invalidation/cleanup of older incompatible local records is acceptable.

No server persistence or auth work should be added as part of Subject Signature tasks.

---

## Accessibility

### Full meaningful instances
Should expose a concise accessible description including:

- zodiac
- focus
- behavior

### Compact questionnaire instance
Should remain hidden from assistive technology if the enclosing interactive element already has an appropriate accessible label.

### Decorative instances
Should be `aria-hidden`.

### Reduced motion
For `prefers-reduced-motion`:

- render the completed/resolved signature immediately
- do not make users wait through staged construction
- preserve live-region/status behavior elsewhere as appropriate

---

## Technical architecture

Preferred architecture separation:

- typed constellation dataset
- deterministic derivation logic
- shared renderer
- stage-specific presentation state

The exact filenames may evolve, but the conceptual layers should remain separate.

Avoid mixing:

- rendering details
- geometry data
- business logic
- storage continuity logic

Do not mutate the old orbital artifact system back into use.

The Subject Signature is its own system.

---

## Compact implementation quality

At compact size:

- preserve crisp node visibility
- simplify visual effects if necessary
- retain the same basic geometry
- do not reduce to an unrelated icon
- do not add backgrounds or atmospheric effects

The compact version should look like a tiny elegant constellation glyph.

---

## Maintenance rules for zodiac constellations

When refining any of the 12 signs:

- follow these rules exactly
- preserve the approved Capricornus implementation as the quality reference
- do not redesign the overall system
- do not reopen architecture unless there is a real bug
- hand-tune each sign as needed
- use overrides where the generic behavior selection produces weak results
- prioritize recognizable, elegant, implementable shapes

The remaining signs do **not** need 11 external reference images to proceed.

Use the commonly recognized conventional constellation silhouettes and design them according to the rules in this file.

If one or two signs come out weak in visual review, those can be corrected individually later.

---

## Non-goals

Subject Signature tasks should **not** do the following unless explicitly requested:

- redesign Gemini prompts
- change Gemini provider integration
- change OrionReport schema
- redesign questionnaire copy
- redesign unrelated report sections
- add auth
- add server persistence
- add routing
- introduce canvas/WebGL
- add a new animation library
- replace the OrionLabs header logo in the questionnaire
- rebuild the whole atmospheric background unless explicitly requested

---

## Acceptance standard

A successful Subject Signature implementation should satisfy all of the following:

- each zodiac sign has a recognizable ~10-node silhouette
- each sign supports all 7 focus-role mappings
- each behavior resolves 3 valid secondary nodes
- paths use valid existing constellation edges
- same inputs always produce the same signature
- questionnaire compact behavior works with partial state
- Review is full and static
- Analysis is the only animated state
- Report preserves correct signature inputs directly
- the overall system remains premium, clean, and deterministic

---

## Practical note for future Codex prompts

Future Codex prompts for Subject Signature tasks should explicitly say:

- read `SUBJECT_SIGNATURE_RULES.md` first
- treat it as the source of truth
- keep scope tightly limited to the requested Subject Signature task

That should reduce repeated re-explanation and help keep implementation consistent across multiple passes.
