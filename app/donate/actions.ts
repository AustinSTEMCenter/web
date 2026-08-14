"use server";

import { headers } from "next/headers";
import { stripe, DONATION_PRICE_ID } from "@/lib/stripe";

export async function createDonationCheckoutSession(): Promise<string> {
  const h = await headers();
  const origin = h.get("origin") ?? `https://${h.get("host")}`;

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded_page",
    mode: "payment",
    submit_type: "donate",
    line_items: [{ price: DONATION_PRICE_ID, quantity: 1 }],
    return_url: `${origin}/donate/thank-you?session_id={CHECKOUT_SESSION_ID}`,
  });

  if (!session.client_secret) {
    throw new Error("Stripe did not return a client secret");
  }
  return session.client_secret;
}
