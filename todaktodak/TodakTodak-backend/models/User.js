const mongoose = require("mongoose");

const User = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String
  },
  nickname: {
    type: String,
    require: true
  },
  posts: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Post"
      }
    ],
    default: []
  },
  friends: {
    type: [
      {
        friendInfo: {
          type: mongoose.Types.ObjectId,
          ref: "User"
        },
        chatRoomId: {
          type: mongoose.Types.ObjectId,
          ref: "ChatRoom"
        },
        unreadMessageCount: {
          type: Number,
          default: 0
        }
      }
    ],
    default: []
  },
  friendsWaitingList: {
    type: [
      {
        friendInfo: {
          type: mongoose.Types.ObjectId,
          ref: "User"
        },
        status: {
          type: String,
          enum: [
            "SendPending",
            "ReceivePending",
            "ReceiveReject"
          ]
        }
      }
    ],
    default: []
  }
});

module.exports = mongoose.model("User", User);
