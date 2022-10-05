const mongoose = require("mongoose");

const userSchemar = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    default: "user",
  },
  score: {
    type: Number,
    required: true,
  }
}, { timestamps : true });

module.exports = mongoose.model("user", userSchemar);
