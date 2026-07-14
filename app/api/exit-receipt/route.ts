// app/api/exit-receipt/route.ts
// POST: creeaza un Exit Receipt — dovada structurata a incercarii de anulare.

import { createHash, randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { sendTransactionalEmail } from "@/lib/email";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import {
  optionalString,
  requiredString,
  safeFilename,
  validateEvidenceFile,
} from "@/lib/validators";

export const runtime = "nodejs";

const ROUTES = new Set(["direct", "apple", "google", "other"]);

function receiptCode(): string {
  return "SC-EXIT-" + randomUUID().replace(/-/g, "").slice(0, 6).toUpperCase();
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const email = requiredString(formData.get("email")).toLowerCase();
    const merchantName = requiredString(formData.get("merchantName"));
    const merchantUrl = optionalString(formData.get("merchantUrl"));
    const route = requiredString(formData.get("route"));
    const cancellationAt = requiredString(formData.get("cancellationAt")); // datetime-local
    const nextBillingDate = optionalString(formData.get("nextBillingDate")); // date

    if (!ROUTES.has(route)) {
      return NextResponse.json({ error: "Invalid route." }, { status: 400 });
    }

    // dovada de confirmare e OPTIONALA la Exit Receipt (bariera joasa, intentionat)
    const confirmationValue = formData.get("confirmationProof");
    const confirmationProof =
      confirmationValue instanceof File && confirmationValue.size > 0
        ? confirmationValue
        : null;

    let evidencePath: string | null = null;
    let evidenceSha256: string | null = null;

    const code = receiptCode();

    if (confirmationProof) {
      validateEvidenceFile(confirmationProof, "Confirmation proof");
      const bucket = process.env.SUPABASE_EVIDENCE_BUCKET || "spite-evidence";
      const buf = Buffer.from(await confirmationProof.arrayBuffer());
      evidenceSha256 = createHash("sha256").update(buf).digest("hex");
      const filename = safeFilename(confirmationProof.name || "confirmation");
      evidencePath = `exit/${code}/${Date.now()}-${filename}`;
      const { error: uploadError } = await supabaseAdmin.storage
        .from(bucket)
        .upload(evidencePath, buf, {
          contentType: confirmationProof.type || "application/octet-stream",
          upsert: false,
        });
      if (uploadError) {
        console.error("[EXIT] upload error:", uploadError);
        return NextResponse.json(
          { error: "Could not upload confirmation proof." },
          { status: 500 }
        );
      }
    }

    const { data: receipt, error: insertError } = await supabaseAdmin
      .from("exit_receipts")
      .insert({
        receipt_code: code,
        email,
        merchant_name: merchantName,
        merchant_url: merchantUrl,
        route,
        cancellation_at: new Date(cancellationAt).toISOString(),
        next_billing_date: nextBillingDate || null,
        evidence_path: evidencePath,
        evidence_sha256: evidenceSha256,
      })
      .select("id, receipt_code, manage_token")
      .single();

    if (insertError || !receipt) {
      console.error("[EXIT] insert error:", insertError);
      return NextResponse.json(
        { error: "Could not create exit receipt." },
        { status: 500 }
      );
    }

    await supabaseAdmin
      .from("exit_receipt_events")
      .insert({ receipt_id: receipt.id, event: "created" });

    // email de confirmare cu receipt-ul
    try {
      const routeLabel =
        route === "apple" ? "App Store" :
        route === "google" ? "Google Play" :
        route === "direct" ? "Direct website" : "Other";
      await sendTransactionalEmail({
        to: email,
        subject: `Your ${merchantName} Exit Receipt is active — ${code}`,
        html: `
          <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px">
            <p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#6f6a60;margin:0 0 8px">SPITECASH · EXIT RECEIPT</p>
            <h1 style="font-size:22px;font-weight:700;color:#16130f;margin:0 0 16px">Your cancellation now has a receipt.</h1>
            <div style="background:#fdfcf9;border:1px dashed #16130f;padding:18px 20px;margin:20px 0;font-family:monospace;font-size:13px;color:#333;line-height:1.9">
              <strong>Exit Receipt:</strong> ${receipt.receipt_code}<br>
              <strong>Merchant:</strong> ${merchantName}<br>
              <strong>Route:</strong> ${routeLabel}<br>
              <strong>Cancellation requested:</strong> ${new Date(cancellationAt).toUTCString()}<br>
              ${nextBillingDate ? `<strong>Next billing watch:</strong> ${nextBillingDate}<br>` : ""}
              ${evidenceSha256 ? `<strong>Evidence hash (SHA-256):</strong> ${evidenceSha256.slice(0, 16)}…<br>` : ""}
            </div>
            <p style="font-size:14px;color:#444;line-height:1.6">
              ${nextBillingDate
                ? "We will check in with you after your next billing date to record whether the cancellation really worked."
                : "Keep this email — it is your timestamped record of the cancellation attempt."}
              If you are ever charged again after this cancellation, reply to this
              email or submit the charge with your proofs — a verified
              post-cancellation charge qualifies for the €3 bounty.
            </p>
            <p style="font-size:12.5px;color:#999;margin-top:24px">
              An Exit Receipt is a timestamped personal record, not a legal certification.<br>
              SpiteCash · <a href="https://spitecash.com" style="color:#999">spitecash.com</a>
            </p>
          </div>`,
        text: `SpiteCash Exit Receipt ${receipt.receipt_code}\n\nMerchant: ${merchantName}\nRoute: ${routeLabel}\nCancellation requested: ${new Date(cancellationAt).toUTCString()}\n${nextBillingDate ? `Next billing watch: ${nextBillingDate}\n` : ""}\nWe will check in after your next billing date. If you are charged again, a verified post-cancellation charge qualifies for the €3 bounty.\n\nAn Exit Receipt is a timestamped personal record, not a legal certification.\nSpiteCash · spitecash.com`,
      });
    } catch (emailError) {
      console.error("[EXIT] confirmation email failed:", emailError);
    }

    return NextResponse.json({
      ok: true,
      receiptCode: receipt.receipt_code,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unexpected error.",
      },
      { status: 400 }
    );
  }
}
