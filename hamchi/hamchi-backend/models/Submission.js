const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  experience: {
    type: String,
    enum: ['none', 'one', 'many'],
    required: true,
  },
  environment: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
    required: true,
  },
  details: {
    type: String,
    trim: true,
  },
  matched: {
    type: String,
    enum: ['true', 'false'],
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
  createdAt: {
    type: Date,
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  }
});

module.exports = mongoose.model('Submission', submissionSchema);
