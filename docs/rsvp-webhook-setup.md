# RSVP form → Google Sheet setup

The `/rsvp` form posts JSON to whatever URL is in the `RSVP_WEBHOOK_URL` env
var. Until that's set, submissions fail gracefully (visitors see a "call us"
message and the payload is logged server-side). This keeps `main`
backend-agnostic per the CMS bake-off (website-plan-02.md §3) — when the
bake-off resolves, swap the webhook for the real form store in one place:
`app/rsvp/actions.ts`.

The 5-minute interim setup — a Google Sheet as the rolodex:

1. Create a Google Sheet (e.g. "ASC Community Rolodex") in the ASC Drive.
2. **Extensions → Apps Script**, replace the contents with:

```js
const SHEET_NAME = "RSVPs";
// const NOTIFY_EMAIL = "hello@austinstemcenter.org"; // uncomment to get an email per RSVP

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Submitted", "First name", "Last name", "Email", "Phone",
      "Party size", "Kids' ages", "Heard about us", "Note",
      "Mailing list", "Form",
    ]);
  }
  sheet.appendRow([
    data.submittedAt, data.firstName, data.lastName, data.email, data.phone,
    data.partySize, data.kidsAges, data.source, data.note,
    data.mailingList ? "yes" : "no", data.formType,
  ]);
  if (typeof NOTIFY_EMAIL !== "undefined") {
    MailApp.sendEmail(
      NOTIFY_EMAIL,
      `New RSVP: ${data.firstName} ${data.lastName} (party of ${data.partySize})`,
      JSON.stringify(data, null, 2),
    );
  }
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. **Deploy → New deployment → Web app**, execute as **Me**, access:
   **Anyone**. Copy the web-app URL.
4. Set `RSVP_WEBHOOK_URL=<that URL>` in `.env.local` (dev) and in the Vercel
   project's environment variables (production), then redeploy.

Notes:

- "Access: Anyone" only means anyone can POST to the script — the sheet
  itself stays private. The form has a honeypot field for basic bot filtering.
- Re-deploying the Apps Script creates a **new** URL unless you choose
  "Manage deployments → edit → same version"; update the env var if it changes.
- Test: submit the form on `/rsvp` and confirm a row lands in the sheet.
