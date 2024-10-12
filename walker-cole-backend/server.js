require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route to handle payment intent creation
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { priceId } = req.body;

    // Create a PaymentIntent with the given price ID
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 5000, // Replace with the correct amount or make dynamic based on priceId
      currency: 'usd',
      payment_method_types: ['card'],
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send({
      error: 'Unable to create payment intent',
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
