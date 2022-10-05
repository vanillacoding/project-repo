const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    isRequired: true,
  },
  episode: {
    type: ObjectId,
    ref: 'Episode',
  },
  host: {
    type: ObjectId,
    ref: 'User',
  },
  players: [
    {
      user: {
        type: ObjectId,
        ref: 'User',
      },
      character: {
        type: ObjectId,
        ref: 'Character',
      },
      voteCount: {
        type: Number,
        default: 0,
      },
    },
  ],
  isPlaying: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Channel', channelSchema);
