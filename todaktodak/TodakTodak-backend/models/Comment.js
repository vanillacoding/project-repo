const mongoose = require("mongoose");

const Comment = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  post: {
    type: mongoose.Types.ObjectId,
    ref: "Post"
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  likes: {
    type: [
      {
        type: String,
        required: true
      }
    ],
    default: []
  },
  reported: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User"
      }
    ],
    default: []
  }
});

module.exports = mongoose.model("Comment", Comment);
