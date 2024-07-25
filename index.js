const express = require('express');
const Stripe = require('stripe');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const stripe = Stripe('sk_test_51PXDHqRohmxj8iDDdsxdvHxE585FlQw4wjr0FlMKEqhAJM0BQBKc8RfTBgetXeKFz9OzLlYWSnWPdmGIyX1sxNvu00Xou8Plrx'); // Replace with your Stripe Secret Key

app.use(bodyParser.json());
app.use(cors());

app.post('/create-payment-intent', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'usd',
    });
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
