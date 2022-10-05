const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    isRequired: true,
  },
  imgUrl: {
    type: String,
    isRequired: true,
  },
});

module.exports = mongoose.model('Character', characterSchema);
