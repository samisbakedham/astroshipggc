import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import Stripe from "stripe";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(bodyParser.json());

// Content Security Policy Middleware
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com; connect-src 'self' https://api.stripe.com https://walker-cole.com; style-src 'self' 'unsafe-inline'; frame-src https://js.stripe.com"
  );
  next();
});

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/create-payment-intent", async (req, res) => {
  const { amount, currency, payment_method_types } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount || 1000, // Replace with the correct amount based on the priceId or other logic
      currency: currency || "usd",
      payment_method_types: payment_method_types || ["card"],
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exporting the handleBooking function
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
