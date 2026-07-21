// app/api/track/route.ts
// Minimal funnel event collector. No cookies, no personal data, no IPs stored.
// Fire-and-forget from the client; failures never affect the user experience.

import { NextRequest, NextResponse } from "next/server";

const ALLOWED_EVENTS = new Set([
  "cancel_guide_view",
  "exit_receipt_cta_impression",
  "exit_receipt_cta_click",
  "exit_receipt_form_view",
  "exit_receipt_form_start",
  "exit_receipt_submit_success",
  "exit_receipt_submit_error",
]);

// Cheap sanity limits — reject junk without a heavy validation library.
const MAX_LEN = 120;

function clean(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const s = v.trim().slice(0, MAX_LEN);
  return s.length ? s : null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ ok: false }, { status: 400 });

    const event = clean(body.event);
    if (!event || !ALLOWED_EVENTS.has(event)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const row = {
      event,
      slug: clean(body.slug),
      source: clean(body.source),
      device: body.device === "mobile" ? "mobile" : "desktop",
      path: clean(body.path),
    };

    const { supabaseAdmin } = await import("@/lib/supabaseAdmin");
    const { error } = await supabaseAdmin.from("funnel_events").insert(row);
    if (error) {
      console.error("[TRACK] insert failed:", error.message);
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[TRACK] error:", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
