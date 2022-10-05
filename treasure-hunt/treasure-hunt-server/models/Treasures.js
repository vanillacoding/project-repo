const mongoose = require('mongoose');

const treasureSchema = new mongoose.Schema({
  registered_by: {
    type: mongoose.ObjectId,
    required: true,
    ref: 'User'
  },
  country: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      'usim',
      'transportaion',
      'show',
      'ticket',
      'coupon',
      'etc'
    ],
  },
  name: {
    type: String,
    required: true,
  },
  expiration: {
    type: Number,
    required: true,
  },
  location: {
    type: Array,
    required: true,
  },
  location_pictures_url: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  is_hunting: {
    type: Boolean,
    required: true,
  },
  taken_by: {
    type: mongoose.ObjectId,
    ref: 'User'
  },
});

module.exports = mongoose.model('Treasure', treasureSchema);
