const mongoose = require("mongoose");

const rankingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("Ranking", rankingSchema);
