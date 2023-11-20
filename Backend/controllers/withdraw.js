const Shop = require("../models/shop");
const ErrorHandler = require("../utilities/ErrorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const express = require("express");
const { isSeller, isUser, isAdmin } = require("../middlewares/auth");
const Withdraw = require("../models/withdraw");
const deliverMail = require("../utilities/deliverMail");
const router = express.Router();

// Create withdraw request (only for seller)
router.post("/create-withdraw-request", isSeller, catchAsyncErrors(async (req, res, next) => {
  try {
    const { amount } = req.body;
    const data = { seller: req.seller, amount };

    try {
      // Send withdrawal request confirmation email to the seller
      await deliverMail({
        email: req.seller.email,
        subject: "Withdraw Request",
        message: `Hello ${req.seller.name}, Your withdraw request of ${amount}$ is processing. It will take 3 to 7 days to process! `,
      });
      res.status(201).json({ success: true });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }

    // Create withdraw record
    const withdraw = await Withdraw.create(data);

    // Update shop's available balance
    const shop = await Shop.findById(req.seller._id);
    shop.availableBalance -= amount;
    await shop.save();

    res.status(201).json({ success: true, withdraw });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

// Get all withdraw requests (admin only)
router.get("/get-all-withdraw-request", isUser, isAdmin("Admin"), catchAsyncErrors(async (req, res, next) => {
  try {
    // Retrieve all withdraw requests and sort by createdAt in descending order
    const withdraws = await Withdraw.find().sort({ createdAt: -1 });

    res.status(201).json({ success: true, withdraws });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

// Update withdraw request (admin only)
router.put("/update-withdraw-request/:id", isUser, isAdmin("Admin"), catchAsyncErrors(async (req, res, next) => {
  try {
    const { sellerId } = req.body;

    // Update withdraw status to "succeed" and set updatedAt to current time
    const withdraw = await Withdraw.findByIdAndUpdate(
      req.params.id,
      { status: "succeed", updatedAt: Date.now() },
      { new: true }
    );

    // Update seller's transactions with the successful withdrawal
    const seller = await Shop.findById(sellerId);
    const transection = { _id: withdraw._id, amount: withdraw.amount, updatedAt: withdraw.updatedAt, status: withdraw.status };
    seller.transections = [...seller.transections, transection];
    await seller.save();

    try {
      // Send payment confirmation email to the seller
      await deliverMail({
        email: seller.email,
        subject: "Payment confirmation",
        message: `Hello ${seller.name}, Your withdraw request of ${withdraw.amount}$ is on the way. Delivery time depends on your bank's rules, usually taking 3 to 7 days.`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }

    res.status(201).json({ success: true, withdraw });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

module.exports = router;
