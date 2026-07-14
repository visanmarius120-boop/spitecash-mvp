// app/charge/page.tsx
// Hub: "what is this charge on my bank statement?"

import type { Metadata } from "next";
import { DESCRIPTORS, CERTAINTY_LABEL, CERTAINTY_COLOR } from "@/lib/descriptor-catalog";

export const metadata: Metadata = {
  title: "What is this charge on my bank statement? | SpiteCash",
  description:
    "APPLE.COM/BILL, GOOGLE*OPENAI, PADDLE.NET, FASTSPRING — find out what these charges are, who charged you, and how to cancel or get a refund.",
  alternates: { canonical: "https://spitecash.com/charge" },
};

export default function ChargeHubPage() {
  return (
    <div className="ch-page">
      <style>{CSS}</style>
      <header className="ch-header">
        <div className="ch-wrap ch-headrow">
          <a className="ch-wordmark" href="/">Spite<em>Cash</em></a>
          <nav>
            <a href="/cancel">Cancel guides</a>
            <a href="/exit-receipt">Exit Receipt</a>
            <a href="/bounty-rules">€3 bounty</a>
          </nav>
        </div>
      </header>

      <main className="ch-wrap">
        <h1>What is this charge<br />on my bank statement?</h1>
        <p className="ch-lede">
          Billing descriptors — the text that appears on your bank or card
          statement — are often cryptic. Find yours below to discover the
          merchant, understand the charge, and learn how to cancel or dispute it.
        </p>

        <div className="ch-search-hint">
          <span className="ch-mono">Tip:</span> Press{" "}
          <kbd>Ctrl+F</kbd> (or <kbd>⌘F</kbd> on Mac) and paste the text from
          your bank statement to find it instantly.
        </div>

        <div className="ch-grid">
          {DESCRIPTORS.map((d) => (
            <a className="ch-card" key={d.slug} href={`/charge/${d.slug}`}>
              <span
                className="ch-descriptor ch-mono"
              >{d.descriptor}</span>
              <span className="ch-merchant">{d.merchant}</span>
              <span
                className="ch-certainty"
                style={{ color: CERTAINTY_COLOR[d.certainty] }}
              >{CERTAINTY_LABEL[d.certainty]}</span>
            </a>
          ))}
        </div>

        <div className="ch-notfound">
          <h2>Don&apos;t see your descriptor?</h2>
          <p>
            If the charge on your statement is not listed here, try searching
            for the first word or abbreviation — billing descriptors are often
            truncated. You can also{" "}
            <a href="/#form">submit your case</a> and we will try to identify
            the merchant for you.
          </p>
        </div>
      </main>

      <footer className="ch-footer">
        <div className="ch-wrap">
          <a href="/charge">Charge lookup</a>
          <a href="/cancel">Cancellation guides</a>
          <a href="/exit-receipt">Exit Receipt</a>
          <a href="/bounty-rules">Bounty rules</a>
          <a href="/about">About</a>
          <a href="/privacy">Privacy Policy</a>
          <p>
            SpiteCash identifies billing descriptors based on publicly available
            information and user-reported cases. Matches marked &quot;likely&quot; or
            &quot;possible&quot; should be verified before disputing a charge.
          </p>
        </div>
      </footer>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=IBM+Plex+Mono:wght@400;500;700&display=swap');
.ch-page{--paper:#fff;--ink:#16130f;--muted:#6f6a60;--line:#e4e0d8;--green:#0b7a45;--green-bg:#eaf5ef;--amber:#b07a00;
font-family:'Space Grotesk',-apple-system,sans-serif;background:var(--paper);color:var(--ink);line-height:1.6;font-size:16.5px;min-height:100vh}
.ch-page *{box-sizing:border-box;margin:0;padding:0}
.ch-mono{font-family:'IBM Plex Mono',ui-monospace,monospace}
.ch-page a{color:var(--ink);text-decoration:underline;text-underline-offset:3px}
.ch-page a:hover{color:var(--green)}
.ch-page a:focus-visible{outline:3px solid var(--green);outline-offset:2px}
.ch-wrap{max-width:860px;margin:0 auto;padding:0 20px}
.ch-header{border-bottom:2px solid var(--ink);padding:16px 0}
.ch-headrow{display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap}
.ch-wordmark{font-weight:700;font-size:19px;text-decoration:none!important}
.ch-wordmark em{font-style:normal;color:var(--green)}
.ch-header nav a{font-size:14px;color:var(--muted);text-decoration:none;margin-left:18px}
.ch-header nav a:hover{color:var(--ink)}
.ch-page h1{font-size:clamp(28px,5.5vw,42px);line-height:1.08;font-weight:700;letter-spacing:-.02em;margin:40px 0 14px}
.ch-page h2{font-size:21px;margin-bottom:8px}
.ch-lede{font-size:18px;color:var(--muted);max-width:62ch;margin-bottom:22px}
.ch-search-hint{background:var(--green-bg);border-left:4px solid var(--green);padding:12px 16px;font-size:14.5px;margin-bottom:28px}
kbd{background:#e4e0d8;border:1px solid #bbb;border-radius:3px;padding:1px 5px;font-family:'IBM Plex Mono',monospace;font-size:12px}
.ch-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:10px;margin-bottom:36px}
.ch-card{border:1px solid var(--line);padding:14px 16px;text-decoration:none!important;display:block;transition:border-color .15s}
.ch-card:hover{border-color:var(--green)}
.ch-descriptor{display:block;font-size:13.5px;font-weight:700;margin-bottom:4px;color:var(--ink)}
.ch-merchant{display:block;font-size:14.5px;color:var(--ink);margin-bottom:4px}
.ch-certainty{display:block;font-size:12.5px;font-weight:600}
.ch-notfound{border-top:1px solid var(--line);padding-top:28px;margin-top:10px}
.ch-notfound p{color:var(--muted);font-size:15.5px;max-width:60ch;margin-top:8px}
.ch-footer{border-top:1px solid var(--line);margin-top:54px;padding:24px 0 44px;font-size:13.5px;color:var(--muted)}
.ch-footer a{color:var(--muted);margin-right:16px}
.ch-footer p{margin-top:10px;max-width:72ch}
@media(prefers-reduced-motion:reduce){.ch-page *{transition:none!important}}
`;
