//payment
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  paidAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Payment', PaymentSchema);
