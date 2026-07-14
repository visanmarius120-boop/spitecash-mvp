// app/api/exit-receipt/followup/route.ts
// GET (protejat cu CRON_SECRET): trimite follow-up-ul "did your cancellation
// really work?" pentru receipts a caror next_billing_date a trecut.
// Apeleaza-l zilnic dintr-un cron extern:
//   https://spitecash.com/api/exit-receipt/followup?key=CRON_SECRET

import { NextResponse } from "next/server";
import { sendTransactionalEmail } from "@/lib/email";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const BASE = "https://spitecash.com";

function outcomeLink(id: string, token: string, outcome: string): string {
  return `${BASE}/api/exit-receipt/outcome?id=${id}&token=${token}&outcome=${outcome}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  if (!process.env.CRON_SECRET || key !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = new Date().toISOString().slice(0, 10);

  const { data: due, error } = await supabaseAdmin
    .from("exit_receipts")
    .select("id, receipt_code, email, merchant_name, manage_token, next_billing_date")
    .eq("status", "cancel_requested")
    .is("followup_sent_at", null)
    .not("next_billing_date", "is", null)
    .lt("next_billing_date", today)
    .limit(50);

  if (error) {
    console.error("[EXIT-FOLLOWUP] query error:", error);
    return NextResponse.json({ error: "Query failed" }, { status: 500 });
  }

  let sent = 0;
  for (const r of due || []) {
    try {
      const btn = (label: string, outcome: string, color: string) =>
        `<a href="${outcomeLink(r.id, r.manage_token, outcome)}"
            style="display:inline-block;margin:4px 6px 4px 0;padding:11px 16px;
            background:${color};color:#fff;text-decoration:none;font-weight:700;
            font-size:14px;border-radius:2px">${label}</a>`;

      await sendTransactionalEmail({
        to: r.email,
        subject: `Did your ${r.merchant_name} cancellation really work? — ${r.receipt_code}`,
        html: `
          <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px">
            <p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#6f6a60;margin:0 0 8px">SPITECASH · EXIT RECEIPT ${r.receipt_code}</p>
            <h1 style="font-size:21px;font-weight:700;color:#16130f;margin:0 0 14px">Your ${r.merchant_name} billing date has passed.</h1>
            <p style="font-size:15px;color:#444;line-height:1.6;margin:0 0 18px">
              One click closes the loop — what actually happened?
            </p>
            ${btn("Cancelled successfully", "cancelled_successfully", "#0b7a45")}
            ${btn("I was charged again", "charged_again", "#c43a2e")}
            ${btn("I am not sure yet", "outcome_unknown", "#6f6a60")}
            <p style="font-size:13px;color:#6f6a60;line-height:1.6;margin-top:22px">
              If you were charged again: a verified post-cancellation charge
              qualifies for the €3 bounty — the button above takes you straight
              to a prefilled case.
            </p>
            <p style="font-size:12.5px;color:#999;margin-top:24px">
              SpiteCash · <a href="https://spitecash.com" style="color:#999">spitecash.com</a>
            </p>
          </div>`,
        text: `SpiteCash — Exit Receipt ${r.receipt_code}\n\nYour ${r.merchant_name} billing date has passed. What actually happened?\n\nCancelled successfully: ${outcomeLink(r.id, r.manage_token, "cancelled_successfully")}\nCharged again: ${outcomeLink(r.id, r.manage_token, "charged_again")}\nNot sure yet: ${outcomeLink(r.id, r.manage_token, "outcome_unknown")}\n\nA verified post-cancellation charge qualifies for the €3 bounty.`,
      });

      await supabaseAdmin
        .from("exit_receipts")
        .update({ followup_sent_at: new Date().toISOString() })
        .eq("id", r.id);
      await supabaseAdmin
        .from("exit_receipt_events")
        .insert({ receipt_id: r.id, event: "followup_sent" });
      sent += 1;
    } catch (e) {
      console.error(`[EXIT-FOLLOWUP] failed for ${r.receipt_code}:`, e);
    }
  }

  return NextResponse.json({ ok: true, due: (due || []).length, sent });
}
