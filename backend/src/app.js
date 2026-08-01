const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { morganMiddleware } = require('./middleware/logger');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const medicineRoutes = require('./routes/medicineRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const aiRoutes = require('./routes/aiRoutes');
const app = express();
// Security and utility middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);
// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    message: 'Pharmacy Order and Inventory Management System API is operational.',
    timestamp: new Date().toISOString()
  });
});
// API Routes
app.use('/api/medicines', medicineRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/ai', aiRoutes);
// Error Handling Middlewares
app.use(notFoundHandler);
app.use(errorHandler);
module.exports = app;