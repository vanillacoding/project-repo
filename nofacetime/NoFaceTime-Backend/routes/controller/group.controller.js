const { RESPONSE_MESSAGE } = require('../../utils/constants');
const queryString = require('query-string');

const User = require('../../models/User');
const Group = require('../../models/Group');

const UserService = require('../../services/User');
const GroupService = require('../../services/Group');

const userService = new UserService(User);
const groupService = new GroupService(User, Group);

const sendMail = require('../../utils/nodeMailer');

exports.createNewGroup = async (req, res, next) => {
  try {
    const { userId, groupName, members } = req.body;
    const newGroupData = {
      name: groupName,
      members: members
    };

    const groupDataSavedToDB = await groupService.createGroup(newGroupData);
    await userService.addUserGroupData(userId, groupDataSavedToDB._id);
    return res.status(201).json({ groups: groupDataSavedToDB });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.deleteGroups = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const parsed = queryString.parse(req.params.id);
    const groupIdArray = Array.isArray(parsed.group) ? parsed.group : [parsed.group];
    await groupService.deleteMultipleGroups(groupIdArray);
    await userService.deleteUserGroupData(userId, groupIdArray);

    return res.status(204);
  } catch (err) {
    console.error(err);
  }
};

exports.getAllMembers = async (req, res, next) => {
  try {
    const groupId = req.params.id;
    const members = await groupService.findMembers(groupId);
    return res.status(200).json({ members });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.addMembersToGroup = async (req, res, next) => {
  try {
    const groupId = req.params.groupId;
    const { members } = req.body;
    await groupService.addMembers(groupId, members);//업데이트 된 그룹 데이터

    return res.json({ groupId, members });
  } catch (err) {
    console.log(err);
  }
};

exports.deleMembersFromGroup = async (req, res, next) => {
  try {
    const groupId = req.params.groupId;
    const parsed = queryString.parse(req.params.memberId);
    const membersArray = Array.isArray(parsed.member) ? parsed.member : [parsed.member];
    await groupService.deleteMembers(groupId, membersArray);
    const updatedMembers = await groupService.findMembers(groupId);
    return res.status(204);
  } catch (err) {
    console.log(err);
  }
};

exports.sendMailToMembers = async (req, res, next) => {
  try {
    const { sender, receiver, roomLink, groupId } = req.body; //receiver는 배열로 들어옴
    console.log("REQ REQ", req.body);
    sendMail(sender, receiver, roomLink, groupId);

    return res.status(200).json({ message: 'ok' });
  } catch (err) {
    console.error(err);
  }
};