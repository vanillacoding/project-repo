const EVENT =  require("../constants/socketEvents");

module.exports = function codeEditorSocket(
  app,
  socket,
  activatedRoomList,
  typingUsersInEachRoom
) {
  socket.on(EVENT.START_TYPING, (data) => {
    const {
      typingUser: { name, email },
      value,
      roomId
    } = data;
    const typingUsers = typingUsersInEachRoom.get(roomId);
    const targetRoomInfo = activatedRoomList.get(roomId);

    targetRoomInfo.contents = value;
    typingUsers.set(email, name);

    const typingInfo = {
      text: value,
      typingUsers: Array.from(typingUsers.values())
    };

    app.io.to(roomId).emit(EVENT.RECEIVE_TEXT, typingInfo);
  });

  socket.on(EVENT.STOP_TYPING, (stopTypingUserInfo) => {
    if (!stopTypingUserInfo) return;

    const {
      typingUser: { email },
      roomId
    } = stopTypingUserInfo;
    const typingUsers = typingUsersInEachRoom.get(roomId);

    typingUsers && typingUsers.delete(email);

    app.io.to(roomId).emit(
      EVENT.RECEIVE_FILTERED_USER_LIST,
      typingUsers
    );
  });

  socket.on(EVENT.SET_CONTENTS, (contentsInfo) => {
    const { value, roomId } = contentsInfo;
    const targetRoomInfo = activatedRoomList.get(roomId);

    targetRoomInfo.contents = value;

    app.io.to(roomId).emit(EVENT.RECEIVE_DOCUMENT_TEXT, value);
  });

  socket.on(EVENT.SET_INITIAL_TEXT, (roomId) => {
    const roomInfo = activatedRoomList.get(roomId);

    if (!roomInfo) return;
    app.io.to(roomId).emit(RECEIVE_INITIAL_TEXT, roomInfo.contents);
  });
}
