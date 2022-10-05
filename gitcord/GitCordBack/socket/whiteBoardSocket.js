const EVENT = require("../constants/socketEvents");

module.exports = function whiteBoard(app, socket) {
  socket.on(EVENT.SEND_DRAW_START, (roomId, pos) => {
    app.io.to(roomId).emit(EVENT.DRAW_START, pos).broadcast;
  });

  socket.on(EVENT.SEND_DRAW, (roomId, pos) => {
    app.io.to(roomId).emit(EVENT.DRAWING, pos).broadcast;
  });

  socket.on(EVENT.DELETE_CANVAS, (roomId) => {
    app.io.to(roomId).emit(EVENT.CLEAR_CANVAS);
  });

  socket.on(EVENT.CHANGE_COLOR, (roomId, color) => {
    app.io.to(roomId).emit(EVENT.RECEIVE_COLOR, color);
  });
}
