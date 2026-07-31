const { sendError } = require('../utils/responseHandler');
const { HTTP_STATUS } = require('../utils/constants');
const { logger } = require('./logger');
const errorHandler = (err, req, res, next) => {
  logger.error({
  message: err.message,
  stack: err.stack,
  method: req.method,
  path: req.originalUrl
});
  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal Server Error';
  return sendError(res, message, null, statusCode);
};
const notFoundHandler = (req, res, next) => {
  return sendError(res, `Route ${req.method} ${req.originalUrl} not found`, null, HTTP_STATUS.NOT_FOUND);
};
module.exports = {
  errorHandler,
  notFoundHandler
};
