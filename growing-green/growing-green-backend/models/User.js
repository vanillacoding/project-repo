const mongoose = require('mongoose');
const { BadRequestError } = require('../lib/errors');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/.+\@.+\..+/, 'Invalid email'],
    trim: true,
    minlength: [1, 'Email must be at least 1 chars'],
    maxLength: [128, 'Email cannot be more than 128 chars'],
    unique: [true, 'Email should be unique'],
  },
  name: {
    type: String,
    required: [true, 'Username is required'],
    minlength: [1, 'Username must be at least 1chars'],
    maxLength: [15, 'Username cannot be more than 39 chars'],
    trim: true,
  },
  photoURL: {
    type: String,
    required: [true, 'Photo Url is required'],
  },
});

userSchema.index({ email: 1 }, { unique: true });

userSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new BadRequestError('User already registered.'));
  } else {
    next(error);
  }
});

module.exports = mongoose.model('User', userSchema);
