const { CHANNEL } = require("../../constants");
const logger = require("../../../libs/logger");
const { chain } = require("../../utils/fp");

const usersInRoom = {};
const roomOfUser = {};

const handleOnJoinRoom = chain(({ socket }) => {
  socket.on(CHANNEL.JOIN, (channelId) => {
    logger.info(`${socket.id}유저 가 ${channelId}방에 입장`);

    if (usersInRoom[channelId]) {
      usersInRoom[channelId].push(socket.id);
    } else {
      usersInRoom[channelId] = [socket.id];
    }

    roomOfUser[socket.id] = channelId;

    const calleesInThisChannel = usersInRoom[channelId].filter(
      (id) => id !== socket.id,
    );

    socket.emit(CHANNEL.EXISTED_CALLEES, calleesInThisChannel);
  });
});

const handleOnCallerToCallee = chain(({ socket, io }) => {
  socket.on(CHANNEL.OFFER, ({ callerId, calleeId, signal }) => {
    io.to(calleeId).emit(CHANNEL.USER_JOIN, {
      signal,
      callerId,
    });
  });
});

const handleOnCalleeToCaller = chain(({ socket, io }) => {
  socket.on(CHANNEL.ANSWER, ({ callerId, signal }) => {
    io.to(callerId).emit(CHANNEL.RETURN_SIGNAL, {
      signal,
      calleeId: socket.id,
    });
  });
});

const handleOnDisconnection = chain(({ socket }) => {
  socket.on("disconnect", () => {
    const channelId = roomOfUser[socket.id];

    logger.info(`${socket.id}가 ${channelId}방을 퇴장하였습니다`);

    const room = usersInRoom[channelId];

    if (room) {
      usersInRoom[channelId] = room.filter((id) => id !== socket.id);
    }

    socket.broadcast.emit(CHANNEL.USER_DISCONNECT, socket.id);
  });
});

module.exports = {
  handleOnJoinRoom,
  handleOnCallerToCallee,
  handleOnCalleeToCaller,
  handleOnDisconnection,
};
