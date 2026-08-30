# Web App Integration Plan

Status: Active. Phase 0 complete, Phase 1 in progress.
Last updated: 2026-08-29

## Goal

Turn the Terrain landing page (this repo) into the full web app by wiring it to the existing Go API (`terra-backend`), mirroring the mobile app's product surface and consuming the same `/v1` endpoints. No backend changes are required for the buyer browsing surface.

## Related docs

This plan is the umbrella. Each piece of built work has its own spec under
[`docs/webapp/`](webapp/):

- [`webapp/api-client.md`](webapp/api-client.md): the shared client, Phase 0.
- [`webapp/product-shell.md`](webapp/product-shell.md): the header and route
  group wrapping the product routes.
- [`webapp/browse.md`](webapp/browse.md): the `/browse` route.
- [`webapp/local-development.md`](webapp/local-development.md): which API to
  run against, and what changes with each choice.

Cross-cutting: `docs/known-data-issues.md` records backend data problems the
front end works around.

## Current state

Phase 0 is closed and Phase 1 has started. This section records how far the
work has reached; the specs linked above carry the detail.

Immediate delivery order: finish the `/explore` map foundation, build its map
controls and listing interaction, then add mobile bottom navigation once Home
and Explore are both real destinations. Continue with the remaining public
routes after the shared shell reads as one coherent web app.

Built:

- **Shared API client.** `src/lib/api.ts` and `src/lib/types.ts`. Every request
  the app makes goes through it. `LiveMap.tsx` and `SignupForm.tsx` were
  repointed, and no component holds an inline `fetch` or its own base URL any
  more.
- **Product shell.** `src/app/(product)/` and `src/components/shell/`, the
  compact header shared by the product routes. Marketing links, app promotion,
  and the marketing footer remain exclusive to `/`.
- **`/browse`.** The first Phase 1 route, and the first consumer of the shell.
- **Landing-to-web handoff.** The landing hero and header offer Browse
  properties as the browser-product entry and keep app download as a separate
  marketing choice. The footer's listings entry points to `/browse`.

In progress:

- **`/explore`.** Unit 1 is complete; Unit 2 is next.

Still open from the original survey:

1. **Client-side price formatting.** `formatPrice()` in `LiveMap.tsx` derives
   "₦1.5B" from the raw numeric `price`. Kept on purpose, locked decision 6.
2. **Hardcoded `FALLBACK_LISTINGS`** in `LiveMap.tsx`. Kept on purpose, locked
   decision 5: landing only, not reused on the product routes.
3. **Client-side bounds filter (BAND-AID)** in `LiveMap.tsx`, recorded in
   `docs/known-data-issues.md`. The real fix is backend data normalisation.
4. **No auth, no token handling.** Every call the app makes is public. The
   client carries a refresh path, but nothing calls it yet. Phase 2.

## Architecture

- **One repo** (this one). Landing stays at `/`; product routes are added alongside.
- Next.js 16 App Router. **Server Components by default** for public/SEO pages; `'use client'` only on interactive leaves.
- One Go backend serves both the mobile app and web. The web app is a second client of the same `/v1` API.
- **Next 16 caveat:** this repo's AGENTS.md warns Next 16 has breaking changes. Read `node_modules/next/dist/docs/` before writing App Router / fetch / caching code.

## API access pattern

- **Base URL:** `NEXT_PUBLIC_TERRAIN_API_URL`. Dev: `http://localhost:8090` (docker-compose) or `http://localhost:8080` (`go run`) via `.env.local`. Prod: `https://api.terrain.ng` (media: `https://media.terrain.ng`).
- **Auth:** Bearer token in the `Authorization` header. Store the access token in `localStorage`, refresh via `POST /v1/auth/refresh`, silent retry on 401.
- **Error shape:** `{"error": "message"}`.
- **Listing responses:** `{ "results": [...] }`.
- **Client-exposed env vars** must stay `NEXT_PUBLIC_*` and public-only (API base URL, Mapbox public token). Never put secrets in `NEXT_PUBLIC_*`.

