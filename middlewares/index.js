const limitRequests = require('./rateLimit');
const notFoundMiddleware = require('./notFound');
const errorHandlerMiddleware = require('./errorHandler');

module.exports = {
  notFoundMiddleware,
  errorHandlerMiddleware,
  limitRequests,
};
