const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  owner: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    }
  },
  guest: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    }
  },
  lastMessage: {
    user: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      name: {
        type: String,
        required: true,
      }
    },
    message: {
      type: String,
    },
    time: {
      type: Date,
      required: true,
    }
  },
  messages: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
    required: true,
  }
});

module.exports = mongoose.model('Chat', chatSchema);
