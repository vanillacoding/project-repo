const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  address: {
    type: String,
    unique: true,
    required: [true, 'address is required'],
  },
  blocks: {
    type: Array,
    required: [true, 'blocks are required'],
  },
  category: {
    type: String,
    default: 'basic',
  },
  concept: {
    type: String,
    default: 'basic',
  },
  backgroundColor: {
    type: String,
    default: '#fff',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Project', projectSchema);
