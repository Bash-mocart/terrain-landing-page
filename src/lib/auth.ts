import { api, clearSession, getStoredRefreshToken } from "./api";
import type {
  AuthSessionResponse,
  OtpRequestResponse,
  PhoneCheckResponse,
} from "./types";

export function checkPhone(phone: string) {
  return api.post<PhoneCheckResponse>("/v1/auth/phone/check", { phone });
}

export function startSignup(phone: string, firstName: string, lastName: string) {
  return api.post<OtpRequestResponse>("/v1/auth/signup/start", {
    phone,
    first_name: firstName,
    last_name: lastName,
    channel: "sms",
  });
}

export function requestOtp(phone: string) {
  return api.post<OtpRequestResponse>("/v1/auth/otp/request", {
    phone,
    channel: "sms",
  });
}

export function verifyOtp(phone: string, code: string) {
  return api.post<AuthSessionResponse>("/v1/auth/otp/verify", {
    phone,
    code,
  });
}

export async function logout(): Promise<void> {
  const refreshToken = getStoredRefreshToken();
  try {
    if (refreshToken) {
      await api.post("/v1/auth/logout", { refresh_token: refreshToken });
    }
  } finally {
    clearSession();
  }
}
