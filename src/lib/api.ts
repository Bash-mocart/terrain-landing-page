import type { ApiErrorResponse, SessionResponse } from "./types";

const DEFAULT_API_URL = "https://api.terrain.ng";
const ACCESS_TOKEN_KEY = "terra_auth_token";
const REFRESH_TOKEN_KEY = "terra_auth_refresh";

export const API_URL =
  process.env.NEXT_PUBLIC_TERRAIN_API_URL ?? DEFAULT_API_URL;

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type QueryValue = string | number | boolean | null | undefined;
type Query = Record<string, QueryValue | QueryValue[]>;
type RequestOptions = Omit<RequestInit, "body" | "method"> & {
  body?: unknown;
  query?: Query;
  /** Supply a token explicitly for a server-side request. */
  accessToken?: string;
  /** Prevent refresh recursion for the refresh request itself. */
  skipRefresh?: boolean;
};

function browserStorage(): Storage | null {
  return typeof window === "undefined" ? null : window.localStorage;
}

function buildUrl(path: string, query?: Query): string {
  const url = new URL(path, `${API_URL.replace(/\/$/, "")}/`);
  if (!query) return url.toString();

  for (const [key, rawValue] of Object.entries(query)) {
    const values = Array.isArray(rawValue) ? rawValue : [rawValue];
    for (const value of values) {
      if (value !== null && value !== undefined && value !== "") {
        url.searchParams.append(key, String(value));
      }
    }
  }
  return url.toString();
}

function isBodyInit(value: unknown): value is BodyInit {
  return (
    typeof value === "string" ||
    value instanceof Blob ||
    value instanceof FormData ||
    value instanceof URLSearchParams ||
    value instanceof ArrayBuffer ||
    ArrayBuffer.isView(value) ||
    value instanceof ReadableStream
  );
}

function messageFromResponse(body: unknown, fallback: string): string {
  if (
    body &&
    typeof body === "object" &&
    "error" in body &&
    typeof (body as ApiErrorResponse).error === "string"
  ) {
    return (body as ApiErrorResponse).error;
  }
  return fallback;
}

let refreshInFlight: Promise<boolean> | null = null;

async function refreshBrowserSession(): Promise<boolean> {
  const storage = browserStorage();
  const refreshToken = storage?.getItem(REFRESH_TOKEN_KEY);
  if (!storage || !refreshToken) return false;

  if (!refreshInFlight) {
    refreshInFlight = request<SessionResponse>("/v1/auth/refresh", {
      method: "POST",
      body: { refresh_token: refreshToken },
      skipRefresh: true,
    })
      .then((session) => {
        storage.setItem(ACCESS_TOKEN_KEY, session.token);
        storage.setItem(REFRESH_TOKEN_KEY, session.refresh_token);
        return true;
      })
      .catch(() => {
        storage.removeItem(ACCESS_TOKEN_KEY);
        storage.removeItem(REFRESH_TOKEN_KEY);
        return false;
      })
      .finally(() => {
        refreshInFlight = null;
      });
  }

  return refreshInFlight;
}

async function request<T>(
  path: string,
  options: RequestOptions & { method: string },
  hasRetried = false,
): Promise<T> {
  const {
    accessToken,
    body,
    headers: suppliedHeaders,
    query,
    skipRefresh = false,
    ...init
  } = options;
  const storage = browserStorage();
  const token = accessToken ?? storage?.getItem(ACCESS_TOKEN_KEY) ?? undefined;
  const headers = new Headers(suppliedHeaders);
  headers.set("Accept", "application/json");

  let requestBody: BodyInit | undefined;
  if (body !== undefined) {
    if (isBodyInit(body)) {
      requestBody = body;
    } else {
      headers.set("Content-Type", "application/json");
      requestBody = JSON.stringify(body);
    }
  }
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(buildUrl(path, query), {
    ...init,
    headers,
    body: requestBody,
  });

  if (
    response.status === 401 &&
    token &&
    storage &&
    !skipRefresh &&
    !hasRetried &&
    (await refreshBrowserSession())
  ) {
    return request<T>(path, options, true);
  }

  if (!response.ok) {
    let errorBody: unknown;
    try {
      errorBody = await response.json();
    } catch {
      errorBody = null;
    }
    throw new ApiError(
      response.status,
      messageFromResponse(errorBody, response.statusText || "Request failed"),
    );
  }

  if (response.status === 204) return undefined as T;
  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

export const api = {
  get<T>(path: string, options: Omit<RequestOptions, "body"> = {}) {
    return request<T>(path, { ...options, method: "GET" });
  },
  post<T>(path: string, body?: unknown, options: RequestOptions = {}) {
    return request<T>(path, { ...options, body, method: "POST" });
  },
  patch<T>(path: string, body?: unknown, options: RequestOptions = {}) {
    return request<T>(path, { ...options, body, method: "PATCH" });
  },
  put<T>(path: string, body?: unknown, options: RequestOptions = {}) {
    return request<T>(path, { ...options, body, method: "PUT" });
  },
  delete<T = void>(path: string, options: Omit<RequestOptions, "body"> = {}) {
    return request<T>(path, { ...options, method: "DELETE" });
  },
};

export function saveSession(session: SessionResponse): void {
  const storage = browserStorage();
  if (!storage) throw new Error("Sessions can only be saved in the browser.");
  storage.setItem(ACCESS_TOKEN_KEY, session.token);
  storage.setItem(REFRESH_TOKEN_KEY, session.refresh_token);
}

export function clearSession(): void {
  const storage = browserStorage();
  storage?.removeItem(ACCESS_TOKEN_KEY);
  storage?.removeItem(REFRESH_TOKEN_KEY);
}
