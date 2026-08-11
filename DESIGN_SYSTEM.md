# OrionLabs Design System

> **Status: frozen visual identity.** This handbook records the approved landing-page system as implemented. Future OrionLabs pages must extend this system without introducing a new aesthetic. The current codebase renders the product name **OrionLabs**; preserve that existing wordmark treatment wherever the rendered brand name is used.

## Brand

OrionLabs is **cinematic cosmic luxury with a premium-AI façade**. It combines a near-black, violet-night foundation with nebulous blue, violet, and magenta light; warm antique gold carries the moments of authority and aspiration. The result is mysterious, elegant, technically theatrical, and intentionally restrained rather than playful.

The design earns this atmosphere through:

- Deep spatial backgrounds: starfields, oversized diffused nebula pools, orbital lines, and sparse gold highlights.
- Editorial contrast: romantic, high-contrast serif display type against rational sans-serif UI copy.
- Quietly premium surfaces: translucent violet glass, thin low-opacity gold/pink borders, large radii, and soft light rather than hard shadows.
- A confident enterprise layout with professionally delivered, institutionally self-incriminating copy. Humor belongs in the writing; the visual layer stays composed and credible.

## Colors

### Core tokens

| Purpose | Source token / Tailwind | Hex (approx.) | Use |
| --- | --- | --- | --- |
| Primary background | `bg-background` — `hsl(262 45% 7%)` | `#100A1A` | Default page and scrollbar-track midnight violet. |
| Deep cosmic base | `hsl(262 50% 6%)` / `#070514` | `#0E0817` / `#070514` | Hero base and dark text on gold buttons. |
| Foreground / heading white | `text-foreground` — `hsl(45 30% 94%)` | `#F3F0EC` | Primary headings, body emphasis, and high-contrast UI. |
| Card | `bg-card` — `hsl(266 40% 10%)` | `#181027` | Base dark panel layer. |
| Popover | `bg-popover` — `hsl(264 42% 8%)` | `#120C1D` | Overlaid dark UI. |
| Secondary | `bg-secondary` — `hsl(270 35% 16%)` | `#291B37` | Reserved secondary dark fill. |
| Muted fill | `bg-muted` — `hsl(268 26% 18%)` | `#2D223A` | Quiet supporting fills. |
| Muted text | `text-muted-foreground` — `hsl(268 16% 70%)` | `#B3ABBA` | Body copy, navigation, supporting labels. |
| Default border/input | `border-border`, `border-input` — `hsl(275 30% 22%)` | `#3C2749` | System border token; landing page generally uses softer gold-tinted borders instead. |
| Gold primary | `bg-primary`, `text-[hsl(43_74%_66%)]` — `hsl(43 74% 66%)` | `#E8C767` | CTA emphasis, stars, status indicators, icon highlights, numeric emphasis. |
| Gold accent | `bg-accent` — `hsl(43 60% 58%)` | `#D4AC53` | Supporting gold token. |
| Pink metadata | `hsl(326 55% 62%)` | `#D665A5` | Years, credentials, footnotes, legal and satirical asides. |
| Pink emphasis | `hsl(326 75% 68%)` | `#EC70B1` | Small inline emphasis only. |
| Error | `bg-destructive` — `hsl(0 72% 55%)` | `#DF3939` | Functional destructive states only; not a decorative brand color. |

### Gold gradient and text treatment

`text-gradient-gold` is the signature display accent: `linear-gradient(135deg, #F5E6B0 0%, #E8C77A 45%, #C9A24A 100%)`, clipped to text. Use it for the important phrase within a display headline, brand suffixes, featured titles, and large metric values—not for whole paragraphs.

`text-gradient-cosmic` is a quieter alternative: `linear-gradient(180deg, #F0EBD8 0%, #C9B68A 100%)`.

Gold borders use `hsl(43 60% 70%)` at low opacity: 8–14% for section dividers, 20–30% for interactive outlines, and 50% for tiny eyebrow rules. Gold text for compact labels is normally `hsl(43 60% 70–75%)`.

### Atmospheric glow palette

These are background light sources, not text or solid UI fills:

