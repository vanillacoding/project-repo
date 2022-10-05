const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  members: [{
    type: String,
    require: true,
    trim: true
  }]
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);
