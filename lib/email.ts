type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

export async function sendTransactionalEmail(input: SendEmailInput) {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.warn("BREVO_API_KEY missing. Email skipped.");
    return { skipped: true };
  }

  const fromEmail = process.env.EMAIL_FROM_ADDRESS || "hello@spitecash.com";
  const fromName = process.env.EMAIL_FROM_NAME || "SpiteCash";
  const replyTo = process.env.EMAIL_REPLY_TO || fromEmail;

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: fromName,
        email: fromEmail,
      },
      replyTo: {
        email: replyTo,
      },
      to: [{ email: input.to }],
      subject: input.subject,
      htmlContent: input.html,
      textContent: input.text,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Brevo email failed: ${response.status} ${body}`);
  }

  return response.json();
}