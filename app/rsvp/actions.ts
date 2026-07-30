"use server";

import { site } from "@/lib/data/site";

export type RsvpState =
  | { status: "idle" }
  | { status: "success"; firstName: string }
  | { status: "error"; message: string };

const fallbackMessage =
  `Something went wrong on our end — sorry! Give us a call at ${site.phone} ` +
  "and we'll put you on the list the old-fashioned way.";

export async function submitRsvp(
  _prev: RsvpState,
  formData: FormData,
): Promise<RsvpState> {
  const get = (name: string) => (formData.get(name) ?? "").toString().trim();

  // honeypot — bots fill every field; humans never see this one
  if (get("website") !== "") {
    return { status: "success", firstName: get("firstName") };
  }

  const firstName = get("firstName");
  const email = get("email");
  if (!firstName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      status: "error",
      message:
        "We need at least a first name and a working email — mind checking those two?",
    };
  }

  const payload = {
    formType: "grand-opening-rsvp",
    firstName,
    lastName: get("lastName"),
    email,
    phone: get("phone"),
    partySize: get("partySize"),
    kidsAges: get("kidsAges"),
    source: get("source"),
    note: get("note"),
    mailingList: formData.get("mailingList") === "on",
    submittedAt: new Date().toISOString(),
  };

  const webhookUrl = process.env.RSVP_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("RSVP_WEBHOOK_URL not set — submission dropped:", payload);
    return { status: "error", message: fallbackMessage };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
  } catch (err) {
    console.error("RSVP webhook failed:", err, payload);
    return { status: "error", message: fallbackMessage };
  }

  return { status: "success", firstName };
}
