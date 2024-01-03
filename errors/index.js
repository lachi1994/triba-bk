const CustomAPIError = require('./customError');
const BadRequestError = require('./serverErrors/badRequest');
const ServerErrorInternal = require('./serverErrors/internalServerError');
const NotFound = require('./serverErrors/notFound');
const NotAcceptable = require('./serverErrors/unacceptable');
const UnauthorizedError = require('./serverErrors/unauthorized');

module.exports = {
  CustomAPIError,
  BadRequestError,
  ServerErrorInternal,
  NotFound,
  NotAcceptable,
  UnauthorizedError,
};
