// app/bounty-rules/page.tsx
// The €3 bounty contract — replaces every "up to €3" with a firm, published promise.
// Self-contained: no external components, no Tailwind assumptions.

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The €3 Bounty Rules — SpiteCash",
  description:
    "€3 per valid case, guaranteed — not 'up to'. The exact criteria your submission must meet, how fast we pay, and what disqualifies a case. Published so you can hold us to it.",
  alternates: { canonical: "https://spitecash.com/bounty-rules" },
};

const CRITERIA = [
  {
    t: "The charge is recent: within the last 90 days.",
    w: "Why: the radar we are building tracks live friction, not history. Older cases are still welcome — they just do not pay.",
  },
  {
    t: "The product is in a covered category.",
    w: "AI tools, VPNs, photo/video apps, cloud storage, language learning, and similar digital subscriptions. Physical goods, banks, telecoms and utilities do not qualify yet.",
  },
  {
    t: "Both proofs are uploaded: trial proof and payment proof.",
    w: "A trial confirmation (email or screenshot) and the charge itself (bank or card notification, or statement line). One without the other is an incomplete case.",
  },
  {
    t: "The proofs match: same merchant, same amount, coherent dates.",
    w: "The name on the charge must correspond to the app you named, and the charge date must fall after the trial start. Mismatches are the #1 rejection reason.",
  },
  {
    t: "Sensitive data is hidden before upload.",
    w: "Full card numbers, IBANs, passwords, ID documents — blur or crop them. We do not want them, and a submission containing them is rejected for your own protection.",
  },
  {
    t: "It is your first paid case for this merchant.",
    w: "One bounty per person per merchant, and at most 3 paid cases per person per calendar month. The radar needs breadth, not the same subscription ten times.",
  },
];

const DISQUALIFIERS = [
  "Fabricated or edited screenshots — checked, and one fake permanently closes your email",
  "Charges you actually consented to knowingly and just regret",
  "Cases about other people's accounts or payments",
  "Duplicate submissions of the same charge, including from different emails",
];

const NEVER_RISK = [
  { text: "Your data being sold — anonymized, aggregated research only, as described in the ", link: "/privacy", linkText: "privacy policy" },
  { text: "Being drawn into a dispute — we never contact the merchant about your case" },
  { text: "Spam — the only mandatory contact is about your case and your payout" },
];

