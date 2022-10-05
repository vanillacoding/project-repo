const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  profile_img_url: {
    type: String,
  },
  my_branches: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
  }],
  shared_branches_infos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BranchSharingInfo',
  }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
