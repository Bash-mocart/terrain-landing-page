# Local development

Status: current
Last updated: 2026-08-24

Which API the web app talks to, how to point it somewhere else, and what
changes with each choice.

## Related docs

- `docs/webapp-integration-plan.md`: the umbrella plan, including the API
  access pattern and the environment variable rules.
- [`api-client.md`](api-client.md): how the base URL below is resolved and
  used.
- [`browse.md`](browse.md): the route most affected by which API is
  selected.

## Configuration

`.env.local`, which is not committed. `.env.local.example` documents both
variables.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_TERRAIN_API_URL` | API base URL. Falls back to `https://api.terrain.ng`. |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Public Mapbox browser token, the `pk` kind. |

Both are exposed to the browser, so neither may hold a secret. A Mapbox `sk`
token does not belong here.

`NEXT_PUBLIC_*` values are read at build time. Changing one requires a rebuild,
not just a restart.

## Choosing an API

**Local backend.** `NEXT_PUBLIC_TERRAIN_API_URL=http://localhost:8090`, served
by docker-compose in `terra-backend` (`8090:8080` in its compose file). Use
`http://localhost:8080` instead when running the API with `go run`.

The local database ships empty. Listing queries return `total: 0`, so
`/browse` renders its empty state and the landing hero falls back to
`FALLBACK_LISTINGS`. Fine for wiring work, useless for judging layout.

**Production.** `NEXT_PUBLIC_TERRAIN_API_URL=https://api.terrain.ng`. Real
listings, which is what you want when working on anything visual.

Two things to know before pointing at it:

- `SignupForm.tsx` posts to `/v1/waitlist` and
  `/v1/waitlist/{id}/check-request` against the same base URL. Submitting the
  signup form locally writes real rows to the production waitlist. Read-only
  browsing is harmless; that path is not.
- `GET /v1/home/hero` returns 500 in production while returning 200 locally.
  See [`browse.md`](browse.md) for how `/browse` absorbs it.

## Media

`next.config.ts` allow-lists the hosts `next/image` will load. Listing
photography comes from `media.terrain.ng`. An unlisted host throws rather than
degrading, so a wrong entry here presents as broken images everywhere.

## Sibling repos

On this machine:

- `/Users/drizzle/Terrain/terra-backend`: the Go API.
- `/Users/drizzle/Terrain/terra-land`: the Flutter app. Brand and design tokens
  originate here, along with the navigation the product shell mirrors.

`CLAUDE.md` currently points both at `/Users/Bash/`, which is stale.
