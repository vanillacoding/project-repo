const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String },
  username: { type: String },
  model: { type: Object },
  model_data: { type: Object },
  google_drive_url: { type: String }
});

module.exports = mongoose.model('User', userSchema);