- Blue-violet: `hsl(254–256 78–84% 50–58%)`, typically 26–66% opacity.
- Violet: `hsl(280–295 65–80% 42–50%)`, typically 30–52% opacity.
- Magenta: `hsl(310–326 75–85% 48–55%)`, typically 30–72% opacity.
- Pink haze: `hsl(330 70–72% 42–48%)`, typically 28–34% opacity.
- Gold whisper: `hsl(43 65–68% 42–50%)`, typically 12–14% opacity.

Use these only as heavily blurred, oversized radial light pools over the dark base. Never substitute them for the gold action color or make a page bright overall.

### Text-color hierarchy

- **Gold:** display emphasis, metric values, small premium labels, highlighted brand fragments, stars, and high-value actions.
- **White / foreground:** primary display copy, selected navigation, labels that need maximum legibility, and main action text on dark surfaces.
- **Muted:** ordinary body copy, descriptions, unselected navigation, supporting authorship, and nonessential UI.
- **Purple:** an environmental/background color, plus the translucent glass base; avoid purple body text.
- **Pink:** sparse metadata, footnotes, qualifications, and a short ironic aside; never use it as the dominant heading or CTA color.

## Typography

| Role | Family | Weight | Size and leading | Tracking / treatment |
| --- | --- | --- | --- | --- |
| Display headings (`h1`–`h6`) | `Cormorant Garamond`, Georgia, serif | 500 by default | Global leading `1.15`; hero `1.04`; section titles `1.08–1.10` | `-0.01em`; selectively italicize one key word or phrase. |
| Hero H1 | Cormorant Garamond | 500 | `clamp(2.8rem, 6vw, 5.2rem)` | Gold first line/phrase; foreground companion line. |
| Section H2 | Cormorant Garamond | 500 | `2.25rem` mobile, `3rem` at `md`, occasionally `3.4–4rem` at `lg` | Centered by default; sparse line breaks create editorial rhythm. |
| Card H3 | Cormorant Garamond | 500 | `1.125–1.5rem`, snug | Usually gold gradient. |
| Brand wordmark | Cormorant Garamond | 500 | `1.5–1.6rem` | Tight tracking; suffix uses gold gradient. |
| Body/UI | Inter, system-ui, sans-serif | 400 | Base `1rem`, `1.6` global; descriptions use relaxed leading | Neutral, readable, unembellished. |
| Buttons / key labels | Inter | 500–600 | `0.875rem` | Primary CTAs use 600; no all-caps. |
| Eyebrows / metadata | Inter | 500 | `0.65–0.7rem` / `0.75rem` | Uppercase with `0.18–0.30em` tracking. |
| Fine print | Inter | 400 | `0.65–0.75rem`, relaxed | Pink or reduced-opacity muted text. |

Avoid bold-heavy copy, dense all-caps blocks, or introducing a third font. Display text should use intentional line breaks, restrained italics, and one gold emphasis per headline; body copy should remain Inter and muted.

## Spacing System

- **Container:** use `.container-narrow`: full width, centered, `max-w-6xl` (1152px), `px-6` (24px) and `md:px-10` (40px).
- **Major sections:** `py-28` (112px) on mobile and `md:py-36` (144px) on desktop. CTA uses `py-32` (128px) and `min-h-[80vh]`; hero is `min-h-[100svh]`.
- **Compact bands:** trust bar `py-12` (48px); footer `pt-20 pb-10` (80px / 40px).
- **Heading rhythm:** eyebrow to title `mt-5` (20px) or title gap `gap-5`; title to description `mt-5–6`; content grids begin `mt-16` (64px), with larger card grids often `mt-20` (80px).
- **Card padding:** standard cards `p-6–8` (24–32px); featured panels `p-8 md:p-10` (32–40px).
- **Grid gaps:** normally `gap-5` (20px) or `gap-6` (24px). Metric cells use `gap-px` within one bordered frame.
- **Button spacing:** 36px (`h-9`) for navbar CTA; 48px (`h-12`) for primary page CTAs; horizontal padding `px-5`, `px-7`, or `px-8` according to hierarchy.
- **Radii:** global base radius is `0.75rem` (12px); panels use `rounded-2xl` (16px); icon tiles `rounded-xl` (12px); badges and buttons use `rounded-full`.

Whitespace is intentional and generous. Do not compress section rhythm to fit more content above the fold.

