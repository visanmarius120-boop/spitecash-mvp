import { SpiteEventForm } from "@/components/SpiteEventForm";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="heroText">
          <p className="eyebrow">SpiteCash</p>

          <h1>Did an app charge you after a free trial?</h1>

          <p className="lead">
            Submit proof. If the event is valid, you may receive up to €3. We
            use anonymized data to build an early-warning radar for toxic
            trials, aggressive subscriptions, and hard-to-cancel digital
            products.
          </p>

          <a href="#form" className="cta">
            Submit my case
          </a>

          <div className="cards">
            <article>
              <h2>1. Submit your case</h2>
              <p>
                Tell us the app, amount, charge date, and what felt unfair or
                confusing.
              </p>
            </article>

            <article>
              <h2>2. We review it manually</h2>
              <p>
                We check the evidence and mark the event as valid, incomplete,
                or rejected.
              </p>
            </article>

            <article>
              <h2>3. Valid cases may get paid</h2>
              <p>
                Clear, recent, and relevant cases may receive a micro-bounty of
                up to €3.
              </p>
            </article>
          </div>

          <section className="infoBox">
            <h2>We currently accept</h2>
            <ul>
              <li>AI tools</li>
              <li>VPN apps</li>
              <li>Photo/video apps</li>
              <li>Cloud storage apps</li>
              <li>Language learning apps</li>
              <li>Similar digital subscriptions</li>
            </ul>
          </section>

          <section className="infoBox warning">
            <h2>Do not send</h2>
            <ul>
              <li>Full card numbers</li>
              <li>Passwords</li>
              <li>Identity documents</li>
              <li>Sensitive banking data</li>
              <li>Fake cases</li>
              <li>Data about other people</li>
            </ul>
          </section>

          <section className="note">
            <h2>You do not need to argue with anyone.</h2>
            <p>
              We care about evidence of subscription friction, not drama. We do
              not promise refunds, we do not initiate chargebacks, and we do not
              sell personal data.
            </p>
          </section>
        </div>

        <div id="form" className="formShell">
          <SpiteEventForm />
        </div>
      </section>

      <footer className="footer">
        <a href="/how-it-works">How it works</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Use</a>
      </footer>
    </main>
  );
}