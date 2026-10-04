---
name: Terrain
description: Verified land and homes in Nigeria, bought from anywhere, kept on record.
colors:
  ink: "#090503"
  canvas: "#FDFCFB"
  surface-white: "#FFFFFF"
  secondary-gray: "#717171"
  rule: "#EBEBEB"
  trust-green: "#1A5C38"
  verified-sage: "#4A7C59"
  verified-gold: "#B8860B"
  error-red: "#C92A2A"
typography:
  display:
    fontFamily: "Zain, system-ui, sans-serif"
    fontSize: "clamp(44px, 8vw, 76px)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Zain, system-ui, sans-serif"
    fontSize: "clamp(32px, 5vw, 52px)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
  headline-sm:
    fontFamily: "Zain, system-ui, sans-serif"
    fontSize: "clamp(28px, 4vw, 40px)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Zain, system-ui, sans-serif"
    fontSize: "28px"
    fontWeight: 800
    lineHeight: 1.1
  title-sm:
    fontFamily: "Zain, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 800
    lineHeight: 1.375
  numeral:
    fontFamily: "Zain, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 800
    lineHeight: 1.33
  body-lead:
    fontFamily: "Nunito, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 400
    lineHeight: 1.375
  body:
    fontFamily: "Nunito, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.2
  nav:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.43
rounded:
  control: "4px"
  popup: "12px"
  photo: "24px"
  pill: "9999px"
spacing:
  gutter-mobile: "24px"
  gutter: "40px"
  container: "1240px"
  chapter-gap-mobile: "48px"
  chapter-gap: "80px"
  section-end-mobile: "64px"
  section-end: "96px"
  rule-lead-mobile: "56px"
  rule-lead: "80px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
  input-waitlist:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "6px"
    width: "448px"
  nav-pill:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.nav}"
    rounded: "{rounded.pill}"
    padding: "12px 28px"
  chip-status:
    backgroundColor: "#1A5C381A"
    textColor: "{colors.trust-green}"
    rounded: "{rounded.pill}"
    padding: "2px 10px"
  chip-company:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "8px 20px 8px 8px"
  photo-chapter:
    backgroundColor: "{colors.rule}"
    rounded: "{rounded.photo}"
---

# Design System: Terrain

## Overview

**Creative North Star: "The Journey on Record"**

Terrain's web world is the app's world laid out on an off-white page: near-black type and pill buttons on a warm canvas, real documentary photographs in generous 24px-rounded frames, and a single forest green reserved for trust. The page reads as a sequence, not a catalogue. Numbered chapters carry a buyer from finding a plot abroad to owning it, and the trust checks sit inside that story rather than in a feature grid.

Density is low and the rhythm is wide. Sections are separated by hairline rules and white space, never by colored slabs; the only dark surfaces are the footer and the photo-backed closing card. Depth comes from photographs and the live map, not from shadows. Motion is quiet and scroll-bound: a photo rises as its chapter enters, the numeral's rule draws beneath it, and everything holds still under reduced motion.

The hero is the one place the product shows itself directly: a live Mapbox map of Abuja occupies the right of the first viewport and dissolves into the canvas behind the copy. This world replaces the earlier survey-grid and black-slab landing look; that look is not part of this system.

**Key Characteristics:**
- Warm off-white canvas, near-black ink, forest green only for trust.
- Zain 800 for every heading and numeral, Nunito for reading, Inter for anything you press.
- Pills for every interactive control; 24px rounded frames for photos.
- Hairline rules and space as dividers; no slabs, no cards-on-cards.
- Real photographs and the live map as the imagery; no illustrations.
- Scroll-driven, reduced-motion-safe reveals.

## Colors

A near-monochrome warm palette where green and gold appear only when something has been checked.

### Primary
- **Ink** (`ink`): headings, body emphasis, primary pill buttons, the outline button's stroke and hover fill, the footer ground. Warmer and deeper than pure black.

### Secondary
- **Trust Green** (`trust-green`): chapter numerals and their drawn rule, the filled protection checkmarks, the "Coming soon" status dot and text (on a 10% tint of itself). It is the color of a completed check.
- **Verified Sage** (`verified-sage`): interaction feedback only. Focus rings on every control, nav-link and map-link hover, and a 14% text-selection tint.

### Tertiary
- **Verified Gold** (`verified-gold`): the scalloped seal with a white check beside a verified company's name. Nowhere else.

