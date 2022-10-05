const SocketIO = require('socket.io');

module.exports = (server, app) => {
  const io = SocketIO(server, { path: '/socket.io' });

  // io.on('connection', (socket) => {
  //   console.log('SOCKET! 연결', socket);
  // });

  // io.on('reply', (socket) => {
  //   console.log("REPLY", socket);
  // });
};
