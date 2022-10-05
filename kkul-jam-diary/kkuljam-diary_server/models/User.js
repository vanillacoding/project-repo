const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email : { type: String , required: true, unique: true },
  name: { type: String, required: true },
  bestSleepHours: { type: Number, required: true, default: 0, min: 0  },
  bestBedtime: { type: Number, required: true, default: 0, min: 0 },
  bestWakeUpTime: { type: Number, required: true, default: 0, min: 0 },
  sleepLastUpdatedAt: { type: Date }
}, {
  versionKey: false
});

module.exports = mongoose.model('User', UserSchema);
