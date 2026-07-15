// app/exit-receipt/page.tsx
// "Every cancellation deserves a receipt." — pagina produsului Exit Receipt.

import type { Metadata } from "next";
import { ExitReceiptForm } from "@/components/ExitReceiptForm";

export const metadata: Metadata = {
  title: "Exit Receipt — timestamped proof you cancelled | SpiteCash",
  description:
    "Free: create a timestamped record of your subscription cancellation. We check back after your next billing date to record whether it really worked — and if you get charged again, the submission may qualify for the €3 bounty.",
  alternates: { canonical: "https://spitecash.com/exit-receipt" },
};

export default function ExitReceiptPage() {
  return (
    <div className="er-page">
      <style>{CSS}</style>
      <header className="er-header">
        <div className="er-wrap er-headrow">
          <a className="er-wordmark" href="/">Spite<em>Cash</em></a>
          <nav>
            <a href="/cancel">Cancel guides</a>
            <a href="/bounty-rules">Bounty rules</a>
            <a href="/payouts">Payouts</a>
          </nav>
        </div>
      </header>

      <main className="er-wrap">
        <h1>Every cancellation deserves a receipt.</h1>
        <p className="er-lede">
          When you buy something, you get a confirmation, an invoice, a
          transaction ID. When you cancel a subscription, you often get a vague
          screen and nothing else. The Exit Receipt fixes that: a free,
          timestamped record that you cancelled — and a follow-up that checks
          whether the cancellation actually worked.
        </p>

        <div className="er-how">
          <div><b>1</b>Cancel your subscription (our <a href="/cancel">guides</a> show the exact route).</div>
          <div><b>2</b>Create your free Exit Receipt below — 60 seconds.</div>
          <div><b>3</b>After your next billing date, we ask: did it really stop?</div>
          <div><b>4</b>Charged again anyway? Submit it — a post-cancellation charge that meets the <a href="/bounty-rules">six published criteria</a> may qualify for the €3 bounty.</div>
        </div>

        <div className="er-formshell">
          <ExitReceiptForm />
        </div>

        <p className="er-note">
          An Exit Receipt is a timestamped personal record, not a legal
          certification. Anonymized outcomes power independent statistics about
          how reliably subscription services let customers leave.
        </p>
      </main>

      <footer className="er-footer">
        <div className="er-wrap">
          <a href="/cancel">Cancellation guides</a>
          <a href="/how-it-works">How it works</a>
          <a href="/bounty-rules">Bounty rules</a>
          <a href="/payouts">Payouts</a>
          <a href="/about">About</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Use</a>
        </div>
      </footer>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=IBM+Plex+Mono:wght@400;500;700&display=swap');
.er-page{--paper:#fff;--ink:#16130f;--muted:#6f6a60;--line:#e4e0d8;--green:#0b7a45;--green-bg:#eaf5ef;
font-family:'Space Grotesk',-apple-system,sans-serif;background:var(--paper);color:var(--ink);line-height:1.6;font-size:16.5px;min-height:100vh}
.er-page *{box-sizing:border-box;margin:0;padding:0}
.er-page a{color:var(--ink);text-decoration:underline;text-underline-offset:3px}
.er-page a:hover{color:var(--green)}
.er-wrap{max-width:680px;margin:0 auto;padding:0 20px}
.er-header{border-bottom:2px solid var(--ink);padding:16px 0}
.er-headrow{display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap}
.er-wordmark{font-weight:700;font-size:19px;text-decoration:none!important}
.er-wordmark em{font-style:normal;color:var(--green)}
.er-header nav a{font-size:14px;color:var(--muted);text-decoration:none;margin-left:18px}
.er-header nav a:hover{color:var(--ink)}
.er-page h1{font-size:clamp(28px,5.5vw,42px);line-height:1.08;font-weight:700;letter-spacing:-.02em;margin:40px 0 14px}
.er-lede{font-size:18px;color:var(--muted);max-width:60ch;margin-bottom:24px}
.er-how{border:1.5px solid var(--ink);margin:24px 0}
.er-how>div{padding:13px 18px 13px 56px;border-bottom:1px solid var(--line);position:relative;font-size:15.5px}
.er-how>div:last-child{border-bottom:none}
.er-how b{position:absolute;left:14px;top:11px;font-family:'IBM Plex Mono',monospace;font-weight:700;
color:var(--green);border:1.5px solid var(--green);width:28px;height:28px;display:flex;
align-items:center;justify-content:center;border-radius:50%;font-size:13px}
.er-formshell{background:#fdfcf9;box-shadow:0 1px 2px rgba(22,19,15,.08),0 8px 28px rgba(22,19,15,.10);
padding:26px 24px;margin:30px 0;position:relative}
.er-formshell::before,.er-formshell::after{content:"";position:absolute;left:0;right:0;height:12px;
background-image:radial-gradient(circle at 8px 0px, transparent 6px, #fdfcf9 6.5px);
background-size:16px 12px;background-repeat:repeat-x}
.er-formshell::before{top:-11px;transform:rotate(180deg)}
.er-formshell::after{bottom:-11px}
.er-formshell .field{margin-bottom:16px}
.er-formshell label{display:block;font-weight:700;font-size:14.5px;margin-bottom:5px}
.er-formshell input,.er-formshell select{width:100%;padding:11px 12px;border:1.5px solid var(--line);
font-size:15px;font-family:inherit;background:#fff}
.er-formshell input:focus,.er-formshell select:focus{outline:3px solid var(--green);outline-offset:1px;border-color:var(--green)}
.er-formshell .help{font-size:13px;color:var(--muted);margin-top:5px}
.er-formshell button{background:var(--green);color:#fff;font-weight:700;padding:14px 26px;border:none;
font-size:16px;cursor:pointer;font-family:inherit;width:100%;margin-top:6px}
.er-formshell button:hover{background:#095f36}
.er-formshell button:disabled{opacity:.6;cursor:wait}
.er-formshell .error{color:#c43a2e;font-size:14px;margin-top:10px}
.er-success{text-align:center;padding:14px 6px}
.er-kicker{font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.16em;color:var(--green);font-weight:700;margin-bottom:8px}
.er-code{font-family:'IBM Plex Mono',monospace;font-size:26px;font-weight:700;margin-bottom:16px}
.er-success p{color:var(--muted);font-size:15px;margin-bottom:10px;text-align:left}
.er-note{font-size:13.5px;color:var(--muted);max-width:64ch;margin:24px 0}
.er-footer{border-top:1px solid var(--line);margin-top:52px;padding:24px 0 44px;font-size:13.5px}
.er-footer a{color:var(--muted);margin-right:16px}
@media(prefers-reduced-motion:reduce){.er-page *{transition:none!important;animation:none!important}}
`;
