// app/about/page.tsx
// Who is behind SpiteCash — the trust page.
// Marius Visan.
// They render with a yellow warning style until replaced, on purpose.

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — who is behind SpiteCash",
  description:
    "Who runs SpiteCash, why it exists, exactly what happens to your data, and what we are not. We ask you for payment screenshots — you deserve to know who is asking.",
  alternates: { canonical: "https://spitecash.com/about" },
};

// ─────────────────────────────────────────────────────────────
// FILL THESE IN. Anything left containing "[" renders highlighted.
// ─────────────────────────────────────────────────────────────
const ID = {
  entity: "[LEGAL ENTITY NAME + FORM, e.g. SpiteCash SRL]",
  registration: "[COUNTRY, REGISTRY NO. / CUI]",
  founder: "[YOUR NAME]",
  founderLine: "[one honest sentence: background, why you built this]",
  contactEmail: "hello@spitecash.com",
  privacyEmail: "privacy@spitecash.com",
};

const DATA_ROWS = [
  {
    d: "Your screenshots",
    w: "Reviewed by a human to validate the case, then the case is scored. Never published, never shared with the merchant.",
    k: "Deleted 90 days after case decision",
  },
  {
    d: "Your email",
    w: "Case updates and paying your bounty. Alternatives and project updates only if you ticked those boxes.",
    k: "Until you ask us to delete it",
  },
  {
    d: "Case facts (app, amount, date, cancel difficulty)",
    w: "Anonymized and aggregated into per-merchant friction statistics. This is the radar.",
    k: "Indefinitely, anonymized",
  },
];

const NOT_LIST = [
  ["Not a refund service.", "We do not get your money back and we do not promise to. Some banks and merchants respond to disputes; that is between you and them."],
  ["Not a chargeback firm.", "We never contact your bank, your card issuer, or the merchant on your behalf."],
  ["Not a court.", "A validated case means the evidence was coherent — it is not a legal finding against anyone."],
  ["Not free of interest.", "If you tick \u201Ccontact me about alternatives\u201D, we may recommend competing products, and some recommendations earn us a commission. That commission is what funds the bounty pool — we would rather tell you that here than have you wonder."],
];

const ph = (v: string) =>
  v.includes("[") ? <span className="sc-todo">{v}</span> : <>{v}</>;

