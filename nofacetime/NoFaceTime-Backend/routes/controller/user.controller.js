const User = require('../../models/User');
const Room = require('../../models/Room');
const Group = require('../../models/Group');

const UserService = require('../../services/User');
const RoomService = require('../../services/Room');
const GroupService = require('../../services/Group');

const userService = new UserService(User);
const roomService = new RoomService(User, Room);
const groupService = new GroupService(User, Group);

exports.getUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const userData = await userService.getUserData({ '_id': userId });

    return res.status(200).send(userData);
  } catch (err) {
    console.error(err);
  }
};
