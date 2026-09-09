import { api } from "./api";
import type { AccountUpdate, AuthUser } from "./types";

export function getCurrentUser() {
  return api.get<AuthUser>("/v1/auth/me");
}

export function updateCurrentUser(changes: AccountUpdate) {
  return api.patch<AuthUser>("/v1/auth/me", changes);
}
