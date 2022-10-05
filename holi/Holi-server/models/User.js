const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  picture_url: { type: String, required: true },
  name: { type: String, required: true }
});

UserSchema.statics.createUser = function (user) {
  try {
    const newUser = new this(user);
    return newUser.save();
  } catch (err) {
    throw err;
  }
};

UserSchema.statics.findOneByEmail = function (email) {
  try {
    return this.findOne(email).exec();
  } catch (err) {
    throw err;
  }
};

module.exports = mongoose.model('User', UserSchema);
