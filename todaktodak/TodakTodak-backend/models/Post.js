const mongoose = require("mongoose");

const Post = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  ownerNickname: {
    type: String,
    required: true
  },
  isPublic: {
    type: Boolean,
    required: true
  },
  isAnonymous: {
    type: Boolean,
    required: true
  },
  contents: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: [
      "사랑",
      "진로",
      "취업",
      "친구",
      "고통"
    ],
    default: "사랑"
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  comments: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment"
      }
    ],
    default: []
  },
  likes: {
    type: [
      {
        type: String,
        required: true
      }
    ],
    default: []
  }
});

module.exports = mongoose.model("Post", Post);
