import { OtpForm } from "./OtpForm";

export default async function OtpPage({
  searchParams,
}: {
  searchParams: Promise<{ phone?: string | string[] }>;
}) {
  const rawPhone = (await searchParams).phone;
  const phone = typeof rawPhone === "string" ? rawPhone : "";
  return <OtpForm phone={phone} />;
}
