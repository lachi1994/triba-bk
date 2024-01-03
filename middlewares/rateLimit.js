const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: ((60 * 1000) * 60) * 24,
  max: 3,
  message:
  'So sorry, you can\'t make more than three(3) password reset requests in a day. Please try again tomorrow',
});