### Neutral
- **Canvas** (`canvas`): the page ground everywhere, the nav pill's translucent fill, the map fade target, and text on ink.
- **Surface White** (`surface-white`): the waitlist field and company chips, lifting them just off the canvas.
- **Secondary Gray** (`secondary-gray`): supporting body copy, chapter descriptions, placeholder text, counts.
- **Rule** (`rule`): hairline section dividers, field and chip borders, the empty-photo placeholder fill.
- **Error Red** (`error-red`): inline form validation on light grounds only (white text on dark grounds).

### Named Rules
**The Earned Green Rule.** Trust Green marks a check that happened: a chapter step, a protection fact, a status. It never fills a button or a section.

**The Gold Seal Rule.** Gold appears only as the verified-company seal. A gold anything-else dilutes the one mark that means CAC-checked.

## Typography

**Display Font:** Zain (with system-ui)
**Body Font:** Nunito (with system-ui)
**Label Font:** Inter (with system-ui)

**Character:** Zain at 800 is dense, rounded and warm, giving headlines the app's voice; Nunito keeps long reading soft; Inter gives buttons and nav a crisp, functional edge.

### Hierarchy
- **Display** (800, clamp 44-76px, 0.95, -0.02em): the hero headline and the closing "Own. Build. Grow." line only.
- **Headline** (800, clamp 32-52px, 1.0, -0.02em): section titles such as the journey and protection headings, max about 36rem wide.
- **Headline Small** (800, clamp 28-40px, 1.05): secondary section titles like the company path.
- **Title** (800, 26px mobile / 28px desktop, 1.1): chapter titles.
- **Title Small** (800, 20px, snug): protection checklist facts.
- **Numeral** (800, 24px, Trust Green): two-digit chapter numbers, followed by a 40px x 2px rule in currentColor.
- **Body Lead** (400, 20px mobile / 24px desktop, snug): the one-line promise under the hero headline.
- **Body** (400, 16px, 1.625, Secondary Gray): descriptions, capped at 34ch in chapters and 60ch in sections.
- **Label** (600, 15px, Inter): button and field text.
- **Nav** (400, 14px, Inter): desktop navigation links.

### Named Rules
**The Three Voices Rule.** Zain speaks, Nunito explains, Inter acts. A button never sets in Zain; a heading never sets in Inter.

## Layout

A single centered column, 1240px max, with 24px gutters on mobile and 40px from 640px up. Sections end with 64px (mobile) or 96px (desktop) of space; a new section opens with a hairline Rule on top and 56px / 80px of space after it.

Chapters are a two-column grid from 640px: a text column (14rem, 17rem at 1024px) beside a wide photo, 40px apart, stacked 48px / 80px between chapters. On mobile the text stacks above the photo. Photos sit at 16:10 on mobile and a cinematic 16:7 from 640px.

The protection band is a two-column grid at 1024px (26rem headline, then a 2x2 checklist with 40px column and 32px row gaps). The hero copy column caps at 36rem; the map fills the section behind it. On mobile the map fade runs top-to-bottom so the map shows as a band beneath the form; from 640px it runs left-to-right, solid canvas to 35%, gone by 75%.

Breakpoints follow Tailwind defaults: 640px (two-column chapters, inline waitlist pill), 1024px (desktop nav, protection grid).

## Elevation & Depth

The page is flat. Depth comes from photographs, the live map and the canvas-colored fades over it. Shadows appear only on floating or map-borne elements, and they are soft, warm-tinted (ink at low alpha) and never offset hard.

### Shadow Vocabulary
- **Nav float** (`0 8px 28px rgba(9,5,3,0.10)`, deepening to `0 10px 34px rgba(9,5,3,0.16)` once scrolled): the fixed nav pill, with backdrop blur.
- **Field lift** (`0 6px 20px rgba(9,5,3,0.06)`): the inline waitlist pill from 640px.
- **Map popup** (`0 12px 28px rgba(9,5,3,0.18)`): listing popups on the map.
- **Pin** (`drop-shadow(0 2px 4px rgba(9,5,3,0.22))`, stronger on hover): map price pins and cluster badges.

### Named Rules
**The Flat Page Rule.** Content on the canvas (chapters, checklist, chips) carries no shadow. Only things floating over the page or the map do.

## Shapes

