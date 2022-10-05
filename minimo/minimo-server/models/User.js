const mongoose = require('mongoose');

const defaultPhotoURL = 'http://cdn.onlinewebfonts.com/svg/img_258083.png';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  email: {
    type: String,
    index: true,
    unique: true,
    required: [true, 'email is required'],
  },
  photoURL: {
    type: String,
    default: defaultPhotoURL,
  },
  projects: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
