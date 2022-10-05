const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  nickname: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
  },
  pushAlarmStatus: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("User", userSchema);
