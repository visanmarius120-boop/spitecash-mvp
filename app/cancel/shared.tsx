// app/cancel/shared.tsx
// Shared header/footer/CTA + CSS for the /cancel section.
// Not a route file — Next ignores non-reserved filenames inside app/.

export function CancelHeader() {
  return (
    <header className="sc-header">
      <div className="sc-wrap sc-headrow">
        <a className="sc-wordmark" href="/">Spite<em>Cash</em></a>
        <nav>
          <a href="/cancel">All guides</a>
          <a href="/bounty-rules">Bounty rules</a>
          <a href="/payouts">Payouts</a>
        </nav>
      </div>
    </header>
  );
}

export function CancelFooter() {
  return (
    <footer className="sc-footer">
      <div className="sc-wrap">
        <a href="/cancel">All cancellation guides</a>
        <a href="/how-it-works">How it works</a>
        <a href="/bounty-rules">Bounty rules</a>
        <a href="/payouts">Payouts</a>
        <a href="/about">About</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Use</a>
        <p>
          SpiteCash documents subscription friction. Guides are provided for
          convenience and may lag behind product changes — the subscription
          settings of the service always take precedence. We are not affiliated
          with the services listed.
        </p>
      </div>
    </footer>
  );
}

export function BountyCta({ merchantName }: { merchantName?: string }) {
  return (
    <div className="sc-cta-box">
      <p className="sc-cta-kicker">CHARGED WITHOUT A CLEAR WARNING?</p>
      <h2>
        {merchantName
          ? `Did ${merchantName} charge you after a free trial?`
          : "Did an app charge you after a free trial?"}
      </h2>
      <p className="sc-cta-body">
        Submit the proof to SpiteCash. If your case meets the{" "}
        <a href="/bounty-rules">six published criteria</a>, you get{" "}
        <strong>€3 — guaranteed</strong>, paid within 7 days. Your evidence
        becomes part of an anonymized early-warning radar for hard-to-cancel
        subscriptions.
      </p>
      <a className="sc-btn" href="/#form">Submit my case — €3 bounty</a>
    </div>
  );
}

export const CANCEL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=IBM+Plex+Mono:wght@400;500;700&display=swap');
.sc-page{--paper:#fff;--ink:#16130f;--muted:#6f6a60;--line:#e4e0d8;--green:#0b7a45;--green-bg:#eaf5ef;--red:#c43a2e;--amber-bg:#fff8e6;--amber:#b07a00;
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
.sc-page h1{font-size:clamp(28px,5.5vw,42px);line-height:1.08;font-weight:700;letter-spacing:-.02em;margin:40px 0 14px}
.sc-lede{font-size:18.5px;color:var(--muted);max-width:60ch;margin-bottom:10px}
.sc-kicker{font-family:'IBM Plex Mono',monospace;font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--green);font-weight:700;margin-top:40px;display:block}
.sc-page h2{font-size:21px;margin:10px 0 8px;letter-spacing:-.01em}
.sc-page h3{font-size:17px;margin:20px 0 6px}
.sc-body{margin:13px 0;max-width:66ch}
.sc-stats{display:flex;gap:0;border:1.5px solid var(--ink);margin:22px 0;flex-wrap:wrap}
.sc-stats>div{padding:14px 20px;border-right:1px solid var(--line);flex:1;min-width:150px}
.sc-stats>div:last-child{border-right:none}
.sc-stats b{display:block;font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:.11em;text-transform:uppercase;color:var(--muted);font-weight:600;margin-bottom:4px}
.sc-stats .sc-num{font-family:'IBM Plex Mono',monospace;font-size:22px;font-weight:700}
.sc-steps{counter-reset:s;list-style:none;margin:14px 0 8px}
.sc-steps>li{counter-increment:s;position:relative;padding:13px 0 13px 52px;border-bottom:1px solid var(--line)}
.sc-steps>li::before{content:counter(s);position:absolute;left:0;top:12px;font-family:'IBM Plex Mono',monospace;
font-weight:700;font-size:14px;color:var(--green);border:1.5px solid var(--green);width:30px;height:30px;
display:flex;align-items:center;justify-content:center;border-radius:50%}
.sc-channel{border:1px solid var(--line);margin:16px 0;padding:4px 20px 14px}
.sc-channel>h3{display:flex;align-items:center;gap:10px}
.sc-channel .sc-tag{font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:.1em;
background:var(--ink);color:var(--paper);padding:3px 8px;text-transform:uppercase}
.sc-gotcha{background:var(--amber-bg);border-left:4px solid var(--amber);padding:14px 18px;margin:22px 0;font-size:15px}
.sc-gotcha b{display:block;font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--amber);margin-bottom:5px}
.sc-tip{background:var(--green-bg);border-left:4px solid var(--green);padding:14px 18px;margin:22px 0;font-size:15px}
.sc-tip b{display:block;font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--green);margin-bottom:5px}
.sc-cta-box{border:2px solid var(--ink);padding:26px 24px;margin:40px 0;background:var(--green-bg)}
.sc-cta-kicker{font-family:'IBM Plex Mono',monospace;font-size:11.5px;letter-spacing:.14em;color:var(--green);font-weight:700;margin-bottom:8px}
.sc-cta-body{color:#333;margin:10px 0 16px;max-width:60ch;font-size:15.5px}
.sc-btn{display:inline-block;background:var(--green);color:#fff!important;font-weight:700;padding:14px 26px;text-decoration:none!important;font-size:16px}
.sc-btn:hover{background:#095f36}
.sc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:10px;margin:14px 0 6px}
.sc-card{border:1px solid var(--line);padding:13px 16px;text-decoration:none!important;display:block}
.sc-card:hover{border-color:var(--green)}
.sc-card b{display:block;font-size:15.5px;margin-bottom:2px}
.sc-card span{font-family:'IBM Plex Mono',monospace;font-size:11.5px;color:var(--muted)}
.sc-footer{border-top:1px solid var(--line);margin-top:56px;padding:24px 0 44px;font-size:13.5px;color:var(--muted)}
.sc-footer a{color:var(--muted);margin-right:16px}
.sc-footer p{margin-top:10px;max-width:70ch}
.sc-crumbs{font-size:13px;color:var(--muted);margin:18px 0 0}
.sc-crumbs a{color:var(--muted)}
@media(prefers-reduced-motion:reduce){.sc-page *{transition:none!important;animation:none!important}}
`;
