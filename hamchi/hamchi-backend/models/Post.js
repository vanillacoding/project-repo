const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  image: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
    required: true,
  },
  type: {
    type: String,
    trim: true,
    enum: ['Syrian', 'Jungle', 'Robo', 'other'],
    required: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    trim: true,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  details: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    trim: true,
    enum: ['opened', 'closed'],
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  submissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Submission',
  }],
  createdAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Post', postSchema);
