const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('\x1b[35m%s\x1b[0m', 'Mongo db connected successfully');
  } catch (err) {
    console.log('\x1b[31m%s\x1b[0m', err);
  }
};

module.exports = connectDB;
