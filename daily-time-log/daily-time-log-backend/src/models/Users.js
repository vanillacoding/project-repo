const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
    },
    themeMode: {
      type: String,
    },
    milestones: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Milestones",
      },
    ],
  },
  {
    timestamps: true,
  },
);

UsersSchema.statics.isEmailTaken = async function (email) {
  return await this.findOne({ email });
};

module.exports = mongoose.model("Users", UsersSchema);
