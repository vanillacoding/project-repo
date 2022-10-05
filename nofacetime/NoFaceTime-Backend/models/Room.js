const mongoose = require('mongoose');
const { Schema } = mongoose;

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  host: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    trim: true
  },
  link: {
    type: String,
    unique: true,
    required: true,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
