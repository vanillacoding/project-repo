/* eslint-disable no-console */
const connectSocketIo = (app) => {
  app.io.on("connection", (socket) => {
    console.log("connected");

    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  });
};

module.exports = connectSocketIo;