## Components

### Navbar

Fixed, transparent at page top and `h-16` mobile / `md:h-20` desktop. On scroll beyond 24px, add a 70%-opaque midnight backdrop, `backdrop-blur-xl`, and a 12%-opacity gold bottom rule. Desktop navigation is muted Inter text with a foreground hover. The wordmark pairs the seven-point gold compass logo with serif text. The compact outlined gold CTA is desktop-only. Mobile uses a 20px line icon and an expanding, near-opaque blurred dark menu.

### Hero

Full viewport, left-aligned content within the standard container. Layer the starfield, hero image, dark left gradient for readable type, top/bottom fades, and near-invisible orbital rings. Content order: status badge, large two-line display heading, supporting copy, paired CTAs, then a small trust line. Use a centered, delicate animated scroll cue only at the bottom.

### Section heading

Reusable `SectionHeading`: optional centered or left-aligned eyebrow, display title, and optional muted description. Eyebrows are flanked by two 24px gold hairlines. Center alignment is the default; use left alignment only when the surrounding composition requires it.

### Eyebrow / badge

Two patterns exist:

- **Section eyebrow:** no pill; tiny uppercase gold label between hairlines.
- **Status/featured badge:** compact rounded-full pill with thin gold outline, a transparent gold or violet fill, optional 12px icon/indicator, and 0.65–0.75rem Inter text.

### Buttons and links

- **Primary CTA:** 48px rounded-full gold gradient fill, deep navy text, semibold Inter, 16px right-arrow. It has a soft gold shadow, scales to `1.02` on hover, shifts the arrow 4px right, and runs a white translucent shimmer across the fill.
- **Secondary CTA:** 48px rounded-full transparent button with thin gold outline and white text; backdrop blur; border strengthens on hover.
- **Navbar CTA:** smaller, outlined transparent gold treatment with the same shimmer idea.
- **Text link:** small gold label plus 16px external/arrow icon; hover brightens rather than underlining.

Do not introduce rectangular filled buttons, loud hover fills, or new CTA palettes.

### Glass card

The core reusable surface: `rounded-2xl glass`, with 24–32px padding. It is semi-transparent violet glass with a subtle pink-gold rim. Standard cards lift 4px (`-translate-y-1`) on hover and slightly strengthen the gold border. Optional 44px icon tile uses violet translucent fill, a low-opacity gold border, and a 20px gold Lucide icon. Cards may include a concealed blurred magenta orb that fades in on hover.

### Glass panel / featured card

Use `glass-strong` for the constellation diagram and featured research. It is more opaque and more blurred than a standard card, retains `rounded-2xl`, and may have one clipped decorative magenta glow. Use for a single focal object—not every card on a page.

### Metric card group

One outer rounded-2xl, gold-tinted 10%-opacity border contains a responsive grid of contiguous translucent cells. Each cell holds a 20px gold outline icon, a serif gold-gradient value, foreground label, and pink footnote. Hover only shifts background violet; cells do not lift independently.

### Constellation diagram

An aspect-ratio `16:9` glass-strong panel with a tiny live-status label, thin dashed gold SVG links, outlined circular gold nodes, muted micro-labels, and pink throughput metadata. It is decorative/illustrative rather than data-dense.

### Orion Subject Signature prototype

The questionnaire-to-report journey uses a deterministic constellation-derived signature driven only by zodiac sign, focus area, and behavioral pattern. The first validated geometry is Capricornus: ten icy-blue base stars joined by straight dim-blue links, one dominant white-gold focus star, and three soft-gold behavior targets connected only through real constellation edges. Full instances may use a restrained generated night atmosphere; the 32–36px questionnaire instance stays transparent, static, and free of labels or effects. Analysis owns the single staged construction sequence, while Review and Report render the completed static state. The other eleven zodiac geometries remain intentionally unimplemented.

### Testimonial card

Standard glass card with five small filled gold stars, a serif quote, and a top-bordered attribution row. Avatar is a 40px circular violet/gold monogram. Role text is pink metadata.

### Research cards

One featured glass-strong article plus a three-card standard glass grid. Use gold-gradient titles, muted authors, foreground-75–80% abstracts, pink year/venue metadata, and a compact featured pill.

### FAQ accordion

