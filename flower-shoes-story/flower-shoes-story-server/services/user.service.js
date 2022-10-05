const User = require("../models/User");
const Couple = require("../models/Couple");
const Message = require("../models/Message");

const { TYPE } = require("../constants");

exports.findUser = async (userInfo) => {
  const { email } = userInfo;

  try {
    return await User.findOne({ email }).populate("couple").exec();
  } catch (error) {
    throw error;
  }
};

exports.findPartner = async (email) => {
  try {
    return await User.findOne({ partner_id: email }).populate("couple").exec();
  } catch (error) {
    throw error;
  }
};

exports.updateUserInfo = async (_id, type, partnerId, date, dischargeDate) => {
  try {
    const user = await User.findById(_id);

    if (!user.couple && !user.partner_id) {
      const events = {
        anniversary: [{ startDate: date, endDate: date }],
        discharge: { startDate: dischargeDate, endDate: dischargeDate },
      };

      const couple = await Couple.create({ events, stair: 0 });

      user.couple = couple._id;
      user.partner_id = partnerId;
      user.type = type;
      user.type === TYPE.SOLDIER ? couple.soldier = user._id : couple.gomsin = user._id;

      await user.save();
    }

    if (!user.couple && user.partner_id) {
      const partner = await User.findOne({ email: user.partner_id }).populate("couple").exec();
      const couple = await Couple.findById(partner.couple._id);

      user.couple = partner.couple._id;
      user.type === TYPE.SOLDIER ? couple.soldier = user._id : couple.gomsin = user._id;
      user.is_matched = true;
      partner.is_matched = true;

      await partner.save();
      await user.save();
    }

    const updatedUser = await User.findById(_id).populate("couple").exec();

    return updatedUser;
  } catch (error) {
    throw error;
  }
};

exports.deleteUserAndCouple = async (userId, coupleId, partnerId) => {
  try {
    if (partnerId) {
      const partner = await User.findOne({ email: partnerId });
      partner.is_matched = false;
      partner.partner_id = "";
      partner.couple = null;
      partner.type = "";
      await partner.save();
    }

    if (coupleId) {
      await Couple.findByIdAndDelete(coupleId);
      await Message.findOneAndDelete({ couple: coupleId });
    }

    await User.findByIdAndDelete(userId);
  } catch (error) {
    throw error;
  }
};
