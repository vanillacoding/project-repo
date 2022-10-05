import io from "socket.io-client";

export const socket = io(process.env.REACT_APP_USER_SERVER);

export const joinRoom = (roomID) => {
  socket.emit("join room", roomID);
};

export const leaveRoom = (roomID) => {
  socket.emit("leave room", roomID);
};

export const sendChat = (chat) => {
  socket.emit("chat", chat);
};

export const subscribeUsersChat = (chatList, updateChatList) => {
  socket.on("other user chat", (chat) => {
    updateChatList([...chatList, chat]);
  });
};

export const cancelSubscribeUsersChat = () => {
  socket.off("other user chat");
};

export const joinStreaming = (viewerID, roomID) => {
  socket.emit("join streaming", { viewerID, roomID });
};
