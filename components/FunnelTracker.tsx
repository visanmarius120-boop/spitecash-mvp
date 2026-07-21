"use client";

// components/FunnelTracker.tsx
// Client-side funnel instrumentation for /cancel/[slug] pages.
// Emits: cancel_guide_view (on mount, once)
//        exit_receipt_cta_impression (when the CTA actually enters the viewport, once)
// Also wires exit_receipt_cta_click on the CTA link, without touching its markup.
//
// Usage: render <FunnelTracker slug={m.slug} source={m.affiliateSource} />
// anywhere inside the guide page (it renders nothing).

import { useEffect } from "react";

export function trackEvent(
  event: string,
  extra: { slug?: string; source?: string } = {}
) {
  try {
    const payload = JSON.stringify({
      event,
      slug: extra.slug ?? null,
      source: extra.source ?? null,
      device: window.innerWidth < 768 ? "mobile" : "desktop",
      path: window.location.pathname,
    });
    // sendBeacon survives page navigation; fetch keepalive is the fallback.
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/track",
        new Blob([payload], { type: "application/json" })
      );
    } else {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Tracking must never break the page.
  }
}

export function FunnelTracker({
  slug,
  source,
}: {
  slug: string;
  source?: string;
}) {
  useEffect(() => {
    // 1. Guide view — once per page load.
    trackEvent("cancel_guide_view", { slug, source });

    // 2. CTA impression — when the Exit Receipt CTA box actually becomes
    //    visible (>=50% in viewport), once. The CTA is the .sc-cta-box that
    //    links to /exit-receipt (first match on the page).
    const ctaLink = document.querySelector<HTMLAnchorElement>(
      'a.sc-btn[href^="/exit-receipt"]'
    );
    const ctaBox = ctaLink?.closest(".sc-cta-box") ?? ctaLink;
    let impressionSent = false;
    let observer: IntersectionObserver | null = null;

    if (ctaBox && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && !impressionSent) {
              impressionSent = true;
              trackEvent("exit_receipt_cta_impression", { slug, source });
              observer?.disconnect();
            }
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(ctaBox);
    }

    // 3. CTA click — attached to the link itself.
    const onClick = () => trackEvent("exit_receipt_cta_click", { slug, source });
    ctaLink?.addEventListener("click", onClick);

    return () => {
      observer?.disconnect();
      ctaLink?.removeEventListener("click", onClick);
    };
  }, [slug, source]);

  return null;
}
