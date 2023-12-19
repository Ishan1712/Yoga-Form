const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  age: { type: Number, required: true, min: 18, max: 65 },
  batchId: { type: String, required: true }, 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
