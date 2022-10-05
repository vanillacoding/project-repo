const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const episodeSchema = new mongoose.Schema({
  title: {
    type: String,
    isRequired: true,
  },
  thumbnail: {
    type: String,
    isRequired: true,
  },
  videoUrl: {
    type: String,
    isRequired: true,
  },
  characters: [
    {
      type: ObjectId,
      ref: 'Character',
    },
  ],
  scripts: [
    {
      time: {
        type: Number,
        isRequired: true,
      },
      character: {
        type: ObjectId,
        ref: 'Character',
      },
    },
  ],
});

module.exports = mongoose.model('Episode', episodeSchema);
