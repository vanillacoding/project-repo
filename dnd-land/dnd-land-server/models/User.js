const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  lastStage: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", userSchema);
