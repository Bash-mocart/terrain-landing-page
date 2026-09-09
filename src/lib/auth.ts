import { api } from "./api";
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
