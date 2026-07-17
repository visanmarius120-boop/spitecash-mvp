// app/privacy/page.tsx
// Privacy policy — complete, production-ready. Covers case submissions,
// Exit Receipt lifecycle (creation → follow-up → outcome), processors,
// retention, and user rights.

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — SpiteCash",
  description:
    "How SpiteCash collects, uses, stores, and deletes your data: case submissions, Exit Receipts, evidence files, retention periods, and your rights.",
  alternates: { canonical: "https://spitecash.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="legalPage">
      <h1>Privacy Policy</h1>
      <p>Last updated: July 17, 2026 · Effective: July 17, 2026</p>

      <h2>1. Who we are</h2>
      <p>
        SpiteCash is a consumer-friction research project operated by Marius
        Visan, an independent freelancer based in Romania. We collect
        user-submitted evidence about digital subscriptions, free trials,
        cancellation flows, refund delays, and unexpected charges. Friction
        Alpha uses anonymized and aggregated data to create
        subscription-friction insights.
      </p>

      <h2>2. What data we collect</h2>
      <p>When you submit a bounty case, we may collect:</p>
      <ul>
        <li>Your email address for contact and bounty communication.</li>
        <li>Your country.</li>
        <li>The app or merchant name and website.</li>
        <li>Charge amount, currency, and charge date.</li>
        <li>Information about reminders, cancellation, refunds, and switching intent.</li>
        <li>Files you upload as evidence, such as screenshots or PDFs.</li>
      </ul>
      <p>When you create a free Exit Receipt, we collect:</p>
      <ul>
        <li>The merchant name and website.</li>
        <li>The subscription route (website, App Store, or Google Play).</li>
        <li>The date and time you cancelled.</li>
        <li>Your next expected billing date, if you provide it.</li>
        <li>Your email address, used for the receipt confirmation and the follow-up described in section 4.</li>
        <li>A SHA-256 fingerprint of any cancellation confirmation screenshot you upload. The fingerprint is stored permanently as proof of the file&apos;s existence at that date; the file itself is deleted after 90 days.</li>
      </ul>

      <h2>3. What not to upload</h2>
      <p>
        Do not upload full card numbers, passwords, identity documents, full
        bank account details, or other sensitive banking information. Blurring
        or cropping sensitive details from your own screenshots before
        uploading is encouraged and does not affect the validity of your
        evidence. If we detect unredacted sensitive data, we may reject or
        delete the file.
      </p>

      <h2>4. Why we process this data</h2>
      <p>We process submitted data to:</p>
      <ul>
        <li>Review and validate consumer-friction events against the six published bounty criteria.</li>
        <li>Calculate a preliminary SpiteScore.</li>
        <li>Contact you about your submission or bounty eligibility.</li>
        <li>Send you the Exit Receipt confirmation email at creation.</li>
        <li>Send one follow-up email after your next billing date — only if you provided that date when creating an Exit Receipt — asking whether the cancellation really worked, with one-click outcome options.</li>
        <li>If you report being charged again, pre-fill a bounty case with your Exit Receipt data so you do not have to re-enter it. Submitting that case remains your choice; it is reviewed against the same six criteria as any other submission.</li>
        <li>Create anonymized and aggregated research reports.</li>
        <li>Improve our fraud prevention and evidence review workflow.</li>
      </ul>

      <h2>5. Legal basis</h2>
      <p>
        We rely on your consent for processing your submission for research
        purposes, given when you submit a case or create an Exit Receipt. We
        may also process limited operational data where necessary to run the
        service, prevent abuse, and maintain records of bounty approvals
        (legitimate interest). You can withdraw consent at any time by
        requesting deletion (section 9).
      </p>

      <h2>6. Data processors and storage</h2>
      <p>Your data is stored and processed using the following providers:</p>
      <ul>
        <li><strong>Supabase</strong> (PostgreSQL database and file storage) — case data, Exit Receipts, and uploaded evidence.</li>
        <li><strong>Railway</strong> — application hosting.</li>
        <li><strong>Brevo</strong> — transactional email delivery (receipt confirmations and follow-ups). Brevo receives your email address and the message content only.</li>
      </ul>
      <p>
        We do not sell, rent, or share your personal identity, email address,
        payment details, or raw uploaded evidence with any third party for
        advertising or marketing purposes.
      </p>

      <h2>7. How we use anonymized data</h2>
      <p>
        We may use aggregated, anonymized information in reports, dashboards,
        per-merchant cancellation statistics, or research outputs. Public
        statistics are only shown for a merchant once a minimum number of
        validated cases exists, so no individual submission can be identified.
      </p>

      <h2>8. Data retention</h2>
      <p>We keep data for the following periods:</p>
      <ul>
        <li><strong>Evidence files (screenshots, PDFs) from bounty cases:</strong> deleted 90 days after the case decision.</li>
        <li><strong>Exit Receipt confirmation screenshots:</strong> deleted 90 days after the receipt is closed or the outcome is recorded. The SHA-256 fingerprint is retained as timestamp proof.</li>
        <li><strong>Your email address:</strong> kept until you ask us to delete it, or deleted after 2 years of inactivity.</li>
        <li><strong>Case facts (merchant, amount, date, difficulty):</strong> kept indefinitely in anonymized, aggregated form.</li>
        <li><strong>Exit Receipt outcome data (cancelled cleanly / charged again):</strong> kept indefinitely in anonymized form to power per-merchant cancellation statistics.</li>
      </ul>

      <h2>9. Your rights</h2>
      <p>
        Depending on your location (including under the GDPR if you are in the
        EU/EEA), you have the right to access, correct, delete, restrict, or
        object to the processing of your personal data, and to request
        portability. You may also withdraw consent where processing is based
        on consent. To exercise any of these rights, contact us at the address
        below; we respond within 30 days.
      </p>

      <h2>10. Changes to this policy</h2>
      <p>
        If we change this policy, we update the date at the top of this page.
        For material changes affecting how your existing data is used, we will
        notify you by email before the change takes effect.
      </p>

      <h2>11. Contact</h2>
      <p>
        To request access, correction, or deletion of your data, contact us
        at: privacy@spitecash.com
      </p>
    </main>
  );
}
