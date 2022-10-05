module.exports = ({ app }) => {
  const io = require("socket.io")();

  const rooms = {};
  const socketToRoom = {};

  io.on("connection", (socket) => {
    socket.on("makeNewRoom", (roomId) => {
      if (rooms[roomId]) {
        socket.emit("error", { message: "Room is already exist" });
      }

      rooms[roomId] = {
        creatorId: socket.id,
        members: {},
        score: {
          rabbit: 0,
          carrot: 0,
        }
      };

      socket.emit("createRoomSuccess", { creatorId: socket.id, roomId });
    });

    socket.on("enterRoom", ({ roomId, username }) => {
      const room = rooms[roomId];

      if (!room) {
        socket.emit("error", { message: "Room is not exist" });

        return;
      }

      const currentPlayerCount = Object.keys(room?.members).length;

      if (currentPlayerCount >= 4) {
        socket.emit("error", { message: "Room is full" });

        return;
      }

      socket.join(roomId);

      socketToRoom[socket.id] = roomId;

      const userData = {
        userId: socket.id,
        isReady: false,
        role: "rabbit",
        username,
      };

      room.members[socket.id] = {
        ...userData,
        x: (currentPlayerCount + 1) * 20,
        y: (currentPlayerCount + 1) * 220,
      };

      io.in(roomId).emit("joinUserSuccess", {
        members: room.members,
        creatorId: room.creatorId,
        userId: socket.id,
        roomId,
        username,
      });
    });

    socket.on("changeReadyState", ({ username, role, isReady }) => {
      const roomId = socketToRoom[socket.id];
      const room = rooms[roomId];

      if (!room) {
        return;
      }

      const memberList = room.members;
      const targetPlayer = memberList[socket.id];

      memberList[socket.id] = {
        ...targetPlayer,
        username,
        role,
        isReady,
      };

      const isAllReady = Object.values(memberList).every(
        (member) => member.isReady === true
      );

      const memberCount = Object.values(memberList).length;

      io.in(roomId).emit("changeSomeUserState", {
        players: memberList,
      });

      socket.emit("changeMyState", { username, role, isReady });

      if (isAllReady && memberCount > 1) {
        io.in(roomId).emit("allUsersReady");
      }
    });
    
    socket.on("startGame", () => {
      const roomId = socketToRoom[socket.id];
      const room = rooms[roomId]

      if (!room) {
        return;
      }

      const memberList = room.members;

      Object.keys(memberList).map((member) => {
        memberList[member].isReady = false;
      });

      socket.emit("changeSomeUserState", { players: memberList });
    });

    socket.on("initGame", () => {
      const roomId = socketToRoom[socket.id];
      const members = { ...rooms[roomId]?.members };

      delete members[socket.id];

      socket.emit("loadPlayers", { otherPlayers: members, player: rooms[roomId]?.members[socket.id] });
    });

    socket.on("movePlayer", ({ x, y, anims }) => {
      const roomId = socketToRoom[socket.id];

      socket.to(roomId).emit("somePlayerMove", { x, y, id: socket.id, anims });
    });

    socket.on("userGetCoin", ({ point, role }) => {
      const roomId = socketToRoom[socket.id];
      const room = rooms[roomId];

      if (!room) {
        return;
      }

      const score = room.score;

      score[role] += point;

      io.in(roomId).emit("updateCount", { score, id: socket.id });
    });

    socket.on("gameOver", ({ role }) => {
      const roomId = socketToRoom[socket.id];
      const room = rooms[roomId];

      if (!room) {
        return;
      }

      const score = room.score;
      const otherRole = role === "rabbit" ? "carrot" : "rabbit";

      if (score[role] > score[otherRole]) {
        socket.emit("getGameResult", { isWin: true });

        return;
      }

      socket.emit("getGameResult", { isWin: false });
    });

    socket.on("leaveRoom", () => {
      const roomId = socketToRoom[socket.id];
      const room = rooms[roomId];

      if (!room) {
        return;
      }

      delete room.members[socket.id];

      if (Object.keys(room.members).length === 0) {
        delete rooms[roomId];
      }

      delete socketToRoom[socket.id];

      io.in(roomId).emit("leaveSomeUser", { id: socket.id });
    });

    socket.on("disconnect", () => {
      const roomId = socketToRoom[socket.id];
      const room = rooms[roomId];

      if (!room) {
        return;
      }

      delete room.members[socket.id];

      if (Object.keys(room.members).length === 0) {
        delete rooms[roomId];
      }

      delete socketToRoom[socket.id];

      io.in(roomId).emit("leaveSomeUser", { id: socket.id });
    });
  });

  app.io = io;
};
