const { findById } = require('./game.service');
const { createHistory } = require('./history.service');
const SocketData = require('./SocketData');

const SOCKET = {
  userJoin: 'USER_JOIN',
  userLeave: 'USER_LEAVE',
  gameStart: 'GAME_START',
  gameUpdate: 'GAME_UPDATE',
  getPlayingGames: 'GET_PLAYING_GAMES',
  gameComplete: 'GAME_COMPLETE',
};

module.exports = (server) => {
  const io = require('socket.io').listen(server, {
    cors: {
      origin: process.env.ORIGIN_URI_PROD,
      optionsSuccessStatus: 200,
    },
  });
  const socketData = new SocketData();

  io.on('connection', (socket) => {
    socketData.initSocket({ socketId: socket.id });

    socket.on(SOCKET.userJoin, ({ gameId, userId, username, image, color }) => {
      try {
        socketData.validateObjectId(userId);
        socketData.validateObjectId(gameId);

        if (!socketData.getGame({ gameId })) {
          socketData.initGame({ gameId });
        }

        const socketId = socket.id;
        const game = socketData.getGame({ gameId });
        const targetSocket = socketData.getSocket({ socketId });

        socket.join(gameId);
        targetSocket.gameId = gameId;
        game.users.push({
          _id: userId,
          socketId,
          username,
          image,
          color,
          gameIndex: -1
        });

        socketData.updateSocket({ socketId, data: targetSocket });
        socketData.updateGame({ gameId, data: game});

        io.to(gameId).emit(SOCKET.userJoin, game);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on(SOCKET.userLeave, ({ gameId }) => {
      try {
        socketData.validateObjectId(gameId);

        const socketId = socket.id;
        const game = socketData.getGame({ gameId });
        const targetSocket = socketData.getSocket({ socketId });

        if (!game) return;

        socket.leave(gameId);
        targetSocket.gameId = null;

        if (game.isPlaying) {
          game.users = game.users.map((user) => {
            if (user.socketId === socketId) {
              user.isFinished = true;
              return user;
            } else {
              return user;
            }
          });

          socketData.updateSocket({ socketId, data: targetSocket });
          socketData.updateGame({ gameId, data: game });

          const isFinishedAll = game.users.every((user) => user.isFinished);
          const isCleared = game.users.some((user) => user.clearTime);

          if (isFinishedAll && isCleared) {
            createHistory({ users: game.users, gameId });
            socketData.deleteGame({ gameId });
          } else if (isFinishedAll) {
            socketData.deleteGame({ gameId });
          } else {
            io.to(gameId).emit(SOCKET.userJoin, game);
          }
        } else {
          game.users = game.users.filter((user) => (
            user.socketId !== socketId
          ));

          socketData.updateSocket({ socketId, data: targetSocket });
          socketData.updateGame({ gameId, data: game });

          if (game.users.length) {
            io.to(gameId).emit(SOCKET.userJoin, game);
          } else {
            socketData.deleteGame({ gameId });
          }
        }
      } catch (err) {
        console.error(err);
      }
    });

    socket.on('disconnect', () => {
      try {
        const socketId = socket.id;
        const { gameId } = socketData.getSocket({ socketId });
        const game = gameId && socketData.getGame({ gameId });

        if (!game) return;

        if (gameId) {
          socket.leave(gameId);

          game.users = game.users.filter((user) => (
            user.socketId !== socketId
          ));

          socketData.updateGame({ gameId, data: game });

          if (game.users.length) {
            io.to(gameId).emit(SOCKET.userJoin, game);
            return;
          }

          if (game.isPlaying) {
            createHistory({ users: game.users, gameId });
          }

          socketData.deleteGame({ gameId });
        }

        delete socketData.deleteSocket({ socketId });
      } catch (err) {
        console.error(err);
      }
    });

    socket.on(SOCKET.gameStart, async ({ gameId }) => {
      try {
        socketData.validateObjectId(gameId);

        const game = socketData.getGame({ gameId });

        game.gameInfo = await findById({ gameId });
        game.isPlaying = true;
        socketData.updateGame({ gameId, data: game });

        io.to(gameId).emit(SOCKET.gameStart, game);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on(SOCKET.gameUpdate, ({ gameId, userId }) => {
      try {
        socketData.validateObjectId(gameId);
        socketData.validateObjectId(userId);

        const game = socketData.getGame({ gameId });

        game.users.map((user) => {
          if (user._id === userId) {
            user.gameIndex += 1;
          }
          return user;
        });

        socketData.updateGame({ gameId, data: game });
        io.to(gameId).emit(SOCKET.gameUpdate, {
          game,
          userId,
        });
      } catch (err) {
        console.error(err);
      }
    });

    socket.on(SOCKET.gameEnd, ({ gameId }) => {
      try {
        const game = socketData.getGame({ gameId });
        createHistory({ users: game.users, gameId });
        socketData.deleteGame({ gameId });
      } catch (err) {
        console.error(err);
      }
    });

    socket.on(SOCKET.getPlayingGames, () => {
      try {
        io.to(socket.id).emit(SOCKET.getPlayingGames, socketData.getGames());
      } catch (err) {
        console.error(err);
      }
    });

    socket.on(SOCKET.gameComplete, ({ gameId, userId, clearTime }) => {
      try {
        const game = socketData.getGame({ gameId });

        if (!game) return;

        game.users = game.users.map((user) => {
          if (user._id === userId) {
            user.clearTime = clearTime;
          }

          return user;
        });

        socketData.updateGame({ gameId, data: game });
        io.to(gameId).emit(SOCKET.gameUpdate, { game, userId });
      } catch (err) {
        console.error(err);
      }
    });
  });
};
