const Player = require("../../models/playerModel");
const Room = require("../../models/roomModel");

exports.fetchRoomsDB = async (req, res, next) => {
  try {
    const gameTitle = req.url.slice(1);
    const rooms = await Room.find({ title: gameTitle }).populate("players");

    return res.status(200).json({
      message: "success",
      data: rooms,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.createRoomDB = async (req, res, next) => {
  try {
    const { gameTitle, newRoomId, createdBy } = req.body;

    const newRoom = await Room.create({
      title: gameTitle,
      roomId: newRoomId,
      createdBy,
      players: [createdBy],
      roomNumber: Math.floor(Math.random() * 5000),
    });

    return res.status(201).json({
      message: "success",
      data: newRoom,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.changeRoomStatus = async (req, res, next) => {
  try {
    const { gameTitle, roomId, status } = req.body;

    const updatedOne = await Room.findOneAndUpdate(
      {
        roomId,
      },
      { status }
    );

    if (!updatedOne) {
      return res.status(304).json({
        message: "fail",
      });
    }

    const updatedRooms = await Room.find({ title: gameTitle });
    return res.status(200).json({
      message: "success",
      data: updatedRooms,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getRoomData = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const currentRoom = await Room.findOne({ roomId });

    if (!currentRoom) {
      return res.status(400).json({
        message: "fail",
      });
    }

    return res.status(200).json({
      message: "success",
      data: currentRoom,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.patchRoomData = async (req, res, next) => {
  try {
    let updated;
    const { type, gameTitle, roomId, playerData } = req.body;

    if (type === "GAME_RESULT") {
      updated = await Player.findByIdAndUpdate(playerData._id, {
        $inc: { "gameRecords.energyBattle": 1 },
      });

      if (!updated) {
        return res.status(304).json({
          message: "fail",
        });
      }

      const updatedPlayer = await Player.findById(playerData._id);

      return res.status(200).json({
        message: "success",
        data: updatedPlayer,
      });
    }

    if (type === "JOIN") {
      updated = await Room.findOneAndUpdate(
        { roomId },
        { $addToSet: { players: playerData._id } }
      );
    }

    if (type === "LEAVE") {
      updated = await Room.findOneAndUpdate(
        { roomId },
        { $pull: { players: playerData._id } }
      );
    }

    if (!updated) {
      return res.status(304).json({
        message: "fail",
      });
    }

    const updatedRooms = await Room.find({ title: gameTitle });

    return res.status(200).json({
      message: "success",
      data: updatedRooms,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.deleteRoomDB = async (req, res, next) => {
  try {
    const { gameTitle, roomId } = req.body;
    const deleted = await Room.findOneAndRemove({ roomId });

    if (!deleted) {
      return res.status(304).json({
        message: "fail",
      });
    }

    const deletedRooms = await Room.find({ title: gameTitle });

    return res.status(200).json({
      message: "success",
      data: deletedRooms,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.deleteRoomSocket = async (roomId) => {
  try {
    await Room.findOneAndRemove({ roomId });
  } catch (err) {
    console.log(err);
  }
};
