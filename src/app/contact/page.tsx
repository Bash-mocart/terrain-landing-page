import type { Metadata } from "next";
import { LegalHeading, LegalPage } from "@/components/LegalPage";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Contact · Terrain",
  description: `How to reach Terrain: email, phone and WhatsApp, and the registered address of ${LEGAL.name}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <LegalPage
      title="Contact us"
      lede="Questions about a listing, your account, a deal or your data. If you use the Terrain app, the quickest way is the support chat: Profile, then Help & safety."
    >
      <LegalHeading id="support">Support</LegalHeading>
      <ul>
        <li>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>
        </li>
        <li>
          <strong>Phone and WhatsApp:</strong>{" "}
          <a href={LEGAL.tel}>{LEGAL.phone}</a> (
          <a href={LEGAL.whatsapp}>message on WhatsApp</a>)
        </li>
      </ul>

      <LegalHeading id="company">The company</LegalHeading>
      <p>
        Terrain is run by {LEGAL.name}, incorporated with the Corporate
        Affairs Commission of Nigeria on {LEGAL.incorporated}.
      </p>
      <ul>
        <li>
          <strong>Registration number:</strong> {LEGAL.rc}
        </li>
        <li>
          <strong>Registered address:</strong> {LEGAL.address}
        </li>
      </ul>
    </LegalPage>
  );
}
