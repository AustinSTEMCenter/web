# Contact form → Google Sheet setup

The `/contact` form posts JSON to the URL in the `FORMS_WEBHOOK_URL` env var.
The existing `RSVP_WEBHOOK_URL` name still works as a fallback so the former
RSVP webhook deployment can be reused without an immediate environment-variable
migration. Until one of those variables is set, submissions fail gracefully:
visitors see a "call us" message and the payload is logged server-side.

This keeps `main` backend-agnostic per the CMS bake-off
(`website-plan-02.md` §3). When the bake-off resolves, replace the interim
webhook in one place: `lib/forms-webhook.ts`.

The 5-minute interim setup — a Google Sheet as the rolodex:

1. Create a Google Sheet (e.g. "ASC Community Rolodex") in the ASC Drive.
2. **Extensions → Apps Script**, replace the contents with:

```js
// Per-submission email notifications. Interim stand-in for Resend, which is
// blocked until we have DNS access to verify the sending domain. Set to ""
// to disable.
const NOTIFY_EMAIL = "joseph@austinstemcenter.org";

const SHEET_NAME = "Contact";
const HEADER = [
  "Submitted", "First name", "Last name", "Email", "Phone",
  "Topic", "Heard about us", "Message", "Form",
];

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADER);
  sheet.appendRow([
    data.submittedAt, data.firstName, data.lastName, data.email, data.phone,
    data.topic, data.source, data.message, data.formType,
  ]);
  if (NOTIFY_EMAIL) {
    const subject = `ASC contact: ${data.topic || "no topic"} — ${data.firstName} ${data.lastName}`;
    MailApp.sendEmail(NOTIFY_EMAIL, subject, JSON.stringify(data, null, 2));
  }
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. For a first-time setup, choose **Deploy → New deployment → Web app**,
   execute as **Me**, set access to **Anyone**, and copy the web-app URL.
4. Set `FORMS_WEBHOOK_URL=<that URL>` in `.env.local` (development) and in the
   Vercel project's environment variables (production), then redeploy the site.

Notes:

- "Access: Anyone" only means anyone can POST to the script — the sheet
  itself stays private. The contact form has a honeypot field for basic bot
  filtering.
- To update the former RSVP deployment without changing its URL, paste in the
  contact-form code, then choose **Deploy → Manage deployments**, select the
  active deployment, choose **Edit**, select **New version**, and deploy. The
  existing URL and environment-variable value remain valid.
- Creating a separate **New deployment** produces a different URL. Update the
  environment variable if you choose that route.
- Existing RSVP rows are untouched; new contact submissions go to the
  "Contact" tab in the same spreadsheet.
- Test by submitting the contact form and confirming that a row lands on the
  "Contact" tab and that joseph@ receives the notification email.
