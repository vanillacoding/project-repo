const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  games: [{
    type: ObjectId,
    ref: 'Game',
  }],
  histories: [{
    type: ObjectId,
    ref: 'History',
  }],
  playingRoom: {
    type: ObjectId,
    ref: 'Game',
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);
