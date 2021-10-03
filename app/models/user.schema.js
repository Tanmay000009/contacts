const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * Define the structure of User document here
 */

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);