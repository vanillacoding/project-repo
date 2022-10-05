const mongoose = require("mongoose");
const { generateToken } = require("../routes/helpers/tokens");

const mockUserId = "613c79ac13010b7f24663718";
const mockFriendId = "613c79ac13010b7f24663719";
const mockToken = generateToken(mockUserId).token;
const mockFriendToken = generateToken(mockFriendId).token;
const mockActivityId = "613c79ac13010b7f24663711";
const mockCommentId = "613c79ac13010b7f24663712";

const mockUser = {
  _id: mongoose.Types.ObjectId(mockUserId),
  uid: "mock uid",
  profileUrl: "mock profile",
  name: "mock user",
};

const mockFriend = {
  _id: mongoose.Types.ObjectId(mockFriendId),
  uid: "mock friend uid",
  profileUrl: "mock friend profile",
  name: "mock friend",
};

const mockComment = {
  _id: mongoose.Types.ObjectId(mockCommentId),
  category: "Activity",
  ratingId: mongoose.Types.ObjectId(mockActivityId),
  creator: mongoose.Types.ObjectId(mockUserId),
  date: new Date(),
  content: "mock comment",
};

const mockActivity = {
  _id: mongoose.Types.ObjectId(mockActivityId),
  creator: mongoose.Types.ObjectId(mockUserId),
  sessionId: "AA-BB-CC",
  duration: 1,
  date: new Date(),
  type: "Walking",
  comments: [],
};

const mockStep = {
  creator: mockUserId,
  date: new Date(),
  count: 1000,
};

module.exports = {
  mockToken,
  mockFriendToken,
  mockUserId,
  mockUser,
  mockFriendId,
  mockFriend,
  mockComment,
  mockCommentId,
  mockActivityId,
  mockActivity,
  mockStep,
};
