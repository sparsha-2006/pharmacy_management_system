const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const { validatePlaceOrder, validateGetOrderDetails } = require('../middleware/validation');
// API 4: Place Order
router.post('/', validatePlaceOrder, OrderController.placeOrder);
// API 5: Get Order Details
router.get('/:order_id', validateGetOrderDetails, OrderController.getOrderDetails);
module.exports = router;