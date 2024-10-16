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
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com; connect-src 'self' https://api.stripe.com; style-src 'self' 'unsafe-inline'; frame-src https://js.stripe.com"
  );
  next();
});

// Create Payment Intent Endpoint
app.post("/api/create-payment-intent", async (req, res) => {
  const { amount, currency, payment_method_types } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: currency || "usd",
      payment_method_types: payment_method_types || ["card"],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
