export default function PrivacyPage() {
  return (
    <main className="legalPage">
      <h1>Privacy Policy</h1>
      <p>Last updated: July 2026</p>

      <h2>1. Who we are</h2>
      <p>
        SpiteCash is a consumer-friction research project. We collect user-submitted
        evidence about digital subscriptions, free trials, cancellation flows, refund
        delays, and unexpected charges. Friction Alpha uses anonymized and aggregated
        data to create subscription-friction insights.
      </p>

      <h2>2. What data we collect</h2>
      <p>When you submit a case, we may collect:</p>
      <ul>
        <li>Your email address for contact and bounty communication.</li>
        <li>Your country.</li>
        <li>The app or merchant name and website.</li>
        <li>Charge amount, currency, and charge date.</li>
        <li>Information about reminders, cancellation, refunds, and switching intent.</li>
        <li>Files you upload as evidence, such as screenshots or PDFs.</li>
      </ul>

      <h2>3. What not to upload</h2>
      <p>
        Do not upload full card numbers, passwords, identity documents, full bank
        account details, or other sensitive banking information. If we detect sensitive
        data, we may reject or delete the file.
      </p>

      <h2>4. Why we process this data</h2>
      <p>We process submitted data to:</p>
      <ul>
        <li>Review and validate consumer-friction events.</li>
        <li>Calculate a preliminary SpiteScore.</li>
        <li>Contact you about your submission or bounty eligibility.</li>
        <li>Create anonymized and aggregated research reports.</li>
        <li>Improve our fraud prevention and evidence review workflow.</li>
      </ul>

      <h2>5. Legal basis</h2>
      <p>
        We rely on your consent for processing your submission for research purposes.
        We may also process limited operational data where necessary to run the service,
        prevent abuse, and maintain records of bounty approvals.
      </p>

      <h2>6. How we use anonymized data</h2>
      <p>
        We may use aggregated, anonymized information in reports, dashboards, or research
        outputs. We do not sell your personal identity, email address, payment details,
        or raw uploaded evidence.
      </p>

      <h2>7. Data retention</h2>
      <p>
        We keep submitted data only as long as needed for validation, fraud prevention,
        bounty records, and aggregated research. Test submissions and rejected files may
        be deleted earlier.
      </p>

      <h2>8. Your rights</h2>
      <p>
        Depending on your location, you may have rights to access, correct, delete,
        restrict, object to processing, or request portability of your personal data.
        You may also withdraw consent where processing is based on consent.
      </p>

      <h2>9. Contact</h2>
      <p>
        To request access, correction, or deletion of your data, contact us at:
        privacy@spitecash.com
      </p>

      <p className="legalNote">
        This is an MVP privacy notice and should be reviewed before public launch.
      </p>
    </main>
  );
}