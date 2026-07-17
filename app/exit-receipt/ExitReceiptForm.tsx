"use client";

// components/ExitReceiptForm.tsx
// Formular scurt, intentionat: bariera de intrare joasa fata de bounty case.
// Prefill din ghiduri: ?merchant=..&murl=..&source=.. (source = tracking tag)

import { FormEvent, useEffect, useState } from "react";

const EVIDENCE_ACCEPT =
  ".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf";

export function ExitReceiptForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receiptCode, setReceiptCode] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [merchantName, setMerchantName] = useState("");
  const [merchantUrl, setMerchantUrl] = useState("");
  const [source, setSource] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const m = params.get("merchant");
    const u = params.get("murl");
    const s = params.get("source");
    if (m) setMerchantName(m);
    if (u) setMerchantUrl(u);
    if (s) setSource(s);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    // Source tracking: appended when the visitor arrived from a guide
    // with an affiliateSource tag (e.g. cancel-mega). Lets us measure
    // which /cancel pages actually produce Exit Receipts.
    if (source) formData.append("source", source);

    try {
      const response = await fetch("/api/exit-receipt", {
        method: "POST",
        body: formData,
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Could not create the receipt.");
      }
      setReceiptCode(payload.receiptCode);
      form.reset();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (receiptCode) {
    return (
      <div className="er-success">
        <p className="er-kicker">EXIT RECEIPT · ACTIVE</p>
        <p className="er-code">{receiptCode}</p>
        <p>
          Check your inbox — your timestamped receipt is there. If you gave us
          your next billing date, we will check in with you after it passes to
          record whether the cancellation really worked.
        </p>
        <p>
          Charged again later? A post-cancellation charge that meets the{" "}
          <a href="/bounty-rules">six published criteria</a> qualifies for the
          €3 bounty.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="field">
        <label>App / merchant name *</label>
        <input
          name="merchantName"
          required
          placeholder="Example: NordVPN"
          value={merchantName}
          onChange={(e) => setMerchantName(e.target.value)}
        />
      </div>

      <div className="field">
        <label>App / website link</label>
        <input
          name="merchantUrl"
          type="url"
          placeholder="https://example.com"
          value={merchantUrl}
          onChange={(e) => setMerchantUrl(e.target.value)}
        />
      </div>

      <div className="field">
        <label>Where did you subscribe? *</label>
        <select name="route" required defaultValue="">
          <option value="" disabled>Choose</option>
          <option value="direct">On their website (direct)</option>
          <option value="apple">App Store (Apple)</option>
          <option value="google">Google Play</option>
          <option value="other">Other / not sure</option>
        </select>
      </div>

      <div className="field">
        <label>When did you cancel? *</label>
        <input name="cancellationAt" type="datetime-local" required />
      </div>

      <div className="field">
        <label>Next expected billing date</label>
        <input name="nextBillingDate" type="date" />
        <p className="help">
          Optional but powerful: this is when we check back with you to record
          whether the cancellation really worked.
        </p>
      </div>

      <div className="field">
        <label>Cancellation confirmation screenshot (optional)</label>
        <input name="confirmationProof" type="file" accept={EVIDENCE_ACCEPT} />
        <p className="help">
          If you upload it, we timestamp it and store a SHA-256 fingerprint —
          your proof gets a verifiable date. Blur or crop any sensitive details
          first; that never affects validity.
        </p>
      </div>

      <div className="field">
        <label>Email *</label>
        <input
          name="email"
          type="email"
          required
          placeholder="you@example.com"
        />
        <p className="help">
          Used only for your receipt and the follow-up about this cancellation.
        </p>
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating receipt..." : "Create my free Exit Receipt"}
      </button>

      {errorMessage && <p className="error">{errorMessage}</p>}
    </form>
  );
}
