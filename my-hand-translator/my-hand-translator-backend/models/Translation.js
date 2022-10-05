const mongoose = require("mongoose");
const emailValidator = require("email-validator");

const { SIGNUP } = require("../constants/error");

const translationSchema = new mongoose.Schema({
  nanoId: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
    validate: {
      validator: emailValidator.validate,
      message: SIGNUP.INVALID_EMAIL,
    },
  },
  origin: { type: String, required: true, minLength: 1 },
  translated: { type: String, required: true },
  url: {
    type: String,
    required: true,
  },
  glossary: {
    type: Map,
    of: { type: String, minLength: 1, maxLength: 1000 },
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

const Translation = mongoose.model("Translation", translationSchema);

module.exports = Translation;
