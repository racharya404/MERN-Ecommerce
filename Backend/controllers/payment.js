const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Process payment
router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    // Create payment intent with specified amount and currency
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: { company: "Khullabazzar" },
    });
    
    // Send client secret for client-side payment confirmation
    res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  })
);

// Get Stripe API key
router.get(
  "/stripeapikey",
  catchAsyncErrors(async (req, res, next) => {
    // Send the Stripe API key to the client
    res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
  })
);

module.exports = router;
