const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profile: { type: String },
  mindMapList: [{ type: mongoose.Schema.Types.ObjectId }],
});

module.exports = mongoose.model('User', userSchema);
