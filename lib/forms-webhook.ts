/*
 * Interim form store: posts JSON to the Google Apps Script webhook that
 * appends rows to the ASC Community Rolodex sheet (docs/forms-webhook-setup.md).
 * Swap this for the real form store + Resend when the CMS bake-off resolves
 * (website-plan-02.md §4.1).
 */
export async function postToFormsWebhook(
  payload: Record<string, unknown>,
): Promise<void> {
  // FORMS_WEBHOOK_URL is the current name; RSVP_WEBHOOK_URL predates the
  // contact form sharing this pipe and is kept so existing deploys still work.
  const url = process.env.FORMS_WEBHOOK_URL ?? process.env.RSVP_WEBHOOK_URL;
  if (!url) throw new Error("FORMS_WEBHOOK_URL not set");

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`forms webhook responded ${res.status}`);
}
