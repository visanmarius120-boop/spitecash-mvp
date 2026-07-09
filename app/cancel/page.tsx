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

export default function CancelHubPage() {
  const groups = byCategory();
  return (
    <div className="sc-page">
      <style>{CANCEL_CSS}</style>
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
