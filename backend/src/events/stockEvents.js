const pharmacyEvents = require('./eventEmitter');
const { EVENTS } = require('../utils/constants');
const db = require('../config/db');
const setupStockAlertListeners = (logger) => {
  pharmacyEvents.on(EVENTS.LOW_STOCK, async (eventData) => {
    const { medicine_id, name, stock, threshold, timestamp } = eventData;
    const message = `[ALERT] Stock threshold breached for medicine "${name}" (ID: ${medicine_id}). Current Stock: ${stock}, Threshold: ${threshold}`;
    
    if (logger) {
      logger.warn(message, { medicine_id, stock, threshold, timestamp });
    } else {
      console.warn(message);
    }
try {
      if (db.isDbConnected()) {
        await db.query(
          `INSERT INTO stock_alerts (medicine_id, medicine_name, current_stock, threshold, message)
           VALUES ($1, $2, $3, $4, $5)`,
          [medicine_id, name, stock, threshold, message]
        );
      } else {
        db.inMemoryDb.stockAlerts.push({
          id: db.inMemoryDb.alertIdCounter++,
          medicine_id,
          medicine_name: name,
          current_stock: stock,
          threshold,
          message,
          created_at: new Date()
        });
      }
    } catch (err) {
      if (logger) {
        logger.error(`Failed to record stock alert in database: ${err.message}`);
      }
    }
  });
  console.log('[Events] Stock alert event listeners initialized successfully.');
};
module.exports = {
  setupStockAlertListeners
};