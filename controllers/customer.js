const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

// models
const Customer = require('../models/customer');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
  const { tokenId } = req.body;

  client.verifyIdToken({ idToken: tokenId, audience: process.env.GOOGLE_CLIENT_ID })
    .then((response) => {
      // eslint-disable-next-line camelcase
      const { email_verified, name, email } = response.payload;

      // eslint-disable-next-line camelcase
      if (email_verified) {
        // eslint-disable-next-line consistent-return
        Customer.findOne({ email }).exec((err, customer) => {
          if (err) {
            return res.status(StatusCodes.BAD_REQUEST).json({
              error: 'Something went horribly wrong',
            });
          }

          if (customer) {
            const token = jwt.sign({ _id: customer._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

            // eslint-disable-next-line no-shadow
            const {
              _id,
              verified,
              // eslint-disable-next-line no-shadow
              name,
              // eslint-disable-next-line no-shadow
              email,
            } = customer;
            return res.status(StatusCodes.ACCEPTED).json({
              message: 'This customer was verified successfully',
              token,
              customer: {
                _id, name, email, verified,
              },
            });
          }

          const password = email + process.env.JWT_SECRET;
          const verified = true;

          const newCustomer = new Customer({
            name,
            email,
            password,
            verified,
          });

          // eslint-disable-next-line no-shadow
          newCustomer.save((err, data) => {
            if (err) {
              return res.status(StatusCodes.BAD_REQUEST).json({
                error: 'Something went horribly wrong, please check your code.',
              });
            }

            const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

            // eslint-disable-next-line no-shadow
            const {
              _id,
              // eslint-disable-next-line no-shadow
              name,
              // eslint-disable-next-line no-shadow
              email,
              // eslint-disable-next-line no-shadow
              verified,
            } = newCustomer;

            return res.status(StatusCodes.CREATED).json({
              message: 'This customer was successfully verified and saved to the database. This will happen only once',
              verified,
              token,
              customer: { _id, name, email },
            });
          });
        });
      }
    })
    .catch((err) => res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Google login failed',
    }) && console.log(err));
};