Maximum width `max-w-3xl`, stacked with 12px gaps. Each entry is a rounded-xl, translucent card-style row with 24px horizontal padding, 20px vertical trigger padding, gold-gradient serif question, muted answer, and a slightly strengthened gold border while open/hovered.

### Trust bar and footer

Trust bar is a quiet bordered band: compact uppercase gold statement above a wrap-capable centered row of serif gold-gradient names. Footer uses the same container, a brand block plus four link columns, then a thin-rule bottom bar. Treat footer as atmospheric, sparse, and quiet—not as a dense utility area.

### Background primitives

- **`Starfield`:** deterministic, scattered 1–3px warm-gold dots; larger dots receive a soft glow.
- **`Aurora`:** full-bleed absolute radial blobs in blue-violet, magenta, pink, violet, and a faint gold whisper.
- **`Logo`:** seven-point celestial compass, gold gradient fill, `#E8C77A` stroke, and dark center; normally 36–40px next to the wordmark.

## Effects

- **Glassmorphism:** `.glass` uses `linear-gradient(135deg, hsl(280 55% 16% / .50), hsl(268 50% 10% / .36))`, `blur(16px) saturate(160%)`, and a 22%-opacity pink border. `.glass-strong` raises opacity, `blur(24px)`, saturation to 170%, and border opacity to 26%.
- **Glow:** CTA gold shadow is `0 8px 30px -6px hsl(43 74% 66% / .4)`. The optional `.glow-gold` adds restrained outline, 40px gold bloom, and deep navy depth shadow. Gold should glow softly, never neon.
- **Nebula:** use enormous circles (roughly 40–62vh), 115–145px blur, clipped by section overflow, and partial opacity. Place blue-violet and magenta in opposing regions to create depth.
- **Borders:** thin 1px low-opacity gold/pink rules; separators frequently use gold at 8–12% opacity. Avoid bright, solid rectangular outlines.
- **Background treatments:** fixed global cosmic page backdrop; individual sections may add blurred pools, a 64px gold grid at 4% opacity, starfields, and mask fades. The hero alone uses the approved cosmic image with a strong left readability fade.
- **Opacity:** prefer 50–90% foreground for hierarchy and 8–30% for decorative chrome. Preserve contrast for functional content.
- **Scrollbar and selection:** maintain the midnight scrollbar with purple thumb; selection is a 25%-opacity gold highlight with near-white text.

## Animations

Motion is slow, graceful, and atmospheric. It should suggest a living celestial system, never a gamified interface. All motion must honor `prefers-reduced-motion`; reduced mode removes or effectively collapses animation and restores non-smooth scrolling.

| Motion | Implementation | Timing / behavior |
| --- | --- | --- |
| Hero/nav entrance | Framer Motion fade + upward movement | Nav: 0.8s; hero blocks: 1s default (heading 1.1s), staggered at 0.1, 0.2, 0.4, 0.55, 0.8s; ease `[0.22, 1, 0.36, 1]`. |
| Section reveal | `Reveal` fade + `y: 24px` | 0.7s, per-element optional delay; triggers once at viewport margin `-80px`. |
| Grid reveal | `Stagger` / `StaggerItem` | 0.09s child stagger after 0.05s delay; each item fades/lifts 22px over 0.65s; triggers once at `-60px`. |
| Aurora drift | CSS `drift-slow`, `drift-rev`, `pulse-glow` | 24s / 30s / 6s, `ease-in-out`, infinite; translations stay within ~20–30px and glow pulse peaks at 1.05 scale. |
| Stars | `twinkle` | 3–7s per star, `ease-in-out`, infinite; opacity breathes from roughly .25 to .9. |
| Orbits | Framer rotation | 80s, 120s, 180s linear infinite, alternating direction. |
| Diagram | SVG line draw and node entrance/pulse | Lines 1.2s with sequential 0.12s delay; nodes 0.5s; node rings pulse 3s infinitely. |
| Interactive hover | Cards, buttons, links | 200–700ms transitions; cards lift only 4px, primary CTA scales only 2%, icon arrow shifts 4px, shimmer crosses in 700ms. |
| Scroll cue / live dots | Opacity and small vertical movement / ping | Scroll cue: 2–2.4s infinite `easeInOut`; status ping is subtle and compact. |

