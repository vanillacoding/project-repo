const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  username: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    minLength: 8,
    trim: true,
    required: true,
  },
  profileImage: {
    type: String,
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  }],
  submissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Submission',
  }],
  chats: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
  }],
});

userSchema.statics.checkUserExists = function (email) {
  return this.exists({ email });
};

module.exports = mongoose.model('User', userSchema);
