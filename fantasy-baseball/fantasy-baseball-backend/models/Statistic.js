const mongoose = require("mongoose");

const statisticSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  team: {
    type: String,
    required: true,
    trim: true,
  },
  playerType: {
    type: String,
    enum: ["hitter", "pitcher"],
    required: true,
  },
  position: {
    type: String,
    trim: true,
  },
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
  },
  record: Object,
  score: {
    type: Number,
    default: 0,
  },
  totalBettingMoney: {
    type: Number,
    default: 0,
  },
  users: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    bettingMoney: {
      type: Number,
      default: 0,
    },
    _id: false,
  }],
  scorePercentage: {
    type: Number,
    default: 0,
  },
  gameDate: String,
});

module.exports = mongoose.model("Statistic", statisticSchema);
