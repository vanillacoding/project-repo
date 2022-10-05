const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const RoomSchema = new Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
  },
  roomNumber: {
    type: Number,
    default: Math.floor(Math.random() * 5000),
  },
  title: {
    type: String,
    enum: ["littleForest", "monsterEscape", "energyBattle"],
    required: true,
  },
  players: {
    type: [ObjectId],
    ref: "Player",
    default: [],
    required: true,
  },
  createdBy: {
    type: ObjectId,
    ref: "Player",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  status: {
    type: String,
    enum: ["Playing", "Full", "Enter"],
    default: "Enter",
    required: true,
  },
});

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;
