const { StatusCodes } = require('http-status-codes');

const notFound = (_req, res) =>
  res.status(StatusCodes.NOT_FOUND)
    .send('Sorry, this route does not exist. Please check your code.');

module.exports = notFound;
