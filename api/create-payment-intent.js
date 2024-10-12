import { buffer } from 'micro';
import Cors from 'micro-cors';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const buf = await buffer(req);
      const data = JSON.parse(buf.toString());
      const { priceId } = data;

      // Create a PaymentIntent with the given price ID
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 5000, // Adjust the amount dynamically based on priceId if needed
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
};

export default cors(handler);
