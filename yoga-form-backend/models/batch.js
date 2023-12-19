//batch
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BatchSchema = new Schema({
  name: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

module.exports = mongoose.model('Batch', BatchSchema);
