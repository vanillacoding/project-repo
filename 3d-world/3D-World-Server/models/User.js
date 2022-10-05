const mongoose = require("mongoose");

const Room = require("./Room");
const Furniture = require("./Furniture");

const defaultPhotoURL = "https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331257__340.png";
const defaultMusicURL = "https://youtu.be/sr3JaQ3h7YA";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    index: true,
    unique: true,
    required: [true, "email is required"],
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  description: {
    type: String,
    default: "자기소개를 작성하세요.",
    maxlength: 80,
  },
  photoURL: {
    type: String,
    default: defaultPhotoURL,
  },
  musicURL: {
    type: String,
    default: defaultMusicURL,
  },
}, {
  timestamps: true,
});

userSchema.pre(/^save/, async function (next) {
  if (!this.roomId) {
    const room = await Room.create({
      ownerId: this._id,
      ownerName: this.name,
      furniture: await Furniture.find({}).lean(),
    });
    this.roomId = room._id;
  }

  next();
});

module.exports = mongoose.model("User", userSchema);
