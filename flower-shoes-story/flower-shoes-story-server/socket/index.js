const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const mongoose = require("mongoose");

const Message = require("../models/Message");
const Couple = require("../models/Couple");

const { EVENTS } = require("../constants");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    credentials: true,
  }
});

io.on("connection", (socket) => {
  const jumpUpMessages = ["사랑", "사랑해", "나도 사랑해", "나도사랑해"];
  const jumpDownMessages = ["바보", "헤어져", "우리헤어져"];
  let messages = [];

  socket.on(EVENTS.JOIN, async (roomId) => {
    const targetMessages = await Message.findOne({ couple: roomId });
    const targetCouple = await Couple.findById(roomId);

    if (targetMessages) {
      messages.push(...targetMessages.messages);
    } else {
      await Message.create({
        couple: mongoose.Types.ObjectId(roomId),
        messages,
      });
    }

    socket.join(roomId);

    socket.emit(EVENTS.GET_MESSAGES, messages);
    socket.emit(EVENTS.SET_START_POSITION, targetCouple.stair);
  });

  socket.on(EVENTS.RESET_START_POSITION, async (coupleId, stairIndex) => {
    const targetCouple = await Couple.findById(coupleId);
    targetCouple.stair = stairIndex;
    let score = 0;

    if (targetCouple.score) {
      score = targetCouple.score;
    }

    if (stairIndex === 10) {
      targetCouple.score = score + 10;
    }

    await targetCouple.save();
  });

  socket.on("setCurrentIndex", async (coupleId, currentIndex) => {
    const targetCouple = await Couple.findById(coupleId);
    targetCouple.stair = currentIndex;

    await targetCouple.save();
  });

  socket.on(EVENTS.SEND_MESSAGE, async ({ roomId, user, message, time }) => {
    if (jumpDownMessages.includes(message)) {
      io.to(roomId).emit(EVENTS.LISTEN_JUMP_DIRECTION, "down");
    }

    if (jumpUpMessages.includes(message)) {
      io.to(roomId).emit(EVENTS.LISTEN_JUMP_DIRECTION, "up");
    }

    const chat = {
      user,
      message,
      time,
    };

    io.to(roomId).emit(EVENTS.SEND_MESSAGE, chat);

    await Message.findOneAndUpdate(
      { couple: roomId },
      { $push: { messages: chat } },
    );
  });
});

module.exports = io;
