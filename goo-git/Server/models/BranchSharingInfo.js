const mongoose = require('mongoose');

const BranchSharingInfoSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,

  },
  branch_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true,
  },
  has_writing_permission: {
    type: Boolean,
    required: true,
  }
});

const BranchSharingInfo = mongoose.model('BranchSharingInfo', BranchSharingInfoSchema);

module.exports = BranchSharingInfo;
