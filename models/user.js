const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  Name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('users', userSchema);