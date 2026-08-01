const MedicineService = require('../services/medicineService');
const { sendSuccess, sendError } = require('../utils/responseHandler');
const { HTTP_STATUS } = require('../utils/constants');
class InventoryController {
  // API 2: Update Stock
  static async updateStock(req, res, next) {
    try {
      const { medicine_id, quantity, is_delta } = req.body;
      const updatedMedicine = await MedicineService.updateStock(medicine_id, quantity, is_delta !== false);
      return sendSuccess(res, 'Stock updated successfully.', updatedMedicine);
    } catch (err) {
      if (err.message.includes('not found')) {
        return sendError(res, err.message, null, HTTP_STATUS.NOT_FOUND);
      }
      if (err.message.includes('negative')) {
        return sendError(res, err.message, null, HTTP_STATUS.BAD_REQUEST);
      }
      next(err);
    }
  }
  // API 6: Low Stock Alert
  static async getLowStockAlerts(req, res, next) {
    try {
      const lowStockItems = await MedicineService.getLowStockMedicines();
      return sendSuccess(
        res,
        `Identified ${lowStockItems.length} medicine(s) below threshold. Low stock alert events triggered.`,
        lowStockItems
      );
    } catch (err) {
      next(err);
    }
  }
}
module.exports = InventoryController;