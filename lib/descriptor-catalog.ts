// lib/descriptor-catalog.ts
// Catalogul de billing descriptors — ce apare pe extrasul de cont vs merchantul real.
// Fiecare intrare: slug URL-safe, descriptor exact (ce vede userul pe extras),
// variante posibile, merchantul cel mai probabil, certitudine si ruta de anulare.

export type Certainty = "confirmed" | "likely" | "possible";
export type CancelRoute = "direct" | "apple" | "google" | "all";

export type Descriptor = {
  slug: string;           // URL: /charge/apple-com-bill
  descriptor: string;     // ce apare exact pe extras (pentru titlu)
  variants: string[];     // variante de ortografiere frecvente
  merchant: string;       // merchantul cel mai probabil
  merchantSlug?: string;  // link catre /cancel/[slug] daca exista
  merchantUrl: string;
  category: string;       // ce tip de produs e
  certainty: Certainty;   // cat de siguri suntem ca e chiar asta
  cancelRoute: CancelRoute;
  note?: string;          // info specifica importanta
};

export const DESCRIPTORS: Descriptor[] = [
  // ── Apple ──────────────────────────────────────────────────────────────
  {
    slug: "apple-com-bill",
    descriptor: "APPLE.COM/BILL",
    variants: ["APPLE.COM/BILL", "APPLE COM BILL", "APL*ITUNES", "APL* ITUNES.COM"],
    merchant: "Apple App Store / iTunes",
    merchantUrl: "https://apps.apple.com",
    category: "App Store subscription or purchase",
    certainty: "confirmed",
    cancelRoute: "apple",
    note: "This descriptor covers ALL App Store subscriptions — not just one app. Check your Apple account to find the specific subscription."
  },
  // ── Google ──────────────────────────────────────────────────────────────
  {
    slug: "google-play",
    descriptor: "GOOGLE*PLAY",
    variants: ["GOOGLE*PLAY", "GOOGLE PLAY", "Google Play"],
    merchant: "Google Play Store",
    merchantUrl: "https://play.google.com",
    category: "Android app or Google Play subscription",
    certainty: "confirmed",
    cancelRoute: "google",
    note: "Covers all Google Play subscriptions. Open Google Play → account → Subscriptions to find the specific app."
  },
  {
    slug: "google-openai",
    descriptor: "GOOGLE*OPENAI",
    variants: ["GOOGLE*OPENAI", "GOOGLE OPENAI"],
    merchant: "ChatGPT Plus (via Google Play)",
    merchantSlug: "chatgpt-plus",
    merchantUrl: "https://chat.openai.com",
    category: "AI tool — ChatGPT Plus",
    certainty: "confirmed",
    cancelRoute: "google",
    note: "ChatGPT Plus purchased through Google Play. Cancel through Google Play, not on OpenAI's website."
  },
  {
    slug: "google-services",
    descriptor: "GOOGLE*SERVICES",
    variants: ["GOOGLE*SERVICES", "GOOGLE SERVICES", "Google One"],
    merchant: "Google One (storage) or Google Workspace",
    merchantSlug: "google-one",
    merchantUrl: "https://one.google.com",
    category: "Cloud storage / Google subscription",
    certainty: "likely",
    cancelRoute: "direct",
    note: "Usually Google One storage plan. Check one.google.com to confirm and cancel."
  },
  {
    slug: "google-nordvpn",
    descriptor: "GOOGLE*NORDVPN",
    variants: ["GOOGLE*NORDVPN", "GOOGLE NORD"],
    merchant: "NordVPN (via Google Play)",
    merchantSlug: "nordvpn",
    merchantUrl: "https://nordvpn.com",
    category: "VPN",
    certainty: "confirmed",
    cancelRoute: "google",
  },
  {
    slug: "google-duolingo",
    descriptor: "GOOGLE*DUOLINGO",
    variants: ["GOOGLE*DUOLINGO", "GOOGLE DUOLINGO"],
    merchant: "Duolingo Super (via Google Play)",
    merchantSlug: "duolingo-super",
    merchantUrl: "https://duolingo.com",
    category: "Language learning",
    certainty: "confirmed",
    cancelRoute: "google",
  },
  // ── Paddle ──────────────────────────────────────────────────────────────
  {
    slug: "paddle-net",
    descriptor: "PADDLE.NET*",
    variants: ["PADDLE.NET", "PADDLE NET", "Paddle.com"],
    merchant: "Paddle — payment processor for many software products",
    merchantUrl: "https://paddle.com",
    category: "Software subscription (via Paddle)",
    certainty: "confirmed",
    cancelRoute: "direct",
    note: "Paddle is a payment processor, not the merchant itself. The specific app should be named in the full descriptor — e.g. PADDLE.NET*GRAMMARLY. Check your email receipt for the actual product name."
  },
  {
    slug: "paddle-grammarly",
    descriptor: "PADDLE.NET*GRAMMARLY",
    variants: ["PADDLE.NET*GRAMMARLY", "PADDLE GRAMMARLY"],
    merchant: "Grammarly Premium",
    merchantSlug: "grammarly",
    merchantUrl: "https://grammarly.com",
    category: "AI writing tool",
    certainty: "confirmed",
    cancelRoute: "direct",
  },
  {
    slug: "paddle-canva",
    descriptor: "PADDLE.NET*CANVA",
    variants: ["PADDLE.NET*CANVA", "PADDLE CANVA"],
    merchant: "Canva Pro",
    merchantSlug: "canva-pro",
    merchantUrl: "https://canva.com",
    category: "Design tool",
    certainty: "confirmed",
    cancelRoute: "direct",
  },
  // ── FastSpring ──────────────────────────────────────────────────────────
  {
    slug: "fastspring",
    descriptor: "FASTSPRING*",
    variants: ["FASTSPRING", "FS* ", "FSPRG*"],
    merchant: "FastSpring — payment processor for software subscriptions",
    merchantUrl: "https://fastspring.com",
    category: "Software subscription (via FastSpring)",
    certainty: "confirmed",
    cancelRoute: "direct",
    note: "FastSpring is a payment processor. The product name usually follows the * in the descriptor. Contact FastSpring support at fastspring.com/contact if you cannot identify the charge."
  },
  // ── Stripe / direct ─────────────────────────────────────────────────────
  {
    slug: "openai-openai",
    descriptor: "OPENAI *CHATGPT",
    variants: ["OPENAI *CHATGPT", "OPENAI* CHATGPT", "OPENAI.COM"],
    merchant: "ChatGPT Plus (direct subscription)",
    merchantSlug: "chatgpt-plus",
    merchantUrl: "https://chat.openai.com",
    category: "AI tool",
    certainty: "confirmed",
    cancelRoute: "direct",
    note: "Direct subscription on OpenAI's website (not App Store or Google Play). Cancel at chat.openai.com → account → manage subscription."
  },
  {
    slug: "nordvpn-com",
    descriptor: "NORDVPN.COM",
    variants: ["NORDVPN.COM", "NORDVPN", "NORD SECURITY"],
    merchant: "NordVPN (direct subscription)",
    merchantSlug: "nordvpn",
    merchantUrl: "https://nordvpn.com",
    category: "VPN",
    certainty: "confirmed",
    cancelRoute: "direct",
  },
  {
    slug: "expressvpn",
    descriptor: "EXPRESSVPN",
    variants: ["EXPRESSVPN", "EXPRESSVPN.COM", "EXPRVPN"],
    merchant: "ExpressVPN",
    merchantSlug: "expressvpn",
    merchantUrl: "https://expressvpn.com",
    category: "VPN",
    certainty: "confirmed",
    cancelRoute: "direct",
  },
  {
    slug: "adobe-systems",
    descriptor: "ADOBE *ADOBE",
    variants: ["ADOBE *ADOBE", "ADOBE SYSTEMS", "ADOBE.COM", "ADOBE *CC"],
    merchant: "Adobe Creative Cloud",
    merchantSlug: "adobe-creative-cloud",
    merchantUrl: "https://adobe.com",
    category: "Creative software",
    certainty: "confirmed",
    cancelRoute: "direct",
    note: "Adobe's early-termination fee may apply if you cancel an annual plan paid monthly after the first 14 days. Check your plan type before cancelling."
  },
  {
    slug: "spotify",
    descriptor: "Spotify",
    variants: ["SPOTIFY", "Spotify AB", "SPOTIFY USA"],
    merchant: "Spotify Premium",
    merchantUrl: "https://spotify.com",
    category: "Music streaming",
    certainty: "confirmed",
    cancelRoute: "all",
    note: "If the charge shows as Spotify directly, you subscribed on Spotify's website. If it shows as APPLE.COM/BILL or GOOGLE*PLAY, cancel through those stores instead."
  },
  {
    slug: "dropbox",
    descriptor: "DROPBOX",
    variants: ["DROPBOX", "DROPBOX.COM", "DROPBOX INC"],
    merchant: "Dropbox Plus",
    merchantSlug: "dropbox",
    merchantUrl: "https://dropbox.com",
    category: "Cloud storage",
    certainty: "confirmed",
    cancelRoute: "direct",
  },
  {
    slug: "microsoft-msn",
    descriptor: "MSBILL.INFO",
    variants: ["MSBILL.INFO", "MICROSOFT*", "MSFT*", "MICROSOFT 365"],
    merchant: "Microsoft 365 or Xbox subscription",
    merchantSlug: "microsoft-365",
    merchantUrl: "https://account.microsoft.com",
    category: "Productivity / gaming subscription",
    certainty: "likely",
    cancelRoute: "direct",
    note: "MSBILL.INFO covers all Microsoft subscriptions: Microsoft 365, OneDrive, Xbox Game Pass, Copilot Pro. Check account.microsoft.com → Services & subscriptions for the specific product."
  },
  {
    slug: "canva",
    descriptor: "CANVA",
    variants: ["CANVA", "CANVA PTY LTD", "CANVA.COM"],
    merchant: "Canva Pro (direct subscription)",
    merchantSlug: "canva-pro",
    merchantUrl: "https://canva.com",
    category: "Design tool",
    certainty: "confirmed",
    cancelRoute: "direct",
  },
];

export function getDescriptor(slug: string): Descriptor | undefined {
  return DESCRIPTORS.find((d) => d.slug === slug);
}

export const CERTAINTY_LABEL: Record<Certainty, string> = {
  confirmed: "Confirmed match",
  likely: "Likely match",
  possible: "Possible match — verify",
};

export const CERTAINTY_COLOR: Record<Certainty, string> = {
  confirmed: "#0b7a45",
  likely: "#b07a00",
  possible: "#6f6a60",
};
