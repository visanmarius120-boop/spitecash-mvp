export default function HowItWorksPage() {
  return (
    <main className="legalPage">
      <h1>How SpiteCash Works</h1>

      <p>
        Need to cancel a subscription first? Start with our free{" "}
        <a href="/cancel">step-by-step cancellation guides</a> — then come back
        here if you were charged after a trial.
      </p>

      <h2>1. You submit a case</h2>
      <p>
        Tell us which app charged you, how much you were charged, when it happened,
        and whether the trial, reminder, cancellation, refund, or renewal process felt
        confusing or aggressive.
      </p>

      <h2>2. You upload evidence</h2>
      <p>
        Upload trial proof and payment proof. Before uploading, hide full card numbers,
        passwords, bank account details, identity documents, and other sensitive data.
      </p>

      <h2>3. The system calculates a preliminary score</h2>
      <p>
        Our MVP calculates a SpiteScore based on evidence, charge recency, cancellation
        difficulty, reminder clarity, amount, switch intent, and repeated merchant
        patterns.
      </p>

      <h2>4. We review bounty cases</h2>
      <p>
        High-scoring cases may be reviewed manually before any bounty is approved.
        This helps reduce fraud and prevents unsafe evidence from being used.
      </p>

      <h2>5. Valid cases get €3 — guaranteed</h2>
      <p>
        If your case meets all{" "}
        <a href="/bounty-rules">six published criteria</a> and was submitted while
        the monthly bounty pool was open, you get €3 — paid within 7 days of
        approval, and published on the{" "}
        <a href="/payouts">public wall of payouts</a>. The bounty is a reward for
        participating in consumer-friction research. It is not a refund and does
        not transfer any legal claim to us.
      </p>

      <h2>6. Aggregated data becomes Friction Alpha</h2>
      <p>
        SpiteCash submissions help build Friction Alpha: an early-warning system for
        toxic subscription revenue, aggressive trials, cancellation friction, and
        switch-intent signals.
      </p>
    </main>
  );
}
