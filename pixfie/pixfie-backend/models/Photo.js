const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  faceType: {
    type: Object,
    required: true
  },
  date: Date,
  like_users: [mongoose.ObjectId]
});

module.exports = mongoose.model('Photo', PhotoSchema);
