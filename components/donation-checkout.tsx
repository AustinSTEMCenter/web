"use client";

import Script from "next/script";

// Stripe Buy Button — no-code hosted checkout. The publishable key is designed
// to be public; the button's price/amount options live in the Stripe dashboard.
const BUY_BUTTON_ID = "buy_btn_1U5UdfQXYb5YxJJMDK5O9d4N";
const PUBLISHABLE_KEY =
  "pk_live_51T8QtNQXYb5YxJJMlr6MaId20HKUs9WZf2Bov4tysy7iM7lyeCihNQ568ujMUR7uJ7hMSp8hbiG5kk8y6PYAFkrF00OZNQYjbQ";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace -- augmenting React's JSX namespace for the custom element
  namespace JSX {
    interface IntrinsicElements {
      "stripe-buy-button": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "buy-button-id": string;
        "publishable-key": string;
      };
    }
  }
}

export function DonationCheckout() {
  return (
    <>
      <Script src="https://js.stripe.com/v3/buy-button.js" strategy="lazyOnload" />
      <stripe-buy-button
        buy-button-id={BUY_BUTTON_ID}
        publishable-key={PUBLISHABLE_KEY}
      />
    </>
  );
}
