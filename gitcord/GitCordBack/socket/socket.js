const connectSocketMain = require("./mainSocket");
const camWindowSocket = require("./camWindowSocket");
const channelSocket = require("./channelSocket");
const codeEditorSocket = require("./codeEditorSocket");
const whiteBoardSocket = require("./whiteBoardSocket");
const chatSocket = require("./chatSocket");
const EVENT = require("../constants/socketEvents");

const activatedRoomList = new Map();
const typingUsersInEachRoom = new Map();

module.exports = function socket(app) {
  app.io = require("socket.io")({
    cors: {
      origin: "*"
    }
  });

  app.io.on(EVENT.CONNECTION, (socket) => {
    socket.on(EVENT.DISCONNECTION, () => {
      let deleteRoomIndex;

      for (const [roomId, currentRoom] of activatedRoomList) {
        currentRoom.participants.some((participant, index) => {
          if (participant.socketId === socket.id) {
            if (currentRoom.owner.socketId === socket.id) {
              deleteRoomIndex = roomId;

              app.io.to(roomId).emit(EVENT.RECEIVE_PARTICIPANTS, null);
              return true;
            }

            currentRoom.participants.splice(index, 1);

            app.io.to(roomId).emit(
              EVENT.RECEIVE_PARTICIPANTS,
              currentRoom
            );

            app.io.to(roomId).emit(
              EVENT.USER_LEFT,
              participant
            );

            return true;
          }
        });
      }

      socket.leave(deleteRoomIndex);

      activatedRoomList.delete(deleteRoomIndex);

      app.io.emit(
        EVENT.RECEIVE_ACTIVE_ROOM_LIST,
        Array.from(activatedRoomList.entries())
      );
    });

    connectSocketMain(app, socket, activatedRoomList);
    camWindowSocket(app, socket, activatedRoomList);
    channelSocket(app, socket, activatedRoomList, typingUsersInEachRoom);
    codeEditorSocket(app, socket, activatedRoomList, typingUsersInEachRoom);
    whiteBoardSocket(app, socket);
    chatSocket(app, socket);
  });
}
