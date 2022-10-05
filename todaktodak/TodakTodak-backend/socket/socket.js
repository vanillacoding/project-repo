const ChatRoom = require("../models/ChatRoom");
const User = require("../models/User");

const {
  CONNECT,
  JOIN_ROOM,
  SEND_CHAT,
  LEAVE_USER,
  RECEIVE_CHAT,
  JOIN_USER_MESSAGE,
  LEAVE_USER_MESSAGE,
  RECEIVE_INITAL_CHATS
} = require("../constants/socketEvents");

const activatedRoomList = {};

module.exports = function socket(app) {
  app.io = require("socket.io")();

  app.io.on(CONNECT, (socket) => {
    socket.on(JOIN_ROOM, async (data) => {
      const { user, chatRoomId } = data;
      const isActivateRoom = activatedRoomList.hasOwnProperty(chatRoomId);

      socket.join(chatRoomId);

      if (isActivateRoom) {
        activatedRoomList[chatRoomId].users.push(user.nickname);

        app.io.to(socket.id).emit(
          RECEIVE_INITAL_CHATS,
          activatedRoomList[chatRoomId].chats
        );
      } else {
        const chatRoomInfo = await ChatRoom.findById(chatRoomId).lean();

        activatedRoomList[chatRoomInfo._id] = {
          chats: chatRoomInfo.comments,
          users: [user.nickname]
        };

        app.io.to(chatRoomId).emit(
          RECEIVE_INITAL_CHATS,
          activatedRoomList[chatRoomId].chats
        );
      }

      socket.broadcast.to(chatRoomId).emit(
        JOIN_USER_MESSAGE,
        {
          systemMessage: `${user.nickname}님이 입장하셨습니다`,
          createdAt: new Date()
        }
      );

      const currentUser = await User.findOne({ email: user.email });
      const friendList = currentUser.friends;

      const resetMessageCountFriendList = friendList.map((friend) => {
        if (String(friend.chatRoomId) === String(chatRoomId)) {
          friend.unreadMessageCount = 0;
        }

        return friend;
      });

      await currentUser.updateOne({
        "$set": { "friends": resetMessageCountFriendList }
      });
    });

    socket.on(LEAVE_USER, async (data) => {
      const { chatRoomId, user } = data;
      const currentRoom = activatedRoomList[chatRoomId];

      if (!currentRoom) return;

      const joinUsers = currentRoom.users;
      const filteredLeaveUsers = joinUsers.filter((joinUser) =>
        joinUser !== user.nickname
      );

      activatedRoomList[chatRoomId].users = filteredLeaveUsers;

      socket.broadcast.to(chatRoomId).emit(
        LEAVE_USER_MESSAGE,
        {
          systemMessage: `${user.nickname}님이 나갔습니다`,
          createdAt: new Date()
        }
      );

      if (!filteredLeaveUsers.length) {
        const chatRoom = await ChatRoom.findById(chatRoomId);

        delete activatedRoomList[chatRoomId];
        socket.leave(chatRoomId);

        await chatRoom.updateOne({
          "$set": { comments: currentRoom.chats }
        });
      }
    });

    socket.on(SEND_CHAT, async (data) => {
      const {
        user,
        comment,
        chatRoomId,
        friendInfo
      } = data;

      const chatData = {
        comment,
        userNickname: user.nickname,
        createdAt: new Date()
      };

      activatedRoomList[chatRoomId].chats.push(chatData);
      app.io.to(chatRoomId).emit(RECEIVE_CHAT, chatData);

      if (activatedRoomList[chatRoomId].users.length < 2) {
        const friend = await User.findOne({ email: friendInfo.email });
        const friendList = friend.friends;

        const increamentFriendList = friendList.map((friend) => {
          if (String(friend.chatRoomId) === String(chatRoomId)) {
            friend.unreadMessageCount++;
          }

          return friend;
        });

        await friend.updateOne({
          "$set": { "friends": increamentFriendList }
        });
      }
    });
  });
}
