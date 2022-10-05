const EVENT = require("../constants/socketEvents");

module.exports = function camWindowSocket(
  app,
  socket,
  activatedRoomList
) {
  socket.on(EVENT.SENDING_SIGNAL, (payload) => {
    app.io.to(payload.userToSignal).emit(
      EVENT.USER_JOINED,
      {
        signal: payload.signal,
        isOwner: payload.isOwner,
        callerID: payload.callerID
      }
    );
  });

  socket.on(EVENT.RETURNING_SIGNAL, (payload) => {
    app.io.to(payload.callerID).emit(
      EVENT.RECEIVE_RETURNED_SIGNAL,
      {
        signal: payload.signal,
        id: socket.id
      }
    );
  });

  socket.on(EVENT.VIDEO_TOGGLE, (roomId, user) => {
    const { participants } = activatedRoomList.get(roomId);

    participants.forEach(participant => {
      if (participant.email === user.email) {
        participant.isStreaming = !participant.isStreaming;
      }
    });

    app.io.to(roomId).emit(
      EVENT.RECEIVE_PARTICIPANTS,
      activatedRoomList.get(roomId)
    );
  });
}
