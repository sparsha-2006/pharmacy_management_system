const express = require("express");
const router = express.Router();

const OrderController = require("../controllers/orderController");
const {
  validatePlaceOrder,
  validateGetOrderDetails,
} = require("../middleware/validation");

// NEW - Get All Orders
router.get("/", OrderController.getAllOrders);

// Place Order
router.post("/", validatePlaceOrder, OrderController.placeOrder);

// Get Order Details
router.get("/:order_id", validateGetOrderDetails, OrderController.getOrderDetails);

module.exports = router;