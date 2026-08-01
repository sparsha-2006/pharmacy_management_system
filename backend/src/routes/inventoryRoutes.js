const express = require('express');
const router = express.Router();
const InventoryController = require('../controllers/inventoryController');
const { validateUpdateStock } = require('../middleware/validation');
// API 2: Update Stock
router.patch('/stock', validateUpdateStock, InventoryController.updateStock);
// API 6: Low Stock Alert
router.get('/low-stock', InventoryController.getLowStockAlerts);
module.exports = router;