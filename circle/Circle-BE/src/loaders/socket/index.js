const { Server } = require("socket.io");

const { go, chain } = require("../../utils/fp");
const {
  handleOnJoinRoom,
  handleOnCallerToCallee,
  handleOnCalleeToCaller,
  handleOnDisconnection,
} = require("./controller");

const connectSocket = chain((server) => {
  const io = new Server(server, {
    path: "/circle-io",
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    go(
      { socket, io },
      handleOnJoinRoom,
      handleOnCallerToCallee,
      handleOnCalleeToCaller,
      handleOnDisconnection,
    );
  });
});

module.exports = connectSocket;
