const path = require("path");
const dotenv = require("dotenv");
dotenv.config({
  path: path.join(__dirname, ".env"),
});

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const server = require("http").Server(app);
const port = process.env.PORT || 5000;
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Pusher = require("pusher");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  },
});

const pusher = new Pusher({
  appId: process.env.PUSHER_APPID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "ap3",
  useTLS: true,
});

const authRouter = require("./routes/authRouter");
const gameRouter = require("./routes/gameRouter");
const gameController = require("./routes/controllers/gameController");

const mongoURL = process.env.MONGO_URL.replace(
  "<PASSWORD>",
  process.env.MONGO_PASSWORD
);

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connection success");
  })
  .catch((err) => {
    console.log(`ERROR: ${err.name}, ${err.message}`);
  });

const db = mongoose.connection;

db.once("open", () => {
  const roomCollection = db.collection("rooms");
  const changeRooms = roomCollection.watch();

  changeRooms.on("change", () => {
    pusher.trigger("rooms", "changed", {
      message: "room changed",
    });
  });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, playerData) => {
    socket.join(roomId);
    const socketSet = io.sockets.adapter.rooms.get(roomId);
    const socketList = [...socketSet];

    socket.broadcast
      .to(roomId)
      .emit("player-connected", { playerData, socketList });

    socket.on("input-player", (data) => {
      socket.broadcast.to(roomId).emit("input-other-player", data);
    });

    socket.on("start-game", () => {
      io.in(roomId).emit("start-game");
    });

    socket.on("close-modal", () => {
      socket.broadcast.to(roomId).emit("close-other-modal", playerData);
    });

    socket.on("leave-player", () => {
      socket.leave(roomId);
      if (!socket.adapter.rooms.has(roomId)) {
        gameController.deleteRoomSocket(roomId);
      }
      socket.broadcast.to(roomId).emit("player-disconnected", playerData);
    });

    socket.on("disconnect", () => {
      if (!socket.adapter.rooms.has(roomId)) {
        gameController.deleteRoomSocket(roomId);
      }
      socket.broadcast.to(roomId).emit("player-disconnected", playerData);
    });
  });

  socket.on("monsterescape-play", (roomId, userData) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("monsterescape-play", userData);
  });

  socket.on("monsterescape-start", (roomId) => {
    socket.join(roomId);
    io.in(roomId).emit("monsterescape-start");
  });

  socket.on("monsterescape-restart", (roomId) => {
    socket.join(roomId);
    io.in(roomId).emit("monsterescape-restart");
  });

  socket.on("monsterescape-finish", (roomId) => {
    socket.join(roomId);
    io.in(roomId).emit("monsterescape-finish");
  });
});

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/api/", authRouter);
app.use("/api/games", gameRouter);

app.use((req, res, next) => {
  const err = new Error("Not Found");

  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500).json({
    result: "error",
  });
});

server.listen(port, () => {
  console.log(`Listening to PORT: ${port}`);
});

module.exports = { server, db };
