const socketIo = require("socket.io")();
const {
  JOIN_ROOM,
  NEW_USER_SOCKET_ID,
  USER_MOVEMENT,
  OLD_USER_INFO,
  CHAT_MESSAGE,
  FURNITURE_MOVEMENT,
  LEAVE_ROOM,
  JOIN_WORLD,
  UPDATE_MOVEMENT,
  LEAVE_WORLD,
} = require("../constants/socketEvents");

socketIo.on("connection", (socket) => {
  console.log("🔗A user connected to socket");

  socket.on(JOIN_ROOM, ({ user, roomId }) => {
    socket.join(roomId);

    socket.broadcast
      .to(roomId)
      .emit(JOIN_ROOM, { ...user });

    socket.broadcast
      .to(roomId)
      .emit(NEW_USER_SOCKET_ID, { socketId: socket.id });

    socket.on(USER_MOVEMENT, ({ position, direction }) => {
      socket.broadcast
        .to(roomId)
        .emit(USER_MOVEMENT, { user, position, direction });
    });

    socket.on(OLD_USER_INFO, ({ receiver, posInfo }) => {
      socketIo.to(receiver).emit(OLD_USER_INFO, posInfo);
    });

    socket.on(CHAT_MESSAGE, ({ message }) => {
      socket.broadcast
        .to(roomId)
        .emit(CHAT_MESSAGE, { user: user.name, message });
    });

    // NOTE end Edit mode, database update
    socket.on(FURNITURE_MOVEMENT, ({ _id, position }) => {
      socket.broadcast
        .to(roomId)
        .emit(FURNITURE_MOVEMENT, { _id, position });
    });

    socket.on("disconnect", () => {
      socket.broadcast
        .to(roomId)
        .emit(LEAVE_ROOM, user);
    });

    socket.on(LEAVE_ROOM, () => {
      socket.broadcast
        .to(roomId)
        .emit(LEAVE_ROOM, user);

      socket.leave(roomId);
      socket.removeAllListeners(USER_MOVEMENT);
      socket.removeAllListeners(OLD_USER_INFO);
      socket.removeAllListeners(CHAT_MESSAGE);
      socket.removeAllListeners(FURNITURE_MOVEMENT);
      socket.removeAllListeners("disconnect");
    });
  });

  // NOTE: World socket
  socket.on(JOIN_WORLD, (userInfo) => {
    socket.join("world1");

    socket.broadcast
      .to("world1")
      .emit(JOIN_WORLD, userInfo);

    socket.broadcast
      .to("world1")
      .emit(NEW_USER_SOCKET_ID, { socketId: socket.id });

    socket.on(USER_MOVEMENT, ({ id, position, direction }) => {
      socket.broadcast
        .to("world1")
        .emit(UPDATE_MOVEMENT(id), { position, direction });
    });

    socket.on(OLD_USER_INFO, ({ listener, userInfo: oldUserInfo }) => {
      socketIo
        .to(listener)
        .emit(OLD_USER_INFO, oldUserInfo);
    });

    socket.on(LEAVE_WORLD, () => {
      socket.broadcast
        .to("world1")
        .emit(LEAVE_WORLD, userInfo);

      socket.removeAllListeners(LEAVE_WORLD);
      socket.removeAllListeners(OLD_USER_INFO);
      socket.removeAllListeners(USER_MOVEMENT);
    });
  });
});

module.exports = socketIo;
