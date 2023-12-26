const express = require("express");
const ErrorHandler = require("./middlewares/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors({
  origin: 'https://mern-ecommerce-frontend-bay.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization',
}));

app.use(express.json());
app.use(cookieParser());
app.use("/test", (req, res) => {
  res.send("Hello world!");
});

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// import routes
const user = require("./controllers/user");
const shop = require("./controllers/shop");
const product = require("./controllers/product");
const event = require("./controllers/event");
const voucher = require("./controllers/voucherCode");
const payment = require("./controllers/payment");
const order = require("./controllers/order");
const withdraw = require("./controllers/withdraw");

app.use("/api/v2/user", user);
app.use("/api/v2/order", order);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/voucher", voucher);
app.use("/api/v2/payment", payment);
app.use("/api/v2/withdraw", withdraw);

// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;