## Screens (complete inventory)

One line per screen: the name, its route in parentheses, then its endpoints. A screen listed with no endpoint is static, or needs confirming against the backend route table. "Defer" = mobile-only or realtime surface, intentionally out of Phase 1–4 scope.
Endpoint lists were extracted from `terra-backend/cmd/api/main.go`. Re-verify there when building each route.

### Auth & onboarding

- **Splash** (no route): app boot; on web, redirect logic only
- **Onboarding** (`/onboarding`): static first-run (no endpoint)
- **Login** (`/login`): `POST /v1/auth/phone/check`, `POST /v1/auth/signup/start`
- **OTP verify** (`/auth/otp`): `POST /v1/auth/otp/request`, `POST /v1/auth/otp/verify`
- **Name capture** (part of `/login`): `POST /v1/auth/register`
- **Profile setup** (part of `/onboarding`): `PATCH /v1/auth/me`
- **Buyer preference quiz** (`/onboarding/preferences`): local-only (device storage), no endpoint. Mirror with localStorage or defer
- **Email verify** (`/account/verify-email`): `POST /v1/auth/email/request`, `POST /v1/auth/email/verify`
- **Social sign-in** (`/auth/social`): `POST /v1/auth/oauth`

### Buyer: browse (public)

- **Home / Browse** (`/browse`): `GET /v1/listings`, `GET /v1/home/hero`, `GET /v1/listings/taxonomy`
- **Explore (map)** (`/explore`): `GET /v1/listings/map`
- **City explore** (`/explore/[city]`): `GET /v1/listings/cities`, `GET /v1/listings?city=…`
- **Listing detail** (`/listing/[id]`): `GET /v1/listings/{id}`, `GET /v1/listings/{id}/reach`
- **Search results** (`/search`): `GET /v1/listings?…`
- **Search & filter** (`/search`, filter UI): `GET /v1/listings/cities|states|taxonomy`
- **State / location picker** (part of `/search`): `GET /v1/listings/states`, `GET /v1/geo/state-boundary`
- **Estate** (`/estate/[id]`): `GET /v1/estates/{id}`, `GET /v1/listings?estate_id={id}`
- **Seller profile (public)** (`/seller/[id]`): `GET /v1/sellers/{id}`, `GET /v1/sellers/{id}/listings`

### Buyer: account (authed)

- **Saved** (`/saved`): `GET /v1/saved`, `POST /v1/saved`, `DELETE /v1/saved/{listing_id}`
- **Inbox** (`/inbox`): Matrix-backed (no REST list endpoint). Start via `POST /v1/conversations`; list needs Matrix SDK on web (defer)
- **Chat** (`/inbox/[id]`): `GET /v1/conversations/{id}` + Matrix (realtime, defer)
- **Profile** (`/account`): `GET /v1/auth/me`, `PATCH /v1/auth/me`
- **Edit profile** (`/account/edit`): `PATCH /v1/auth/me`
- **Notifications** (`/account/notifications`): backend not implemented (v0.2); empty feed, defer
- **Help** (`/help`): static
- **Refund policy** (`/refund-policy`): static

### Seller (deferred to Phase 4)

- **Seller dashboard** (`/dashboard`): `GET /v1/me/company`, `GET /v1/listings/mine/stats`
- **Seller welcome** (`/dashboard`, first-run): static
- **My listings** (`/dashboard/listings`): `GET /v1/listings/mine`
- **Seller listings map** (`/dashboard/listings/map`): `GET /v1/listings/mine` (map view)
- **Edit listing** (`/dashboard/listings/[id]/edit`): `GET /v1/listings/{id}`, `PATCH /v1/listings/{id}`
- **Create listing wizard** (`/dashboard/listings/new`): `POST /v1/listings`, `POST /v1/upload`; multi-step: kind → photos → model → where → size/price → documents → payment plans → virtual tour → review
- **Company manage** (`/dashboard/company`): `GET /v1/me/company`, `PATCH /v1/me/company`
- **Company team** (`/dashboard/company/team`): `GET /v1/me/company/members`, invites
- **KYC / verification** (`/dashboard/verification`): `POST /v1/seller/verifications`, `/latest`, `/cac-lookup`, `/identity`, `GET /v1/verification/packages`
- **Bank account** (`/dashboard/account/bank`): backend not implemented (v0.2); "coming soon", defer

