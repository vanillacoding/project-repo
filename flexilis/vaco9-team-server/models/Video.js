const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  bodyPart: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  urls: [{
    type: String,
    trim: true,
  }],
});

module.exports = mongoose.model('Video', videoSchema);
