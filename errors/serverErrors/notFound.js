const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('../customError');

class FoundNot extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = FoundNot;