export default function AboutPage() {
  return (
    <div className="sc-page">
      <style>{CSS}</style>
      <header className="sc-header">
        <div className="sc-wrap sc-headrow">
          <a className="sc-wordmark" href="/">Spite<em>Cash</em></a>
          <nav>
            <a href="/how-it-works">How it works</a>
            <a href="/bounty-rules">Bounty rules</a>
            <a href="/payouts">Payouts</a>
          </nav>
        </div>
      </header>

      <main className="sc-wrap">
        <h1>We ask you for payment screenshots.<br />You deserve to know who is asking.</h1>
        <p className="sc-lede">
          This page exists because a site that collects proof of charges owes you more
          transparency than the apps that charged you. Here is who we are, what happens
          to your data, and what we are not.
        </p>

        <span className="sc-kicker">Who runs SpiteCash</span>
        <div className="sc-idcard">
          <div className="sc-row"><b>Operated by</b><span>{ph(ID.entity)}</span></div>
          <div className="sc-row"><b>Registration</b><span>{ph(ID.registration)}</span></div>
          <div className="sc-row"><b>Founder</b><span>{ph(ID.founder)} — {ph(ID.founderLine)}</span></div>
          <div className="sc-row"><b>Contact</b><span><a href={`mailto:${ID.contactEmail}`}>{ID.contactEmail}</a> — a human reads this inbox, replies within 48h</span></div>
          <div className="sc-row"><b>Data questions</b><span><a href={`mailto:${ID.privacyEmail}`}>{ID.privacyEmail}</a> — access, correction, deletion requests under GDPR</span></div>
        </div>

        <span className="sc-kicker">Why this exists</span>
        <p className="sc-body">
          Subscription apps have quietly perfected the one-way door: one tap to start a
          trial, a maze to leave it. The charge is small enough that most people swallow
          it — which is exactly why it keeps happening. Individually, a €9.99 surprise
          charge is an annoyance. Aggregated across thousands of people, it is a
          measurable pattern: which apps charge without warning, which make cancellation
          hard, which refuse refunds.
        </p>
        <p className="sc-body">
          SpiteCash collects the evidence, pays you for it, and turns the aggregate into
          a public early-warning radar. The apps profit from friction being invisible.
          We make it visible.
        </p>

        <span className="sc-kicker">Exactly what happens to your data</span>
        <table className="sc-data">
          <thead><tr><th>Data</th><th>What we do with it</th><th>Kept for</th></tr></thead>
          <tbody>
            {DATA_ROWS.map((r, i) => (
              <tr key={i}><td>{r.d}</td><td>{r.w}</td><td>{r.k}</td></tr>
            ))}
            <tr>
              <td>What we never collect</td>
              <td colSpan={2}>Full card numbers, IBANs, passwords, ID documents. Submissions containing them are rejected.</td>
            </tr>
          </tbody>
        </table>
        <p className="sc-body">
          The long version is in the <a href="/privacy">privacy policy</a>. The short
          version is a principle: <strong>your evidence powers statistics, never
          exposure.</strong> No merchant will ever see your case; they will only ever
          see their own aggregate score.
        </p>

        <span className="sc-kicker">What we are not</span>
        <ul className="sc-list sc-bad">
          {NOT_LIST.map(([t, d], i) => (
            <li key={i}><b>{t}</b> {d}</li>
          ))}
        </ul>

        <span className="sc-kicker">The receipts</span>
        <p className="sc-body">
          Talk is cheap; we publish ours. Every bounty we pay is listed on the{" "}
          <a href="/payouts">wall of payouts</a> and the rules we pay by are fixed on
          the <a href="/bounty-rules">bounty rules page</a> — €3 per valid case,
          guaranteed, 7-day deadline, capped pool shown live. Hold us to it.
        </p>

        <div className="sc-cta">
          <h2>Charged after a free trial?</h2>
          <a className="sc-btn" href="/#form">Submit my case</a>
        </div>
      </main>

      <footer className="sc-footer">
        <div className="sc-wrap">
          <a href="/how-it-works">How it works</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Use</a>
          <a href="/bounty-rules">Bounty rules</a>
          <p>SpiteCash documents subscription friction. We do not promise refunds, we do not initiate chargebacks, and we do not sell personal data.</p>
        </div>
      </footer>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=IBM+Plex+Mono:wght@400;500;700&display=swap');
.sc-page{--paper:#fff;--ink:#16130f;--muted:#6f6a60;--line:#e4e0d8;--green:#0b7a45;--red:#c43a2e;
font-family:'Space Grotesk',-apple-system,sans-serif;background:var(--paper);color:var(--ink);line-height:1.65;font-size:16.5px;min-height:100vh}
.sc-page *{box-sizing:border-box;margin:0;padding:0}
.sc-mono{font-family:'IBM Plex Mono',ui-monospace,monospace}
.sc-page a{color:var(--ink);text-decoration:underline;text-underline-offset:3px}
.sc-page a:hover{color:var(--green)}
.sc-page a:focus-visible{outline:3px solid var(--green);outline-offset:2px}
.sc-wrap{max-width:760px;margin:0 auto;padding:0 20px}
.sc-header{border-bottom:2px solid var(--ink);padding:16px 0}
.sc-headrow{display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap}
.sc-wordmark{font-weight:700;font-size:19px;text-decoration:none!important}
.sc-wordmark em{font-style:normal;color:var(--green)}
.sc-header nav a{font-size:14px;color:var(--muted);text-decoration:none;margin-left:18px}
.sc-header nav a:hover{color:var(--ink)}
.sc-page h1{font-size:clamp(30px,6vw,44px);line-height:1.08;font-weight:700;letter-spacing:-.02em;margin:44px 0 14px}
.sc-lede{font-size:19px;color:var(--muted);max-width:58ch}
.sc-kicker{font-family:'IBM Plex Mono',monospace;font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--green);font-weight:700;margin-top:44px;display:block}
.sc-page h2{font-size:22px;margin:8px 0;letter-spacing:-.01em}
.sc-body{margin:13px 0;max-width:66ch}
.sc-idcard{border:1.5px solid var(--ink);margin:22px 0}
.sc-row{display:flex;gap:14px;padding:13px 18px;border-bottom:1px solid var(--line);flex-wrap:wrap}
.sc-row:last-child{border-bottom:none}
.sc-row b{font-family:'IBM Plex Mono',monospace;font-size:11.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);font-weight:600;flex:0 0 170px;padding-top:2px}
.sc-row span{flex:1;min-width:200px}
.sc-todo{background:#fff8e6;border:1px dashed #b07a00;color:#7a5500;padding:1px 6px;font-family:'IBM Plex Mono',monospace;font-size:13px}
.sc-data{width:100%;border-collapse:collapse;margin:18px 0;font-size:15px}
.sc-data th{font-family:'IBM Plex Mono',monospace;font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;text-align:left;color:var(--muted);border-bottom:2px solid var(--ink);padding:9px 10px}
.sc-data td{border-bottom:1px solid var(--line);padding:11px 10px;vertical-align:top}
.sc-data td:first-child{font-weight:700}
.sc-list{list-style:none;margin:14px 0}
.sc-list li{padding:9px 0 9px 28px;position:relative;border-bottom:1px solid var(--line)}
.sc-bad li::before{content:"\\2715";position:absolute;left:0;color:var(--red);font-family:'IBM Plex Mono',monospace;font-weight:700}
.sc-cta{margin:44px 0;border-top:2px solid var(--ink);padding-top:28px}
.sc-btn{display:inline-block;background:var(--green);color:#fff!important;font-weight:700;padding:14px 26px;text-decoration:none!important;font-size:16px;margin-top:8px}
.sc-btn:hover{background:#095f36}
.sc-footer{border-top:1px solid var(--line);margin-top:60px;padding:24px 0 44px;font-size:13.5px;color:var(--muted)}
.sc-footer a{color:var(--muted);margin-right:16px}
.sc-footer p{margin-top:10px}
@media(prefers-reduced-motion:reduce){.sc-page *{transition:none!important;animation:none!important}}
`;
