const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
  },
  winningPoint: {
    type: Number,
    default: 0,
  }
});

module.exports = mongoose.model("User", userSchema);
