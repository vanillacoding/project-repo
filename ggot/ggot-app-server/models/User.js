const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  profile_url: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  photos: [{
    type: mongoose.ObjectId,
    trim: true,
    ref: 'Photo'
  }],
});

module.exports = mongoose.model('User', userSchema);
