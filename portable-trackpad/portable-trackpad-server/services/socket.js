const app = require("../app");

app.io = require("socket.io")({
  cors: {
    origin: "*",
  },
});

app.io.on("connection", (socket) => {
  socket.on("drawing", (data) => {
    socket.broadcast.emit("drawing", data);
  });

  socket.on("figure", (data) => {
    socket.broadcast.emit("figure", data);
  });

  socket.on("drawingHistory", (data) => {
    socket.broadcast.emit("drawingHistory", data);
  });

  socket.on("figureHistory", (data) => {
    socket.broadcast.emit("figureHistory", data);
  });
});

module.exports = app.io;
