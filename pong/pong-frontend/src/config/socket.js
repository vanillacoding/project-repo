import socketIOClient from "socket.io-client";
import * as userActions from "../redux/reducers/user";
import * as roomMatchActions from "../redux/reducers/roomMatch";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const socket = socketIOClient(SERVER_URL);

export const subscribeSocket = (dispatch) => {
  socket.on("connectSuccess", (socketId) => {
    dispatch(userActions.updateUserId(socketId));
  });

  socket.on("completeMatch", (data) => {
    dispatch(roomMatchActions.updateRoomMatch(data));
  });

  socket.on("sendTextMessage", (data) => {
    dispatch(roomMatchActions.updateTextSending(data));
  });

  socket.on("partnerDisconnect", () => {
    socket.emit("partnerDisconnect");
  });

  socket.on("callUser", (data) => {
    dispatch(roomMatchActions.updateSignal(data));
  });
};
