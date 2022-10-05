const mongoose = require("mongoose");

const Mailbox = require("./Mailbox");

const roomSchema = new mongoose.Schema({
  furniture: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Furniture",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      position: {
        type: Array,
        required: true,
      },
    },
  ],
  mailboxId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mailbox",
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "ownerId is required."],
  },
  ownerName: {
    type: String,
    required: [true, "ownerName is required."],
  },
}, {
  timestamps: true,
});

roomSchema.pre(/^save/, async function (next) {
  if (!this.mailboxId) {
    const mailbox = await Mailbox.create({});
    this.mailboxId = mailbox._id;
  }

  next();
});

module.exports = mongoose.model("Room", roomSchema);
