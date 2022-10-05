const mongoose = require("mongoose");

const Room = require("../models/Room");
const { createNotFoundError } = require("../utils/errors");

async function getRoomByUserId(req, res, next) {
  const { userId } = req.params;

  if (!(mongoose.Types.ObjectId.isValid(userId))) {
    next(createNotFoundError());
    return;
  }

  try {
    const room = await Room.findOne({ ownerId: userId }).lean();

    if (!room) {
      next(createNotFoundError());
      return;
    }

    res.json({ ok: true, data: room });
  } catch (err) {
    console.log("💥 getRoomByUserId");
    next(err);
  }
}

exports.getRoomByUserId = getRoomByUserId;
