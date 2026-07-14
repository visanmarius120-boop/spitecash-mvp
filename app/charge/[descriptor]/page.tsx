// app/charge/[descriptor]/page.tsx
// "What is PADDLE.NET* on my bank statement?" — per-descriptor pages.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  DESCRIPTORS,
  getDescriptor,
  CERTAINTY_LABEL,
  CERTAINTY_COLOR,
} from "@/lib/descriptor-catalog";

export const revalidate = 2592000; // 30 de zile — continut stabil

export function generateStaticParams() {
  return DESCRIPTORS.map((d) => ({ descriptor: d.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ descriptor: string }> }
): Promise<Metadata> {
  const { descriptor: slug } = await params;
  const d = getDescriptor(slug);
  if (!d) return { title: "Charge not found — SpiteCash" };
  return {
    title: `What is ${d.descriptor} on my bank statement? | SpiteCash`,
    description: `${d.descriptor} on your bank or card statement is ${d.certainty === "confirmed" ? "" : "likely "}a charge from ${d.merchant}. Find out what it is, how to cancel, and what to do if you were charged unexpectedly.`,
    alternates: { canonical: `https://spitecash.com/charge/${slug}` },
  };
}

const ROUTE_LABEL: Record<string, string> = {
  direct: "on the merchant's own website",
  apple: "through the Apple App Store (iPhone/iPad)",
  google: "through Google Play (Android)",
  all: "directly or through the App Store / Google Play",
};

const ROUTE_CANCEL: Record<string, { title: string; steps: string[] }> = {
  direct: {
    title: "Cancel on the merchant's website",
    steps: [
      "Go to the merchant's website and log in to your account.",
      'Find "Billing", "Subscription", or "Account" in your account settings.',
      'Select "Cancel subscription" or "Turn off auto-renewal" and follow all confirmation steps.',
      "Screenshot the final confirmation screen and save the email — this is your proof.",
    ],
  },
  apple: {
    title: "Cancel through the App Store (iPhone/iPad)",
    steps: [
      "Open Settings on your iPhone or iPad and tap your name at the top.",
      'Tap "Subscriptions".',
      "Find and select the subscription, then tap \"Cancel Subscription\".",
      "If it is not listed, you did not subscribe through the App Store.",
      "Screenshot the confirmation showing the end date.",
    ],
  },
  google: {
    title: "Cancel through Google Play (Android)",
    steps: [
      "Open the Google Play Store and tap your profile icon (top right).",
      'Tap "Payments & subscriptions" → "Subscriptions".',
      'Find and tap the subscription, then tap "Cancel subscription".',
      "If it is not listed, you did not subscribe through Google Play.",
      "Screenshot the confirmation showing the end date.",
    ],
  },
  all: {
    title: "Find where you subscribed, then cancel there",
    steps: [
      "Check the exact descriptor on your statement — APPLE.COM/BILL means App Store, GOOGLE* means Google Play, the merchant name directly means their own website.",
      "Cancel through whichever route you used to subscribe — you can only cancel where you started.",
      "Follow the steps for that route (App Store, Google Play, or the merchant's website).",
      "Screenshot the final confirmation and keep the email.",
    ],
  },
};

export default async function ChargeDescriptorPage(
  { params }: { params: Promise<{ descriptor: string }> }
) {
  const { descriptor: slug } = await params;
  const d = getDescriptor(slug);
  if (!d) notFound();

  const cancelInfo =
    ROUTE_CANCEL[d.cancelRoute] || ROUTE_CANCEL["direct"];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is ${d.descriptor} on my bank statement?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${d.descriptor} is ${d.certainty === "confirmed" ? "" : "likely "}a charge from ${d.merchant} — ${d.category}. It appears when you have an active subscription billed ${ROUTE_LABEL[d.cancelRoute]}.`,
        },
      },
      {
        "@type": "Question",
        name: `How do I cancel ${d.merchant}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: cancelInfo.steps.join(" "),
        },
      },
    ],
  };

  const exitHref = `/exit-receipt?merchant=${encodeURIComponent(d.merchant)}` +
    `&murl=${encodeURIComponent(d.merchantUrl)}`;

  const bountyHref = `/?merchant=${encodeURIComponent(d.merchant)}` +
    `&murl=${encodeURIComponent(d.merchantUrl)}#form`;

  return (
    <div className="ch-page">
      <style>{CSS}</style>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="ch-header">
        <div className="ch-wrap ch-headrow">
          <a className="ch-wordmark" href="/">Spite<em>Cash</em></a>
          <nav>
            <a href="/charge">All descriptors</a>
            <a href="/cancel">Cancel guides</a>
            <a href="/exit-receipt">Exit Receipt</a>
          </nav>
        </div>
      </header>

      <main className="ch-wrap">
        <nav className="ch-crumbs">
          <a href="/charge">Charge lookup</a> / {d.descriptor}
        </nav>

        <h1>What is <span className="ch-mono">{d.descriptor}</span><br />on my bank statement?</h1>

        <div
          className="ch-verdict"
          style={{ borderColor: CERTAINTY_COLOR[d.certainty] }}
        >
          <span
            className="ch-certainty-badge"
            style={{ background: CERTAINTY_COLOR[d.certainty] }}
          >{CERTAINTY_LABEL[d.certainty]}</span>
          <div className="ch-verdict-body">
            <b>{d.merchant}</b>
            <span>{d.category} — billed {ROUTE_LABEL[d.cancelRoute]}</span>
          </div>
        </div>

        {d.variants.length > 1 && (
          <p className="ch-variants">
            <span className="ch-label">Also appears as:</span>{" "}
            {d.variants.filter((v) => v !== d.descriptor).map((v, i) => (
              <span key={i} className="ch-mono ch-tag">{v}</span>
            ))}
          </p>
        )}

        {d.note && (
          <div className="ch-note">
            <b>Worth knowing</b>
            {d.note}
          </div>
        )}

        <section>
          <h2>{cancelInfo.title}</h2>
          <ol className="ch-steps">
            {cancelInfo.steps.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
          {d.merchantSlug && (
            <p className="ch-guide-link">
              Full step-by-step guide:{" "}
              <a href={`/cancel/${d.merchantSlug}`}>
                How to cancel {d.merchant} →
              </a>
            </p>
          )}
        </section>

        <section>
          <h2>What to do about the charge</h2>
          <div className="ch-actions">
            <div className="ch-action">
              <h3>Just cancelled?</h3>
              <p>
                Create a free Exit Receipt — a timestamped record that you
                cancelled. After your next billing date, we check whether the
                cancellation really worked.
              </p>
              <a className="ch-btn ch-btn-primary" href={exitHref}>
                Create my free Exit Receipt
              </a>
            </div>
            <div className="ch-action">
              <h3>Charged after a trial or without warning?</h3>
              <p>
                Submit the evidence. If your case meets the{" "}
                <a href="/bounty-rules">six published criteria</a>, you
                get €3 — guaranteed, paid within 7 days.
              </p>
              <a className="ch-btn ch-btn-secondary" href={bountyHref}>
                Submit my case — €3 bounty
              </a>
            </div>
          </div>
        </section>

        <section>
          <h2>If you do not recognise this charge at all</h2>
          <p className="ch-body">
            If you are certain you never signed up for{" "}
            {d.merchant}, consider these steps:
          </p>
          <ol className="ch-steps">
            <li>
              Check all email accounts for a sign-up confirmation — it may
              have been sent to a different address.
            </li>
            <li>
              Check your Apple or Google account for subscriptions you may
              have forgotten — free trials convert automatically.
            </li>
            <li>
              If you still do not recognise it, contact your bank to dispute
              the charge as unauthorised. Keep any evidence of your
              cancellation attempts.
            </li>
          </ol>
        </section>
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
            Descriptor matches are based on publicly available information and
            user-reported cases.{" "}
            {d.certainty !== "confirmed"
              ? "This match is not confirmed — verify before disputing a charge. "
              : ""}
            SpiteCash is not affiliated with {d.merchant}.
          </p>
        </div>
      </footer>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=IBM+Plex+Mono:wght@400;500;700&display=swap');
.ch-page{--paper:#fff;--ink:#16130f;--muted:#6f6a60;--line:#e4e0d8;--green:#0b7a45;--green-bg:#eaf5ef;
font-family:'Space Grotesk',-apple-system,sans-serif;background:var(--paper);color:var(--ink);line-height:1.6;font-size:16.5px;min-height:100vh}
.ch-page *{box-sizing:border-box;margin:0;padding:0}
.ch-mono{font-family:'IBM Plex Mono',ui-monospace,monospace}
.ch-page a{color:var(--ink);text-decoration:underline;text-underline-offset:3px}
.ch-page a:hover{color:var(--green)}
.ch-page a:focus-visible{outline:3px solid var(--green);outline-offset:2px}
.ch-wrap{max-width:760px;margin:0 auto;padding:0 20px}
.ch-header{border-bottom:2px solid var(--ink);padding:16px 0}
.ch-headrow{display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap}
.ch-wordmark{font-weight:700;font-size:19px;text-decoration:none!important}
.ch-wordmark em{font-style:normal;color:var(--green)}
.ch-header nav a{font-size:14px;color:var(--muted);text-decoration:none;margin-left:18px}
.ch-header nav a:hover{color:var(--ink)}
.ch-page h1{font-size:clamp(26px,5vw,38px);line-height:1.1;font-weight:700;letter-spacing:-.02em;margin:38px 0 18px}
.ch-page h2{font-size:20px;margin:28px 0 10px;letter-spacing:-.01em}
.ch-page h3{font-size:16.5px;margin-bottom:6px;font-weight:700}
.ch-crumbs{font-size:13px;color:var(--muted);margin:18px 0 0}
.ch-crumbs a{color:var(--muted)}
.ch-verdict{border:2px solid;padding:16px 18px;margin:20px 0;display:flex;gap:14px;align-items:flex-start;flex-wrap:wrap}
.ch-certainty-badge{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;
color:#fff;padding:3px 8px;white-space:nowrap;margin-top:2px;flex-shrink:0}
.ch-verdict-body b{display:block;font-size:17px;margin-bottom:2px}
.ch-verdict-body span{font-size:14.5px;color:var(--muted)}
.ch-variants{margin:10px 0;font-size:14.5px;color:var(--muted)}
.ch-label{font-weight:600;color:var(--ink)}
.ch-tag{background:#f4f4f0;padding:2px 7px;margin:0 4px 4px 0;display:inline-block;font-size:12.5px}
.ch-note{background:#fff8e6;border-left:4px solid #b07a00;padding:14px 18px;margin:18px 0;font-size:15px}
.ch-note b{display:block;font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#b07a00;font-weight:700;margin-bottom:5px}
.ch-steps{counter-reset:s;list-style:none;margin:10px 0 14px}
.ch-steps li{counter-increment:s;padding:11px 0 11px 48px;border-bottom:1px solid var(--line);position:relative;font-size:15.5px}
.ch-steps li::before{content:counter(s);position:absolute;left:0;top:9px;font-family:'IBM Plex Mono',monospace;
font-weight:700;font-size:13px;color:var(--green);border:1.5px solid var(--green);
width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:50%}
.ch-guide-link{margin-top:14px;font-size:15px}
.ch-actions{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px;margin:12px 0}
.ch-action{border:1.5px solid var(--line);padding:18px}
.ch-action p{color:var(--muted);font-size:14.5px;margin:6px 0 14px}
.ch-btn{display:inline-block;font-weight:700;padding:12px 20px;font-size:15px;text-decoration:none!important}
.ch-btn-primary{background:var(--green);color:#fff!important}
.ch-btn-primary:hover{background:#095f36}
.ch-btn-secondary{background:var(--ink);color:#fff!important}
.ch-btn-secondary:hover{background:#333}
.ch-body{color:var(--muted);margin-bottom:10px;max-width:64ch}
.ch-footer{border-top:1px solid var(--line);margin-top:54px;padding:24px 0 44px;font-size:13.5px;color:var(--muted)}
.ch-footer a{color:var(--muted);margin-right:16px}
.ch-footer p{margin-top:10px;max-width:72ch}
@media(prefers-reduced-motion:reduce){.ch-page *{transition:none!important}}
`;
