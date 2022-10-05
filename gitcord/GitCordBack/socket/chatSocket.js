const EVENT = require("../constants/socketEvents");

module.exports = function chatSocket(app, socket) {
  socket.on(EVENT.SEND_CHAT, (chatLog) => {
    const { roomId } = chatLog;

    app.io.to(roomId).emit(EVENT.RECEIVE_CHAT, chatLog);
  });
}
