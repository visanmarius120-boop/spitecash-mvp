import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import {
  checkboxBoolean,
  optionalNumber,
  optionalString,
  requiredBoolean,
  requiredFile,
  requiredNumber,
  requiredString,
  safeFilename,
} from "@/lib/validators";

export const runtime = "nodejs";

type EvidenceUpload = {
  file: File;
  fileType: "trial_proof" | "payment_proof" | "other";
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const email = requiredString(formData.get("email")).toLowerCase();
    const country = requiredString(formData.get("country"));

    const merchantName = requiredString(formData.get("merchantName"));
    const merchantUrl = requiredString(formData.get("merchantUrl"));
    const vertical = requiredString(formData.get("vertical"));

    const amount = requiredNumber(formData.get("amount"));
    const currency = requiredString(formData.get("currency")).toUpperCase();
    const chargeDate = requiredString(formData.get("chargeDate"));

    const trialStarted = requiredBoolean(formData.get("trialStarted"));
    const reminderReceived = requiredString(formData.get("reminderReceived"));

    const cancelAttempted = requiredBoolean(formData.get("cancelAttempted"));
    const cancelDifficulty = optionalNumber(formData.get("cancelDifficulty"));

    const refundRequested = requiredBoolean(formData.get("refundRequested"));
    const refundReceived = requiredString(formData.get("refundReceived"));

    const switchIntent = requiredBoolean(formData.get("switchIntent"));
    const preferredAlternative = optionalString(
      formData.get("preferredAlternative")
    );

    const userStory = optionalString(formData.get("userStory"));

    const researchConsent = checkboxBoolean(formData.get("researchConsent"));
    const sensitiveDataConfirmation = checkboxBoolean(
      formData.get("sensitiveDataConfirmation")
    );
    const marketingOptIn = checkboxBoolean(formData.get("marketingOptIn"));
    const leadOptIn = checkboxBoolean(formData.get("leadOptIn"));

    if (!researchConsent) {
      return NextResponse.json(
        { error: "Research consent is required." },
        { status: 400 }
      );
    }

    if (!sensitiveDataConfirmation) {
      return NextResponse.json(
        { error: "Sensitive data confirmation is required." },
        { status: 400 }
      );
    }

    const trialProof = requiredFile(formData.get("trialProof"));
    const paymentProof = requiredFile(formData.get("paymentProof"));

    const extraEvidenceValue = formData.get("extraEvidence");
    const extraEvidence =
      extraEvidenceValue instanceof File && extraEvidenceValue.size > 0
        ? extraEvidenceValue
        : null;

    const evidenceUploads: EvidenceUpload[] = [
      { file: trialProof, fileType: "trial_proof" },
      { file: paymentProof, fileType: "payment_proof" },
    ];

    if (extraEvidence) {
      evidenceUploads.push({
        file: extraEvidence,
        fileType: "other",
      });
    }

    const { data: user, error: userError } = await supabaseAdmin
      .from("users")
      .upsert(
        {
          email,
          country,
          research_consent: researchConsent,
          sensitive_data_confirmation: sensitiveDataConfirmation,
          marketing_opt_in: marketingOptIn,
          lead_opt_in: leadOptIn,
        },
        {
          onConflict: "email",
        }
      )
      .select("id")
      .single();

    if (userError || !user) {
      console.error("User upsert error:", userError);
      return NextResponse.json(
        { error: "Could not create user." },
        { status: 500 }
      );
    }

    const { data: merchant, error: merchantError } = await supabaseAdmin
      .from("merchants")
      .upsert(
        {
          name: merchantName,
          url: merchantUrl,
          vertical,
          country_primary: country,
        },
        {
          onConflict: "name,url",
        }
      )
      .select("id")
      .single();

    if (merchantError || !merchant) {
      console.error("Merchant upsert error:", merchantError);
      return NextResponse.json(
        { error: "Could not create merchant." },
        { status: 500 }
      );
    }

    const { data: spiteEvent, error: eventError } = await supabaseAdmin
      .from("spite_events")
      .insert({
        user_id: user.id,
        merchant_id: merchant.id,
        country,

        amount,
        currency,
        charge_date: chargeDate,

        trial_started: trialStarted,
        reminder_received: reminderReceived,

        cancel_attempted: cancelAttempted,
        cancel_difficulty: cancelAttempted ? cancelDifficulty : null,

        refund_requested: refundRequested,
        refund_received: refundRequested ? refundReceived : "not_requested",

        switch_intent: switchIntent,
        preferred_alternative: switchIntent ? preferredAlternative : null,
        user_story: userStory,

        status: leadOptIn ? "lead_opt_in" : "new",
      })
      .select("id")
      .single();

    if (eventError || !spiteEvent) {
      console.error("Event insert error:", eventError);
      return NextResponse.json(
        { error: "Could not create event." },
        { status: 500 }
      );
    }

    const bucket = process.env.SUPABASE_EVIDENCE_BUCKET || "spite-evidence";

    for (const item of evidenceUploads) {
      const filename = safeFilename(item.file.name || "evidence");
      const storagePath = `${spiteEvent.id}/${item.fileType}/${Date.now()}-${filename}`;

      const { error: uploadError } = await supabaseAdmin.storage
        .from(bucket)
        .upload(storagePath, item.file, {
          contentType: item.file.type || "application/octet-stream",
          upsert: false,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        return NextResponse.json(
          { error: "Could not upload evidence file." },
          { status: 500 }
        );
      }

      const { error: evidenceError } = await supabaseAdmin
        .from("evidence_files")
        .insert({
          event_id: spiteEvent.id,
          storage_path: storagePath,
          original_filename: item.file.name,
          file_type: item.fileType,
          mime_type: item.file.type,
          file_size_bytes: item.file.size,
          redaction_status: "pending_review",
        });

      if (evidenceError) {
        console.error("Evidence insert error:", evidenceError);
        return NextResponse.json(
          { error: "Could not save evidence metadata." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      ok: true,
      eventId: spiteEvent.id,
      message: "Submission received.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unexpected submission error.",
      },
      { status: 400 }
    );
  }
}
