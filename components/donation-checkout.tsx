"use client";

import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { createDonationCheckoutSession } from "@/app/donate/actions";

let stripePromise: ReturnType<typeof loadStripe> | undefined;

export function DonationCheckout({
  publishableKey,
}: {
  publishableKey: string;
}) {
  stripePromise ??= loadStripe(publishableKey);

  return (
    <EmbeddedCheckoutProvider
      stripe={stripePromise}
      options={{ fetchClientSecret: createDonationCheckoutSession }}
    >
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
}
