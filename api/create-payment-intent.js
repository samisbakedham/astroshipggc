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

      console.log('Received priceId:', priceId); // Debugging log

      // Adjust the amount dynamically based on priceId if needed
      let amount = 5000; // Default amount, update this as per your logic

      if (priceId === "prod_R0vscIVM5pEp7y") {
        amount = 5000; // $50 for Landscaping, for example
      }
      // Add more conditions for different services if needed

      // Create a PaymentIntent with the given price ID
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card'],
      });

      console.log('Payment intent created:', paymentIntent.id); // Debugging log

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
