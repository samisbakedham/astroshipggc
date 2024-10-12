// /api/create-payment-intent.js
import { buffer } from 'micro';
import Stripe from 'stripe';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const rawBody = await buffer(req);
      const body = JSON.parse(rawBody.toString());
      const { priceId } = body;

      // Create a PaymentIntent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 5000, // Replace with appropriate amount based on priceId
        currency: 'usd',
        payment_method_types: ['card'],
      });

      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error('Error creating payment intent:', error);
      res.status(500).json({ error: 'Unable to create payment intent' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
