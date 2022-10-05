const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const notification = mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["like", "comment", "follower", "snippet"],
  },
  user: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  targetId: {
    type: ObjectId,
    required: true,
  },
  isChecked: {
    type: Boolean,
    required: true,
  },
});

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  notificationList: [notification],
  followerList: [{
    type: ObjectId,
    ref: "User",
  }],
  theme: {
    type: String,
    default: "default",
  },
});

module.exports = mongoose.model("User", userSchema);
