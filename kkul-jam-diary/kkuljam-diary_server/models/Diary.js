const mongoose = require('mongoose');

const DiarySchema = new mongoose.Schema({
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: { type: Date, required: true },
  sleepHours: { type: String, required: true },
  behaviorScore: { type: Number, required: true },
  behaviorScoreReason: { type: String },
  feelingColor: { type: Array },
  memo: { type: String },
  sleep: {
    type: mongoose.Types.ObjectId,
    ref: "Sleep",
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Diary', DiarySchema);
