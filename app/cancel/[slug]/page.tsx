// app/cancel/[slug]/page.tsx
// Per-merchant cancellation guide. Statically generated for every catalog
// entry, revalidated hourly, with live friction stats from Supabase when
// cases exist for that merchant.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATALOG, getMerchant, CATEGORY_LABELS, type Merchant } from "@/lib/cancel-catalog";
import { BountyCta, CancelFooter, CancelHeader, CANCEL_CSS } from "../shared";

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
  return {
    title: `How to Cancel ${m.name} (2026 Guide) — SpiteCash`,
    description: `Cancel your ${m.name} subscription step by step — on the web, iPhone, or Android. Plus what to do about refunds, and €3 if you were charged after a free trial.`,
    alternates: { canonical: `https://spitecash.com/cancel/${slug}` },
  };
}

// ── Live friction stats from Supabase (best-effort, never blocks render) ──
type Stats = { cases: number; avgDifficulty: number | null } | null;

async function getStats(m: Merchant): Promise<Stats> {
  try {
    const { supabaseAdmin } = await import("@/lib/supabaseAdmin");
    const { data: merchants } = await supabaseAdmin
      .from("merchants")
      .select("id")
      .or(`name.ilike.%${m.name.split(" ")[0]}%,url.ilike.%${m.domain}%`);
    if (!merchants || merchants.length === 0) return null;
    const ids = merchants.map((x: { id: string }) => x.id);
    const { data: events } = await supabaseAdmin
      .from("spite_events")
      .select("cancel_difficulty")
      .in("merchant_id", ids);
    if (!events || events.length === 0) return null;
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

// ── Steps per channel (accurate generic flows) ────────────────────────────
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

  return (
    <div className="sc-page">
      <style>{CANCEL_CSS}</style>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
              <b>Cases reported to SpiteCash</b>
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

        <BountyCta merchantName={m.name} />
      </main>
      <CancelFooter />
    </div>
  );
}
