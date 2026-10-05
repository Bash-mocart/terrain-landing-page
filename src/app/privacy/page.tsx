import type { Metadata } from "next";
import Link from "next/link";
import { LegalHeading, LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy policy · Terrain",
  description:
    "What Terrain collects, why, who we share it with, how long we keep it, and your rights under the Nigeria Data Protection Act.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      lede="This explains what Terrain collects when you use the Terrain app or terrain.ng, why we need it, who sees it, how long we keep it, and what you can ask us to do. We follow the Nigeria Data Protection Act 2023."
    >
      <LegalHeading id="short-version">The short version</LegalHeading>
      <ul>
        <li>
          We collect what we need to run a safe property marketplace: your
          phone number, name, the listings and messages you send, and, for
          companies, the details we use to verify them.
        </li>
        <li>
          Chats, offer letters and deal records are kept on record. That is
          the point: it protects buyers and honest companies when something
          goes wrong.
        </li>
        <li>
          We do not sell your data. The app has no advertising or analytics
          trackers, and we do not track you across other apps or websites.
        </li>
        <li>
          You can see, correct and delete your account in the app. Some
          records stay after deletion, and we say exactly which below.
        </li>
      </ul>

      <LegalHeading id="who-we-are">1. Who we are</LegalHeading>
      <p>
        Terrain is a Nigerian marketplace for land and homes from verified
        real estate companies. &ldquo;Terrain&rdquo;, &ldquo;we&rdquo; and
        &ldquo;us&rdquo; mean the company that runs the Terrain app and
        terrain.ng. We decide how your personal data is used, so we are its
        data controller.
      </p>

      <LegalHeading id="what-we-collect">2. What we collect</LegalHeading>

      <h3>Your account</h3>
      <ul>
        <li>
          <strong>Phone number.</strong> You sign in with it, and we verify it
          by sending a one-time code by SMS.
        </li>
        <li>
          <strong>Name and email address.</strong> We verify your email with
          a code too. If you choose to sign in with Google, Google shares your
          name and email address with us.
        </li>
        <li>
          <strong>Profile details you choose to add:</strong> a photo, a short
          bio, the area you are based in (typed by you), and, for people
          selling, links to your WhatsApp, social media or website. These are
          shown on your public profile.
        </li>
        <li>
          <strong>What you are looking for.</strong> When you sign up we ask
          what kind of property you want, where, and your budget, so we can
          show you the right listings.
        </li>
        <li>
          <strong>Saved listings and companies you follow.</strong>
        </li>
      </ul>

      <h3>Location</h3>
      <p>
        If you allow it, the app uses your phone&rsquo;s location while you
        are using it: to show you on the map, to start the map in your state,
        to fill in &ldquo;use current location&rdquo;, and to help a company
        place a listing on the map. To turn your position into an area name
        (such as your state), the app sends it to our map provider, Mapbox.
        Terrain&rsquo;s own servers do not receive or store your device
        location. The app remembers the area it found on your phone. You can
        turn location off at any time in your phone&rsquo;s settings and
        choose an area yourself.
      </p>
      <p>
        When a company places a listing using its current location, that
        point becomes the listing&rsquo;s location, which buyers can see.
      </p>

      <h3>Listings and files companies upload</h3>
      <p>
        Photos, videos and 360&deg; room photos, title documents, the
        listing&rsquo;s address, map location and boundaries, prices and
        descriptions. If a company imports a video from an Instagram or
        TikTok post, we store the post link and account name with it.
      </p>

      <h3>Chats, calls and deals</h3>
      <ul>
        <li>
          <strong>Messages</strong>, and any voice notes, photos or files sent
          in the chat, are stored on Terrain&rsquo;s own chat server and kept
          on record. They cannot be edited or deleted after sending. Chats are
          not end-to-end encrypted: our server can read them, which is what
          lets us keep a reliable record, check for fraud, and help in a
          dispute.
        </li>
        <li>
          <strong>Calls</strong> are connected through our own call server.
          We do not record calls. The chat shows that a call happened, and
          when.
        </li>
        <li>
          <strong>Offer letters and signatures.</strong> When a buyer signs an
          offer letter we keep the letter, the drawn signature, the typed name,
          the email address verified for signing, the consent wording agreed
          to, the time, and the IP address and device used. These appear on an
          audit page in the signed copy.
        </li>
        <li>
          <strong>Reports and blocks.</strong> If you report a listing or a
          chat, we keep the reason, any note you add, and whether you lost
          money. The company does not see who reported it. We also keep a
          record of blocks.
        </li>
      </ul>

      <h3>Company verification</h3>
      <p>
        Before a company can list, we verify it. We collect the
        company&rsquo;s CAC registration (RC) number, registered name,
        business address, CAC certificate and logo, and, from the person
        applying, their National Identification Number (NIN), a contact
        phone number and a social media handle we can check. We may also
        record the company&rsquo;s registered status and director names from
        the CAC register.
      </p>
      <p>
        <strong>We do not store your NIN in readable form.</strong> It is
        stored only as a one-way keyed hash (HMAC) made with a secret key held
        on our servers, so it cannot be read back. It is never shown to
        buyers. We do not collect selfies or photos of ID cards.
      </p>

      <h3>Device and usage</h3>
      <ul>
        <li>
          <strong>Notifications.</strong> If you allow notifications, Apple
          gives your iPhone a push token. We store it on our chat server so we
          can tell you about new messages and calls. It is removed when you
          sign out.
        </li>
        <li>
          <strong>App and device details.</strong> With each request the app
          sends its version, your phone&rsquo;s model and its operating system
          version. It does not send your phone&rsquo;s name.
        </li>
        <li>
          <strong>Listing views.</strong> The app creates a random ID when it
          is installed, so we can count how many different people view a
          listing. If you are signed in, the view is linked to your account.
        </li>
        <li>
          <strong>Server logs.</strong> Our servers log each request&rsquo;s
          address, time, result and IP address, for security and to fix
          problems. They do not log what you send. These logs are kept for a
          short time and overwritten automatically.
        </li>
      </ul>
      <p>
        The app does not use advertising or analytics software, and does not
        read your contacts.
      </p>

      <h3>On terrain.ng</h3>
      <p>
        If you join the waitlist, we keep the email address or WhatsApp number
        you give us and the page or campaign link you came from. If you sign
        in on the website, your browser stores your session. Some campaign
        pages use the Meta Pixel to measure whether our adverts work; it sends
        Meta details of your visit to that page.
      </p>

      <LegalHeading id="why">3. Why we use it, and our legal basis</LegalHeading>
      <p>
        Under the Nigeria Data Protection Act 2023, we need a lawful basis for
        each use of your data. We rely on:
      </p>
      <ul>
        <li>
          <strong>Providing Terrain to you</strong> (performing our contract
          with you): creating and securing your account, showing listings,
          saving what you save, delivering messages and calls, sending
          notifications, offer letters and sign-in codes.
        </li>
        <li>
          <strong>Our legitimate interests in keeping Terrain safe</strong>:
          verifying companies and listings, keeping the chat and deal record,
          checking messages for fraud, handling reports, preventing abuse, and
          counting listing views so companies know their listings are seen. We
          balance these against your rights, and you can object (section 7).
        </li>
        <li>
          <strong>Legal obligations</strong>: keeping records the law requires
          and responding to lawful requests from courts, the police or
          regulators.
        </li>
        <li>
          <strong>Your consent</strong>: location, notifications and the
          website&rsquo;s Meta Pixel. You can withdraw consent at any time in
          your phone or browser settings.
        </li>
      </ul>

      <LegalHeading id="sharing">4. Who we share it with</LegalHeading>
      <p>We do not sell personal data. We share it only as follows.</p>
      <h3>Other Terrain users</h3>
      <ul>
        <li>
          Your public profile (name, photo, bio, area and any links you add)
          and, for companies, the company page, listings and verified status.
        </li>
        <li>
          The people in a chat see the messages, files, offer letters and
          deal updates in it. In a chat with a company, the company&rsquo;s
          team members can see it.
        </li>
      </ul>
      <h3>Service providers who work for us</h3>
      <p>
        They may use your data only to provide their service to us:
      </p>
      <ul>
        <li>
          <strong>Hetzner</strong>: hosts our servers, database and chat
          server.
        </li>
        <li>
          <strong>Cloudflare</strong>: stores photos, videos, documents, voice
          notes and signatures (Cloudflare R2) and delivers them quickly.
        </li>
        <li>
          <strong>Amazon Web Services</strong> (Amazon SNS): sends SMS sign-in
          codes to your phone number.
        </li>
        <li>
          <strong>Resend</strong>: sends emails, such as email sign-in and
          signing codes and team invites.
        </li>
        <li>
          <strong>Apple</strong>: delivers notifications to iPhones.
        </li>
        <li>
          <strong>Mapbox</strong>: provides maps and turns locations into
          place names. The Mapbox software in the app may also collect
          technical and location data under{" "}
          <a href="https://www.mapbox.com/legal/privacy">
            Mapbox&rsquo;s privacy policy
          </a>
          .
        </li>
        <li>
          <strong>Google</strong>: only if you choose to sign in with Google.
        </li>
        <li>
          <strong>Meta</strong>: only through the Meta Pixel on some website
          campaign pages.
        </li>
      </ul>
      <h3>When the law requires it, or to protect people</h3>
      <p>
        We may share information with the police, courts or regulators when
        the law requires it, or when it is needed to prevent fraud or protect
        someone&rsquo;s safety. If Terrain is ever sold or merged, your data
        would move with it under this policy, and we would tell you first.
      </p>

      <LegalHeading id="transfers">5. Data outside Nigeria</LegalHeading>
      <p>
        Our servers and some of the providers above are outside Nigeria. When
        your data leaves Nigeria, we only send it where the Nigeria Data
        Protection Act allows, with providers bound by contract to protect it.
      </p>

      <LegalHeading id="retention">6. How long we keep it</LegalHeading>
      <p>
        We keep your account details while your account is open. When you
        delete your account (Profile, then Delete account):
      </p>
      <ul>
        <li>
          <strong>Straight away</strong>, your account is closed, you are
          signed out everywhere, and your listings come down. If you run a
          company on your own, the company closes and its listings come down
          too.
        </li>
        <li>
          <strong>For 30 days</strong> you can change your mind: signing back
          in cancels the deletion and restores your listings.
        </li>
        <li>
          <strong>After 30 days</strong> we erase your name, phone number,
          email, photo, bio, area, links, what you said you are looking for,
          your saved listings and follows, and your sign-in sessions and codes. From your
          company verification we erase your NIN hash, documents and contact
          details. The company&rsquo;s public register details (its RC number,
          registered name and directors) stay with the company.
        </li>
      </ul>
      <p>Some records are kept after deletion, because others rely on them:</p>
      <ul>
        <li>
          <strong>Chats</strong> stay for the other people in them, with your
          name shown as &ldquo;Deleted user&rdquo;.
        </li>
        <li>
          <strong>Offer letters and deal records</strong> are kept exactly as
          signed, including the signer details listed above. They are the
          legal record of an agreement between a buyer and a company.
        </li>
        <li>
          <strong>Reports and blocks</strong>, so we can handle fraud
          properly.
        </li>
        <li>
          <strong>Listing view counts.</strong>
        </li>
      </ul>
      <p>
        Copies of photos and files you uploaded can remain in our file storage
        after erasure, no longer linked to your name. If you want them removed
        sooner, ask us and we will delete them unless they form part of a deal
        record.
      </p>
      <p>
        Waitlist sign-ups are kept until you ask us to remove them.
      </p>

      <LegalHeading id="rights">7. Your rights</LegalHeading>
      <p>Under the Nigeria Data Protection Act you can ask us to:</p>
      <ul>
        <li>tell you what personal data we hold about you and give you a copy;</li>
        <li>correct anything that is wrong (most of it you can edit in Profile);</li>
        <li>
          delete your data (in the app: Profile, then Delete account), subject
          to the records described in section 6;
        </li>
        <li>restrict how we use it, or object to a use based on our legitimate interests;</li>
        <li>give you your data in a format you can take elsewhere;</li>
        <li>stop a use you consented to, at any time.</li>
      </ul>
      <p>
        Contact us as shown in section 11. We will answer within the time the
        law sets, and we may ask you to confirm it is really you. If you are
        not happy with our answer, you can complain to the{" "}
        <a href="https://ndpc.gov.ng">Nigeria Data Protection Commission</a>.
      </p>

      <LegalHeading id="security">8. Keeping it safe</LegalHeading>
      <p>
        Data travels to and from Terrain encrypted. Sign-in and signing codes
        are stored only as hashes, NIN numbers only as a keyed hash, and the
        app keeps your sign-in in your phone&rsquo;s secure storage. Only staff
        who need it can see your data. No system is perfectly secure; if a
        breach puts you at risk, we will tell you and the Nigeria Data
        Protection Commission as the law requires.
      </p>

      <LegalHeading id="children">9. Children</LegalHeading>
      <p>
        Terrain is for adults. You must be 18 or older to use it. We do not
        knowingly collect data from anyone under 18, and if we learn we have,
        we will delete it.
      </p>

      <LegalHeading id="changes">10. Changes to this policy</LegalHeading>
      <p>
        When we change how we use your data, we will update this page. If a
        change matters to you, we will tell you in the app or by email before
        it takes effect.
      </p>

      <LegalHeading id="contact">11. Contact us</LegalHeading>
      <p>
        For any privacy question or request, talk to us in the app (Profile,
        then Help &amp; safety) or on WhatsApp at{" "}
        <a href="https://wa.me/2348147746701">+234 814 774 6701</a>. Our{" "}
        <Link href="/terms">Terms</Link> explain the rules for using Terrain.
      </p>
    </LegalPage>
  );
}
