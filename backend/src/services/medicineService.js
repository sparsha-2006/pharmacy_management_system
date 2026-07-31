const MedicineModel = require('../models/medicineModel');
const RedisService = require('./redisService');
const pharmacyEvents = require('../events/eventEmitter');
const { EVENTS, CACHE_KEYS } = require('../utils/constants');
class MedicineService {
  static async addMedicine(data) {
    const medicine = await MedicineModel.create(data);
    await RedisService.clearMedicineCache();
    // Check if initial stock is below threshold
    if (medicine.stock <= medicine.low_stock_threshold) {
      pharmacyEvents.emit(EVENTS.LOW_STOCK, {
        medicine_id: medicine.id,
        name: medicine.name,
        stock: medicine.stock,
        threshold: medicine.low_stock_threshold,
        timestamp: new Date()
      });
    }
    return medicine;
  }
   static async getMedicineList(filters = {}) {
    const cacheKey = `${CACHE_KEYS.MEDICINE_LIST_PREFIX}${JSON.stringify(filters)}`;
    const cachedData = await RedisService.getCache(cacheKey);
    if (cachedData) {
      return { source: 'redis_cache', data: cachedData };
    }
    const medicines = await MedicineModel.findAll(filters);
    await RedisService.setCache(cacheKey, medicines, 60);
    return { source: 'database', data: medicines };
  }
  static async updateStock(medicine_id, quantity, is_delta = true) {
    const medicine = await MedicineModel.findById(medicine_id);
    if (!medicine) {
      throw new Error(`Medicine with ID ${medicine_id} not found.`);
    }
    let newStock;
    if (is_delta) {
      newStock = parseInt(medicine.stock, 10) + parseInt(quantity, 10);
    } else {
      newStock = parseInt(quantity, 10);
    }
    if (newStock < 0) {
      throw new Error(`Stock level cannot be negative. Current: ${medicine.stock}, Adjustment: ${quantity}`);
    }
    const updatedMedicine = await MedicineModel.updateStock(medicine_id, newStock);
    await RedisService.clearMedicineCache();
    // Trigger alert event if stock falls below threshold
    if (updatedMedicine.stock <= updatedMedicine.low_stock_threshold) {
      pharmacyEvents.emit(EVENTS.LOW_STOCK, {
        medicine_id: updatedMedicine.id,
        name: updatedMedicine.name,
        stock: updatedMedicine.stock,
        threshold: updatedMedicine.low_stock_threshold,
        timestamp: new Date()
      });
    }
    return updatedMedicine;
  }
   static async getLowStockMedicines() {
    const lowStockItems = await MedicineModel.findLowStock();
    
    // Trigger alert events for each low stock item
    for (const item of lowStockItems) {
      pharmacyEvents.emit(EVENTS.LOW_STOCK, {
        medicine_id: item.id,
        name: item.name,
        stock: item.stock,
        threshold: item.low_stock_threshold,
        timestamp: new Date()
      });
    }
    return lowStockItems;
  }
}
module.exports = MedicineService;