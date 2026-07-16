// app/cancel/page.tsx
// The SEO hub: index of all cancellation guides, grouped by category.

import type { Metadata } from "next";
import { byCategory, CATALOG } from "@/lib/cancel-catalog";
import { BountyCta, CancelFooter, CancelHeader, CANCEL_CSS } from "./shared";

export const metadata: Metadata = {
  title: "How to Cancel Any Subscription — Step-by-Step Guides | SpiteCash",
  description:
    "Free, no-nonsense cancellation guides for VPNs, AI tools, photo apps, cloud storage and more. Find where you subscribed, cancel it, and get €3 if you were charged after a trial.",
  alternates: { canonical: "https://spitecash.com/cancel" },
};

const HUB_CSS = `
.sc-hub-intro {
  border: 1px solid var(--line);
  border-radius: 4px;
  padding: 20px 22px;
  margin: 24px 0 32px;
  font-size: 15px;
  line-height: 1.7;
  color: #374151;
}
.sc-hub-intro h2 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
  letter-spacing: -.01em;
  color: var(--ink);
}
.sc-hub-intro p { margin-bottom: 8px; }
.sc-hub-intro p:last-child { margin-bottom: 0; }
.sc-hub-intro strong { color: var(--ink); }
`;

export default function CancelHubPage() {
  const groups = byCategory();
  return (
    <div className="sc-page">
      <style>{CANCEL_CSS}</style>
      <style>{HUB_CSS}</style>
      <CancelHeader />
      <main className="sc-wrap">
        <h1>How to cancel any subscription</h1>
        <p className="sc-lede">
          {CATALOG.length} step-by-step guides, no fluff. Each one covers the
          web, iPhone, and Android paths — plus the one trick most people miss:
          finding out <em>where</em> you actually subscribed.
        </p>

        <div className="sc-tip">
          <b>The 10-second rule</b>
          Look at the charge line on your bank statement first.{" "}
          <span className="sc-mono">APPLE.COM/BILL</span> means App Store,{" "}
          <span className="sc-mono">GOOGLE*</span> means Google Play, the
          service&apos;s own name means you subscribed on their website. You can
          only cancel where you subscribed — the app&apos;s website cannot cancel
          an App Store subscription, and vice versa.
        </div>

        {/* SEO intro — indexable text for "how to cancel a subscription" long-tail */}
        <div className="sc-hub-intro">
          <h2>Why canceling a subscription is harder than it should be</h2>
          <p>
            Most subscription services make cancellation deliberately confusing: the
            cancel button is buried three menus deep, dark patterns add &quot;pause&quot;
            screens before the real confirmation, and the biggest trap — canceling in
            the wrong place does absolutely nothing.
          </p>
          <p>
            <strong>The most common mistake:</strong> you subscribed through the App
            Store or Google Play, but you tried to cancel on the company&apos;s website.
            The website has no access to your App Store billing — your subscription keeps
            running and you keep getting charged. Every guide below shows you exactly
            which path matches how you originally signed up.
          </p>
          <p>
            If you followed the correct steps and got charged again anyway, that is what
            the <a href="/bounty-rules">€3 bounty</a> is for — and the{" "}
            <a href="/exit-receipt">Exit Receipt</a> timestamps your cancellation so you
            have proof if you need it.
          </p>
        </div>

        {groups.map((g) => (
          <section key={g.key}>
            <span className="sc-kicker">{g.label}</span>
            <div className="sc-grid">
              {g.items.map((m) => (
                <a className="sc-card" key={m.slug} href={`/cancel/${m.slug}`}>
                  <b>{m.name}</b>
                  <span>cancel guide →</span>
                </a>
              ))}
            </div>
          </section>
        ))}

        <BountyCta />
      </main>
      <CancelFooter />
    </div>
  );
}
