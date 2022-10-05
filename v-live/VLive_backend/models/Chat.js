const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const chatSchema = new mongoose.Schema({
  channelId: {
    type: ObjectId,
    ref: 'Channel',
  },
  chatList: [
    {
      author: {
        type: String,
        required: true,
      },
      chat: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('Chat', chatSchema);
