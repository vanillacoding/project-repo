const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  gameDate: {
    type: String,
    required: true,
  },
  userBettingData: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserBettingData",
  }],
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
  }],
  schedule: [{
    gameId: {
      type: String,
      required: true,
    },
    leagueId: {
      type: Number,
      required: true,
    },
    seriesId: {
      type: Number,
      required: true,
    },
    seasonId: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    stadium: {
      type: String,
      required: true,
    },
    home: {
      type: String,
      required: true,
    },
    away: {
      type: String,
      required: true,
    },
    homePitcher: {
      type: String,
      trim: true,
    },
    awayPitcher: {
      type: String,
      trim: true,
    },
  }],
  totalMoney: {
    type: Number,
    default: 0,
  },
  totalScore: {
    type: Number,
    default: 0,
  },
  isOpened: {
    type: Boolean,
    default: false,
  },
  hasResult: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Game", gameSchema);
