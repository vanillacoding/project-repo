const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      default: null,
    },
    friendList: [
      {
        type: ObjectId,
        ref: 'User',
      },
    ],
    friendRequestList: [
      {
        type: ObjectId,
        ref: 'User',
      },
    ],
    isOnline: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
