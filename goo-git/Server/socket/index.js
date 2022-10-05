const { socketEvents } = require('../constants');

const socketIo = io => {
  io.on(socketEvents.CONNENCTION, socket => {
    console.log(`socket ${socket.id} connected`);

    socket.on(socketEvents.JOIN_ROOM, branchId => {
      socket.join(branchId);
    });

    socket.on(socketEvents.LEAVE_ROOM, branchId => {
      socket.leave(branchId);
    });

    socket.on(socketEvents.SHARING_NOTE_TYPED, (...args) => {
      const [branchId, noteValue] = args;

      socket.to(branchId)
        .emit(socketEvents.SHARING_NOTE_TYPED, noteValue);
    });
  });
};

module.exports = socketIo;
