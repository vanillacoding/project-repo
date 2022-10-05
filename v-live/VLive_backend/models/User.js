const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    isRequired: true,
    unique: true,
  },
  photoUrl: {
    type: String,
  },
});

module.exports = mongoose.model('User', userSchema);