### Mobile-only (defer)

- **Voice / video call**: defer (WebRTC / native call UI)
- **Virtual tour viewer (360°)**: defer (panorama viewer; possible web port later)
- **3D model viewer**: defer (could reuse `<model-viewer>` on web later)

## Implementation phases

### Phase 0: consolidate the API layer (complete)

- Create `src/lib/api.ts`: an isomorphic typed client wrapping `fetch` (get/post/patch/put/delete, Bearer token in the `Authorization` header, 401 → refresh + retry, error shape `{"error"}`). Two paths: server (Server Components, no localStorage, server-side env + fetch caching) and browser (client components, localStorage token, `NEXT_PUBLIC_*` env).
- Create `src/lib/types.ts`: TS types for the API models.
- Re-point `LiveMap.tsx` and `SignupForm.tsx` at the shared client (delete their inline base-URL consts + `fetch`).
- Add `.env.local.example` documenting `NEXT_PUBLIC_TERRAIN_API_URL` and `NEXT_PUBLIC_MAPBOX_TOKEN`.
- Confirm dev works against `http://localhost:8090`.

Every item above is done except the last, which has not been verified: the
working `.env.local` points at `https://api.terrain.ng`, not at the local API.
That is a deliberate trade (the local database ships empty, so it is useless
for judging layout) but it does contradict locked decision 4, and it means the
local stack has not been exercised end to end. See
[`webapp/local-development.md`](webapp/local-development.md), which also flags
why the signup form is the one path that must not run against production.

### Phase 1: buyer public browsing (core, SEO) (in progress)

- `/explore`, `/browse`, `/listing/[id]`, `/search`, `/seller/[id]`, `/estate/[id]`.
- `/browse` is built and `/explore` is in progress. The other four are not
  started. Product-shell separation is complete.
- Fetch indexable public-page content in Server Components. Interactive map
  data may load in the client when that allows the map renderer and its data
  request to start concurrently.
- Keep client-side price formatting (matches the mobile app); optionally add `price_label` to the backend later.

#### Navigation and shell order

- Product routes use compact chrome with no marketing links, download CTA, or
  mobile hamburger. Desktop destinations stay hidden while Home is the only
  ready route.
- Build `/explore` after that separation and activate it only when its own
  acceptance criteria pass.
- Add the fixed mobile bottom navigation after Home and Explore are both real.
  The full destination order is Explore, Home, Chat, Saved, Profile, but
  unavailable routes must not look or behave like working links.

#### `/explore` delivery plan

Build `/explore` as separate implementation units. Each unit must stay within
the repository's file-count rule and finish with TypeScript, lint, and build
verification before the next begins.

**Unit 1 — map foundation (complete)**

- Add a typed data function for `GET /v1/listings/map`, using the backend marker
  contract: `id`, `lng`, `lat`, `price`, `type`, `verified`, `state`,
  `type_slug`, and the optional 3D fields.
- Use a Server Component route with a Client Component boundary for Mapbox and
  browser interaction.
- Load markers across Nigeria and let Mapbox handle viewport culling locally.
  Panning and zooming must not trigger API requests; server-backed filter
  changes must refresh the marker set without resetting the camera.
- Render the satellite-streets map with native clustering and cluster
  expansion.
- Render individual prices as styled pill markers.
- Support All, Land, and House filtering through `type_slug`.
- Provide missing-token, empty-result, request-error, and retry states without
  fallback or sample listings.
- Add route-level loading feedback for the initial marker request.
- Verify the complete route at desktop and mobile widths before marking the
  Explore destination ready.

**Unit 2 — map controls**

Decisions required before implementation:

- Choose whether List opens the existing `/browse` route or an in-page list
  view.
- Confirm the location-search provider and request contract.

Deliverables:

