const mongoose = require("mongoose");

const Room = require("../models/Room");
const Furniture = require("../models/Furniture");
const FurnitureData = require("../models/mockData/mockFurniture.json");
const {
  createRequestError,
  createAuthenticationError,
} = require("../utils/errors");

async function updateFurniture(req, res, next) {
  const { roomId } = req.user;
  const { _id, position } = req.body;

  if (!(mongoose.Types.ObjectId.isValid(_id))) {
    next(createRequestError());
    return;
  }

  try {
    await Room.findOneAndUpdate(
      { _id: roomId, "furniture._id": _id },
      { $set: { "furniture.$.position": position } },
      { new: true },
    );

    res.json({
      ok: true,
      data: { _id, position },
    });
  } catch (err) {
    console.log("💥 updateFurniture");
    next(err);
  }
}

// NOTE 관리자용
async function getFurniture(req, res, next) {
  if (!req.user) {
    next(createAuthenticationError());
    return;
  }

  const { _id } = req.user;

  try {
    const furniture = await Room.findOne({ ownerId: _id }, "furniture").lean();

    res.json({
      ok: true,
      data: furniture,
    });
  } catch (err) {
    console.log("💥 getFurniture");
    next(err);
  }
}

// NOTE 관리자용
async function insertFurniture(req, res, next) {
  try {
    await Furniture.deleteMany({});

    for (let i = 0; i < FurnitureData.length; i++) {
      await Furniture.create(FurnitureData[i]);
    }

    const furnitureList = await Furniture.find({}).lean();

    res.json({
      ok: true,
      data: furnitureList,
    });
  } catch (err) {
    console.log("💥 insertFurniture");
    next(err);
  }
}

exports.updateFurniture = updateFurniture;
exports.getFurniture = getFurniture;
exports.insertFurniture = insertFurniture;
