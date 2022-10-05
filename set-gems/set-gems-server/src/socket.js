const { Server } = require("socket.io");

const { validateNickname, createRandomNickname } = require("./helper/nickname");
const {
  KNOCK, FULL_ROOM, INVALID_NICKNAME, JOIN_ROOM,
  NEW_PLAYER, JOINED, SIGNAL, CHAT, READY, START,
  SET_CARDS, SELECT_CARD, EXIT_ROOM, DISCONNECTING, NEW_LEADER, PLAYER_LEFT,
  NEW_SELECTOR, START_SELECT, COUNTDOWN, SELECT_SUCCESS,
  ALL_READY, GAME_OVER, LET_JOIN,
} = require("./constants/socketEvents");

function createWsServer(httpServer) {
  const wsServer = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });

  wsServer.on("connection", (socket) => {
    socket.on(KNOCK, (roomName, nickname, done) => {
      const maxRoomMemberCounts = 4;
      const roomMemberIds = socket.adapter.rooms.get(roomName);
      const roomMemberNicknames = roomMemberIds ? [...roomMemberIds]
        .map((socketId) => {
          return wsServer.sockets.sockets.get(socketId).nickname;
        }) : [];

      if (roomMemberNicknames.length === maxRoomMemberCounts) {
        return socket.emit(FULL_ROOM);
      }

      if (nickname) {
        const validation = validateNickname(nickname, roomMemberNicknames);

        if (validation.result) {
          socket.nickname = nickname;
        } else {
          return socket.emit(INVALID_NICKNAME, validation.message);
        }

      } else {
        socket.nickname = createRandomNickname(roomMemberNicknames);
      }

      socket.join(roomName);

      socket.isReady = false;
      socket.point = 0;

      done(socket.nickname);
    });

    socket.on(JOIN_ROOM, (roomName) => {
      const roomMemberIds = socket.adapter.rooms.get(roomName);
      const roomMembers = roomMemberIds ? [...roomMemberIds]
        .filter((socketId) => socketId !== socket.id)
        .map((socketId) => {
          const memberSocket = wsServer.sockets.sockets.get(socketId);
          const {
            nickname,
            point,
            isReady,
            isSelector,
            isLeader,
          } = memberSocket;

          return {
            id: socketId,
            nickname,
            point,
            isReady,
            isSelector,
            isLeader,
          };
        }) : [];

      if (roomMembers.length) {
        const newPlayer = {
          id: socket.id,
          nickname: socket.nickname,
          isReady: false,
        };

        socket.to(roomName).emit(NEW_PLAYER, newPlayer);
      } else {
        socket.isLeader = true;
      }

      socket.emit(JOINED, roomMembers);
    });

    socket.on(SIGNAL, (data, playerId) => {
      socket.to(playerId).emit(SIGNAL, data, socket.id);
    });

    socket.on(CHAT, (roomName, message) => {
      socket.to(roomName).emit(CHAT, `${socket.nickname}: ${message}`);
    });

    socket.on(READY, (isReady, roomName) => {
      const roomMemberIds = socket.adapter.rooms.get(roomName);
      const isAllReady = [...roomMemberIds].filter((id) => id !== socket.id)
        .every((socketId) => {
          const memberSocket = wsServer.sockets.sockets.get(socketId);
          return memberSocket.isReady || memberSocket.isLeader;
        });

      socket.isReady = isReady;
      wsServer.to(roomName).emit(READY, isReady, socket.id);

      if (isAllReady) {
        socket.to(roomName).emit(ALL_READY, isReady);
      }
    });

    socket.on(START, (roomName) => {
      const roomMemberIds = socket.adapter.rooms.get(roomName);
      [...roomMemberIds].forEach((socketId) => {
        const memberSocket = wsServer.sockets.sockets.get(socketId);
        memberSocket.isReady = false;
      });

      wsServer.to(roomName).emit(START);
    });

    let selectTimer = 0;

    socket.on(START_SELECT, (roomName) => {
      let count = 5;
      const countTerm = 1000;

      socket.isSelector = true;
      wsServer.to(roomName).emit(NEW_SELECTOR, socket.id);
      wsServer.to(roomName).emit(COUNTDOWN, count);

      if (selectTimer) {
        selectTimer = clearInterval(selectTimer);
      }

      selectTimer = setInterval(() => {
        count--;
        wsServer.to(roomName).emit(COUNTDOWN, count);

        if (count === 0) {
          socket.isSelector = false;
          return selectTimer = clearInterval(selectTimer);
        }
      }, countTerm);
    });

    socket.on(SELECT_SUCCESS, (roomName, point) => {
      socket.isSelector = false;
      socket.point = point;

      selectTimer = clearInterval(selectTimer);
      wsServer.to(roomName).emit(SELECT_SUCCESS, point, socket.id);
    });

    socket.on(SET_CARDS, (roomName, openedCards, remainingCards) => {
      socket.to(roomName).emit(SET_CARDS, openedCards, remainingCards);
    });

    socket.on(SELECT_CARD, (roomName, cardIndex) => {
      wsServer.to(roomName).emit(SELECT_CARD, cardIndex);
    });

    socket.on(LET_JOIN, (playerId, openedCards, remainingCards) => {
      wsServer.to(playerId).emit(START);
      wsServer.to(playerId).emit(SET_CARDS, openedCards, remainingCards);
    });

    socket.on(GAME_OVER, (roomName) => {
      const roomMemberIds = socket.adapter.rooms.get(roomName);
      const result = [...roomMemberIds].map((socketId) => {
        const memberSocket = wsServer.sockets.sockets.get(socketId);
        const { nickname, point } = memberSocket;
        memberSocket.point = 0;

        return { nickname, point };
      });

      wsServer.to(roomName).emit(GAME_OVER, result);
    });

    socket.on(EXIT_ROOM, (roomName) => {
      handlePlayerLeft(roomName, socket);
    });

    socket.on(DISCONNECTING, () => {
      socket.rooms.forEach((roomName) => {
        handlePlayerLeft(roomName, socket);
      });
    });

    function handlePlayerLeft(roomName, socket) {
      socket.leave(roomName);
      const roomMemberIds = socket.adapter.rooms.get(roomName);

      if (socket.isLeader && roomMemberIds) {
        socket.isLeader = false;

        const newLeaderId = [...roomMemberIds][0];
        const newLeader = wsServer.sockets.sockets.get(newLeaderId);
        newLeader.isReady = false;
        newLeader.isLeader = true;

        wsServer.to(roomName).emit(NEW_LEADER, newLeaderId);
      }

      wsServer.to(roomName).emit(PLAYER_LEFT, socket.id);

      if (selectTimer) {
        selectTimer = clearInterval(selectTimer);
        wsServer.to(roomName).emit(COUNTDOWN, 0);
      }
    }
  });

  return wsServer;
}

module.exports = createWsServer;
