// app/cancel/[slug]/page.tsx
// Per-merchant cancellation guide. Statically generated for every catalog
// entry, revalidated hourly, with live friction stats from Supabase when
// cases exist for that merchant.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATALOG, getMerchant, CATEGORY_LABELS, type Merchant, type FaqItem } from "@/lib/cancel-catalog";
import { BountyCta, CancelFooter, CancelHeader, ExitReceiptCta, CANCEL_CSS } from "../shared";

export const revalidate = 3600;

export function generateStaticParams() {
  return CATALOG.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const m = getMerchant(slug);
  if (!m) return { title: "Guide not found — SpiteCash" };
  const enriched = !!(m.faq && m.faq.length > 0);
  return {
    title: enriched
      ? `How to Cancel ${m.name}: Free Trial, Auto-Renewal & Platform Guide (2026) — SpiteCash`
      : `How to Cancel ${m.name} (2026 Guide) — SpiteCash`,
    description: enriched
      ? `Cancel ${m.name} on web, iPhone, or Android. Stop auto-renewal, cancel after the free trial, remove your payment method. Plus €3 bounty if you were charged unexpectedly.`
      : `Cancel your ${m.name} subscription step by step — on the web, iPhone, or Android. Plus what to do about refunds, and €3 if you were charged after a free trial.`,
    alternates: { canonical: `https://spitecash.com/cancel/${slug}` },
  };
}

// ── Live friction stats from Supabase (best-effort, never blocks render) ──
type Stats = { cases: number; avgDifficulty: number | null } | null;

const MIN_PUBLIC_CASES = 5;
const VALIDATED_STATUSES = ["validated_medium", "validated_high"];

async function getStats(m: Merchant): Promise<Stats> {
  try {
    const { supabaseAdmin } = await import("@/lib/supabaseAdmin");
    const { data: merchants } = await supabaseAdmin
      .from("merchants")
      .select("id")
      .or(`url.ilike.%${m.domain}%,name.ilike.${m.name}`);
    if (!merchants || merchants.length === 0) return null;
    const ids = merchants.map((x: { id: string }) => x.id);
    const { data: events } = await supabaseAdmin
      .from("spite_events")
      .select("cancel_difficulty")
      .in("merchant_id", ids)
      .in("status", VALIDATED_STATUSES);
    if (!events || events.length < MIN_PUBLIC_CASES) return null;
    const diffs = events
      .map((e: { cancel_difficulty: number | null }) => e.cancel_difficulty)
      .filter((d: number | null): d is number => typeof d === "number");
    const avg = diffs.length
      ? Math.round((diffs.reduce((s: number, d: number) => s + d, 0) / diffs.length) * 10) / 10
      : null;
    return { cases: events.length, avgDifficulty: avg };
  } catch (e) {
    console.error("[CANCEL] stats fetch failed:", e);
    return null;
  }
}

// ── Steps per channel ──────────────────────────────────────────────────────
function webSteps(m: Merchant): string[] {
  return [
    `Log in to your account on ${m.domain} in a browser (not the mobile app).`,
    "Open your account or profile menu and look for \u201CBilling\u201D, \u201CSubscription\u201D, or \u201CPlan\u201D.",
    "Choose \u201CCancel subscription\u201D or \u201CTurn off auto-renewal\u201D and follow every confirmation step to the end \u2014 many flows add extra \u201Care you sure\u201D screens and discount offers before the real confirmation.",
    "Screenshot the final confirmation and keep the confirmation email. This is your proof.",
  ];
}

const IOS_STEPS = [
  "Open Settings on your iPhone or iPad and tap your name at the top.",
  "Tap \u201CSubscriptions\u201D.",
  "Select the subscription and tap \u201CCancel Subscription\u201D.",
  "If it is not in the list, you did not subscribe through the App Store \u2014 check the web or Android paths.",
  "Screenshot the confirmation screen showing the end date.",
];

const ANDROID_STEPS = [
  "Open the Google Play Store and tap your profile icon (top right).",
  "Tap \u201CPayments & subscriptions\u201D \u2192 \u201CSubscriptions\u201D.",
  "Select the subscription and tap \u201CCancel subscription\u201D.",
  "If it is not in the list, you did not subscribe through Google Play \u2014 check the web or iPhone paths.",
  "Screenshot the confirmation showing the end date.",
];

const CHANNEL_META: Record<string, { tag: string; title: string }> = {
  web: { tag: "WEB", title: "If you subscribed on the website" },
  ios: { tag: "IPHONE / IPAD", title: "If you subscribed through the App Store" },
  android: { tag: "ANDROID", title: "If you subscribed through Google Play" },
};

