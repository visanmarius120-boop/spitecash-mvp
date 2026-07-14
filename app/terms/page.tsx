export default function TermsPage() {
  return (
    <main className="legalPage">
      <h1>Terms of Use</h1>
      <p>Last updated: July 2026</p>

      <h2>1. What SpiteCash is</h2>
      <p>
        SpiteCash is a consumer-friction research tool. Users may submit evidence
        about digital subscriptions, free trials, cancellation difficulty, refund
        delays, and unexpected charges.
      </p>

      <h2>2. No refund or chargeback service</h2>
      <p>
        SpiteCash does not provide legal advice, financial advice, refund recovery,
        debt collection, or automated chargeback services. Submitting a case does not
        guarantee that you will receive a refund from a merchant.
      </p>

      <h2>3. Bounties</h2>
      <p>
        A submission that meets all criteria published on the{" "}
        <a href="/bounty-rules">Bounty Rules page</a> and was submitted while the
        monthly bounty pool was open receives a bounty of €3, paid within 7 days of
        approval. The Bounty Rules page is the authoritative list of qualification
        criteria, the monthly pool size, payment methods, and resubmission rules.
        Whether a submission meets the criteria is determined by our review of the
        evidence provided. A bounty is a reward for participating in a
        consumer-friction research study. It is not payment for a legal claim, debt,
        refund right, or personal data sale.
      </p>

      <h2>4. Submission rules</h2>
      <p>You agree that:</p>
      <ul>
        <li>Your submission is truthful to the best of your knowledge.</li>
        <li>You will not submit fake, manipulated, or misleading evidence.</li>
        <li>You will not upload full card numbers, passwords, identity documents, or sensitive banking data.</li>
        <li>You will not submit data about another person without permission.</li>
      </ul>

      <h2>5. Review and rejection</h2>
      <p>
        We may reject submissions that are incomplete, unverifiable, unsafe, duplicated,
        outside our accepted categories, or likely to contain sensitive data. If a
        submission is rejected, we tell you which criterion it failed, and you may
        correct and resubmit it once.
      </p>

      <h2>6. Research use</h2>
      <p>
        By submitting a case, you allow us to use anonymized and aggregated information
        from your submission for research, analytics, reports, and product development.
      </p>

      <h2>7. No merchant harassment</h2>
      <p>
        SpiteCash is not a tool for harassment, coordinated disputes, threats, or public
        attacks against merchants. We study friction patterns; we do not coordinate
        disputes against companies.
      </p>

      <h2>8. Changes</h2>
      <p>
        We may update these terms as the service evolves. Continued use of the service
        means you accept the updated terms.
      </p>

      <p className="legalNote">
        Questions about these terms: hello@spitecash.com
      </p>
    </main>
  );
}
