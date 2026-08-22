# Web App Integration Plan

Status: Draft
Last updated: 2026-08-13

## Goal

Turn the Terrain landing page (this repo) into the full web app by wiring it to the existing Go API (`terra-backend`), mirroring the mobile app's product surface and consuming the same `/v1` endpoints. No backend changes are required for the buyer browsing surface.

## Current state

The landing page already talks to the backend in two places, but the wiring is ad-hoc:

- `src/components/LiveMap.tsx` fetches `/v1/listings?verified=true&limit=50&type_slug=land|house` (two parallel calls) and renders hero-map pins. Base URL: `process.env.NEXT_PUBLIC_TERRAIN_API_URL ?? "https://api.lunor.money"`.
- `src/components/smoke/SignupForm.tsx` posts to `/v1/waitlist` and `/v1/waitlist/{id}/check-request` for the smoke-test signup. Same env var, raw `fetch`.

Gaps to close:

1. **No shared API client** — each component inlines its own `fetch` and its own base-URL const. Duplicated.
2. **Client-side price formatting** — `formatPrice()` in `LiveMap.tsx` re-derives "₦1.5B" from the raw numeric `price`. The backend returns raw `price` (no `price_label` yet); the mobile app formats client-side the same way.
3. **Hardcoded `FALLBACK_LISTINGS`** in `LiveMap.tsx` — sample Abuja plots. Keep as a landing-only fallback.
4. **Client-side bounds filter (BAND-AID)** in `LiveMap.tsx` — workaround documented in `docs/known-data-issues.md`; the real fix is backend data normalisation.
5. **No auth, no token handling** — every current call is public.

## Architecture

- **One repo** (this one). Landing stays at `/`; product routes are added alongside.
- Next.js 16 App Router. **Server Components by default** for public/SEO pages; `'use client'` only on interactive leaves.
- One Go backend serves both the mobile app and web — the web app is a second client of the same `/v1` API.
- **Next 16 caveat:** this repo's AGENTS.md warns Next 16 has breaking changes — read `node_modules/next/dist/docs/` before writing App Router / fetch / caching code.

## API access pattern

- **Base URL:** `NEXT_PUBLIC_TERRAIN_API_URL`. Dev: `http://localhost:8090` (docker-compose) or `http://localhost:8080` (`go run`) via `.env.local`. Prod: `https://api.lunor.money`.
- **Prod host:** the API default is `https://api.lunor.money` (baked into `LiveMap.tsx` / `SignupForm.tsx` and the mobile app); the public site is `terrain.ng` — confirm this host is still current.
- **Auth:** Bearer token in the `Authorization` header. Store the access token in `localStorage`, refresh via `POST /v1/auth/refresh`, silent retry on 401.
- **Error shape:** `{"error": "message"}`.
- **Listing responses:** `{ "results": [...] }`.
- **Client-exposed env vars** must stay `NEXT_PUBLIC_*` and public-only (API base URL, Mapbox public token). Never put secrets in `NEXT_PUBLIC_*`.

## Screens (complete inventory)

One line per screen: name → route → endpoint(s). Endpoints marked `—` are static or need confirmation against the backend route table. "Defer" = mobile-only or realtime surface, intentionally out of Phase 1–4 scope.
Endpoint lists were extracted from `terra-backend/cmd/api/main.go` — re-verify there when building each route.

### Auth & onboarding

- **Splash** — `—` — app boot; on web, redirect logic only
- **Onboarding** — `/onboarding` — static first-run (no endpoint)
- **Login** — `/login` — `POST /v1/auth/phone/check`, `POST /v1/auth/signup/start`
- **OTP verify** — `/auth/otp` — `POST /v1/auth/otp/request`, `POST /v1/auth/otp/verify`
- **Name capture** — part of `/login` — `POST /v1/auth/register`
- **Profile setup** — part of `/onboarding` — `PATCH /v1/auth/me`
- **Buyer preference quiz** — `/onboarding/preferences` — local-only (device storage); no endpoint — mirror with localStorage or defer
- **Email verify** — `/account/verify-email` — `POST /v1/auth/email/request`, `POST /v1/auth/email/verify`
- **Social sign-in** — `/auth/social` — `POST /v1/auth/oauth`

### Buyer — browse (public)

