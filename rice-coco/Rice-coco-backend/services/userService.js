const User = require('../models/User');

exports.getUserInfo = async userId => {
  try {
    const user = await User.findById(userId);

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

exports.login = async email => {
  try {
    const user = await User.findOne(
      { email },
      {
        updated_at: 0,
        created_at: 0,
        __v: 0,
      }
    );

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

exports.signup = async userInfo => {
  try {
    const user = await User.create(userInfo);

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

exports.updateUserInfo = async (userId, userInfo) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { ...userInfo } },
      { new: true }
    );

    return updatedUser;
  } catch (error) {
    throw new Error(error);
  }
};

exports.updatePreferredPartner = async (userId, preferredPartner) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { preferredPartner },
      { new: true }
    );

    return updatedUser;
  } catch (error) {
    throw new Error(error);
  }
};

exports.updatePromise = async (userId, amount) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { promise: amount } }
    );

    return updatedUser;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getPartnerIdByNickname = async partnerNickname => {
  try {
    const { _id: partnerId } = await User.findOne({
      nickname: partnerNickname,
    });

    return partnerId;
  } catch (error) {
    throw new Error(error);
  }
};

exports.addFavoritePartners = async (userId, partnerId) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { favoritePartners: partnerId } }
    );

    return updatedUser;
  } catch (error) {
    throw new Error(error);
  }
};
