// lib/cancel-catalog.ts
// The merchant catalog powering /cancel/[slug] SEO pages.
// ADDING A GUIDE = add one entry here. Slug becomes the URL.
// RULES for entries:
//  - "gotcha" only for widely documented, factual quirks. No accusations.
//  - channels = where people commonly subscribe (drives which steps render).
//  - platformNote = expanded web-vs-iOS-vs-Android for pages with GSC demand.
//  - removePaymentNote = how to remove saved card after canceling.
//  - faq = GSC-driven Q&A items; each question mirrors a real search query.

export type Channel = "web" | "ios" | "android";

export type FaqItem = {
  q: string;
  a: string;
};

export type Merchant = {
  slug: string;
  name: string;
  category: "vpn" | "ai_tool" | "photo_video" | "cloud_storage" | "language_learning" | "other";
  domain: string;          // used in the web-cancellation steps
  channels: Channel[];
  gotcha?: string;         // factual, widely documented quirks only
  platformNote?: string;   // expanded web-vs-iOS-vs-Android explanation
  removePaymentNote?: string; // how to remove saved card after canceling
  faq?: FaqItem[];         // GSC-driven FAQ items
  affiliateSource?: string;  // UTM source tag for Exit Receipt CTA tracking
  crossSell?: {            // cross-sell block — VPN alternatives with affiliate slot
    heading: string;
    body: string;
    cta: string;
    ctaHref: string;       // placeholder "#affiliate" until link arrives
  };
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
  { slug: "nordvpn", name: "NordVPN", category: "vpn", domain: "nordvpn.com", channels: ["web", "ios", "android"], affiliateSource: "cancel-nordvpn" },
  {
    slug: "expressvpn",
    name: "ExpressVPN",
    category: "vpn",
    domain: "expressvpn.com",
    channels: ["web", "ios", "android"],
    affiliateSource: "cancel-expressvpn",
    crossSell: {
      heading: "Looking for a better-value VPN?",
      body: "If you cancelled ExpressVPN because of price, NordVPN and Surfshark offer comparable speeds at significantly lower renewal rates — and both have a 30-day money-back guarantee.",
      cta: "Compare NordVPN plans →",
      ctaHref: "https://go.nordvpn.net/aff_c?offer_id=15&aff_id=152674&url_id=902",
    },
  },
  { slug: "surfshark", name: "Surfshark", category: "vpn", domain: "surfshark.com", channels: ["web", "ios", "android"], affiliateSource: "cancel-surfshark" },
  {
    slug: "cyberghost-vpn",
    name: "CyberGhost VPN",
    category: "vpn",
    domain: "cyberghostvpn.com",
    channels: ["web", "ios", "android"],
    affiliateSource: "cancel-cyberghost",
    crossSell: {
      heading: "Switching VPN providers?",
      body: "NordVPN and Surfshark are consistently rated above CyberGhost for speed and reliability, at similar or lower price points. Both offer a 30-day money-back guarantee — no risk to try.",
      cta: "See NordVPN plans →",
      ctaHref: "https://go.nordvpn.net/aff_c?offer_id=15&aff_id=152674&url_id=902",
    },
  },
  { slug: "ipvanish", name: "IPVanish", category: "vpn", domain: "ipvanish.com", channels: ["web", "ios", "android"] },
  { slug: "proton-vpn", name: "Proton VPN", category: "vpn", domain: "protonvpn.com", channels: ["web", "ios", "android"] },
  {
    slug: "private-internet-access",
    name: "Private Internet Access",
    category: "vpn",
    domain: "privateinternetaccess.com",
    channels: ["web", "ios", "android"],
    affiliateSource: "cancel-pia",
    crossSell: {
      heading: "Switching from PIA?",
      body: "NordVPN and Surfshark are the two most-switched-to alternatives from PIA — both offer a stronger server network, consistent speeds, and a 30-day money-back guarantee.",
      cta: "Compare NordVPN plans →",
      ctaHref: "https://go.nordvpn.net/aff_c?offer_id=15&aff_id=152674&url_id=902",
    },
  },
  {
    slug: "tunnelbear",
    name: "TunnelBear",
    category: "vpn",
    domain: "tunnelbear.com",
    channels: ["web", "ios", "android"],
    affiliateSource: "cancel-tunnelbear",
    crossSell: {
      heading: "Need more server locations and speed?",
      body: "TunnelBear has a smaller network than most competitors. If you are upgrading, NordVPN (6,000+ servers) and Surfshark (unlimited devices) are the two most popular alternatives at reasonable prices.",
      cta: "See Surfshark plans →",
      ctaHref: "#affiliate-surfshark",
    },
  },

  // ── AI tools ───────────────────────────────────────────────────────────
  { slug: "chatgpt-plus", name: "ChatGPT Plus", category: "ai_tool", domain: "chatgpt.com", channels: ["web", "ios", "android"] },
  { slug: "claude-pro", name: "Claude Pro", category: "ai_tool", domain: "claude.ai", channels: ["web", "ios", "android"] },
  { slug: "midjourney", name: "Midjourney", category: "ai_tool", domain: "midjourney.com", channels: ["web"] },
  {
    slug: "perplexity-pro",
    name: "Perplexity Pro",
    category: "ai_tool",
    domain: "perplexity.ai",
    channels: ["web", "ios", "android"],
    gotcha: "Perplexity auto-renews annually by default. The cancel option appears only after clicking \u201CManage subscription\u201D inside Settings \u2014 which opens a Stripe billing portal. If you subscribed through the iOS App Store, cancel through iOS Settings \u2192 Subscriptions, not on the website.",
    platformNote: "Where you cancel depends entirely on where you originally subscribed \u2014 and canceling in the wrong place does nothing. Web subscribers: cancel only at perplexity.ai \u2192 Settings \u2192 Subscription \u2192 Cancel Plan. The App Store and Google Play do not show a web subscription. iOS subscribers: cancel via iOS Settings \u2192 Apple ID \u2192 Subscriptions \u2192 Perplexity \u2192 Cancel Subscription. Canceling on the Perplexity website has no effect on an App Store subscription. Android subscribers: cancel via Google Play \u2192 Subscriptions \u2192 Perplexity \u2192 Cancel. The same rule applies \u2014 the Perplexity website cannot cancel a Play Store subscription. If you canceled in the wrong place and were charged again, that charge can qualify for a bounty submission \u2014 \u20AC3 if it meets the six published criteria.",
    removePaymentNote: "Perplexity does not allow removing a saved card while an active subscription is attached to it. Cancel your Pro subscription first (steps above), then go to Settings \u2192 Billing \u2192 Payment methods and click the three-dot menu next to your card to remove it. If the Remove option is greyed out, wait until the current billing period ends \u2014 Perplexity keeps the card on file until the cycle closes. A charge that arrives after you cancelled and removed the card can qualify for a bounty submission under the six published criteria \u2014 and if you created an Exit Receipt at the moment you cancelled, it pre-fills the submission for you.",
    faq: [
      {
        q: "How do I cancel Perplexity Pro auto-renewal?",
        a: "Go to perplexity.ai \u2192 Settings \u2192 Subscription \u2192 Cancel Plan. Auto-renewal is disabled immediately. You keep Pro access until the end of the paid period \u2014 no partial refund is issued.",
      },
      {
        q: "How do I cancel Perplexity Pro after the free trial?",
        a: "Cancel before the trial ends to avoid being charged: go to Settings \u2192 Subscription \u2192 Cancel Plan, and create a free Exit Receipt at that moment so your cancellation has a timestamped record. If a trial-conversion charge arrives without clear warning, it can qualify for a bounty submission \u2014 \u20AC3 if it meets the six published criteria.",
      },
      {
        q: "How do I turn off auto-renewal in Perplexity?",
        a: "There is no separate toggle to disable renewal while keeping the subscription active. Canceling the subscription (Settings \u2192 Subscription \u2192 Cancel Plan) is what turns off auto-renewal. You keep access until the period you paid for ends.",
      },
      {
        q: "How do I cancel my Perplexity subscription?",
        a: "Web: perplexity.ai \u2192 Settings \u2192 Subscription \u2192 Cancel Plan. iOS: Settings app \u2192 Apple ID \u2192 Subscriptions \u2192 Perplexity \u2192 Cancel. Android: Google Play \u2192 Subscriptions \u2192 Perplexity \u2192 Cancel. Use the platform where you originally subscribed \u2014 canceling on the website does not affect an App Store subscription, and vice versa.",
      },
      {
        q: "How do I unsubscribe from Perplexity Pro?",
        a: "Unsubscribe and cancel are the same action. Go to perplexity.ai \u2192 Settings \u2192 Subscription \u2192 Cancel Plan and follow through to the confirmation screen. Save the confirmation email \u2014 if you do not receive one within a few minutes, check your spam folder and verify the subscription status before closing the page.",
      },
      {
        q: "What happens to my Perplexity Pro access after I cancel?",
        a: "You keep full Pro access until the end of the billing cycle you already paid for. After that, your account reverts to the free tier automatically. Your history, collections, and saved threads remain intact \u2014 no data is deleted.",
      },
    ],
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
    slug: "adobe-creative-cloud",
    name: "Adobe Creative Cloud",
    category: "photo_video",
    domain: "adobe.com",
    channels: ["web", "ios"],
    gotcha: "Adobe\u2019s \u201CAnnual plan, paid monthly\u201D contracts may include an early-termination fee if you cancel after the first 14 days. Check which plan type you are on before cancelling \u2014 it is shown in your account\u2019s plan details.",
  },
  { slug: "canva-pro", name: "Canva Pro", category: "photo_video", domain: "canva.com", channels: ["web", "ios", "android"] },
  { slug: "picsart", name: "Picsart Gold", category: "photo_video", domain: "picsart.com", channels: ["web", "ios", "android"] },
  {
    slug: "facetune",
    name: "Facetune",
    category: "photo_video",
    domain: "facetuneapp.com",
    channels: ["web", "ios", "android"],
    affiliateSource: "cancel-facetune",
    gotcha: "Facetune subscriptions exist on three routes: App Store, Google Play, and web (via the Facetune Account Dashboard on facetuneapp.com). The free trial converts to a paid yearly or weekly subscription automatically. Deleting the app does NOT cancel the subscription; cancel through the route you subscribed on, at least 48 hours before the trial or renewal date \u2014 Lightricks' own policy recommends 48 hours.",
    platformNote: "Cancel through the route where you signed up. Web: log in to the Facetune Account Dashboard at facetuneapp.com and cancel from your subscription settings \u2014 web subscriptions are not visible in the App Store or Google Play. iPhone/iPad: iOS Settings \u2192 tap your name \u2192 Subscriptions \u2192 Facetune \u2192 Cancel Subscription. Android: Google Play \u2192 profile icon \u2192 Payments & subscriptions \u2192 Subscriptions \u2192 Facetune \u2192 Cancel subscription. If Facetune does not appear in either store list, either you subscribed on the web or you used a second Apple ID / Google account \u2014 subscriptions are tied to the account that made the purchase, not the device. Deleting the app on any platform does not stop billing.",
    faq: [
      {
        q: "How do I cancel my Facetune subscription?",
        a: "Web: log in to your Facetune Account Dashboard at facetuneapp.com and cancel from subscription settings. iPhone: iOS Settings \u2192 tap your name \u2192 Subscriptions \u2192 Facetune \u2192 Cancel Subscription. Android: Google Play \u2192 profile icon \u2192 Payments & subscriptions \u2192 Subscriptions \u2192 Facetune \u2192 Cancel. Cancel at least 48 hours before the renewal date to avoid the next charge. Deleting the app does not cancel anything.",
      },
      {
        q: "How do I cancel the Facetune free trial before being charged?",
        a: "Cancel at least 48 hours before the trial ends \u2014 Lightricks' own policy recommends this window. The conversion to paid is automatic and often yearly, so the first charge can be large. Use the route where you signed up: web dashboard, App Store, or Google Play. You keep trial access until the trial period ends even after canceling.",
      },
      {
        q: "Facetune charged me after the free trial \u2014 can I get a refund?",
        a: "You can request one. App Store: go to reportaproblem.apple.com, sign in, find the Facetune charge, and request a refund \u2014 approval depends on Apple's review. Google Play: use the refund option on the order in your Play account, or Google's refund request form. Web subscriptions: contact Lightricks support in writing. A trial-conversion charge without clear warning may also qualify for a bounty submission \u2014 if the case meets the six published criteria, you receive \u20AC3.",
      },
      {
        q: "Why was I charged for Facetune twice?",
        a: "The most common causes: subscriptions on two different accounts (a second Apple ID or Google account, or a web subscription alongside a store one), or a weekly plan that renews more often than expected. Check subscriptions on every account and route you use, cancel the ones you do not want, and request a refund for the duplicate. If a charge arrived after a cancellation you had already documented, it can qualify for a bounty submission under the six published criteria.",
      },
      {
        q: "Does deleting the Facetune app cancel the subscription?",
        a: "No. Uninstalling Facetune leaves the subscription active and billing continues through whatever route you subscribed on \u2014 web, App Store, or Google Play. Always cancel first, confirm the end date on the confirmation screen, then delete the app.",
      },
    ],
  },
  { slug: "vsco", name: "VSCO", category: "photo_video", domain: "vsco.co", channels: ["ios", "android", "web"] },
  { slug: "capcut-pro", name: "CapCut Pro", category: "photo_video", domain: "capcut.com", channels: ["ios", "android", "web"] },
  { slug: "remini", name: "Remini", category: "photo_video", domain: "remini.ai", channels: ["ios", "android", "web"] },
  { slug: "photoroom", name: "PhotoRoom Pro", category: "photo_video", domain: "photoroom.com", channels: ["ios", "android", "web"] },
  {
    slug: "fotor",
    name: "Fotor Pro",
    category: "photo_video",
    domain: "fotor.com",
    channels: ["web", "ios", "android"],
    gotcha: "Fotor Pro subscriptions work differently depending on where you signed up. Web subscribers: cancel at fotor.com \u2192 Account \u2192 Subscription \u2192 Cancel Plan. App Store or Google Play subscribers: you must cancel through those stores \u2014 the Fotor website cannot cancel an App Store subscription, and vice versa. Check your original confirmation email to identify which platform you used.",
    platformNote: "Web subscribers cancel at fotor.com \u2192 Account \u2192 Subscription \u2192 Cancel Plan. iOS subscribers cancel via iOS Settings \u2192 Apple ID \u2192 Subscriptions \u2192 Fotor \u2192 Cancel Subscription \u2014 the Fotor website has no access to App Store billing. Android subscribers cancel via Google Play \u2192 Subscriptions \u2192 Fotor \u2192 Cancel. If you are unsure which platform you used, check your original signup confirmation email: an email from Apple or Google confirms a store subscription; an email directly from Fotor confirms a web subscription.",
    faq: [
      {
        q: "How do I cancel Fotor Pro on iPhone?",
        a: "Open iOS Settings \u2192 tap your name \u2192 Subscriptions \u2192 find Fotor \u2192 tap Cancel Subscription. If Fotor does not appear in the list, you did not subscribe through the App Store \u2014 log in at fotor.com and cancel there instead.",
      },
      {
        q: "How do I cancel Fotor Pro on Android?",
        a: "Open Google Play \u2192 tap your profile icon \u2192 Payments & subscriptions \u2192 Subscriptions \u2192 Fotor \u2192 Cancel subscription. If Fotor is not listed, you subscribed on the web \u2014 cancel at fotor.com \u2192 Account \u2192 Subscription.",
      },
      {
        q: "How do I cancel Fotor Pro on the website?",
        a: "Log in at fotor.com \u2192 click your avatar (top right) \u2192 Account \u2192 Subscription \u2192 Cancel Plan. This only works if you originally subscribed on the Fotor website. If you subscribed through the App Store or Google Play, cancel through those stores.",
      },
      {
        q: "Will I lose my edited photos if I cancel Fotor Pro?",
        a: "Your saved projects and photos remain in your account after cancellation. You lose access to Pro-only filters, AI tools, and the background remover, but your files are not deleted. Download any Pro exports you need before the billing period ends.",
      },
    ],
  },
  {
    slug: "prequel",
    name: "Prequel",
    category: "photo_video",
    domain: "prequel.app",
    channels: ["ios", "android"],
    gotcha: "Prequel is available only on mobile \u2014 there is no desktop web subscription to cancel. The free trial converts to a paid subscription silently if you do not cancel at least 24 hours before the trial ends. Deleting the app does NOT cancel the subscription.",
    platformNote: "Prequel has no web subscription \u2014 all billing goes through the App Store or Google Play depending on your device. iOS: open iOS Settings \u2192 tap your name \u2192 Subscriptions \u2192 Prequel \u2192 Cancel Subscription. Cancel at least 24 hours before the trial or renewal date. Android: open Google Play \u2192 profile icon \u2192 Payments & subscriptions \u2192 Subscriptions \u2192 Prequel \u2192 Cancel subscription. Important: deleting the Prequel app does not cancel the subscription on either platform \u2014 you will continue to be charged until you cancel through the store.",
    faq: [
      {
        q: "How do I cancel Prequel on iPhone?",
        a: "Go to iOS Settings \u2192 tap your name at the top \u2192 Subscriptions \u2192 Prequel \u2192 Cancel Subscription. You must do this at least 24 hours before the renewal date to avoid the next charge. Deleting the app does not cancel the subscription.",
      },
      {
        q: "How do I cancel Prequel on Android?",
        a: "Open the Google Play Store \u2192 tap your profile icon \u2192 Payments & subscriptions \u2192 Subscriptions \u2192 Prequel \u2192 Cancel subscription. Cancel at least 24 hours before the renewal date. Uninstalling the app does not stop billing.",
      },
      {
        q: "Does deleting Prequel cancel the subscription?",
        a: "No. Deleting the app on iPhone or Android does not cancel your subscription. You will continue to be charged through the App Store or Google Play until you cancel explicitly through those stores. Always cancel through iOS Settings or Google Play first, then delete the app.",
      },
      {
        q: "I was charged by Prequel after my free trial \u2014 can I get a refund?",
        a: "If you were charged without a clear warning that the trial was ending, request a refund through the App Store (reportaproblem.apple.com) or Google Play (support.google.com/googleplay/answer/2479637); approval depends on the store\u2019s review. A silent trial-to-paid conversion can also qualify for a bounty submission \u2014 \u20AC3 if the case meets the six published criteria.",
      },
    ],
  },

  // ── Cloud storage ──────────────────────────────────────────────────────
  { slug: "dropbox", name: "Dropbox Plus", category: "cloud_storage", domain: "dropbox.com", channels: ["web", "ios", "android"] },
  { slug: "google-one", name: "Google One", category: "cloud_storage", domain: "one.google.com", channels: ["web", "android", "ios"] },
  {
    slug: "icloud-plus",
    name: "iCloud+",
    category: "cloud_storage",
    domain: "icloud.com",
    channels: ["ios"],
    gotcha: "iCloud+ is managed only through your Apple account settings (iPhone, iPad, or Mac) \u2014 there is no cancellation page on the web outside Apple\u2019s subscription settings.",
  },
  { slug: "microsoft-365", name: "Microsoft 365", category: "cloud_storage", domain: "account.microsoft.com", channels: ["web", "ios", "android"] },
  {
    slug: "mega",
    name: "MEGA",
    category: "cloud_storage",
    domain: "mega.io",
    channels: ["web", "ios", "android"],
    affiliateSource: "cancel-mega",
    gotcha: "MEGA Pro plans do not auto-renew by default \u2014 but if you enabled auto-renewal, you must cancel it explicitly. Go to mega.io \u2192 click your avatar (top right) \u2192 My account \u2192 Plan \u2192 Cancel subscription. On mobile, MEGA subscriptions are managed through the MEGA app\u2019s account settings, not through App Store or Google Play \u2014 even if you paid via those stores, check the MEGA app first.",
    platformNote: "MEGA subscription management is unusual: even if you paid via the App Store or Google Play, the primary place to cancel is inside the MEGA app itself (Account \u2192 Upgrade \u2192 Cancel), not the iOS or Android subscription settings. On the web: mega.io \u2192 click your avatar (top right) \u2192 My account \u2192 Plan \u2192 Cancel subscription. If you subscribed via Apple In-App Purchase: open the MEGA app \u2192 Account \u2192 Upgrade \u2192 Cancel, or as a fallback try iOS Settings \u2192 Apple ID \u2192 Subscriptions \u2192 MEGA. If you subscribed via Google Play In-App Purchase: open the MEGA app \u2192 Account \u2192 Upgrade \u2192 Cancel, or as a fallback try Google Play \u2192 Subscriptions \u2192 MEGA.",
    faq: [
      {
        q: "How do I cancel MEGA Pro on the website?",
        a: "Log in at mega.io \u2192 click your avatar in the top right corner \u2192 My account \u2192 Plan \u2192 Cancel subscription. Follow the confirmation steps to the end. You keep Pro storage until the end of the paid period.",
      },
      {
        q: "How do I cancel MEGA Pro on iPhone or Android?",
        a: "Open the MEGA app \u2192 tap your avatar \u2192 Account \u2192 Upgrade \u2192 Cancel subscription. MEGA manages in-app billing through its own system, not the App Store or Google Play \u2014 check the MEGA app first. If the cancel option is not visible in the app, try iOS Settings \u2192 Apple ID \u2192 Subscriptions \u2192 MEGA (iPhone) or Google Play \u2192 Subscriptions \u2192 MEGA (Android).",
      },
      {
        q: "What happens to my files if I cancel MEGA Pro?",
        a: "Your files are not immediately deleted, but your storage quota reverts to the free 20 GB limit. If your stored data exceeds 20 GB, MEGA will warn you and give you a grace period to reduce your storage or download your files before any data is affected. Download or move important files before your Pro period ends.",
      },
      {
        q: "Does MEGA auto-renew?",
        a: "MEGA Pro plans do not auto-renew by default. However, if you enabled auto-renewal at signup or later, it will renew automatically. Check your account plan page (mega.io \u2192 My account \u2192 Plan) to see whether auto-renewal is on, and cancel it there if needed.",
      },
      {
        q: "I was charged by MEGA after canceling \u2014 what do I do?",
        a: "First confirm the cancellation went through: log in and check mega.io \u2192 My account \u2192 Plan. If the subscription still shows active, the cancellation did not complete. If it shows cancelled but you were still charged, that charge can qualify for a bounty submission under the six published criteria \u2014 and if you created an Exit Receipt when you cancelled, its timestamp strengthens both the submission and any dispute with your bank.",
      },
    ],
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
    slug: "pimsleur",
    name: "Pimsleur",
    category: "language_learning",
    domain: "pimsleur.com",
    channels: ["web", "ios", "android"],
    gotcha: "Pimsleur offers a 7-day free trial that converts to a paid subscription automatically. Cancel before the trial ends to avoid being charged. Web: log in at pimsleur.com \u2192 click your name \u2192 Account \u2192 Subscription \u2192 Cancel Subscription. Pimsleur customer support (via website chat or 1-800-831-5497) can also process cancellations.",
    platformNote: "Web subscribers cancel at pimsleur.com \u2192 click your name (top right) \u2192 Account \u2192 Subscription \u2192 Cancel Subscription. iOS subscribers cancel via iOS Settings \u2192 Apple ID \u2192 Subscriptions \u2192 Pimsleur \u2192 Cancel Subscription \u2014 the Pimsleur website cannot cancel an App Store subscription. Android subscribers cancel via Google Play \u2192 Subscriptions \u2192 Pimsleur \u2192 Cancel. If you are not sure which platform you used, check the charge on your bank statement: \u201CAPPLE.COM/BILL\u201D = App Store; \u201CGOOGLE*\u201D = Google Play; a charge under Pimsleur\u2019s own name = web subscription.",
    faq: [
      {
        q: "How do I cancel Pimsleur subscription?",
        a: "Web: log in at pimsleur.com \u2192 click your name \u2192 Account \u2192 Subscription \u2192 Cancel Subscription. iOS: iOS Settings \u2192 Apple ID \u2192 Subscriptions \u2192 Pimsleur \u2192 Cancel. Android: Google Play \u2192 Subscriptions \u2192 Pimsleur \u2192 Cancel. Cancel before your renewal date to avoid the next charge.",
      },
      {
        q: "How do I cancel Pimsleur free trial?",
        a: "Cancel before the 7-day trial ends to avoid being charged. Use the same steps as a regular cancellation: web (pimsleur.com \u2192 Account \u2192 Subscription \u2192 Cancel Subscription), iOS Settings, or Google Play depending on where you signed up \u2014 and create a free Exit Receipt at that moment for a timestamped record. A trial-conversion charge without clear warning can qualify for a bounty submission \u2014 \u20AC3 if it meets the six published criteria.",
      },
      {
        q: "Can I cancel Pimsleur by phone?",
        a: "Yes. Pimsleur customer support can cancel your subscription by phone at 1-800-831-5497 (US), or via the live chat on pimsleur.com. Ask for a cancellation confirmation number or email before ending the call.",
      },
      {
        q: "What happens to my Pimsleur progress after I cancel?",
        a: "Your course progress and completed lessons remain saved in your account. After cancellation, you lose access to premium content at the end of the paid period, but your history is not deleted. You can resume a subscription later and pick up where you left off.",
      },
    ],
  },
  { slug: "mondly", name: "Mondly Premium", category: "language_learning", domain: "mondly.com", channels: ["web", "ios", "android"] },

  // ── Other subscriptions ────────────────────────────────────────────────
  {
    slug: "audible",
    name: "Audible",
    category: "other",
    domain: "audible.com",
    channels: ["web", "ios", "android"],
    gotcha: "Unused Audible credits are typically lost when your membership ends \u2014 spend remaining credits before you cancel.",
  },
  {
    slug: "scribd-everand",
    name: "Everand (Scribd)",
    category: "other",
    domain: "everand.com",
    channels: ["web", "ios", "android"],
    affiliateSource: "cancel-everand",
    gotcha: "Scribd split into two products in late 2023: Everand (ebooks and audiobooks) and Scribd (documents). If you had an old Scribd subscription, it may have carried over to Everand — and some people end up paying for both without realizing. Check your bank statement for both \u201CScribd\u201D and \u201CEverand\u201D charge lines before assuming one cancellation covered everything.",
    platformNote: "Where you cancel depends on where you subscribed. Web: log in at everand.com \u2192 click your profile icon \u2192 Your account \u2192 Subscription \u2192 Cancel Subscription, and follow every confirmation step \u2014 the flow includes pause offers before the final cancel button. iPhone/iPad: iOS Settings \u2192 tap your name \u2192 Subscriptions \u2192 find the subscription (it may appear as either Everand or Scribd) \u2192 Cancel Subscription; the Everand website cannot cancel an App Store subscription. Android: Google Play \u2192 Subscriptions \u2192 Everand or Scribd \u2192 Cancel. If you also have a separate Scribd + SlideShare subscription, cancel it separately \u2014 they bill independently.",
    faq: [
      {
        q: "How do I cancel my Everand subscription?",
        a: "Web: everand.com \u2192 profile icon \u2192 Your account \u2192 Subscription \u2192 Cancel Subscription \u2014 click through the pause offers to reach the real confirmation. iOS: Settings \u2192 Apple ID \u2192 Subscriptions \u2192 the entry may appear as Everand or Scribd \u2192 Cancel. Android: Google Play \u2192 Subscriptions \u2192 Everand or Scribd \u2192 Cancel. Use the platform where you originally subscribed.",
      },
      {
        q: "How do I cancel Everand and get a refund?",
        a: "Cancellation stops future billing but does not automatically refund the current period. Web subscribers: contact Everand support in writing and request a refund of the specific charge \u2014 keep the reply. App Store: request at reportaproblem.apple.com; approval depends on Apple's review. Google Play: use the order refund option. A charge after a trial without clear warning, or after a documented cancellation, may qualify for a bounty submission \u2014 if it meets the six published criteria, you receive \u20AC3.",
      },
      {
        q: "Why am I still being charged by Scribd after canceling Everand?",
        a: "Scribd and Everand are separate products with separate billing since the 2023 split \u2014 Everand's own documentation confirms the subscriptions are managed independently. Canceling one does not cancel the other. Check your bank statement for both names, log in to scribd.com separately, and cancel there too if a subscription is active. Keep both charge records \u2014 that documentation strengthens a refund request.",
      },
      {
        q: "What happens to my saved books after I cancel Everand?",
        a: "Your account, saved titles, and reading history remain \u2014 you lose access to the premium catalog at the end of the paid period, and the account reverts to a limited free tier. Finish audiobooks or ebooks you are in the middle of before the period ends; nothing is deleted, but access is locked.",
      },
      {
        q: "How do I cancel the Everand free trial before being charged?",
        a: "Cancel before the trial end date using the platform where you signed up (web, App Store, or Google Play) \u2014 access continues until the trial expires even after you cancel. Best practice: create a free Exit Receipt at the moment you cancel, so the cancellation has a timestamped record. If a charge still arrives afterwards, your receipt pre-fills a bounty submission \u2014 and if the case meets the six published criteria, you receive \u20AC3.",
      },
    ],
  },
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
