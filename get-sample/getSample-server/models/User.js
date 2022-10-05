const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const userSchema = new mongoose.Schema({
  google_id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  profile_image_url: {
    type: String,
    required: true,
  },
  // subscriptions_frequency: {
  //   type: Object,
  //   required: false,
  // },
  my_words: {
    type: Object,
    required: true,
    default: {},
  },
}, { minimize: false });

userSchema.plugin(findOrCreate);
module.exports = mongoose.model('User', userSchema);
