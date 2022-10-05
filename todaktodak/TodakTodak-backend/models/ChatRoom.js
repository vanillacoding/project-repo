const mongoose = require("mongoose");

const ChatRoom = new mongoose.Schema({
  comments: {
    type: [
      {
        userNickname: {
          type: String,
          required: true
        },
        createdAt: {
          type: Date,
          required: true
        },
        comment: {
          type: String,
          default: ""
        }
      }
    ],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("ChatRoom", ChatRoom);
