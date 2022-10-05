const Player = require("../../models/playerModel");
const { createToken, verifyToken } = require("../../utils/tokenHandler");

exports.checkAuthorization = async (req, res, next) => {
  try {
    const player = await verifyToken(req.body.token);

    const now = new Date();
    if (now.getMinutes() === 0) {
      await Player.deleteMany({ email: "temp@temp.temp" });
    }

    if (!player) {
      return res.status(200).json({
        message: "Unauthorized",
      });
    }

    res.status(200).json({
      message: "Authorization Success",
      data: player,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    const { email, uid, displayName } = req.body;
    const player = await Player.findOne({ playerId: uid });

    if (!player) {
      const newPlayer = await Player.create({
        email,
        playerId: uid,
        name: displayName,
      });
      return res.status(201).json({
        message: "Sign In Success",
        data: newPlayer,
      });
    }

    const token = createToken(uid);

    res.status(200).json({
      message: "Log In Success",
      data: player,
      token,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postUnAuth = async (req, res, next) => {
  try {
    const { playerId, name, email } = req.body;
    const player = await Player.create({
      email,
      playerId,
      name,
    });

    return res.status(201).json({
      message: "UnAuth Mode Success",
      data: player,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
