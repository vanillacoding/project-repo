const EVENT = require("../constants/socketEvents");

module.exports = function channelSocket(
  app,
  socket,
  activatedRoomList,
  typingUsersInEachRoom
) {
  socket.on(EVENT.INIT_ROOM_LIST, () => {
    app.io.emit(
      EVENT.RECEIVE_ACTIVE_ROOM_LIST,
      Array.from(activatedRoomList.entries())
    );
  });

  socket.on(EVENT.CREATE_ROOM, (user, roomInfo) => {
    const { email } = user;
    const { title, roomId } = roomInfo;
    const newRoom = {
      roomTitle: title,
      owner: { email, socketId: socket.id },
      participants: [],
      contents: ""
    };

    activatedRoomList.set(roomId, newRoom);
    typingUsersInEachRoom.set(roomId, new Map());
  });
}
