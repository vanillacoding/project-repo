const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  writerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  writerName: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Comment', commentSchema);
