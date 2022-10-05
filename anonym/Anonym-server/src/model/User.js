const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  uid: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  userName: {
    type: String,
    lowercase: true,
    required: true,
  },
  thumnail: {
    type: String,
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  followings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
