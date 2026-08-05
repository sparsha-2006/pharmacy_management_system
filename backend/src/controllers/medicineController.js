const MedicineService = require('../services/medicineService');
const pool = require('../config/db');
const { sendSuccess } = require('../utils/responseHandler');
const { HTTP_STATUS } = require('../utils/constants');
class MedicineController {
  // API 1: Add Medicine
  static async addMedicine(req, res, next) {
    try {
      const { name, category, stock, price, low_stock_threshold, description } = req.body;
      const medicine = await MedicineService.addMedicine({
        name,
        category,
        stock,
        price,
        low_stock_threshold,
        description
      });
      return sendSuccess(res, 'Medicine added successfully.', medicine, HTTP_STATUS.CREATED);
    } catch (err) {
      next(err);
    }
  }
  // API 3: Get Medicine List (With caching)
  static async getMedicineList(req, res, next) {
    try {
      const { category, name, minPrice, maxPrice, lowStockOnly } = req.query;
      const result = await MedicineService.getMedicineList({
        category,
        name,
        minPrice,
        maxPrice,
        lowStockOnly
      });
      return sendSuccess(res, `Medicine list retrieved successfully (${result.source}).`, result.data);
    } catch (err) {
      next(err);
    }
  }

  static async deleteMedicine(req, res, next) {
    try {
      const { id } = req.params;

      await pool.query(
        "DELETE FROM medicines WHERE id = $1",
        [id]
      );

      return sendSuccess(res, 'Medicine deleted successfully.');
    } catch (err) {
      next(err);
    }
  }
}
module.exports = MedicineController;
