const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  name: {
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
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  country: {
    type: String,
    trim: true,
    required: true,
  },
});

userSchema.statics.checkIsUserExist =  function ({ email }) {
  return this.exists({ email });
};

module.exports = mongoose.model('User', userSchema);
