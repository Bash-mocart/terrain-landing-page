# Product shell

Status: built
Last updated: 2026-08-30

The shared chrome around the product routes: a compact desktop header and a
fixed mobile bottom navigation.
Covers why the shell exists, what it renders, and the decisions taken along
the way.

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
- **`ProductNav`**: sticky header plus the mobile tab bar. The logo and ready
  destinations render inline on desktop; all five destinations keep a stable
  order on mobile, with unfinished routes disabled until their screens exist.
  No marketing links or app promotion appear in the product shell.
- **`destinations.ts`**: the destination list, in one place, so every surface
  that renders navigation reads the same order and the same routes.
- **`DestinationIcon`**: line glyphs on a shared 24px grid, keyed by route.

The landing page keeps `TopNav` and stays outside the group.

A mobile tab bar is planned but not built. See "Deferred" below.

## Destinations

`destinations.ts` lists all five in their fixed order and exports only the ones
marked `ready`, so adding a route to the navigation means flipping one flag.

| Tab | Route | Available |
| --- | --- | --- |
| Explore | `/explore` | built |
| Home | `/browse` | built |
| Chat | `/inbox` | visible on mobile, disabled until the Matrix conversation-list decision |
| Saved | `/saved` | visible on mobile, disabled until Phase 3 |
| Profile | `/account` | visible on mobile, disabled until Phase 3 |

## Decisions

**The shell is not `TopNav`.** `TopNav` is built to overlay the hero map: it
floats, it hides on scroll, and its links are landing anchors. A results page
needs a header that holds its place in the layout and points at product
destinations. Sharing one component would mean a flag for every difference.

**Only destinations whose routes exist are links.** Desktop navigation grows as
phases land. The mobile bar keeps the approved five-tab structure, but
unfinished destinations are disabled and labelled as coming soon rather than
leading to dead routes.

**Marketing and product navigation are separate.** `/` owns How it works,
Products, Properties, app-download promotion, and the marketing footer. Product
routes own only buyer destinations and compact product chrome.

**The mobile bar has a stable five-tab structure.** Explore and Home are live
links; Chat, Saved, and Profile remain visibly unavailable until their routes
are implemented.

## Accessibility

- The active destination carries `aria-current="page"`.
- The header's navigation landmark is labelled "Primary". A second navigation
  landmark needs its own distinct label, or a screen reader cannot tell them
  apart.

## Deferred

**The remaining destination routes.** The mobile tab bar is now in place after
Explore joined Home. Chat, Saved, and Profile remain disabled until their
screens and data flows are implemented; they must not be changed into links
before then.

## Open items

- **`TopNav` is still translucent and blurred**, `backdrop-blur-md` at
  `TopNav.tsx:78`. `ProductNav` keeps its solid header and uses a raised,
  floating mobile pill to match the application shell. `TopNav` is the landing
  page's floating pill over the hero map, where its own comment treats the blur
  as load-bearing for legibility, so whether it goes solid is a brand decision
  rather than a shell one.
