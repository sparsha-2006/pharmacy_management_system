const MedicineModel = require('../models/medicineModel');
const OrderModel = require('../models/orderModel');
const RedisService = require('./redisService');
const pharmacyEvents = require('../events/eventEmitter');
const { EVENTS } = require('../utils/constants');
const db = require('../config/db');

class OrderService {
  static async placeOrder({ user_id, medicine_list }) {
    // Collect all medicine IDs to acquire locks
    const medicineIds = medicine_list.map(item => item.medicine_id).sort();
    const acquiredLocks = [];

    try {
      // 1. Acquire Redis distributed locks
      for (const id of medicineIds) {
        const lockKey = `order_med_${id}`;
        let lockAcquired = false;
        let attempts = 0;
        const MAX_RETRIES = 5;

        while (!lockAcquired && attempts < MAX_RETRIES) {
          lockAcquired = await RedisService.acquireLock(lockKey, 3000);

          if (!lockAcquired) {
            await new Promise(res => setTimeout(res, 100));
            attempts++;
          }
        }

        if (!lockAcquired) {
          throw new Error(
            `System busy. Could not lock medicine stock for item ID: ${id}. Please retry.`
          );
        }

        acquiredLocks.push(lockKey);
      }

      // 2. Transaction
      let client = null;

      if (db.isDbConnected()) {
        client = await db.getClient();
        await client.query('BEGIN');
      }

      try {
        let totalAmount = 0;
        const processedItems = [];
        const alertTriggers = [];

        for (const item of medicine_list) {
          const medicine = await MedicineModel.findByIdForUpdate(
            item.medicine_id,
            client
          );

          if (!medicine) {
            throw new Error(
              `Medicine with ID ${item.medicine_id} does not exist.`
            );
          }

          if (parseInt(medicine.stock) < parseInt(item.quantity)) {
            throw new Error(
              `Insufficient stock for "${medicine.name}". Requested: ${item.quantity}, Available: ${medicine.stock}`
            );
          }

          const unitPrice = parseFloat(medicine.price);
          const subtotal = unitPrice * parseInt(item.quantity);

          totalAmount += subtotal;

          const newStock =
            parseInt(medicine.stock) - parseInt(item.quantity);

          processedItems.push({
            medicine_id: medicine.id,
            medicine_name: medicine.name,
            quantity: parseInt(item.quantity),
            unit_price: unitPrice,
            subtotal,
            newStock,
            threshold: parseInt(medicine.low_stock_threshold),
          });
        }

        // Update stock
        for (const item of processedItems) {
          await MedicineModel.updateStock(
            item.medicine_id,
            item.newStock,
            client
          );

          if (item.newStock <= item.threshold) {
            alertTriggers.push({
              medicine_id: item.medicine_id,
              name: item.medicine_name,
              stock: item.newStock,
              threshold: item.threshold,
              timestamp: new Date(),
            });
          }
        }

        // Create order
        const createdOrder = await OrderModel.createOrderWithItems(
          {
            user_id,
            items: processedItems,
            total_amount: totalAmount,
          },
          client
        );

        if (client) {
          await client.query('COMMIT');
        }

        await RedisService.clearMedicineCache();

        for (const alertData of alertTriggers) {
          pharmacyEvents.emit(EVENTS.LOW_STOCK, alertData);
        }

        return createdOrder;
      } catch (err) {
        if (client) {
          await client.query('ROLLBACK');
        }

        throw err;
      } finally {
        if (client) {
          client.release();
        }
      }
    } finally {
      for (const lockKey of acquiredLocks) {
        await RedisService.releaseLock(lockKey);
      }
    }
  }

  static async getOrderDetails(order_id) {
    const order = await OrderModel.findById(order_id);

    if (!order) {
      throw new Error(`Order with ID ${order_id} not found.`);
    }

    return order;
  }

  // NEW METHOD
  static async getAllOrders() {
    return await OrderModel.getAllOrders();
  }
}

module.exports = OrderService;