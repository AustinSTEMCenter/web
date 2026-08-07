"use server";

import { site } from "@/lib/data/site";
import { postToFormsWebhook } from "@/lib/forms-webhook";

export type ContactState =
  | { status: "idle" }
  | { status: "success"; firstName: string }
  | { status: "error"; message: string };

const fallbackMessage =
  `Something went wrong on our end, sorry! Give us a call at ${site.phone} ` +
  "and we'll help you out the old-fashioned way.";

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const get = (name: string) => (formData.get(name) ?? "").toString().trim();

  // honeypot — bots fill every field; humans never see this one
  if (get("website") !== "") {
    return { status: "success", firstName: get("firstName") };
  }

  const firstName = get("firstName");
  const email = get("email");
  const message = get("message");
  if (!firstName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) {
    return {
      status: "error",
      message:
        "We need at least a first name, a working email, and a message. Mind checking those?",
    };
  }

  const payload = {
    formType: "contact",
    firstName,
    lastName: get("lastName"),
    email,
    phone: get("phone"),
    topic: get("topic"),
    source: get("source"),
    message,
    submittedAt: new Date().toISOString(),
  };

  try {
    await postToFormsWebhook(payload);
  } catch (err) {
    console.error("Contact webhook failed:", err, payload);
    return { status: "error", message: fallbackMessage };
  }

  return { status: "success", firstName };
}
