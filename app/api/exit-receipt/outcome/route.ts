// app/api/exit-receipt/outcome/route.ts
// GET: linkurile one-click din emailul de follow-up.
// Valideaza id+token, inregistreaza rezultatul, iar "charged_again"
// redirectioneaza direct catre formularul de bounty precompletat.

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const ALLOWED_OUTCOMES = new Set([
  "cancelled_successfully",
  "charged_again",
  "refund_requested",
  "refund_received",
  "outcome_unknown",
]);

function page(title: string, body: string): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>${title} — SpiteCash</title>
<style>body{font-family:-apple-system,sans-serif;background:#fff;color:#16130f;
display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:20px}
.card{max-width:440px;border:2px solid #16130f;padding:30px 28px}
h1{font-size:22px;margin:0 0 12px}p{color:#6f6a60;line-height:1.6;margin:0 0 8px}
a{color:#0b7a45;font-weight:700}</style></head>
<body><div class="card"><h1>${title}</h1>${body}
<p style="margin-top:18px;font-size:13px"><a href="https://spitecash.com">spitecash.com</a></p>
</div></body></html>`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const token = searchParams.get("token");
  const outcome = searchParams.get("outcome");

  if (!id || !token || !outcome || !ALLOWED_OUTCOMES.has(outcome)) {
    return new NextResponse(
      page("Invalid link", "<p>This outcome link is incomplete or invalid.</p>"),
      { status: 400, headers: { "content-type": "text/html" } }
    );
  }

  const { data: receipt } = await supabaseAdmin
    .from("exit_receipts")
    .select("id, receipt_code, merchant_name, merchant_url, manage_token, status")
    .eq("id", id)
    .single();

  if (!receipt || receipt.manage_token !== token) {
    return new NextResponse(
      page("Invalid link", "<p>This outcome link does not match any active receipt.</p>"),
      { status: 404, headers: { "content-type": "text/html" } }
    );
  }

  await supabaseAdmin
    .from("exit_receipts")
    .update({ status: outcome, outcome_at: new Date().toISOString() })
    .eq("id", receipt.id);
  await supabaseAdmin
    .from("exit_receipt_events")
    .insert({ receipt_id: receipt.id, event: `outcome_${outcome}` });

  // Charged again -> direct la formularul de bounty, precompletat
  if (outcome === "charged_again") {
    const params = new URLSearchParams({ merchant: receipt.merchant_name });
    if (receipt.merchant_url) params.set("murl", receipt.merchant_url);
    return NextResponse.redirect(
      `https://spitecash.com/?${params.toString()}#form`,
      { status: 302 }
    );
  }

  const messages: Record<string, string> = {
    cancelled_successfully:
      "<p>Recorded: your cancellation worked. This confirmed exit makes the data honest — thank you.</p>",
    refund_requested:
      "<p>Recorded: refund requested. We hope it lands quickly.</p>",
    refund_received:
      "<p>Recorded: refund received. Good ending.</p>",
    outcome_unknown:
      "<p>Recorded. If a new charge shows up later, come back — a verified post-cancellation charge qualifies for the €3 bounty.</p>",
  };

  return new NextResponse(
    page(
      `Receipt ${receipt.receipt_code} updated`,
      messages[outcome] || "<p>Recorded.</p>"
    ),
    { headers: { "content-type": "text/html" } }
  );
}
