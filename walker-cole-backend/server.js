import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_live_51Q8tiiD3zf1H8CLSz1p44ij9VcimA1ZyWqyHknXNsd2wNJqvY2GxTIE5QG0410dyS9512jiycdSBLgFjgidoQzvz00GAtZMlHu"
);

export async function handleBooking(priceId) {
  const stripe = await stripePromise;
  const response = await fetch("/api/create-payment-intent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ priceId }),
  });

  if (!response.ok) {
    console.error("Failed to create payment intent");
    return;
  }

  const { clientSecret } = await response.json();

  const result = await stripe.redirectToCheckout({
    mode: "payment",
    lineItems: [{ price: priceId, quantity: 1 }],
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`,
  });

  if (result.error) {
    console.error(result.error.message);
  }
}
