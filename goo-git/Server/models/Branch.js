const mongoose = require('mongoose');

const BranchSchema = new mongoose.Schema({
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  notes_history: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note',
  }],
  sharing_infos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BranchSharingInfo',
  }],
  latest_note: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note',
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});

const Branch = mongoose.model('Branch', BranchSchema);

module.exports = Branch;
