const { corsOptions } = require('.');

let io;

module.exports = {
  init: server => {
    io = require('socket.io')(server, { cors: corsOptions });
    return io;
  },
  getIo: () => {
    if (!io) throw new Error('socket.io is not initalized');
    return io;
  },
};
