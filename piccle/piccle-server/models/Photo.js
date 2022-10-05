const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema ({
  by: {type: String, required: true},
  photoUrl: {type: String, required: true},
  lat: {type: Number, required: true},
  lon: {type: Number, required: true},
  createdAt: {type: String, required: true}
});

module.exports = mongoose.model('Photo', PhotoSchema);
