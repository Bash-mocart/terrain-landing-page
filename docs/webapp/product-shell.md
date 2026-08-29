# Product shell

Status: built, in review
Last updated: 2026-08-29

The shared chrome around the product routes. Today that is one header. The
next shell unit removes the remaining marketing navigation before product
routes expand. Covers why the shell exists, what it renders, and the decisions
taken along the way.

## Related docs

- `docs/webapp-integration-plan.md`: the umbrella plan. Phases, screen
  inventory, locked decisions.
- [`browse.md`](browse.md): the first route to consume the shell.

## Why

`src/app/layout.tsx` renders only `{children}`, so every route brought its own
navigation. Three had grown before anyone noticed:

| Route | Header |
| --- | --- |
| `/`, `/v/[variant]` | `TopNav`, a floating pill with a hamburger menu |
| `/agents/sample` | its own `PageTopNav` |
| `/browse` | an inline header with a "Back to home" link |

The integration plan listed routes and endpoints but said nothing about the
chrome around them, so each new route repeated the mistake. Five more Phase 1
routes were about to.

## Structure

- **`src/app/(product)/`**, a route group holding the product routes. Its
  `layout.tsx` supplies the shell. Route groups do not affect URLs, so
  `/browse` stays `/browse`.
- **`ProductNav`**: sticky header. Logo, the destinations inline on desktop, a
  hamburger menu on mobile, and the app download call to action. Its current
  marketing links are transitional and are removed in the next shell unit.
- **`destinations.ts`**: the destination list, in one place, so every surface
  that renders navigation reads the same order and the same routes.
- **`DestinationIcon`**: line glyphs on a shared 24px grid, keyed by route.

The landing page keeps `TopNav` and stays outside the group.

A mobile tab bar mirroring the Flutter app's bottom navigation is planned but
not built. See "Deferred" below.

## Destinations

Mirrors `_buyerTabs` in `terra-land/lib/screens/main_shell.dart`, in the same
order. `destinations.ts` lists all five and exports only the ones marked
`ready`, so adding a route to the navigation means flipping one flag.

| Tab | Route | Available |
| --- | --- | --- |
| Explore | `/explore` | Phase 1, next |
| Home | `/browse` | built, the only one rendered today |
| Chat | `/inbox` | Phase 4 or later, blocked on the Matrix conversation-list decision |
| Saved | `/saved` | Phase 3 |
| Profile | `/account` | Phase 3 |

## Decisions

**The shell is not `TopNav`.** `TopNav` is built to overlay the hero map: it
floats, it hides on scroll, and its links are landing anchors. A results page
needs a header that holds its place in the layout and points at product
destinations. Sharing one component would mean a flag for every difference.

**Only destinations whose routes exist are rendered.** Navigation grows as
phases land. Rendering all five with four inert was tried first, reasoning that
a stable shell shape is worth more than a short one. It is not: on a public
surface, navigation that is mostly dead reads as broken software.

**Marketing and product navigation are separate.** `/` owns How it works,
Products, Properties, app-download promotion, and the marketing footer. Product
routes own only buyer destinations and compact product chrome. The current
`ProductNav` mobile menu still crosses that boundary; removing it is the next
shell implementation unit.

## Accessibility

- The active destination carries `aria-current="page"`.
- The header's navigation landmark is labelled "Primary". A second navigation
  landmark needs its own distinct label, or a screen reader cannot tell them
  apart.
- The mobile menu is a labelled dialog that moves focus to its close button,
  locks body scroll, and closes on Escape. This requirement leaves with the
  menu when the approved product-shell separation is implemented.

## Deferred

**The mobile tab bar.** Built once, then removed before shipping. With only
`/browse` ready it rendered a bar with a single tab, which is worse than no bar
at all. It returns after `/explore` provides a second real destination. The
five-destination structure can be defined centrally, but unavailable routes
must not look or behave like working links.

When it comes back:

- Solid canvas with a hairline top rule, not a translucent or blurred bar.
  Content scrolls beneath it, a see-through surface over listing photography
  fights the imagery, and `CLAUDE.md` bans glassmorphism.
- The content column has to reserve space for it, since it is fixed. Derive
  that from the bar's real height rather than hardcoding a pixel value, which
  is what the first attempt did.
- Give it a navigation label distinct from the header's "Primary".

## Open items

- **`TopNav` is still translucent and blurred**, `backdrop-blur-md` at
  `TopNav.tsx:78`. `ProductNav` is solid canvas with a hairline rule, matching
  the `CLAUDE.md` glassmorphism ban and the Deferred section above. `TopNav` is
  the landing page's floating pill over the hero map, where its own comment
  treats the blur as load-bearing for legibility, so whether it goes solid is a
  brand decision rather than a shell one.

- `ProductNav` still includes landing-page links and a mobile hamburger. The
  approved next shell unit removes both rather than extracting and preserving
  duplicate marketing-menu code.
