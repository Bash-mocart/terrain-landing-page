# Browse

Status: built
Last updated: 2026-08-24

The public property browsing route, `/browse`. First of the Phase 1 buyer
routes, and the first consumer of the product shell.

## Related docs

- `docs/webapp-integration-plan.md`: the umbrella plan.
- [`api-client.md`](api-client.md): the client the requests below go
  through.
- [`product-shell.md`](product-shell.md): the header wrapping this
  route.
- [`local-development.md`](local-development.md): which API the route talks to,
  and what each choice implies.

## Route

`src/app/(product)/browse/page.tsx`, a Server Component, rendered on demand
because it reads `searchParams`. Filters travel in the URL, so a filtered view
is linkable: `city`, `type`, `subtype`, `q`.

`loading.tsx` and `error.tsx` supply the route's boundaries. Neither sets a
full-viewport height: the shell's header sits above them, so a `min-h-screen`
child pushes the page past the fold.

## Data

`src/lib/browse.ts` owns the requests. All five run in parallel.

| Function | Endpoint | Feeds |
| --- | --- | --- |
| `getBrowseFeed` | `GET /v1/listings` | the main results grid |
| `getTerrainPicks` | `GET /v1/home/hero` | the Terrain Pick section |
| `getVerifiedThisWeek` | `GET /v1/listings?verified_after=` | recently verified |
| `getBrowseCities` | `GET /v1/listings/cities` | city filter, city chips |
| `getListingTaxonomy` | `GET /v1/listings/taxonomy` | type and subtype filters |

## Decisions

**Only the feed can fail the page.** `/browse` has nothing to show without its
results, so a feed error reaches the error boundary. The other four requests
fall back to empty results and log a warning, and their sections drop out.

This was not theoretical. `GET /v1/home/hero` returns 500 in production while
returning 200 locally, and the five requests originally shared one `Promise.all`
with no per-call catch. The result was a `/browse` that served HTTP 200 with an
empty body: the error boundary, rendered over four successful responses. The
production 500 is a `terra-backend` bug. This route works around it, it does
not fix it.

**Failures log with `console.warn`, not `console.error`.** Next's development
overlay intercepts `console.error` only, so reporting a deliberately handled
error raised an error banner over a page that had rendered correctly.

**Empty collections are normalised on arrival.** The API returns `null` rather
than `[]` for empty sets. `ListResponse` accounts for this on `results`, but
`hero.slides`, `cities` and `taxonomy.types` are read directly and would throw.

**Prices are formatted client side**, matching the mobile app. The backend
returns a raw numeric `price` with no `price_label`. This follows locked
decision 6 in the umbrella plan.

## Components

- `src/components/browse/BrowseFilters.tsx`: search, city, type and subtype.
  Handles empty city and taxonomy lists, which is what the fallbacks produce.
- `src/components/browse/ListingCard.tsx`: one result.

## Open items

- Listing cards remain non-interactive until `/listing/[id]` exists. Do not
  wrap them in links before that route ships: production prefetches every
  visible destination and turns each missing detail route into a 404 request.
- The empty state and the everything-failed state look alike. A reader cannot
  tell "no properties match these filters" from "the feed came back empty
  because something is wrong upstream".
- Results are capped at 10 with no pagination. `total` is displayed, so a
  count larger than the grid is already visible to the reader.
