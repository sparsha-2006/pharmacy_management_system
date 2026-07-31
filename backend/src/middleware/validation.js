const { body, query, param, validationResult } = require('express-validator');
const { sendError } = require('../utils/responseHandler');
const { HTTP_STATUS } = require('../utils/constants');
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendError(
      res,
      'Validation Error',
      errors.array().map(err => ({ field: err.path || err.param, message: err.msg })),
      HTTP_STATUS.UNPROCESSABLE_ENTITY
    );
  }
  next();
};

const validateAddMedicine = [
  body('name').trim().notEmpty().withMessage('Medicine name is required.'),
  body('category').trim().notEmpty().withMessage('Medicine category is required.'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer.'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number.'),
  body('low_stock_threshold').optional().isInt({ min: 0 }).withMessage('Low stock threshold must be a non-negative integer.'),
  body('description').optional().trim(),
  handleValidationErrors
];
const validateUpdateStock = [
  body('medicine_id').notEmpty().withMessage('medicine_id is required.'),
  body('quantity').isInt().withMessage('Quantity must be an integer (positive to add, negative to deduct, or absolute adjustment).'),
  body('is_delta').optional().isBoolean().withMessage('is_delta must be a boolean value.'),
  handleValidationErrors
];
const validatePlaceOrder = [
  body('user_id').notEmpty().withMessage('user_id is required.'),
  body('medicine_list').isArray({ min: 1 }).withMessage('medicine_list must be a non-empty array of items.'),
  body('medicine_list.*.medicine_id').notEmpty().withMessage('Each order item must specify a medicine_id.'),
  body('medicine_list.*.quantity').isInt({ min: 1 }).withMessage('Quantity for each item must be at least 1.'),
  handleValidationErrors
];
const validateGetMedicineList = [
  query('category').optional().trim(),
  query('name').optional().trim(),
  query('minPrice').optional().isFloat({ min: 0 }).withMessage('minPrice must be non-negative.'),
  query('maxPrice').optional().isFloat({ min: 0 }).withMessage('maxPrice must be non-negative.'),
  query('lowStockOnly').optional().isBoolean().withMessage('lowStockOnly must be boolean.'),
  handleValidationErrors
];
const validateGetOrderDetails = [
  param('order_id').notEmpty().withMessage('order_id parameter is required.'),
  handleValidationErrors
];
const validateAiRecommendation = [
  body('medicine_id').optional(),
  body('symptoms').optional().trim(),
  body().custom((value) => {
    if (!value.medicine_id && !value.symptoms) {
      throw new Error('Either medicine_id or symptoms must be provided for AI recommendation.');
    }
    return true;
  }),
  handleValidationErrors
];
module.exports = {
  validateAddMedicine,
  validateUpdateStock,
  validatePlaceOrder,
  validateGetMedicineList,
  validateGetOrderDetails,
  validateAiRecommendation
};