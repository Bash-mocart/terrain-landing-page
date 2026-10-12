// The waitlist collects email only. Loose on purpose: it catches typos and
// phone numbers without rejecting unusual but valid addresses.
export const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
