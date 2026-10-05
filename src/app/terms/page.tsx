import type { Metadata } from "next";
import Link from "next/link";
import { LegalHeading, LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms · Terrain",
  description:
    "The rules for using Terrain: what Terrain is, what buyers and companies agree to, and what happens when something goes wrong.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      lede="These terms are the agreement between you and Terrain when you use the Terrain app or terrain.ng. Please read them. By creating an account or using Terrain, you agree to them."
    >
      <LegalHeading id="what-terrain-is">1. What Terrain is</LegalHeading>
      <p>
        Terrain is a marketplace and records platform for land and homes in
        Nigeria. Real estate companies verified by Terrain list property.
        Buyers browse, save listings, and talk to companies in the Terrain
        chat, where offer letters and receipts are kept on record.
      </p>
      <p>
        <strong>Terrain never holds your money.</strong> There is no escrow.
        When you buy, you pay the company directly, as agreed between you and
        them. Terrain will never ask you to send money to Terrain or to anyone
        else. If someone asks you to pay to a different account, stop and
        report it to us.
      </p>
      <p>
        Terrain is not the seller, buyer, agent or lawyer in any deal. A sale
        is between the buyer and the company. We check companies and listings
        to reduce the risk of fraud, but a check is not a guarantee of title.
        Before you pay, we encourage you to do your own checks, including a
        search at the relevant land registry and advice from a lawyer and a
        surveyor.
      </p>

      <LegalHeading id="your-account">2. Your account</LegalHeading>
      <ul>
        <li>You must be at least 18 years old to use Terrain.</li>
        <li>
          You sign in with your phone number, which we verify with a code. You
          may also add and verify an email address, or sign in with Google.
        </li>
        <li>
          The details you give us must be true and your own. One person, one
          account.
        </li>
        <li>
          Keep your phone and sign-in codes to yourself. You are responsible
          for what happens on your account. Tell us at once if you think
          someone else has used it.
        </li>
      </ul>

      <LegalHeading id="companies">3. If you sell on Terrain</LegalHeading>
      <p>
        Only companies verified by Terrain can list property. To be verified,
        a company must be registered with the Corporate Affairs Commission
        (CAC) and pass our checks. If you list or sell on Terrain, you agree
        that:
      </p>
      <ul>
        <li>
          The company details, CAC registration and documents you give us are
          genuine, current and yours to give.
        </li>
        <li>
          You have the right to sell, or to market for sale, every property you
          list, and the title documents you show are real.
        </li>
        <li>
          Your listings are accurate: location, boundaries, size, price, title
          and photos. You keep them up to date and take down what is no longer
          available.
        </li>
        <li>
          You own, or have permission to use, every photo, video and document
          you upload or import, including videos imported from social media
          accounts.
        </li>
        <li>
          You deal honestly with buyers, keep the conversation in the Terrain
          chat, and only ask buyers to pay into the company account named in
          your offer letter.
        </li>
        <li>
          You honour the offer letters you send, and you handle refunds and
          disputes with buyers fairly and promptly.
        </li>
      </ul>
      <p>
        You let Terrain show, copy and adapt (for example, resize or crop) the
        content you upload, so we can display your listings in the app, on
        terrain.ng and in links people share. This lasts while the content is
        on Terrain, and afterwards where it forms part of a deal record.
      </p>

      <LegalHeading id="chat-record">4. Chats, calls and the record</LegalHeading>
      <p>
        Conversations between buyers and companies happen in the Terrain chat
        so there is a record both sides can rely on. Messages, voice notes,
        files and offer letters cannot be edited or deleted once sent, by you
        or by the other side. Calls happen in the app and are not recorded,
        but the chat notes that a call took place.
      </p>
      <p>
        Our systems automatically check messages for signs of fraud, such as
        attempts to move a buyer off Terrain or to share outside payment
        details, and may show a safety reminder in the chat. Terrain staff may
        read a conversation when it is reported to us, when we are resolving a
        dispute, or when the law requires it.
      </p>

      <LegalHeading id="offer-letters">5. Offer letters</LegalHeading>
      <p>
        A company can send an offer letter in the chat, and a buyer can sign it
        in the app. An offer letter is an agreement between the buyer and the
        company. Terrain is not a party to it. Terrain provides the tool, keeps
        the signed copy, and adds an audit page showing who signed, the email
        they verified, when, and from which device and IP address. Both sides
        can rely on that record.
      </p>

      <LegalHeading id="prohibited">6. What you must not do</LegalHeading>
      <ul>
        <li>
          Commit or attempt fraud, including listing property you cannot sell,
          using fake documents, or asking for payment to an account that is not
          the company&rsquo;s.
        </li>
        <li>Pretend to be someone else, or another company.</li>
        <li>
          Harass, threaten or abuse anyone, or send hateful, sexual or violent
          content.
        </li>
        <li>
          Spam people, or use Terrain to advertise anything other than real
          property you are able to sell.
        </li>
        <li>
          Copy listings or data from Terrain in bulk, or use bots or scrapers.
        </li>
        <li>
          Interfere with Terrain, try to get into accounts or systems that are
          not yours, or get around our verification, reports or blocks.
        </li>
        <li>Break any Nigerian law, or help anyone else do so.</li>
      </ul>

      <LegalHeading id="reports">7. Reports, blocks and what we may do</LegalHeading>
      <p>
        You can report a listing or a conversation from inside the app, and
        you can block a conversation. A company does not see who reported it.
        We review reports and may contact both sides.
      </p>
      <p>
        If we believe someone has broken these terms, misled buyers, or put
        people at risk, we may, without notice where the risk is serious:
        remove or hide listings; remove a company&rsquo;s verified status;
        suspend or close an account or a company; keep records needed for a
        dispute or investigation; and report the matter to the police or the
        relevant regulator. Where we can, we will tell you what we did and
        why, and you can ask us to look at it again.
      </p>

      <LegalHeading id="fees">8. Fees</LegalHeading>
      <p>
        Terrain does not take payments in the app. If we introduce a fee for
        any part of Terrain, we will tell you the amount and what it is for
        before it applies to you.
      </p>

      <LegalHeading id="content">9. Terrain&rsquo;s content</LegalHeading>
      <p>
        The Terrain name, logo, app, website and the way they look belong to
        Terrain. You may use Terrain for its purpose, and share links to
        listings and companies, but you may not copy or reuse our brand or
        software without our written permission.
      </p>

      <LegalHeading id="liability">10. Our responsibility to you</LegalHeading>
      <p>
        We work hard to keep Terrain accurate, safe and available, but we
        provide it as it is. We cannot promise it will always be available or
        free of errors.
      </p>
      <p>
        Because Terrain is not a party to sales or offer letters and never
        holds your money, Terrain is not responsible for a company&rsquo;s or a
        buyer&rsquo;s acts, for the condition or title of a property, or for
        money paid between a buyer and a company. To the extent Nigerian law
        allows, Terrain is not liable for indirect or consequential loss, or
        for loss of profit or opportunity, arising from your use of Terrain.
      </p>
      <p>
        Nothing in these terms limits any right you have under Nigerian law
        that cannot be limited by agreement, including under the Federal
        Competition and Consumer Protection Act, or our liability for fraud or
        for death or injury caused by our negligence.
      </p>

      <LegalHeading id="ending">11. Closing your account</LegalHeading>
      <p>
        You can delete your account at any time in the app: Profile, then
        Delete account. Our <Link href="/privacy#retention">Privacy policy</Link>{" "}
        explains what we keep, such as chats and signed offer letters, and
        why. We may suspend or close an account as described in section 7.
      </p>

      <LegalHeading id="disputes">12. Disputes and governing law</LegalHeading>
      <p>
        If you have a problem with Terrain, please talk to us first through
        the in-app support chat or on WhatsApp at{" "}
        <a href="https://wa.me/2348147746701">+234 814 774 6701</a>, and we
        will try to put it right. These terms are governed by the laws of the
        Federal Republic of Nigeria, and the courts of Nigeria have
        jurisdiction over any dispute about them.
      </p>

      <LegalHeading id="changes">13. Changes to these terms</LegalHeading>
      <p>
        We may update these terms as Terrain changes or the law requires. If a
        change matters to you, we will tell you in the app or by email before
        it takes effect. If you keep using Terrain after that, the new terms
        apply. If you do not agree, you can delete your account.
      </p>

      <LegalHeading id="contact">14. Contact us</LegalHeading>
      <p>
        Talk to us in the app (Profile, then Help &amp; safety) or on WhatsApp
        at <a href="https://wa.me/2348147746701">+234 814 774 6701</a>.
      </p>
    </LegalPage>
  );
}
