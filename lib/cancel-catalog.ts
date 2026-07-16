// lib/cancel-catalog.ts
// The merchant catalog powering /cancel/[slug] SEO pages.
// ADDING A GUIDE = add one entry here. Slug becomes the URL.
// RULES for entries:
//  - "gotcha" only for widely documented, factual quirks. No accusations.
//  - channels = where people commonly subscribe (drives which steps render).

export type Channel = "web" | "ios" | "android";

export type Merchant = {
  slug: string;
  name: string;
  category: "vpn" | "ai_tool" | "photo_video" | "cloud_storage" | "language_learning" | "other";
  domain: string;          // used in the web-cancellation steps
  channels: Channel[];
  gotcha?: string;         // factual, widely documented quirks only
};

export const CATEGORY_LABELS: Record<Merchant["category"], string> = {
  vpn: "VPN",
  ai_tool: "AI tools",
  photo_video: "Photo & video apps",
  cloud_storage: "Cloud storage",
  language_learning: "Language learning",
  other: "Other subscriptions",
};

export const CATALOG: Merchant[] = [
  // ── VPN ────────────────────────────────────────────────────────────────
  { slug: "nordvpn", name: "NordVPN", category: "vpn", domain: "nordvpn.com", channels: ["web", "ios", "android"] },
  { slug: "expressvpn", name: "ExpressVPN", category: "vpn", domain: "expressvpn.com", channels: ["web", "ios", "android"] },
  { slug: "surfshark", name: "Surfshark", category: "vpn", domain: "surfshark.com", channels: ["web", "ios", "android"] },
  { slug: "cyberghost-vpn", name: "CyberGhost VPN", category: "vpn", domain: "cyberghostvpn.com", channels: ["web", "ios", "android"] },
  { slug: "ipvanish", name: "IPVanish", category: "vpn", domain: "ipvanish.com", channels: ["web", "ios", "android"] },
  { slug: "proton-vpn", name: "Proton VPN", category: "vpn", domain: "protonvpn.com", channels: ["web", "ios", "android"] },
  { slug: "private-internet-access", name: "Private Internet Access", category: "vpn", domain: "privateinternetaccess.com", channels: ["web", "ios", "android"] },
  { slug: "tunnelbear", name: "TunnelBear", category: "vpn", domain: "tunnelbear.com", channels: ["web", "ios", "android"] },

  // ── AI tools ───────────────────────────────────────────────────────────
  { slug: "chatgpt-plus", name: "ChatGPT Plus", category: "ai_tool", domain: "chatgpt.com", channels: ["web", "ios", "android"] },
  { slug: "claude-pro", name: "Claude Pro", category: "ai_tool", domain: "claude.ai", channels: ["web", "ios", "android"] },
  { slug: "midjourney", name: "Midjourney", category: "ai_tool", domain: "midjourney.com", channels: ["web"] },
  {
    slug: "perplexity-pro", name: "Perplexity Pro", category: "ai_tool",
    domain: "perplexity.ai", channels: ["web", "ios", "android"],
    gotcha: "Perplexity auto-renews annually by default. If you subscribed on the web, cancel at perplexity.ai/settings — look for 'Subscription' under your profile. The cancel option is easy to miss: it appears only after clicking 'Manage subscription', which opens a Stripe billing portal. If you subscribed through the iOS app, cancel through Settings → Subscriptions, not on the website.",
  },
  { slug: "gemini-advanced", name: "Gemini Advanced (Google One AI)", category: "ai_tool", domain: "one.google.com", channels: ["web", "android", "ios"] },
  { slug: "jasper-ai", name: "Jasper", category: "ai_tool", domain: "jasper.ai", channels: ["web"] },
  { slug: "copy-ai", name: "Copy.ai", category: "ai_tool", domain: "copy.ai", channels: ["web"] },
  { slug: "grammarly", name: "Grammarly Premium", category: "ai_tool", domain: "grammarly.com", channels: ["web", "ios", "android"] },
  { slug: "quillbot", name: "QuillBot Premium", category: "ai_tool", domain: "quillbot.com", channels: ["web"] },
  { slug: "otter-ai", name: "Otter.ai", category: "ai_tool", domain: "otter.ai", channels: ["web", "ios", "android"] },
  { slug: "elevenlabs", name: "ElevenLabs", category: "ai_tool", domain: "elevenlabs.io", channels: ["web"] },
  { slug: "runway", name: "Runway", category: "ai_tool", domain: "runwayml.com", channels: ["web"] },

  // ── Photo & video ──────────────────────────────────────────────────────
  {
    slug: "adobe-creative-cloud", name: "Adobe Creative Cloud", category: "photo_video",
    domain: "adobe.com", channels: ["web", "ios"],
    gotcha: "Adobe's \u201CAnnual plan, paid monthly\u201D contracts may include an early-termination fee if you cancel after the first 14 days. Check which plan type you are on before cancelling \u2014 it is shown in your account's plan details.",
  },
  { slug: "canva-pro", name: "Canva Pro", category: "photo_video", domain: "canva.com", channels: ["web", "ios", "android"] },
  { slug: "picsart", name: "Picsart Gold", category: "photo_video", domain: "picsart.com", channels: ["web", "ios", "android"] },
  { slug: "facetune", name: "Facetune", category: "photo_video", domain: "facetuneapp.com", channels: ["ios", "android"] },
  { slug: "vsco", name: "VSCO", category: "photo_video", domain: "vsco.co", channels: ["ios", "android", "web"] },
  { slug: "capcut-pro", name: "CapCut Pro", category: "photo_video", domain: "capcut.com", channels: ["ios", "android", "web"] },
  { slug: "remini", name: "Remini", category: "photo_video", domain: "remini.ai", channels: ["ios", "android", "web"] },
  { slug: "photoroom", name: "PhotoRoom Pro", category: "photo_video", domain: "photoroom.com", channels: ["ios", "android", "web"] },
  {
    slug: "fotor", name: "Fotor Pro", category: "photo_video",
    domain: "fotor.com", channels: ["web", "ios", "android"],
    gotcha: "Fotor Pro subscriptions work differently depending on where you signed up. Web subscribers: cancel at fotor.com → Account → Subscription → Cancel Plan. App Store or Google Play subscribers: you must cancel through those stores — the Fotor website cannot cancel an App Store subscription, and vice versa. Check your original confirmation email to identify which platform you used.",
  },
  {
    slug: "prequel", name: "Prequel", category: "photo_video",
    domain: "prequel.app", channels: ["ios", "android"],
    gotcha: "Prequel is available only on mobile — there is no desktop web subscription to cancel. The free trial converts to a paid subscription silently if you do not cancel at least 24 hours before the trial ends. To cancel: open the App Store (iPhone) or Google Play (Android), find Prequel in your active subscriptions, and cancel from there. Deleting the app does NOT cancel the subscription.",
  },

  // ── Cloud storage ──────────────────────────────────────────────────────
  { slug: "dropbox", name: "Dropbox Plus", category: "cloud_storage", domain: "dropbox.com", channels: ["web", "ios", "android"] },
  { slug: "google-one", name: "Google One", category: "cloud_storage", domain: "one.google.com", channels: ["web", "android", "ios"] },
  {
    slug: "icloud-plus", name: "iCloud+", category: "cloud_storage",
    domain: "icloud.com", channels: ["ios"],
    gotcha: "iCloud+ is managed only through your Apple account settings (iPhone, iPad, or Mac) \u2014 there is no cancellation page on the web outside Apple's subscription settings.",
  },
  { slug: "microsoft-365", name: "Microsoft 365", category: "cloud_storage", domain: "account.microsoft.com", channels: ["web", "ios", "android"] },
  {
    slug: "mega", name: "MEGA", category: "cloud_storage",
    domain: "mega.io", channels: ["web", "ios", "android"],
    gotcha: "MEGA Pro plans do not auto-renew by default — but if you enabled auto-renewal, you must cancel it explicitly. Go to mega.io → click your avatar (top right) → My account → Plan → Cancel subscription. On mobile, MEGA subscriptions are managed through the app, not through App Store or Google Play — even if you paid via those stores, check the MEGA app's account settings first.",
  },
  { slug: "pcloud", name: "pCloud", category: "cloud_storage", domain: "pcloud.com", channels: ["web", "ios", "android"] },
  { slug: "box", name: "Box", category: "cloud_storage", domain: "box.com", channels: ["web", "ios", "android"] },

  // ── Language learning ──────────────────────────────────────────────────
  { slug: "duolingo-super", name: "Duolingo Super", category: "language_learning", domain: "duolingo.com", channels: ["web", "ios", "android"] },
  { slug: "babbel", name: "Babbel", category: "language_learning", domain: "babbel.com", channels: ["web", "ios", "android"] },
  { slug: "busuu", name: "Busuu Premium", category: "language_learning", domain: "busuu.com", channels: ["web", "ios", "android"] },
  { slug: "rosetta-stone", name: "Rosetta Stone", category: "language_learning", domain: "rosettastone.com", channels: ["web", "ios", "android"] },
  { slug: "memrise", name: "Memrise Pro", category: "language_learning", domain: "memrise.com", channels: ["web", "ios", "android"] },
  {
    slug: "pimsleur", name: "Pimsleur", category: "language_learning",
    domain: "pimsleur.com", channels: ["web", "ios", "android"],
    gotcha: "Pimsleur offers a 7-day free trial that converts to a paid subscription automatically. To cancel on the web: log in at pimsleur.com → click your name → Account → Subscription → Cancel Subscription. You must cancel before the trial ends to avoid being charged. Pimsleur customer support (1-800-831-5497 or via the website chat) can also process cancellations if you have trouble finding the option.",
  },
  { slug: "mondly", name: "Mondly Premium", category: "language_learning", domain: "mondly.com", channels: ["web", "ios", "android"] },

  // ── Other subscriptions ────────────────────────────────────────────────
  {
    slug: "audible", name: "Audible", category: "other",
    domain: "audible.com", channels: ["web", "ios", "android"],
    gotcha: "Unused Audible credits are typically lost when your membership ends \u2014 spend remaining credits before you cancel.",
  },
  { slug: "scribd-everand", name: "Everand (Scribd)", category: "other", domain: "everand.com", channels: ["web", "ios", "android"] },
  { slug: "headspace", name: "Headspace", category: "other", domain: "headspace.com", channels: ["web", "ios", "android"] },
  { slug: "calm", name: "Calm", category: "other", domain: "calm.com", channels: ["web", "ios", "android"] },
];

export function getMerchant(slug: string): Merchant | undefined {
  return CATALOG.find((m) => m.slug === slug);
}

export function byCategory(): Array<{ key: Merchant["category"]; label: string; items: Merchant[] }> {
  const keys = Object.keys(CATEGORY_LABELS) as Merchant["category"][];
  return keys
    .map((key) => ({
      key,
      label: CATEGORY_LABELS[key],
      items: CATALOG.filter((m) => m.category === key),
    }))
    .filter((g) => g.items.length > 0);
}
