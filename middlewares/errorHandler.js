const { StatusCodes } = require('http-status-codes');
const { CustomAPIError } = require('../errors');

// eslint-disable-next-line no-unused-vars
const errorHandlerMiddleware = (err, _req, res, _next) => {
  let errObj = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    msg: 'Internal server error',
  };

  if (err instanceof CustomAPIError) {
    errObj = {
      statusCode: err.statusCode,
      msg: err.message,
    };
  }

  if (err.codeName === 'DuplicateKey') {
    errObj = {
      statusCode: StatusCodes.BAD_REQUEST,
      msg: `${err.keyValue.keyword} ${Object.keys(err.keyValue)[0]} has been used`,
    };
  }

  if (err.name === 'ValidationError') {
    errObj = {
      statusCode: StatusCodes.BAD_REQUEST,
      msg: err.message,
    };
  }

  return res.status(errObj.statusCode).json({ msg: errObj.msg });
};

module.exports = errorHandlerMiddleware;
