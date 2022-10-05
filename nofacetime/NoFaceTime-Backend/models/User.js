const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  nickname: {
    type: String,
    required: true,
    trim: true
  },
  groups: [{
    type: Schema.Types.ObjectId,
    ref: 'Group'
  }],
  rooms: [{
    type: Schema.Types.ObjectId,
    ref: 'Room'
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
