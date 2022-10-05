require('dotenv').config();
const http = require('http');
const socketIO = require('socket.io');
const app = require('express')();
const helmet = require('helmet');
const server = http.createServer(app);

const CLIENT_URL = process.env.MY_CLIENT_URL;

app.use('/', (req, res, next) => {
  res.json({ status: true });
});

app.use(helmet());

const io = socketIO(server, {
  cors: {
    origin: CLIENT_URL,
  },
});

const connections = {};
const users = [];

io.on('connection', (socket) => {
  socket.on('join', ({ roomId, userProfile }) => {
    const { displayName } = userProfile;

    socket.join(roomId);
    if (!connections[roomId]) {
      connections[roomId] = new Set();
    }
    connections[roomId].add(displayName);

    const userCount = connections[roomId].size;
    socket.to(roomId).emit('user.count.update', userCount);
  });

  socket.on('game.ready', ({ roomId }) => {
    socket.to(roomId).emit('game.start');
  });

  socket.on('game.add.command', ({ roomId, message }) => {
    socket.to(roomId).emit('game.get.command', message);
  });

  socket.on('game.turn.over', ({ roomId, currentTurn }) => {
    socket.to(roomId).emit('game.turn.start', currentTurn);
  });

  socket.on('game.exit', ({ roomId, userProfile }) => {
    const { displayName } = userProfile;
    connections[roomId].delete(displayName);

    if (connections[roomId].length === 0) {
      delete connections[roomId];
    }

    console.log(connections);
    socket.disconnect();
  });
});

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || '5000');

server.listen(port, () => {
  console.log(`listen on port ${port}`);
});
