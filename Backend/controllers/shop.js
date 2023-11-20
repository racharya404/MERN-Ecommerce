const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const deliverMail = require("../utilities/deliverMail");
const Shop = require("../models/shop");
const { isUser, isSeller, isAdmin } = require("../middlewares/auth");
const cloudinary = require("cloudinary");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utilities/ErrorHandler");
const sendsellerToken = require("../utilities/sellerToken");

// Create shop
router.post("/create-shop", catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, name, password, avatar, address, phoneNumber, zipCode } = req.body;

    // Check if the email already exists
    const sellerEmail = await Shop.findOne({ email });
    if (sellerEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }

    // Upload avatar to cloudinary
    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
    });

    const seller = {
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      address,
      phoneNumber,
      zipCode,
    };

    // Create activation token
    const activationToken = createActivationToken(seller);

    // Send activation email
    const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;
    await deliverMail({
      email: seller.email,
      subject: "Activate your Shop",
      message: `Hello ${seller.name}, please click on the link to activate your shop: ${activationUrl}`,
    });

    res.status(201).json({
      success: true,
      message: `Please check your email: ${seller.email} to activate your shop!`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
}));

// Create activation token
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// Activate user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newSeller) {
        return next(new ErrorHandler("Invalid token", 400));
      }

      // Destructure seller info
      const { name, email, password, avatar, zipCode, address, phoneNumber } = newSeller;

      // Check if the user already exists
      let seller = await Shop.findOne({ email });
      if (seller) {
        return next(new ErrorHandler("User already exists", 400));
      }

      // Create a new shop
      seller = await Shop.create({
        name,
        email,
        avatar,
        password,
        zipCode,
        address,
        phoneNumber,
      });

      // Send token for authentication
      sendsellerToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Login shop
router.post(
  "/login-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // Validate email and password
      if (!email || !password) {
        return next(new ErrorHandler("Please provide all fields!", 400));
      }

      // Find shop by email
      const user = await Shop.findOne({ email }).select("+password");

      // Check if user exists
      if (!user) {
        return next(new ErrorHandler("User doesn't exist!", 400));
      }

      // Check if password is valid
      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide correct information", 400)
        );
      }

      // Send token for authentication
      sendsellerToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Load shop
router.get(
  "/getSeller",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Get shop info by ID
      const seller = await Shop.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandler("User doesn't exist", 400));
      }

      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Logout from shop
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Clear seller token
      res.cookie("seller_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      res.status(201).json({
        success: true,
        message: "Logout successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get shop info
router.get(
  "/get-shop-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Get shop info by ID
      const shop = await Shop.findById(req.params.id);
      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update shop profile picture
router.put(
  "/update-shop-avatar",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Find existing seller
      let existsSeller = await Shop.findById(req.seller._id);

      // Delete existing avatar from cloudinary
      const imageId = existsSeller.avatar.public_id;
      await cloudinary.v2.uploader.destroy(imageId);

      // Upload new avatar to cloudinary
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
      });

      // Update seller's avatar
      existsSeller.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };

      // Save changes
      await existsSeller.save();

      res.status(200).json({
        success: true,
        seller: existsSeller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update seller info
router.put(
  "/update-seller-info",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Destructure update data
      const { name, description, address, phoneNumber, zipCode } = req.body;

      // Find seller by ID
      const shop = await Shop.findOne(req.seller._id);

      if (!shop) {
        return next(new ErrorHandler("User not found", 400));
      }

      // Update seller info
      shop.name = name;
      shop.description = description;
      shop.address = address;
      shop.phoneNumber = phoneNumber;
      shop.zipCode = zipCode;

      // Save changes
      await shop.save();

      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get all sellers for admin
router.get(
  "/admin-all-sellers",
  isUser,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Get all sellers, sorted by creation date
      const sellers = await Shop.find().sort({
        createdAt: -1,
      });

      res.status(201).json({
        success: true,
        sellers,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Delete seller (admin only)
router.delete(
  "/delete-seller/:id",
  isUser,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Find and delete seller by ID
      const seller = await Shop.findByIdAndDelete(req.params.id);

      if (!seller) {
        return next(
          new ErrorHandler("Seller not available with this ID", 400)
        );
      }

      res.status(201).json({
        success: true,
        message: "Seller deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update seller withdraw methods (sellers only)
router.put(
  "/update-payment-methods",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Update withdraw method for seller
      const { withdrawMethod } = req.body;
      const seller = await Shop.findByIdAndUpdate(req.seller._id, {
        withdrawMethod,
      });

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Delete seller withdraw methods (sellers only)
router.delete(
  "/delete-withdraw-method/",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Find and update seller's withdraw method to null
      const seller = await Shop.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandler("Seller not found with this ID", 400));
      }

      seller.withdrawMethod = null;

      await seller.save();

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
