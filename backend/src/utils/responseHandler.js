const { HTTP_STATUS } = require('./constants');
const sendSuccess = (res, message, data = null, statusCode = HTTP_STATUS.OK) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  });
};
const sendError = (res, message, errors = null, statusCode = HTTP_STATUS.BAD_REQUEST) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
    timestamp: new Date().toISOString()
  });
};
module.exports = {
  sendSuccess,
  sendError
};