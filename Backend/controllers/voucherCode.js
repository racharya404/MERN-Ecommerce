const express = require("express");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Shop = require("../models/shop");
const ErrorHandler = require("../utilities/ErrorHandler");
const { isSeller } = require("../middlewares/auth");
const VoucherCode = require("../models/voucherCode");
const router = express.Router();

// create coupoun code
router.post(
  "/create-voucher-code",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const isVoucherCodeExists = await VoucherCode.find({
        name: req.body.name,
      });

      if (isVoucherCodeExists.length !== 0) {
        return next(new ErrorHandler("Coupoun code already exists!", 400));
      }

      const voucherCode = await VoucherCode.create(req.body);

      res.status(201).json({
        success: true,
        voucherCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all vouchers of a shop
router.get(
  "/get-voucher/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const voucherCodes = await VoucherCode.find({ shopId: req.seller.id });
      res.status(201).json({
        success: true,
        voucherCodes,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete coupoun code of a shop
router.delete(
  "/delete-voucher/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const voucherCode = await VoucherCode.findByIdAndDelete(req.params.id);

      if (!voucherCode) {
        return next(new ErrorHandler("Voucher code dosen't exists!", 400));
      }
      res.status(201).json({
        success: true,
        message: "Voucher code deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get voucher code value by its name
router.get(
  "/get-voucher-value/:name",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const voucherCode = await VoucherCode.findOne({ name: req.params.name });

      res.status(200).json({
        success: true,
        voucherCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
