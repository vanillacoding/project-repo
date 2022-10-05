const mongoose = require('mongoose');

const SleepSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: { type: Date, required: true },
  sleepDuration: { type: String, required: true },
  bedTime: { type: Date, required: true, default: 0, min: 0 },
  wakeUpTime: { type: Date, required: true, default: 0, min: 0 },
  sleepCycle: { type: Array, required: true, default: [] },
  deepSleepSeconds: { type: Number, required: true, default: 0, min: 0 },
  lightSleepSeconds: { type: Number, required: true, default: 0, min: 0 },
  deepSleepPercentage: { type: Number, required: true, default: 0, min: 0 },
  lightSleepPercentage: { type: Number, required: true, default: 0, min: 0 },
  diary: {
    type: mongoose.Types.ObjectId,
    ref: "Diary",
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('Sleep', SleepSchema);
