const mongoose = require('mongoose');

const userStatsSchema = new mongoose.Schema({
  country: {
    type: String,
    trim: true,
    unique: true,
    index: true,
    required: true,
  },
  countryTargetedCount: {
    type: Number,
    default: 0,
  },
  countryUserCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('UserStats', userStatsSchema);
