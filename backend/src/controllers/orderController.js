const OrderService = require('../services/orderService');
const { sendSuccess, sendError } = require('../utils/responseHandler');
const { HTTP_STATUS } = require('../utils/constants');
class OrderController {
  // API 4: Place Order
  static async placeOrder(req, res, next) {
    try {
      const { user_id, medicine_list } = req.body;
      const order = await OrderService.placeOrder({ user_id, medicine_list });
      return sendSuccess(res, 'Order placed successfully.', order, HTTP_STATUS.CREATED);
    } catch (err) {
      if (err.message.includes('Insufficient stock') || err.message.includes('does not exist')) {
        return sendError(res, err.message, null, HTTP_STATUS.BAD_REQUEST);
      }
      if (err.message.includes('Could not lock')) {
        return sendError(res, err.message, null, HTTP_STATUS.CONFLICT);
      }
      next(err);
    }
  }
  static async getAllOrders(req, res) {
  try {
    const orders = await OrderService.getAllOrders();

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
  // API 5: Get Order Details
  static async getOrderDetails(req, res, next) {
    try {
      const { order_id } = req.params;
      const order = await OrderService.getOrderDetails(order_id);
      return sendSuccess(res, 'Order details fetched successfully.', order);
    } catch (err) {
      if (err.message.includes('not found')) {
        return sendError(res, err.message, null, HTTP_STATUS.NOT_FOUND);
      }
      next(err);
    }
  }
}
module.exports = OrderController;