Two shapes do almost everything. Every interactive control is a full pill (`pill`): buttons, the waitlist field, the nav bar, status and company chips, map pins. Every photograph is a soft rectangle at 24px (`photo`), clipped with its image filling via cover. Map popups use 12px (`popup`); Mapbox control groups use 4px (`control`). Borders are 1px hairlines in Rule; the outline button uses a 1px Ink stroke. Icons are small inline SVGs: a filled green disc with a white check, and the gold scalloped seal.

## Components

### Buttons
Confident, dark and round.
- **Shape:** full pill.
- **Primary:** Ink fill, Canvas text, Inter 600 15px, 48px tall (44px inside the inline field), 24px horizontal padding. Hover drops to 90% opacity; disabled sits at 60%.
- **Focus:** 2px Verified Sage ring with a 2px offset.
- **Outline:** transparent with a 1px Ink stroke, same size; hover fills Ink with Canvas text. Used for the quieter company path ("Apply to list").

### Waitlist Pill Form
The page's one action, repeated in the hero and the closing card.
- **Desktop (640px up):** a single white pill with a Rule border, 6px inner padding and the field-lift shadow; the borderless Nunito field takes the width and the primary button sits flush inside at the right.
- **Mobile:** the field and button separate into two full-width 48px pills, field above.
- **Error:** Error Red 14px text below, indented 20px to align with the field text. On a dark ground the error and success text turn white.
- **Success:** replaces the form with a bold Ink line plus a gray follow-up.

### Chips
- **Status chip:** Trust Green text and 6px dot on a 10% Trust Green tint, Nunito 700 12px, pill. Used for "Coming soon".
- **Verified company chip:** white pill with a Rule border, 40px round logo (Rule fill and initial when there's no logo), name in Nunito 700 15px truncated at 16rem, Verified Gold seal after the name, count in 13px gray. Hover darkens the border to 30% Ink. A capped list (8) that wraps.

### Navigation
- A fixed, centered, floating pill: translucent Canvas with backdrop blur, Rule border, the nav-float shadow. It hides on scroll down past 160px and returns on scroll up.
- Desktop: logo, Inter 14px links that turn Verified Sage on hover, then a compact primary pill.
- Mobile: logo and a two-line menu glyph open a full-screen Canvas sheet with large Zain 700 links separated by hairlines and a full-width primary pill at the bottom.

### Chapter Row (signature)
A numbered step of the journey: Trust Green numeral with its drawn rule, Zain title, gray Nunito body, and a wide 24px-rounded documentary photo. Where the browser supports scroll-driven animation and motion is allowed, the photo rises from 48px below at 0.985 scale and 35% opacity as it enters view, and the numeral's rule scales in from the left. With no support or reduced motion, everything is simply visible.

### Protection Checklist
Four plain facts in a 2x2 grid beside the section headline, each led by a 28px filled Trust Green check disc, then a Zain 800 20px statement and a gray body line. It sits on the canvas, not on a dark band.

### Hero Live Map
A live Mapbox map of Abuja behind the hero, with no pins before launch. Canvas gradients dissolve it into the page (left-to-right from 640px, top-to-bottom on mobile), plus a 64px / 96px bottom fade into the next section. Mapbox attribution is lifted above that fade. Map pins are Ink price pills with a tail (Secondary Gray and smaller on mobile); clusters are 44px Ink discs with a Canvas border.

### Photo-Backed Closing Card
A 24px-rounded card holding a full-bleed aerial photo under an Ink gradient (80% to 10%, left to right), with white Display type and the waitlist form in its on-dark mode.

## Do's and Don'ts

### Do:
- **Do** set every heading and numeral in Zain 800 with -0.02em tracking at display and headline sizes.
- **Do** make every control a full pill, and every photo a 24px-rounded frame.
- **Do** separate sections with a 1px Rule line and space (56-96px), on the same Canvas ground.
- **Do** keep Trust Green for checks and numerals, Verified Sage for focus and hover, and Gold for the verified-company seal.
- **Do** use real documentary photography and the live map; give each scroll-driven reveal a reduced-motion fallback that shows content at rest.
- **Do** cap repeated proof (companies) at a fixed count and let it wrap.

### Don't:
- **Don't** fill a button or a section with green; buttons are Ink.
- **Don't** bring back the survey grid backdrop or full-bleed black slabs between sections. The footer and the photo-backed closing card are the only dark grounds.
- **Don't** use illustrations, stat counters, testimonials or feature-card grids to carry trust; the numbered journey and the checklist do.
- **Don't** put shadows on content sitting on the canvas; reserve them for the floating nav, the field, and map elements.
- **Don't** add small uppercase tracked labels above headings.
