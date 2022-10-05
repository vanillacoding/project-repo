const jwt = require("jsonwebtoken");
const Player = require("../models/playerModel");

exports.createToken = (playerId) => {
  return jwt.sign({ playerId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.verifyToken = async (clientToken) => {
  if (!clientToken || clientToken === "undefined") {
    return null;
  }

  const decoded = jwt.verify(clientToken, process.env.JWT_SECRET);
  const player = await Player.findOne({ playerId: decoded.playerId });
  const now = Date.now();
  const isExpired = decoded.exp * 1000 - now < 0;

  if (!player || isExpired) {
    return null;
  }

  return player;
};
