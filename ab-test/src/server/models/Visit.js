const mongoose = require('mongoose');

const { Schema } = mongoose;

const visitSchema = new Schema({
  geo: Object,
  ip: String,
  connected_at: Date,
  left_at: Date,
  useragent: Object,
});

module.exports = mongoose.model('visits', visitSchema);
