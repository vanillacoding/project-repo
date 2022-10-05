const mongoose = require("mongoose");
const emailValidator = require("email-validator");

const { SIGNUP } = require("../constants/error");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: emailValidator.validate,
        message: SIGNUP.INVALID_EMAIL,
      },
    },
    name: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 100,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
