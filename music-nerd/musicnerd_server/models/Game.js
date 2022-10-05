const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  game_title: {
    type: String,
    required: true,
    maxlength: 20,
    unique: true
  },
  thumbnail_url: {
    type: String,
    required: true
  },
  is_playing: {
    type: Boolean,
    required: true,
    default: false
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  players: [{
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    username: {
      type: String,
      required: true
    },
    thumbnail_url: {
      type: String,
      required: true
    },
    favorite_artists: [{
      type: Schema.Types.ObjectId,
      ref: 'Artist'
    }]
  }]
});

module.exports = mongoose.model('Game', gameSchema);