- Add a responsive control bar containing location search, Map/List selection,
  and access to filters.
- Move Land and House into the filter surface. With no type selected, the map
  shows all listing types; All is not displayed as a persistent filter chip.
- Display active filters below the control bar and allow each filter to be
  removed independently.
- Only expose controls whose behavior is implemented. Location search remains
  out of the interface until its contract is confirmed.
- Keep controls clear of Mapbox attribution, zoom controls, and selected map
  content at supported viewport sizes.

**Unit 3 — listing selection and preview**

- Highlight the selected price marker and position the camera so the marker
  remains visible beside the preview.
- Fetch `GET /v1/listings/{id}` through the shared API client and render the
  result in a reusable preview card.
- Cover loading, success, failure, retry, and dismissal states without
  reloading the complete marker set.
- Enable navigation only after `/listing/[id]` is available.

**Unit 4 — location search and advanced filters**

- Implement location search against the confirmed provider and request
  contract if it was not completed in Unit 2.
- Add state, subtype, price, document, size, and development filters. Send only
  parameters supported by the backend map endpoint.
- Keep active filters individually removable, provide a single clear-all
  action, and debounce rapid server-backed changes.

**Unit 5 — development aggregates**

- Load development markers from `GET /v1/estates/map` using the same country
  bounds as listing markers.
- Keep development and individual-listing modes mutually exclusive so an
  estate is not displayed alongside its own units.
- Enable estate navigation only after `/estate/[id]` is available.

**Deferred from the first `/explore` release**

- Reach and landmark overlays.
- Plot-boundary extrusion and reveal animation.
- 3D house-model rendering.
- These require their own verified contracts, browser performance checks, and
  implementation plans; their presence in the compact marker payload does not
  make them part of Unit 1.

**`/explore` acceptance criteria**

- The route shows real API markers across Nigeria with no hardcoded inventory.
- Initial navigation and subsequent requests provide visible loading feedback.
- Clusters, price markers, filtering, selection, retry, and empty states work at
  desktop and mobile widths.
- Every visible search, Map/List, and filter control performs its stated action.
- Map movement does not trigger redundant network requests or make markers
  disappear.
- Every request uses `src/lib/api.ts`; no inline API base URL or raw `fetch` is
  introduced.
- Missing configuration and API failures remain visible and recoverable.

### Phase 2: auth (not started)

- Phone OTP + Google sign-in; `localStorage` token + refresh.

### Phase 3: buyer authed (not started)

- `/saved` and `/account`.
- `/inbox` is blocked on the conversation-list decision (Matrix JS SDK vs a new backend `GET /v1/conversations`) and moves to Phase 4+.

### Phase 4: seller (largest, defer) (not started)

- `/dashboard`, listing CRUD, create-listing wizard, KYC/verification.

## Definition of Done

- All public buyer routes render real data from the local API (`:8090`), no hardcoded listings (the landing hero's `FALLBACK_LISTINGS` is the only exception: landing-only, not reused on `/explore`).
- One shared API client is used everywhere (no inline `fetch` + base-URL duplication).
- Price formatting matches the mobile app (client-side); adding `price_label` to the backend is a separate, optional follow-up.
- Auth works end-to-end (sign in → token → authed routes → refresh on 401).
- Landing page (`/`) still renders as before (no regression).

## Decisions (locked)

1. Auth: `localStorage` + refresh.
2. Same repo as the landing page.
3. Build order: Phase 0 + Phase 1 first, check in before Phase 2+.
4. Dev API URL: `NEXT_PUBLIC_TERRAIN_API_URL=http://localhost:8090` in `.env.local`.
5. `FALLBACK_LISTINGS` in `LiveMap.tsx`: keep, landing-only fallback (not reused on `/explore`).
6. Price: backend returns raw `price` (no `price_label`). Keep client-side formatting for now; optionally add `price_label` to the backend later.

Decision 4 is not what the working tree does today: `.env.local` points at
production. Treat the decision as the intent for wiring work and the deviation
as a standing exception for visual work, not as a decision that was reversed.
