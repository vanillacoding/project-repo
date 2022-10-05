const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true
  },
  user_name: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  profile_url: {
    type: String,
    default: 'https://pixfie.s3.ap-northeast-2.amazonaws.com/photos/pngkey.com-jake-png-2469451.png'
  },
  photos: [mongoose.ObjectId],
  followers: [mongoose.ObjectId],
  followings: [mongoose.ObjectId]
});

module.exports = mongoose.model('User', UserSchema);