## Icons

Use **Lucide** line icons exclusively for interface and thematic symbols. Default stroke weight is `1.5`; default visual size is 20px (`h-5 w-5`) within 44px icon tiles. Supporting icons are 16px; badge icons are 12px; rating stars are 14px and filled gold with no visible stroke. Icons are warm gold or foreground as appropriate, never multicolored or heavy-filled. The custom seven-point compass is the only brand mark.

## Layout Rules

- Use the standard 1152px maximum container and align section content to it. Hero content is left aligned; most section headings and explanatory notes are centered.
- Use responsive grids, not fixed-position card layouts: `md:grid-cols-2`, `lg:grid-cols-3`, metrics `sm:grid-cols-2 lg:grid-cols-4`, footer `md:grid-cols-[1.4fr_repeat(4,1fr)]`.
- Desktop prioritizes a calm cinematic field, wide breathing room, multi-column content, and the full fixed navigation.
- On mobile, preserve atmosphere but simplify: single-column card stacks, vertically stacked CTAs until `sm`, hidden desktop navigation, an explicit menu control, and 24px container gutters. Do not remove the core hero, starfield, or visual hierarchy.
- Let footer and trust items wrap naturally; avoid horizontal scrolling. Cards remain full-height within their grid so rows read as a composed system.
- Use `overflow-hidden` on atmospheric sections to crop blurred lights. Keep decorative layers absolute, `pointer-events-none`, and behind content.
- Maintain the existing order: eyebrow → statement heading → explanatory copy → content group → restrained footnote/aside. Avoid competing headline blocks within a section.

## Design Principles

- Reuse the existing color, typography, spacing, glass, and motion tokens before adding anything new.
- Treat dark violet as the canvas, gold as the decisive accent, and magenta/blue-violet as environmental light.
- Keep display typography elegant and sparse; keep UI copy direct and readable.
- Prefer a few large, soft background effects over many small decorative objects.
- Maintain generous section spacing and a single visual focal point per section.
- Use glass surfaces selectively, with low-contrast borders and controlled hover elevation.
- Keep animation slow, quiet, and optional; motion should support atmosphere and orientation.
- Keep the enterprise-AI visual tone straight-faced. Humor and satire come from copy, never from cartoonish color, iconography, or motion.
- Preserve accessibility: usable contrast, visible focus behavior, semantic controls, smooth scrolling only when motion preference permits, and a skip link.

## Rules Every Future OrionLabs Page Must Follow

1. Do not introduce new brand colors, gradients, typefaces, button treatments, icon families, or visual metaphors.
2. Use `Cormorant Garamond` for display/headline typography and `Inter` for body and UI typography; keep headline weight at the established refined 500 baseline.
3. Build every page on the midnight-violet cosmic base. Gold is reserved for hierarchy and action; pink is reserved for restrained metadata and asides.
4. Use `.container-narrow` for primary content and retain its 24px/40px responsive gutters and `max-w-6xl` cap.
5. Retain the 112px/144px section rhythm unless a compact supporting band is explicitly appropriate.
6. Reuse the established rounded-full CTA, secondary outline CTA, glass card, glass-strong panel, section heading, badge, and footer conventions. Do not invent variants before checking whether one already fits.
7. Use low-opacity gold/pink borders and blurred nebula light; never add opaque white cards, bright flat backgrounds, or hard drop shadows.
8. Keep title compositions restrained: one gold-gradient emphasis, one optional italic emphasis, and ample surrounding whitespace.
9. Use Lucide 1.5px line icons at the approved sizes. The celestial compass remains the sole custom logo mark.
10. Keep interactions subtle: slight lift, slight scale, border brightening, arrow movement, or a single shimmer. No bouncy, fast, or disruptive effects.
11. Honor reduced-motion preferences in every new animated element. Default viewport reveals occur once and use the established custom ease.
12. Design mobile deliberately: stack grids, preserve readable gutters and touch targets, move CTA groups vertical when needed, and use the existing mobile navigation pattern.
13. Preserve the page’s cinematic seriousness. Any wit should be carried by concise copy, not visual novelty.
14. When in doubt, choose fewer elements, lower opacity, softer contrast, and more whitespace.
