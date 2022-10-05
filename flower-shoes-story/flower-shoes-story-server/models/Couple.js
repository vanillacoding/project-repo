const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coupleSchema = new mongoose.Schema({
  soldier: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  gomsin: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  events: {
    visit: [{
      startDate: {
        type: Date,
      },
      endDate: {
        type: Date,
      },
    }],
    vacation: [{
      startDate: {
        type: Date,
      },
      endDate: {
        type: Date,
      },
    }],
    anniversary: [{
      startDate: {
        type: Date,
      },
      endDate: {
        type: Date,
      },
    }],
    discharge: {
      startDate: {
        type: Date,
      },
      endDate: {
        type: Date,
      },
    },
  },
  score: {
    type: Number,
  },
  stair: {
    type: Number,
  },
  flower_collection: [{
    type: String,
  }],
});

module.exports = mongoose.model("Couple", coupleSchema);
