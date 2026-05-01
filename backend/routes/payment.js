const express = require("express");
const Stripe = require("stripe");
const axios = require("axios");

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// 💳 STRIPE
router.post("/stripe", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: req.body.items.map(item => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: item.price * 100
      },
      quantity: 1
    })),
    mode: "payment",
    success_url: "https://nexcart.netlify.app/success.html",
  });

  res.json({ url: session.url });
});

// 📲 MOBILE MONEY (Flutterwave)
router.post("/mobile-money", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.flutterwave.com/v3/payments",
      {
        tx_ref: "TX-" + Date.now(),
        amount: req.body.amount,
        currency: "UGX",
        redirect_url: "https://your-site.netlify.app/success.html",
        payment_options: "mobilemoneyuganda",
        customer: {
          email: req.body.email,
          phonenumber: req.body.phone,
          name: req.body.name
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).send("Payment failed");
  }
});

module.exports = router;