- **Home / Browse** — `/browse` — `GET /v1/listings`, `GET /v1/home/hero`, `GET /v1/listings/taxonomy`
- **Explore (map)** — `/explore` — `GET /v1/listings/map`
- **City explore** — `/explore/[city]` — `GET /v1/listings/cities`, `GET /v1/listings?city=…`
- **Listing detail** — `/listing/[id]` — `GET /v1/listings/{id}`, `GET /v1/listings/{id}/reach`
- **Search results** — `/search` — `GET /v1/listings?…`
- **Search & filter** — `/search` (filter UI) — `GET /v1/listings/cities|states|taxonomy`
- **State / location picker** — part of `/search` — `GET /v1/listings/states`, `GET /v1/geo/state-boundary`
- **Estate** — `/estate/[id]` — `GET /v1/estates/{id}`, `GET /v1/listings?estate_id={id}`
- **Seller profile (public)** — `/seller/[id]` — `GET /v1/sellers/{id}`, `GET /v1/sellers/{id}/listings`

### Buyer — account (authed)

- **Saved** — `/saved` — `GET /v1/saved`, `POST /v1/saved`, `DELETE /v1/saved/{listing_id}`
- **Inbox** — `/inbox` — Matrix-backed (no REST list endpoint). Start via `POST /v1/conversations`; list needs Matrix SDK on web (defer)
- **Chat** — `/inbox/[id]` — `GET /v1/conversations/{id}` + Matrix (realtime — defer)
- **Profile** — `/account` — `GET /v1/auth/me`, `PATCH /v1/auth/me`
- **Edit profile** — `/account/edit` — `PATCH /v1/auth/me`
- **Notifications** — `/account/notifications` — backend not implemented (v0.2); empty feed — defer
- **Help** — `/help` — static
- **Refund policy** — `/refund-policy` — static

### Seller (deferred — Phase 4)

- **Seller dashboard** — `/dashboard` — `GET /v1/me/company`, `GET /v1/listings/mine/stats`
- **Seller welcome** — `/dashboard` (first-run) — static
- **My listings** — `/dashboard/listings` — `GET /v1/listings/mine`
- **Seller listings map** — `/dashboard/listings/map` — `GET /v1/listings/mine` (map view)
- **Edit listing** — `/dashboard/listings/[id]/edit` — `GET /v1/listings/{id}`, `PATCH /v1/listings/{id}`
- **Create listing wizard** — `/dashboard/listings/new` — `POST /v1/listings`, `POST /v1/upload`; multi-step: kind → photos → model → where → size/price → documents → payment plans → virtual tour → review
- **Company manage** — `/dashboard/company` — `GET /v1/me/company`, `PATCH /v1/me/company`
- **Company team** — `/dashboard/company/team` — `GET /v1/me/company/members`, invites
- **KYC / verification** — `/dashboard/verification` — `POST /v1/seller/verifications`, `/latest`, `/cac-lookup`, `/identity`, `GET /v1/verification/packages`
- **Bank account** — `/dashboard/account/bank` — backend not implemented (v0.2); "coming soon" — defer

### Mobile-only (defer)

- **Voice / video call** — defer (WebRTC / native call UI)
- **Virtual tour viewer (360°)** — defer (panorama viewer; possible web port later)
- **3D model viewer** — defer (could reuse `<model-viewer>` on web later)

## Implementation phases

### Phase 0 — Consolidate the API layer

- Create `src/lib/api.ts`: an isomorphic typed client wrapping `fetch` (get/post/patch/put/delete, Bearer token in the `Authorization` header, 401 → refresh + retry, error shape `{"error"}`). Two paths: server (Server Components — no localStorage, server-side env + fetch caching) and browser (client components — localStorage token, `NEXT_PUBLIC_*` env).
- Create `src/lib/types.ts`: TS types for the API models.
- Re-point `LiveMap.tsx` and `SignupForm.tsx` at the shared client (delete their inline base-URL consts + `fetch`).
- Add `.env.local.example` documenting `NEXT_PUBLIC_TERRAIN_API_URL` and `NEXT_PUBLIC_MAPBOX_TOKEN`.
- Confirm dev works against `http://localhost:8090`.

### Phase 1 — Buyer public browsing (core, SEO)

- `/explore`, `/browse`, `/listing/[id]`, `/search`, `/seller/[id]`, `/estate/[id]`.
- Public pages fetch in Server Components (server-rendered for SEO).
- Keep client-side price formatting (matches the mobile app); optionally add `price_label` to the backend later.

### Phase 2 — Auth

- Phone OTP + Google sign-in; `localStorage` token + refresh.

### Phase 3 — Buyer authed

- `/saved` and `/account`.
- `/inbox` is blocked on the conversation-list decision (Matrix JS SDK vs a new backend `GET /v1/conversations`) and moves to Phase 4+.

### Phase 4 — Seller (largest, defer)

- `/dashboard`, listing CRUD, create-listing wizard, KYC/verification.

## Definition of Done

- All public buyer routes render real data from the local API (`:8090`), no hardcoded listings (the landing hero's `FALLBACK_LISTINGS` is the only exception — landing-only, not reused on `/explore`).
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
