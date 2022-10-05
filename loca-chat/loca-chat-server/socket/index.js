const Chat = require('../models/Chat');

const chatRooms = {};
const nicknames = {};

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('connected');
    socket.on('join', async (chatId, nickname) => {
      const socketId = socket.id;
      if (chatRooms[chatId]) {
        chatRooms[chatId].users.push(socketId);
        nicknames[socketId] = {
          nickname,
          chatId
        };
        const users = chatRooms[chatId].users.map((userSocketId) => {
          return nicknames[userSocketId].nickname;
        });

        socket.join(chatId);
        io.sockets.in(chatId).emit('updateUsers', users);
      } else {
        const { title } = await Chat.findById(chatId);
        const room = {
          title,
          users: [socketId]
        };

        chatRooms[chatId] = room;
        nicknames[socketId] = {
          nickname,
          chatId
        };

        const users = chatRooms[chatId].users.map((userSocketId) => {
          return nicknames[userSocketId].nickname;
        });

        socket.join(chatId);
        io.sockets.in(chatId).emit('updateUsers', users);
      }
    });

    socket.on('createChat', () => {
      io.sockets.emit('createChat');
    });

    socket.on('message', async (data, chatId) => {
      io.sockets.in(chatId).emit('message', data);
    });

    socket.on('typing', (nickname, chatId) => {
      const users = chatRooms[chatId].users;
      const otherUsersSocketId = users.filter(
        (userSocketId) => userSocketId !== socket.id
      );

      otherUsersSocketId.forEach((socketId) => {
        io.sockets.to(socketId).emit('typing', nickname);
      });
    });

    socket.on('stopTyping', (nickname, chatId) => {
      const users = chatRooms[chatId].users;
      const otherUsersSocketId = users.filter(
        (userSocketId) => userSocketId !== socket.id
      );

      otherUsersSocketId.forEach((socketId) => {
        io.sockets.to(socketId).emit('stopTyping', nickname);
      });
    });

    socket.on('leave', () => {
      const socketid = socket.id;
      const myRoom = nicknames[socketid].chatId;
      const myRoomUsers = chatRooms[myRoom].users;
      const index = myRoomUsers.findIndex((user) => user === socketid);

      myRoomUsers.splice(index, 1);

      const users = chatRooms[myRoom].users.map((userSocketId) => {
        return nicknames[userSocketId].nickname;
      });

      io.sockets.in(myRoom).emit('updateUsers', users);
      socket.leave(myRoom);

      if (!myRoomUsers.length) delete chatRooms[myRoom];

      delete nicknames[socketid];
      console.log('leave chat');
    });

    socket.on('disconnect', () => {
      console.log('disconnect');
    });
  });
};
