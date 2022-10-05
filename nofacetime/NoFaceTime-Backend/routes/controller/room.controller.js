const { v4: uuidv4 } = require('uuid');

const { SERVICE_URL } = require('../../config');
const { RESPONSE_MESSAGE } = require('../../utils/constants');

const User = require('../../models/User');
const Room = require('../../models/Room');
const Group = require('../../models/Group');

const UserService = require('../../services/User');
const RoomService = require('../../services/Room');
const GroupService = require('../../services/Group');

const userService = new UserService(User);
const roomService = new RoomService(User, Room);
const groupService = new GroupService(User, Group);

const sendMail = require('../../utils/nodeMailer');

exports.getRoom = async (req, res, next) => {
  try {
    const roomLink = `${SERVICE_URL}/rooms/${req.params.roomId}`;
    const roomData = await roomService.getRoom(roomLink);

    return res.status(200).json({ roomData });
  } catch (err) {
    console.error(err);
  }
};

exports.createNewRoom = async (req, res, next) => {
  try {
    console.log('createNewRoom', req.body);
    const { currentUser, roomName } = req.body;
    const roomUniqueId = uuidv4();

    const newRoomData = {
      name: roomName,
      host: currentUser._id,
      link: `${SERVICE_URL}/rooms/${roomUniqueId}`
    };

    const roomDataSavedToDB = await roomService.createRoom(newRoomData);
    await userService.addUserRoomData(currentUser._id, roomDataSavedToDB._id);
    return res.status(201).json({ rooms: roomDataSavedToDB });//전체 방 정보가 아닌 ADDED ROOM 하나의 정보만 보냅니다.
  } catch (err) {
    console.error(err);
  }
};

exports.deleteRoom = async (req, res, next) => {
  try {
    const roomId = req.params.roomId;
    const { userId } = req.body;
    await roomService.deleteRoom(roomId);
    await userService.deleteUserRoomData(userId, roomId);

    return res.status(204);
  } catch (err) {
    console.error(err);
  }
};

