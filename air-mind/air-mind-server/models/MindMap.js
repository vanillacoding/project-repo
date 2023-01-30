const mongoose = require('mongoose');

const mindMapSchema = new mongoose.Schema(
  {
    title: { type: String },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    access: { type: String, required: true, default: 'private' },
    headNode: { type: mongoose.Schema.Types.ObjectId },
  },
  { timestamps: true },
);

module.exports = mongoose.model('MindMap', mindMapSchema);
