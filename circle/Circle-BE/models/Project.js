const mongoose = require("mongoose");

const SecretKeySchema = new mongoose.Schema({
  iv: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
});

const ProjectSchema = new mongoose.Schema(
  {
    secretKey: { type: SecretKeySchema, required: true },
    owner: {
      type: String,
      required: true,
      ref: "User",
    },
    _id: { type: mongoose.Types.ObjectId },
    title: {
      type: String,
      required: true,
      validate(value) {
        if (value.length > 15) {
          throw new Error();
        }
      },
    },
    channels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Project", ProjectSchema);
