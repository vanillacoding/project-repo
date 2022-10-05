const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  accessibility: {
    type: String,
    required: true,
  },
  friendliness: {
    type: String,
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  founder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comments:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  location: [],
  image: {
    type: String,
    required: true,
  },
  time: {
    type: String,
  },
  description: {
    type: String,
    default: '',
  }
});

module.exports = mongoose.model('Cat', catSchema);
