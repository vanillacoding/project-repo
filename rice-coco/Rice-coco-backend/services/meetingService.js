const Meeting = require('../models/Meeting');
const User = require('../models/User');
const mongoose = require('mongoose');

exports.createMeeting = async (selectedMeeting, userId) => {
  const { restaurantId, restaurantName, restaurantLocation } = selectedMeeting;

  try {
    const createdMeeting = await Meeting.create({
      restaurant: {
        restaurantId,
        name: restaurantName,
        location: restaurantLocation,
      },
      participant: [{ _id: userId }],
    });

    return createdMeeting;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getAllFilteredMeetings = async userId => {
  const user = await User.findById(userId).lean();
  const userConditions = user.preferredPartner;

  delete userConditions._id;

  const { gender, occupation, birthYear } = user;
  const userProfile = { gender, occupation, birthYear };
  const filteredMeetings = [];

  const activeMeetings = await Meeting.find({ isMatched: false })
    .populate('participant._id')
    .lean();

  if (!activeMeetings.length) return filteredMeetings;

  for (let i = 0; i < activeMeetings.length; i++) {
    const currentActiveMeeting = activeMeetings[i];
    const waitingPartner = currentActiveMeeting.participant[0]._id;
    const partnerNickname = waitingPartner.nickname;
    const partnerConditions = waitingPartner.preferredPartner;

    const { gender, occupation, birthYear } = waitingPartner;
    const partnerProfile = { gender, occupation, birthYear };

    delete partnerConditions._id;

    for (const condition in partnerConditions) {
      if (partnerConditions[condition] !== userProfile[condition]) continue;
      if (partnerProfile[condition] !== userConditions[condition]) continue;
    }

    const { _id, restaurant, expiredTime } = currentActiveMeeting;

    filteredMeetings.push({
      meetingId: _id,
      restaurant,
      partnerNickname,
      expiredTime,
    });
  }

  return filteredMeetings;
};

exports.getMeetingDetail = async (meetingId, userId) => {
  try {
    const meetingDetails = await Meeting.findById(meetingId);
    const { expiredTime, restaurant, participant } = meetingDetails;
    const {
      restaurantId,
      location: restaurantLocation,
      name: restaurantName,
    } = restaurant;

    const partner = participant.find(obj => obj._id.toString() !== userId);
    const partnerId = partner && partner._id;
    let partnerNickname;

    if (partnerId) {
      const { nickname } = await User.findById(partnerId);
      partnerNickname = nickname;
    }

    return {
      expiredTime,
      partnerNickname,
      restaurantId,
      restaurantLocation,
      restaurantName,
    };
  } catch (error) {
    throw new Error(error);
  }
};

exports.getActiveMeetingByUserId = async userId => {
  const mongooseUserId = mongoose.Types.ObjectId(userId);

  try {
    const activeMeeting = await Meeting.findOne({
      participant: { $elemMatch: { _id: mongooseUserId } },
      isFinished: false,
    });

    return activeMeeting;
  } catch (error) {
    throw new Error(error);
  }
};

exports.joinMeeting = async (meetingId, userId) => {
  try {
    const updatedMeeting = await Meeting.findByIdAndUpdate(
      meetingId,
      {
        $addToSet: { participant: { _id: userId } },
        $set: {
          isMatched: true,
          expiredTime: new Date(Date.now() + 2 * 60 * 1000),
        },
      },
      { new: true }
    );

    return updatedMeeting;
  } catch (error) {
    throw new Error(error);
  }
};

exports.finishMeeting = async meetingId => {
  try {
    await Meeting.findByIdAndUpdate(meetingId, { isFinished: true });
  } catch (error) {
    throw new Error(error);
  }
};

exports.deleteMeeting = async meetingId => {
  try {
    await Meeting.findByIdAndRemove(meetingId);
  } catch (error) {
    throw new Error(error);
  }
};

exports.updateChat = async (meetingId, userId, nickname, message) => {
  try {
    await Meeting.findOneAndUpdate(
      { _id: meetingId },
      { $push: { chat: { userId, nickname, message } } }
    );
  } catch (err) {
    throw new Error(error);
  }
};

exports.getAllFilteredMessages = async meetingId => {
  try {
    const meeting = await Meeting.findOne({ _id: meetingId });
    const { chat } = meeting.populate('chat');

    return chat;
  } catch (err) {
    throw new Error(error);
  }
};
