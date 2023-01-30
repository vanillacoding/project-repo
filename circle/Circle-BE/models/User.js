const mongoose = require("mongoose");

const { MESSAGE } = require("../src/constants");

const validateEmail = (email) => {
  // eslint-disable-next-line no-useless-escape
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new mongoose.Schema({
  providerId: {
    type: String,
    unique: true,
    index: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validateEmail, MESSAGE.INVALID_EMAIL],
  },
  displayName: { type: String, required: true },
  photoUrl: { type: String },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
