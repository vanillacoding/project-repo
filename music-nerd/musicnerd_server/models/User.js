const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  thumbnail_url: {
    type: String,
    required: true
  },
  favorite_artists: [{
    type: Schema.Types.ObjectId,
    ref: 'Artist'
  }],
  favorite_tracks: [{
    type: Schema.Types.ObjectId,
    ref: 'Track'
  }],
  play_log: [{
    played_at: Date,
    scored: {
      type: Number,
      default: 0
    }
  }]
});

module.exports = mongoose.model('User', userSchema);
