@AGENTS.md

# Terrain Landing Page — Project Context

This is the marketing landing site for **Terrain** (formerly TERRA), a Nigerian real estate marketplace whose product surface lives in the Flutter app at `../terra-flutter`. The landing's job is acquisition: convert visitors into app installs and seller signups.

## Stack
- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript
- Tailwind CSS v4 (theme tokens in `src/app/globals.css` via `@theme`)
- next/font for self-hosted Zain / Nunito / Inter
- Deployed to Vercel (Hobby tier)

## Brand voice (mirrors `terra-flutter` DESIGN.md)
- **Palette** is restrained. Five tokens only:
  - `--color-canvas` (Warm Canvas, `#FDFCFB`)
  - `--color-primary` (Late-Night Boardroom, `#090503`)
  - `--color-verified` (Forest Verification, `#4A7C59`)
  - `--color-secondary` (Survey Gray, `#717171`)
  - `--color-border-rule` (Border Rule, `#EBEBEB`)
  - No other colors enter the page without explicit brand approval.
- **Two-Font-Per-Screen rule** holds: any single page uses Zain + Nunito for type, with Inter reserved for *interactive* labels (CTAs, caps, numerals, dates). Don't add a fourth family.
- **Voice**: restrained, document-like, trustworthy. Anti-references: Zillow's blue, Airbnb's coral, SaaS-cream gradients.

## Conventions
- App Router only — never `pages/`.
- Server Components by default. Add `'use client'` to a leaf when it needs interactivity (animations, scroll-driven motion, video controls); never to a page-level wrapper.
- Use `next/image` for every `.jpg`/`.png` over ~5KB. Real-estate photography is heavy — `priority` only the LCP image.
- Tailwind utility classes for layout/spacing; CSS variables for type families (no `font-sans`, write `style={{ fontFamily: 'var(--font-display)' }}` or extend the Tailwind theme).
- Component files in PascalCase under `src/components/`; routes under `src/app/`.

## Don'ts
- No emoji in shipped UI copy.
- No em dashes (DESIGN.md ban — use commas, colons, periods).
- No gradient text (`background-clip: text` is banned in DESIGN.md).
- No glassmorphism / blurred cards as decoration.
- Don't add SaaS-template hero copy like "Built for the future of [X]." Use Terrain's own voice: registry-document, calm, specific to Lagos / Abuja / Nigerian property buyers.

## Reference
Sibling repos on this machine:
- `/Users/Bash/terra-flutter` — the mobile app (Flutter, dart). Brand voice + DESIGN.md tokens originate here.
- `/Users/Bash/terra-backend` — Go backend. `PRODUCT.md` + `DESIGN.md` brand context lives here (still references "TERRA" pre-rename; see `terra-flutter/CLAUDE.md` for the rename scope decision).

## Rename history
The user-facing brand renamed **TERRA → Terrain** on 2026-06-06. The app, the landing, and all marketing copy say "Terrain". Internal identifiers (`terra-flutter` repo name, `terra_land` Dart package, `com.terra.land` bundle ID, Go module path) intentionally stay as TERRA — they're private/stable and a rename there would be churn-for-churn's-sake.
