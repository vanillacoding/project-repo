const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: [true, "Please provide your spotify user id"],
  },
  userName: {
    type: String,
    required: [true, "Please provide your userName"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide your email"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  externalUrl: {
    type: String,
    unique: true,
    required: [true, "Please provide your spotify externalUrl"],
  },
  uri: {
    type: String,
    unique: true,
    required: [true, "Please provide your spotify uri"],
  },
  privateDiaryList: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Diary",
    }],
    default: [],
  },
});

module.exports = mongoose.model("User", userSchema);
