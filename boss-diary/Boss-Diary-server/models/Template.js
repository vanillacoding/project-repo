const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Template', templateSchema);
