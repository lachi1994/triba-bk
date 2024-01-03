const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('../customError');

class Unacceptable extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_ACCEPTABLE;
  }
}

module.exports = Unacceptable;
