const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  token: {
    type: String,
    trim: true,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    min: 1,
    max: 50
  },
  created_at: {
    type: Date,
    required: true
  },
  error_id: {
    type: Schema.Types.ObjectId,
    ref: 'Error'
  }
});

const userSchema = new Schema({
  social_id: {
    type: String,
    trim: true,
    required: true
  },
  name: {
    type: String,
    trim: true,
    required: true
  },
  profile_url: {
    type: String
  },
  project_list: {
    type: [projectSchema]
  }
});

module.exports = mongoose.model('User', userSchema);