export default function BountyRulesPage() {
  return (
    <div className="sc-page">
      <style>{CSS}</style>
      <header className="sc-header">
        <div className="sc-wrap sc-headrow">
          <a className="sc-wordmark" href="/">Spite<em>Cash</em></a>
          <nav>
            <a href="/how-it-works">How it works</a>
            <a href="/payouts">Payouts</a>
            <a href="/about">About</a>
          </nav>
        </div>
      </header>

      <main className="sc-wrap">
        <h1><span className="sc-amount">€3</span> per valid case.<br />Guaranteed, not &quot;up to&quot;.</h1>
        <p className="sc-lede">
          These are the exact rules the bounty runs on. They are published so you can
          hold us to them — and so nobody wastes time on a case that will not qualify.
        </p>

        <div className="sc-promise">
          <div className="sc-promise-head">The promise</div>
          <div className="sc-promise-body">
            If your case meets all six criteria below, we pay you <strong>€3</strong> —
            every time, no discretion, no &quot;may receive&quot;. If it does not qualify, we tell
            you which criterion failed and you can fix it and resubmit once.
          </div>
        </div>

        <span className="sc-kicker">The six criteria — checked in this order</span>
        <ol className="sc-criteria">
          {CRITERIA.map((c, i) => (
            <li key={i}>
              <b>{c.t}</b>
              <span className="sc-why">{c.w}</span>
            </li>
          ))}
        </ol>

        <span className="sc-kicker">How and when we pay</span>
        <div className="sc-payterms">
          <div><b>Amount</b><span className="sc-mono">€3.00</span></div>
          <div><b>Deadline</b><span>7 days after approval</span></div>
          <div><b>Methods</b><span>PayPal · Revolut · IBAN</span></div>
        </div>
        <p className="sc-body">
          Every payout is published on the <a href="/payouts">wall of payouts</a> —
          date, case ID, and amount, never your name. If we are ever late, the wall will
          show it, which is exactly why the wall exists.
        </p>

        <div className="sc-capnote">
          Honesty about the budget: the bounty pool is capped at{" "}
          <span className="sc-mono"><b>100 paid cases per calendar month</b></span>. The live
          counter on the payouts wall shows how many are left this month. If the pool is
          exhausted, the form will say so <em>before</em> you submit — valid cases
          submitted while the counter is open are always paid.
        </div>

        <span className="sc-kicker">What disqualifies a case instantly</span>
        <ul className="sc-list sc-bad">
          {DISQUALIFIERS.map((d, i) => <li key={i}>{d}</li>)}
        </ul>

        <span className="sc-kicker">What you never risk</span>
        <ul className="sc-list sc-good">
          {NEVER_RISK.map((n, i) => (
            <li key={i}>
              {n.text}
              {n.link ? <a href={n.link}>{n.linkText}</a> : null}
            </li>
          ))}
        </ul>

        <div className="sc-cta">
          <h2>Got charged after a trial?</h2>
          <p className="sc-body">
            Check the six criteria above, hide your sensitive data, and send it in.
            If it is valid, €3 is yours — guaranteed.
          </p>
          <a className="sc-btn" href="/#form">Submit my case</a>
        </div>
      </main>

      <footer className="sc-footer">
        <div className="sc-wrap">
          <a href="/how-it-works">How it works</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Use</a>
          <a href="/about">About</a>
          <p>SpiteCash documents subscription friction. We do not promise refunds, we do not initiate chargebacks, and we do not sell personal data.</p>
        </div>
      </footer>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=IBM+Plex+Mono:wght@400;500;700&display=swap');
.sc-page{--paper:#fff;--ink:#16130f;--muted:#6f6a60;--line:#e4e0d8;--green:#0b7a45;--green-bg:#eaf5ef;--red:#c43a2e;
font-family:'Space Grotesk',-apple-system,sans-serif;background:var(--paper);color:var(--ink);line-height:1.6;font-size:16.5px;min-height:100vh}
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
.sc-page h1{font-size:clamp(30px,6vw,46px);line-height:1.05;font-weight:700;letter-spacing:-.02em;margin:44px 0 14px}
.sc-amount{color:var(--green)}
.sc-lede{font-size:19px;color:var(--muted);max-width:56ch;margin-bottom:8px}
.sc-kicker{font-family:'IBM Plex Mono',monospace;font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--green);font-weight:700;margin-top:40px;display:block}
.sc-promise{border:2px solid var(--ink);margin:34px 0}
.sc-promise-head{background:var(--ink);color:var(--paper);padding:12px 20px;font-family:'IBM Plex Mono',monospace;font-size:13px;letter-spacing:.12em;text-transform:uppercase}
.sc-promise-body{padding:22px 20px;font-size:18px}
.sc-promise-body strong{color:var(--green)}
.sc-criteria{counter-reset:c;list-style:none;margin:22px 0}
.sc-criteria>li{counter-increment:c;position:relative;padding:18px 0 18px 58px;border-bottom:1px solid var(--line)}
.sc-criteria>li::before{content:counter(c,decimal-leading-zero);position:absolute;left:0;top:18px;
font-family:'IBM Plex Mono',monospace;font-weight:700;font-size:15px;color:var(--green);border:1.5px solid var(--green);padding:2px 7px}
.sc-criteria b{display:block;margin-bottom:3px}
.sc-why{font-size:14.5px;color:var(--muted)}
.sc-payterms{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));border:1.5px solid var(--ink);margin:22px 0}
.sc-payterms>div{padding:16px 18px;border-right:1px solid var(--line)}
.sc-payterms>div:last-child{border-right:none}
.sc-payterms b{display:block;font-family:'IBM Plex Mono',monospace;font-size:11.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);font-weight:600;margin-bottom:4px}
.sc-payterms span{font-size:17px;font-weight:700}
.sc-capnote{background:var(--green-bg);border-left:4px solid var(--green);padding:16px 18px;margin:26px 0;font-size:15.5px}
.sc-body{margin:14px 0;max-width:64ch}
.sc-page h2{font-size:22px;margin:8px 0 6px;letter-spacing:-.01em}
.sc-list{list-style:none;margin:14px 0}
.sc-list li{padding:8px 0 8px 26px;position:relative;border-bottom:1px solid var(--line)}
.sc-bad li::before{content:"\\2715";position:absolute;left:0;color:var(--red);font-family:'IBM Plex Mono',monospace;font-weight:700}
.sc-good li::before{content:"\\2713";position:absolute;left:0;color:var(--green);font-family:'IBM Plex Mono',monospace;font-weight:700}
.sc-cta{margin:44px 0;border-top:2px solid var(--ink);padding-top:28px}
.sc-btn{display:inline-block;background:var(--green);color:#fff!important;font-weight:700;padding:14px 26px;text-decoration:none!important;font-size:16px}
.sc-btn:hover{background:#095f36}
.sc-footer{border-top:1px solid var(--line);margin-top:60px;padding:24px 0 44px;font-size:13.5px;color:var(--muted)}
.sc-footer a{color:var(--muted);margin-right:16px}
.sc-footer p{margin-top:10px}
@media(max-width:640px){.sc-criteria>li{padding-left:50px}}
@media(prefers-reduced-motion:reduce){.sc-page *{transition:none!important;animation:none!important}}
`;
