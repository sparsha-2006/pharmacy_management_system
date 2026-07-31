const app = require('./app');
const dotenv = require('dotenv');
const { connectDb } = require('./config/db');
const { connectRedis } = require('./config/redis');
const { setupStockAlertListeners } = require('./events/stockEvents');
const { logger } = require('./middleware/logger');
dotenv.config();
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    // 1. Initialize Event Listeners
    setupStockAlertListeners(logger);
    // 2. Initialize Database Connection
    await connectDb();
    // 3. Initialize Redis Connection
    await connectRedis();
    // 4. Start HTTP Server
    app.listen(PORT, () =>  {
      logger.info(`========================================================`);
      logger.info(` Pharmacy Order Management Backend running on port ${PORT}`);
      logger.info(` Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info(` Health Check: http://localhost:${PORT}/health`);
      logger.info(`========================================================`);
    });
  } catch (err) {
    logger.error('Failed to start server:', err);
    process.exit(1);
  }
};
startServer();