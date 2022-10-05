const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const SALT_ROUNDS = 10;
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const UserSchema = new Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
  },
  cryptofolios: {
    type: [ObjectId],
    ref: "Cryptofolio",
    default: [],
    required: true,
  },
});

UserSchema.pre("save", function (next) {
  const user = this;

  if (!user.password) {
    return next();
  }

  bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) {
        return next(error);
      }

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (password, callback) {
  const user = this;

  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
