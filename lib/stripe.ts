import Stripe from "stripe";

// Server-only. Sandbox vs live is controlled by the keys in .env.local.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const DONATION_PRICE_ID = process.env.STRIPE_DONATION_PRICE_ID!;
