// app/payouts/page.tsx
// The wall of payouts — a public receipt roll.
// ADDING A PAYOUT = add one object to the PAYOUTS array below. Everything else
// (counters, total, pool-left, removing the empty state) computes itself.

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wall of Payouts — SpiteCash",
  description:
    "Every bounty SpiteCash pays, published: date, case ID, amount. The public receipt roll that keeps us honest — €3 per valid case, on time or visibly late.",
  alternates: { canonical: "https://spitecash.com/payouts" },
};

export const revalidate = 3600; // re-render hourly so the month counter stays fresh

// ─────────────────────────────────────────────────────────────
// ADD PAYOUTS HERE — newest first. That is the whole workflow.
// caseId: your internal ID, truncated (never traceable to a person).
// ─────────────────────────────────────────────────────────────
type Payout = { date: string; caseId: string; note: string; amount: number };

const PAYOUTS: Payout[] = [
  // { date: "2026-07-10", caseId: "SC-0710-A1", note: "trial charge case", amount: 3 },
];

const MONTHLY_POOL = 100;
const BOUNTY = 3;

export default function PayoutsPage() {
  const totalPaid = PAYOUTS.reduce((s, p) => s + p.amount, 0);
  const casesPaid = PAYOUTS.length;
  const thisMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
  const paidThisMonth = PAYOUTS.filter((p) => p.date.startsWith(thisMonth)).length;
  const poolLeft = Math.max(0, MONTHLY_POOL - paidThisMonth);
  const eur = (n: number) => `€${n.toFixed(2)}`;

  return (
    <div className="sc-page">
      <style>{CSS}</style>
      <header className="sc-header">
        <div className="sc-wrap sc-headrow">
          <a className="sc-wordmark" href="/">Spite<em>Cash</em></a>
          <nav>
            <a href="/how-it-works">How it works</a>
            <a href="/bounty-rules">Bounty rules</a>
            <a href="/about">About</a>
          </nav>
        </div>
      </header>

      <main className="sc-wrap">
        <h1>The wall of payouts</h1>
        <p className="sc-lede">
          Every bounty we pay gets a line here: date, case ID, amount. Never your name.
          This page is how you check that the <a href="/bounty-rules">€3 promise</a> is
          kept — on time, or visibly late.
        </p>

        <div className="sc-counters">
          <div><b>Total paid out</b><span className="sc-num sc-green">{eur(totalPaid)}</span></div>
          <div><b>Cases paid</b><span className="sc-num">{casesPaid}</span></div>
          <div><b>Left in this month&apos;s pool</b><span className="sc-num">{poolLeft}</span></div>
        </div>

        {/* ── The receipt roll ─────────────────────────────── */}
        <div className="sc-receipt" aria-label="Payout receipt roll">
          <div className="sc-rhead">
            <div className="sc-rt">SPITECASH · PAYOUT LOG</div>
            <div className="sc-rs">{eur(BOUNTY)} PER VALID CASE · PUBLISHED FOREVER</div>
          </div>

          {casesPaid === 0 ? (
            <>
              <div className="sc-empty">
                <b>The roll starts with case&nbsp;#1.</b><br />
                No payouts yet — SpiteCash opened its bounty pool this week.<br />
                The first valid case submitted gets the first line, forever.
              </div>
              <div className="sc-rline sc-specimen">
                <span className="sc-cid">2026-07-·· · SC-····-A1</span>
                <span>trial charge case</span>
                <span className="sc-amt">€3.00 ✓</span>
              </div>
            </>
          ) : (
            PAYOUTS.map((p, i) => (
              <div className="sc-rline" key={i}>
                <span className="sc-cid">{p.date} · {p.caseId}</span>
                <span>{p.note}</span>
                <span className="sc-amt">{eur(p.amount)} ✓</span>
              </div>
            ))
          )}

          <div className="sc-rline sc-total">
            <span>TOTAL</span><span className="sc-amt">{eur(totalPaid)}</span>
          </div>
          <div className="sc-stampwrap"><span className="sc-stamp">PAID · VERIFIED</span></div>
        </div>

        <span className="sc-kicker">How this wall works</span>
        <p className="sc-body">
          A line is added within 24 hours of every payout. Case IDs are internal — they
          cannot be traced back to you by anyone but us. If a month&apos;s pool
          (<span className="sc-mono">{MONTHLY_POOL} cases</span>) runs out, the counter
          above says so and the submission form warns you before you send anything.
        </p>
        <p className="sc-body">
          Why publish this at all? Because we ask you for payment screenshots, which
          takes trust — and trust is earned with receipts, not promises. This is ours.
        </p>

        <div className="sc-cta">
          <h2>Want your line on this wall?</h2>
          <p className="sc-body">
            Read the <a href="/bounty-rules">six criteria</a>, then send your case.
            Valid case, €3, one more line on the roll.
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
.sc-page{--paper:#fff;--ink:#16130f;--muted:#6f6a60;--line:#e4e0d8;--green:#0b7a45;--red:#c43a2e;--receipt:#fdfcf9;
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
.sc-lede{font-size:19px;color:var(--muted);max-width:56ch;margin-bottom:26px}
.sc-counters{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));border:1.5px solid var(--ink);margin:26px 0}
.sc-counters>div{padding:18px;border-right:1px solid var(--line)}
.sc-counters>div:last-child{border-right:none}
.sc-counters b{display:block;font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);font-weight:600;margin-bottom:6px}
.sc-num{font-family:'IBM Plex Mono',monospace;font-size:26px;font-weight:700}
.sc-green{color:var(--green)}
.sc-receipt{max-width:440px;margin:38px auto;background:var(--receipt);
box-shadow:0 1px 2px rgba(22,19,15,.08),0 8px 28px rgba(22,19,15,.10);position:relative;padding:26px 26px 34px}
.sc-receipt::before,.sc-receipt::after{content:"";position:absolute;left:0;right:0;height:12px;
background-image:radial-gradient(circle at 8px 0px, transparent 6px, var(--receipt) 6.5px);
background-size:16px 12px;background-repeat:repeat-x}
.sc-receipt::before{top:-11px;transform:rotate(180deg)}
.sc-receipt::after{bottom:-11px}
.sc-rhead{text-align:center;border-bottom:1.5px dashed var(--ink);padding-bottom:14px;margin-bottom:14px}
.sc-rt{font-family:'IBM Plex Mono',monospace;font-weight:700;letter-spacing:.18em;font-size:14px}
.sc-rs{font-family:'IBM Plex Mono',monospace;font-size:11.5px;color:var(--muted);margin-top:4px}
.sc-rline{display:flex;justify-content:space-between;gap:10px;font-family:'IBM Plex Mono',monospace;
font-size:13.5px;padding:9px 0;border-bottom:1px dashed var(--line)}
.sc-cid{color:var(--muted)}
.sc-amt{font-weight:700;color:var(--green);white-space:nowrap}
.sc-total{border-top:1.5px dashed var(--ink);border-bottom:none;margin-top:6px;padding-top:14px;font-weight:700;font-size:15px}
.sc-stampwrap{text-align:center;margin-top:18px}
.sc-stamp{display:inline-block;border:2.5px double var(--green);color:var(--green);
font-family:'IBM Plex Mono',monospace;font-weight:700;font-size:12px;letter-spacing:.16em;padding:4px 10px;transform:rotate(-3deg)}
.sc-empty{font-family:'IBM Plex Mono',monospace;font-size:13.5px;color:var(--muted);text-align:center;padding:26px 8px;line-height:1.7}
.sc-empty b{color:var(--ink)}
.sc-specimen{position:relative;opacity:.55;margin-bottom:14px}
.sc-specimen::after{content:"SPECIMEN — what your line will look like";position:absolute;inset:auto 0 -16px 0;
text-align:center;font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:.1em;color:var(--red)}
.sc-kicker{font-family:'IBM Plex Mono',monospace;font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--green);font-weight:700;margin-top:44px;display:block}
.sc-body{margin:14px 0;max-width:64ch}
.sc-page h2{font-size:22px;margin-bottom:6px;letter-spacing:-.01em}
.sc-cta{margin:44px 0;border-top:2px solid var(--ink);padding-top:28px}
.sc-btn{display:inline-block;background:var(--green);color:#fff!important;font-weight:700;padding:14px 26px;text-decoration:none!important;font-size:16px}
.sc-btn:hover{background:#095f36}
.sc-footer{border-top:1px solid var(--line);margin-top:60px;padding:24px 0 44px;font-size:13.5px;color:var(--muted)}
.sc-footer a{color:var(--muted);margin-right:16px}
.sc-footer p{margin-top:10px}
@media(prefers-reduced-motion:reduce){.sc-page *{transition:none!important;animation:none!important}}
`;
