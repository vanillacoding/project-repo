const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema ({
  facebookId: {type: String, required: true},
  userName: {type: String, required: true},
  myPhotoIds: {type: Array, required: true},
  receivedPhotoIds: {type: Array, required: true}
});

UserSchema.statics.findOneByFacebookId = function(facebookId) {
  try {
    return this.findOne({ facebookId }).exec();
  } catch (err) {
    throw err;
  }
};

module.exports = mongoose.model('User', UserSchema);
