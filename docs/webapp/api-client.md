# API client

Status: shipped
Last updated: 2026-08-26

`src/lib/api.ts`, the one path every request to the Go backend takes. Phase 0
of the integration plan, and the layer the product routes are built on.
`src/lib/types.ts` holds the response shapes it returns.

## Related docs

- `docs/webapp-integration-plan.md`: the umbrella plan. Phase 0, the API access
  pattern, and the environment variable rules.
- [`local-development.md`](local-development.md): which API the base URL points
  at, and what changes with each choice.
- [`browse.md`](browse.md): the heaviest consumer, and where the error handling
  around this client is decided.

## Base URL

`API_URL` resolves `NEXT_PUBLIC_TERRAIN_API_URL`, falling back to
`https://api.terrain.ng`. It is read once at module load, so for client bundles
the value is fixed at build time.

Paths resolve against `${API_URL}/` with any trailing slash stripped first, so
every call site writes a rooted path: `api.get("/v1/listings")`.

## Surface

| Method | Body | Notes |
| --- | --- | --- |
| `api.get<T>(path, options)` | no | |
| `api.post<T>(path, body, options)` | yes | |
| `api.patch<T>(path, body, options)` | yes | |
| `api.put<T>(path, body, options)` | yes | |
| `api.delete<T>(path, options)` | no | `T` defaults to `void` |
| `saveSession(session)` | | browser only, throws on the server |
| `clearSession()` | | no-op on the server |

`options` carries `query`, `accessToken`, `skipRefresh`, and the rest of
`RequestInit` minus `body` and `method`.

## Query building

Values that are `null`, `undefined`, or the empty string are dropped rather
than serialised. An array appends its key once per value.

This is what lets `/browse` pass its filters unconditionally. Absent search
params arrive as `""`, so `city: filters.city` simply never reaches the URL
when no city is selected, and no call site needs to prune its own query object.

## Bodies

A `BodyInit` (string, `FormData`, `Blob`, `URLSearchParams`, a buffer, a
stream) is passed through untouched. Anything else is JSON encoded and gets
`Content-Type: application/json`. `Accept: application/json` is always set.

## Tokens

Stored in `localStorage` under `terra_auth_token` and `terra_auth_refresh`. The
`terra_` prefix is deliberate: internal identifiers keep the TERRA name per the
rename decision in `CLAUDE.md`, and a stored key is not user facing.

Storage is reached through a helper that returns `null` when `window` is
undefined. A Server Component request therefore carries no token unless the
caller passes `accessToken` explicitly, which is the intended server path.

## Refresh on 401

A request is replayed once, and only when all of these hold: the response was
401, the request carried a token, browser storage exists, `skipRefresh` is off,
it has not already retried, and the refresh succeeded.

Two details worth keeping:

- **Concurrent 401s share one refresh.** The in-flight promise is held in a
  module-level variable, so a page issuing several requests at once sends a
  single `POST /v1/auth/refresh` rather than one per failure.
- **The refresh cannot recurse.** It passes `skipRefresh`, so a 401 on the
  refresh endpoint itself falls straight through to an error.

A failed refresh removes both tokens before returning.

## Errors

Any non-ok response throws `ApiError`, carrying `status` and a message taken
from the `{"error": "..."}` body, falling back to the status text and then to
"Request failed". An error body that is not JSON is swallowed and the fallback
used, so a gateway's HTML error page still produces a usable `ApiError`.

## Empty responses

A 204, or any empty body, resolves to `undefined`. This is cast to `T` rather
than checked, so a caller that types such a response as an object receives
`undefined` at runtime.

## Open items

- `saveSession`, `clearSession`, and the whole refresh path have no callers.
  Auth is Phase 2; this code is written but unexercised, and none of it has run
  against the real endpoint yet.
- Refresh is browser only by construction. A server-side 401 throws `ApiError`
  with no retry, which is the right default while every server request is
  public, and will need revisiting when authed routes render on the server.
- No call site passes fetch caching options today, though `options` forwards
  them. Caching behaviour is whatever Next applies by default.
