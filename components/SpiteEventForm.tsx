"use client";

import { FormEvent, useState } from "react";

export function SpiteEventForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setResultMessage(null);
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/submit-spite-event", {
        method: "POST",
        body: formData,
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Submission failed.");
      }

      setResultMessage(
        "We received your case. We will review it manually and contact you by email if it qualifies for a bounty."
      );

      form.reset();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <section className="formSection">
        <h2>1. The app that charged you</h2>

        <div className="field">
          <label>App / merchant name *</label>
          <input name="merchantName" required placeholder="Example: Example AI" />
        </div>

        <div className="field">
          <label>App / website link *</label>
          <input
            name="merchantUrl"
            type="url"
            required
            placeholder="https://example.com"
          />
        </div>

        <div className="field">
          <label>Category *</label>
          <select name="vertical" required defaultValue="">
            <option value="" disabled>
              Choose category
            </option>
            <option value="ai_tool">AI tool</option>
            <option value="vpn">VPN</option>
            <option value="photo_video">Photo/video editing</option>
            <option value="cloud_storage">Cloud storage</option>
            <option value="language_learning">Language learning</option>
            <option value="other">Other digital subscription</option>
          </select>
        </div>

        <div className="field">
          <label>Country *</label>
          <input name="country" required placeholder="Example: Germany" />
        </div>
      </section>

      <section className="formSection">
        <h2>2. The charge</h2>

        <div className="field">
          <label>Charged amount *</label>
          <input
            name="amount"
            type="number"
            step="0.01"
            min="0"
            required
            placeholder="Example: 19.99"
          />
        </div>

        <div className="field">
          <label>Currency *</label>
          <select name="currency" required defaultValue="EUR">
            <option value="EUR">EUR</option>
            <option value="RON">RON</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
            <option value="CHF">CHF</option>
            <option value="CAD">CAD</option>
            <option value="AUD">AUD</option>
          </select>
        </div>

        <div className="field">
          <label>Charge date *</label>
          <input name="chargeDate" type="date" required />
        </div>

        <fieldset className="field radioGroup">
          <legend>Was this after a free trial? *</legend>
          <label>
            <input type="radio" name="trialStarted" value="true" required /> Yes
          </label>
          <label>
            <input type="radio" name="trialStarted" value="false" /> No
          </label>
        </fieldset>

        <div className="field">
          <label>Did you receive a reminder before the charge? *</label>
          <select name="reminderReceived" required defaultValue="">
            <option value="" disabled>
              Choose
            </option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="unknown">I do not know</option>
          </select>
        </div>
      </section>

      <section className="formSection">
        <h2>3. Cancellation, refund, and switching</h2>

        <fieldset className="field radioGroup">
          <legend>Did you try to cancel? *</legend>
          <label>
            <input type="radio" name="cancelAttempted" value="true" required />{" "}
            Yes
          </label>
          <label>
            <input type="radio" name="cancelAttempted" value="false" /> No
          </label>
        </fieldset>

        <div className="field">
          <label>How hard was it to cancel? 1–10</label>
          <input
            name="cancelDifficulty"
            type="number"
            min="1"
            max="10"
            placeholder="1 = very easy, 10 = very difficult"
          />
        </div>

        <fieldset className="field radioGroup">
          <legend>Did you request a refund? *</legend>
          <label>
            <input type="radio" name="refundRequested" value="true" required />{" "}
            Yes
          </label>
          <label>
            <input type="radio" name="refundRequested" value="false" /> No
          </label>
        </fieldset>

        <div className="field">
          <label>Did you receive the refund? *</label>
          <select name="refundReceived" required defaultValue="">
            <option value="" disabled>
              Choose
            </option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="pending">Still pending</option>
            <option value="not_requested">I did not request a refund</option>
          </select>
        </div>

        <fieldset className="field radioGroup">
          <legend>Would you switch to an alternative? *</legend>
          <label>
            <input type="radio" name="switchIntent" value="true" required /> Yes
          </label>
          <label>
            <input type="radio" name="switchIntent" value="false" /> No
          </label>
        </fieldset>

        <div className="field">
          <label>If yes, which alternative would you consider?</label>
          <input
            name="preferredAlternative"
            placeholder="Example: I would try X instead of Y"
          />
        </div>

        <div className="field">
          <label>Short story</label>
          <textarea
            name="userStory"
            rows={4}
            placeholder="What happened? What was frustrating, unclear, or hard to cancel?"
          />
        </div>
      </section>

      <section className="formSection">
        <h2>4. Evidence</h2>

        <p className="help">
          Before uploading screenshots, hide full card numbers, passwords, IBANs,
          identity documents, or any sensitive banking data.
        </p>

        <div className="field">
          <label>Upload trial proof *</label>
          <input name="trialProof" type="file" required accept="image/*,.pdf" />
        </div>

        <div className="field">
          <label>Upload payment proof *</label>
          <input
            name="paymentProof"
            type="file"
            required
            accept="image/*,.pdf"
          />
        </div>

        <div className="field">
          <label>Other evidence, optional</label>
          <input name="extraEvidence" type="file" accept="image/*,.pdf" />
        </div>
      </section>

      <section className="formSection">
        <h2>5. Contact and consent</h2>

        <div className="field">
          <label>Email for contact / bounty *</label>
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
          />
        </div>

        <label className="checkLabel">
          <input name="researchConsent" type="checkbox" required /> I agree that
          anonymized data from my submission may be used for aggregated research.
        </label>

        <label className="checkLabel">
          <input name="sensitiveDataConfirmation" type="checkbox" required />{" "}
          I confirm that I am not sending full card numbers, passwords, identity
          documents, or sensitive banking data.
        </label>

        <label className="checkLabel">
          <input name="leadOptIn" type="checkbox" /> I want to be contacted about
          better alternatives to the app that charged me.
        </label>

        <label className="checkLabel">
          <input name="marketingOptIn" type="checkbox" /> I agree to receive
          project updates.
        </label>
      </section>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit my case"}
      </button>

      {resultMessage && <p className="success">{resultMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </form>
  );
}
