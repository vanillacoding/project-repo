const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  profile_photo: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    default: 10
  },
  reports: [
    {
      type: ObjectId,
      ref: 'Report',
      required: true
    }
  ],
  templates: [
    {
      type: ObjectId,
      ref: 'Template',
      required: true
    }
  ],
  approval_requests: [
    {
      type: ObjectId,
      ref: 'Report',
      required: true
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