// ── Additional CSS for enriched sections ───────────────────────────────────
const ENRICHED_CSS = `
.sc-platform-note {
  background: var(--green-bg);
  border-left: 4px solid var(--green);
  padding: 16px 18px;
  margin: 24px 0;
  font-size: 15px;
  line-height: 1.65;
}
.sc-platform-note h2 {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--green);
  font-weight: 700;
  margin-bottom: 8px;
}
.sc-remove-payment {
  border: 1px solid var(--line);
  border-left: 4px solid var(--ink);
  padding: 16px 18px;
  margin: 24px 0;
  font-size: 15px;
  line-height: 1.65;
}
.sc-remove-payment h2 {
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: -.01em;
}
.sc-faq {
  margin: 32px 0;
}
.sc-faq > h2 {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12.5px;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--green);
  font-weight: 700;
  margin-bottom: 4px;
  display: block;
}
.sc-faq-item {
  border-bottom: 1px solid var(--line);
}
.sc-faq-item summary {
  font-weight: 700;
  font-size: 15.5px;
  cursor: pointer;
  list-style: none;
  padding: 14px 32px 14px 0;
  position: relative;
  line-height: 1.4;
}
.sc-faq-item summary::-webkit-details-marker { display: none; }
.sc-faq-item summary::after {
  content: '+';
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 400;
  font-size: 18px;
  color: var(--green);
  line-height: 1;
}
.sc-faq-item[open] summary::after { content: '\u2212'; }
.sc-faq-item p {
  font-size: 15px;
  color: #374151;
  line-height: 1.65;
  padding: 0 0 16px 0;
  margin: 0;
}
`;

export default async function CancelGuidePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const m = getMerchant(slug);
  if (!m) notFound();

  const stats = await getStats(m);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to cancel ${m.name}`,
    description: `Step-by-step guide to cancel a ${m.name} subscription on the web, iPhone, or Android.`,
    step: (m.channels.includes("web") ? webSteps(m) : IOS_STEPS).map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text: s,
    })),
  };

  const hasFaq = !!(m.faq && m.faq.length > 0);

  // FAQ schema — only rendered when faq entries exist
  const faqLd = hasFaq ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: m.faq!.map((item: FaqItem) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  } : null;

  return (
    <div className="sc-page">
      <style>{CANCEL_CSS}</style>
      {hasFaq && <style>{ENRICHED_CSS}</style>}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
      <CancelHeader />
      <main className="sc-wrap">
        <nav className="sc-crumbs">
          <a href="/cancel">All guides</a> / {CATEGORY_LABELS[m.category]} / {m.name}
        </nav>
        <h1>How to cancel {m.name}</h1>
        <p className="sc-lede">
          The complete path out — including the step most people miss: you can
          only cancel <em>where</em> you subscribed.
        </p>

        {stats && stats.cases > 0 ? (
          <div className="sc-stats">
            <div>
              <b>Validated cases at SpiteCash</b>
              <span className="sc-num">{stats.cases}</span>
            </div>
            {stats.avgDifficulty !== null ? (
              <div>
                <b>Avg. cancel difficulty (user-rated)</b>
                <span className="sc-num">{stats.avgDifficulty}/10</span>
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="sc-tip">
          <b>Step 0 — find where you subscribed</b>
          Check the charge line on your bank or card statement.{" "}
          <span className="sc-mono">APPLE.COM/BILL</span> = App Store.{" "}
          <span className="sc-mono">GOOGLE*</span> = Google Play. A charge under
          the service&apos;s own name = you subscribed on their website. Then
          use the matching section below.
        </div>

        {m.gotcha ? (
          <div className="sc-gotcha">
            <b>Before you cancel — worth knowing</b>
            {m.gotcha}
          </div>
        ) : null}

        {m.channels.map((ch) => (
          <section className="sc-channel" key={ch}>
            <h3>
              <span className="sc-tag">{CHANNEL_META[ch].tag}</span>
              {CHANNEL_META[ch].title}
            </h3>
            <ol className="sc-steps">
              {(ch === "web" ? webSteps(m) : ch === "ios" ? IOS_STEPS : ANDROID_STEPS).map(
                (s, i) => <li key={i}>{s}</li>
              )}
            </ol>
          </section>
        ))}

        {/* Platform note — expanded web vs iOS vs Android explanation */}
        {m.platformNote ? (
          <section className="sc-platform-note">
            <h2>Canceling {m.name}: web vs iPhone vs Android</h2>
            <p>{m.platformNote}</p>
          </section>
        ) : null}

        {/* Remove payment method — shown only when field is set */}
        {m.removePaymentNote ? (
          <section className="sc-remove-payment" id="remove-payment-method">
            <h2>How to remove your payment method from {m.name}</h2>
            <p>{m.removePaymentNote}</p>
          </section>
        ) : null}

        <span className="sc-kicker">Charged anyway? Refund options</span>
        <p className="sc-body">
          <strong>App Store:</strong> request a refund at{" "}
          <a href="https://reportaproblem.apple.com" rel="nofollow">
            reportaproblem.apple.com
          </a>{" "}
          — sign in, find the charge, choose a reason.{" "}
          <strong>Google Play:</strong> use the refund option on the order in
          your Play account, or the Play refund request form.{" "}
          <strong>Web subscriptions:</strong> contact the service&apos;s support
          in writing and ask explicitly for a refund of the specific charge; keep
          the reply.
        </p>
        <p className="sc-body">
          If you are in the EU, consumer-protection rules may give you
          additional rights for online purchases, though for digital services
          they can be waived once you start using the service — check the terms
          you agreed to, and your bank&apos;s dispute process for charges you
          never authorized.
        </p>

        <ExitReceiptCta merchantName={m.name} merchantDomain={m.domain} />

        <BountyCta merchantName={m.name} merchantDomain={m.domain} merchantCategory={m.category} />

        {/* FAQ — rendered last, after CTAs, for GSC query coverage */}
        {hasFaq ? (
          <section className="sc-faq">
            <h2>Frequently asked questions</h2>
            {m.faq!.map((item: FaqItem) => (
              <details key={item.q} className="sc-faq-item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </section>
        ) : null}

      </main>
      <CancelFooter />
    </div>
  );
}
