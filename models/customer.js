const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'userName is required, can\'t be blank'],
      maxlength: 500,
      index: true,
    },
    email: {
      type: String,
      required: [true, 'email is required, can\'t be blank'],
      unique: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, 'password is required, can\'t be blank'],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// bcrypt not working with arrow function
// eslint-disable-next-line func-names
customerSchema.pre('save', async function (next) {
  // it is important to not use arrow function here
  // avoid re-hash on already hashed password
  if (!this.isModified('password')) {
    next();
  }

  // Hashes password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

// eslint-disable-next-line func-names
customerSchema.methods.matchPasswords = async function (password) {
  // usually, it should be
  // const comparison = await bcrypt.compare(password, this.password),
  // but i just chose to assign the this keyword to the user variable as below
  const customer = this;
  const comparison = await bcrypt.compare(password, customer.password);
  return comparison;
};

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
