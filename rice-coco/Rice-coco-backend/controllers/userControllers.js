const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const RESPONSE = require('../constants/response');

exports.getUserInfo = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await userService.getUserInfo(userId);

    return res.status(200).json({ result: RESPONSE.OK, user });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const token = req.get('authorization');

  if (token !== 'null') {
    try {
      const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userService.login(decodedUser.email);

      res.status(200).json({ result: RESPONSE.OK, user });
    } catch (error) {
      console.error(error);
      res.status(401).json({ result: RESPONSE.UNAUTHORIZED });
    }

    return;
  }

  const { email } = req.body;

  try {
    const user = await userService.login(email);

    if (!user) {
      res.status(200).json({ result: RESPONSE.CAN_NOT_FIND });

      return;
    }

    const { _id: userId } = user;
    const token = jwt.sign({ userId, email }, process.env.JWT_SECRET);

    res.status(200).json({ result: RESPONSE.OK, user, token });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  const userInfo = req.body;

  try {
    const user = await userService.signup(userInfo);
    const { _id: userId, email } = user;
    const token = jwt.sign({ userId, email }, process.env.JWT_SECRET);

    res.status(201).json({ result: RESPONSE.OK, token, user });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.updateUserInfo = async (req, res, next) => {
  const { userId } = req.params;
  const userInfo = req.body;

  try {
    const { nickname, occupation } = await userService.updateUserInfo(
      userId,
      userInfo
    );

    res.status(200).json({ result: RESPONSE.OK, nickname, occupation });
  } catch (error) {
    console.error(error);
    next(err);
  }
};

exports.updatePreferredPartner = async (req, res, next) => {
  const { userId } = req.params;
  const newPartnerConditions = req.body;

  try {
    const { preferredPartner } = await userService.updatePreferredPartner(
      userId,
      newPartnerConditions
    );

    res.status(200).json({ result: RESPONSE.OK, preferredPartner });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.updatePromise = async (req, res, next) => {
  const { userId } = req.params;
  const { amount } = req.body;

  try {
    const updatedUser = await userService.updatePromise(userId, amount);

    res.status(200).json({ result: RESPONSE.OK, updatedUser });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.addFavoritePartners = async (req, res, next) => {
  const { userId } = req.params;
  const { partnerNickname } = req.body;

  try {
    const partnerId = await userService.getPartnerIdByNickname(partnerNickname);
    const updatedUser = await userService.addFavoritePartners(
      userId,
      partnerId
    );

    res.status(200).json({ result: RESPONSE.OK, updatedUser });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
