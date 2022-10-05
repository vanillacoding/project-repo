const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const Treasure = require('../models/Treasures');
const { errorMsg } = require('../constants');
const { processTreasureList } = require('../util');

exports.getLoginOrSignup = async(req, res) => {
  try {
    const { email, picture_url, name } = req.body;
    const user = await User.findOne({ email });
    const secretKey = process.env.SECRET_KEY;
    const options = { expiresIn: '1d', issuer: 'minsun' };
    const payload = {};
    if (!user) {
      const newUser = await User.create({ email, picture_url, name });
      if (!newUser) return res.status(401).json({ result: 'ng', errMessage: errorMsg.invalidSignup });
      payload.name = newUser.name;
      payload.picture = newUser.picture_url;
      payload.id = newUser._id;
    } else  {
      payload.name = user.name;
      payload.picture = user.picture_url;
      payload.id = user._id;
    }
    const token = jwt.sign(payload, secretKey, options);
    return res.status(201).json({ result: 'ok', token, userInfo: payload });
  } catch(err) {
    return res.status(400).json({ result: 'ng', errMessage: errorMsg.invalidLogin });
  }
};

exports.getAuth = async(req, res) => {
  try {
    const token = req.headers['x-access-token'].split('Bearer')[1].trim();
    const secretKey = process.env.SECRET_KEY;
    const payload = await jwt.verify(token, secretKey);
    return res.status(200).json({ result: 'ok', token, userInfo: payload });
  } catch(err) {
    const { name } = err;
    if (name === 'TokenExpiredError') return res.status(400).json({ result: 'ng', errMessage: errorMsg.tokenExpired });
    res.status(400).json({ result: 'ng', errMessage: errorMsg.invalidToken });
  }
};

exports.getUserTreasures = async(req, res) => {
  try {
    const userId = req.params.user_id;
    let treasures = await Treasure.find({ registered_by: { $in: [ `${userId}`] } }).sort('expiration');
    if (!treasures) return res.status(404).json({ result: 'ng', errMessage: errorMsg.invalidTreasures });
    treasures = processTreasureList(treasures, userId);
    return res.status(200).send(treasures);
  } catch(err) {
    return res.status(404).json({ result: 'ng', errMessage: errorMsg.generalError });
  }
};

exports.getUserHuntings = async(req, res) => {
  try {
    const userId = req.params.user_id;
    let treasures = await Treasure.find({ taken_by: { $in: [ `${userId}`] } }).sort('expiration');
    if (!treasures) return res.status(404).json({ result: 'ng', errMessage: errorMsg.invalidTreasures });
    treasures = processTreasureList(treasures);
    return res.status(200).send(treasures);
  } catch(err) {
    return res.status(404).json({ result: 'ng', errMessage: errorMsg.generalError });
  }
};
