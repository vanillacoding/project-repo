const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  title: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  chat_list: [
    {
      nickname: { type: String, required: true },
      message: { type: String },
      imageUrl: { type: String },
      created_at: { type: Date, require: true }
    }
  ]
});

module.exports = mongoose.model('Chat', chatSchema);
