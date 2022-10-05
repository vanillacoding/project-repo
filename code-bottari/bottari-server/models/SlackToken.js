const mongoose = require("mongoose");

const SlackTokenSchema = mongoose.Schema({
  teamId: {
    type: String,
    required: true,
    unique: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("SlackToken", SlackTokenSchema);
