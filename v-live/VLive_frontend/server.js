const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === '/') {
      app.render(req, res, '/', query);
    } else if (pathname === '/channel') {
      app.render(req, res, '/channel', query);
    } else if (pathname === '/history') {
      app.render(req, res, '/history', query);
    } else if (pathname === '/main') {
      app.render(req, res, '/history', query);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(8080, (err) => {
    if (err) throw err;
    console.log('> Server started on http://localhost:8080');
  });

  const io = require('socket.io')(server);

  const { EVENTS } = require('./src/constants/socketEvent');

  const users = {};
  const socketToChannel = {};
  const readyPlayers = {};

  io.on('connection', (socket) => {
    console.log('socket connected...');

    socket.on(EVENTS.CREATE_CHANNEL, (channel) => {
      socket.broadcast.emit(EVENTS.LISTEN_CREATE_CHANNEL, channel);
    });

    socket.on(EVENTS.ENTER_CHANNEL, (user) => {
      const { channelId } = user;

      if (users[channelId]) {
        users[channelId].push(socket.id);
      } else {
        users[channelId] = [socket.id];
      }

      socketToChannel[socket.id] = channelId;

      const usersInThisChannel = users[channelId].filter(
        (id) => id !== socket.id,
      );

      socket.emit(EVENTS.ALL_USER, usersInThisChannel);

      socket.join(channelId);

      io.emit(EVENTS.LISTEN_ENTER_CHANNEL, user);
    });

    socket.on(EVENTS.EXIT_CHANNEL, ({ channelId, userId }) => {
      socket.leave(channelId);

      const newUserInThisChannel = users[channelId].filter(
        (id) => id !== userId,
      );

      users.channelId = newUserInThisChannel;

      io.emit(EVENTS.LISTEN_EXIT_CHANNEL, {
        channelId,
        userId,
      });
    });

    socket.on(EVENTS.SENDING_SIGNAL, ({ userToSignal, callerId, signal }) => {
      io.to(userToSignal).emit(EVENTS.USER_JOINED, {
        signal: signal,
        callerId: callerId,
      });
    });

    socket.on(EVENTS.RETURNING_SIGNAL, ({ callerId, signal }) => {
      io.to(callerId).emit(EVENTS.RECEIVING_RETURNED_SIGNAL, {
        signal: signal,
        id: socket.id,
      });
    });

    socket.on(EVENTS.NEW_CHAT, ({ channelId, newChat }) => {
      socket.join(channelId);
      io.to(channelId).emit(EVENTS.LISTEN_NEW_CHAT, { channelId, newChat });
    });

    socket.on(EVENTS.END_CHANNEL, (id) => {
      delete users[id];
      socket.broadcast.emit(EVENTS.LISTEN_END_CHANNEL, id);
    });

    socket.on(
      EVENTS.PLAYER_READY,
      ({ channelId, userId, characterId, episode }) => {
        io.to(channelId).emit(EVENTS.LISTEN_PLAYER_READY, {
          userId,
          characterId,
        });

        if (!readyPlayers[channelId]) {
          readyPlayers[channelId] = [characterId];
        } else {
          readyPlayers[channelId].push(characterId);
        }

        if (readyPlayers[channelId].length === episode.characters.length) {
          io.to(channelId).emit(EVENTS.LISTEN_GAME_START, 'start');

          delete readyPlayers[channelId];
        }
      },
    );

    socket.on(EVENTS.READY_TO_START, (channelId) => {
      io.to(channelId).emit(EVENTS.LISTEN_READY_TO_START, channelId);
    });
  });
});
