// app/sitemap.ts
// Native Next.js sitemap — served automatically at /sitemap.xml.
// Includes the homepage, trust pages, the /cancel hub, and every guide.

import type { MetadataRoute } from "next";
import { CATALOG } from "@/lib/cancel-catalog";
import { DESCRIPTORS } from "@/lib/descriptor-catalog";

const BASE = "https://spitecash.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/cancel`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/bounty-rules`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/payouts`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/how-it-works`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/exit-receipt`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/charge`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const descriptors: MetadataRoute.Sitemap = DESCRIPTORS.map((d) => ({
    url: `${BASE}/charge/${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const guides: MetadataRoute.Sitemap = CATALOG.map((m) => ({
    url: `${BASE}/cancel/${m.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...core, ...guides, ...descriptors];
}
