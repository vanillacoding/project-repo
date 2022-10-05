import socketIO from 'socket.io';

export default (server) => {
  const io = socketIO(server);
  const roomById = {};
  const roomByName = {};
  const socketById = {};
  const userIdById = {};

  io.listen(3030);
  io.on('connection', (socket) => {
    const { id } = socket;

    socket.on('join team', (userId, teamName) => {
      let room = roomByName[teamName];

      if (room) {
        room.push(id);
      } else {
        room = [id];
        roomByName[teamName] = room;
      }

      socketById[id] = socket;
      userIdById[id] = userId;
      roomById[id] = teamName;

      socket.join(teamName);
      const participants = room.map(id => userIdById[id]);

      io.in(teamName).emit('join team', participants);
    });

    socket.on('add thread', () => {
      const roomName = roomById[id];

      io.in(roomName).emit('add thread');
    });

    socket.on('leave team', leaveTeam);
    socket.on('disconnect', leaveTeam);

    function leaveTeam() {
      const roomName = roomById[id];

      if (roomName) {
        const room = roomByName[roomName];
        const index = room.indexOf(id);

        room.splice(index, 1);
        delete socketById[id];
        delete userIdById[id];
        delete roomById[id];

        const participants = room.map(id => userIdById[id]);

        socket.to(roomName).broadcast.emit('leave team', participants);
        socket.leave(roomName);
      }
    }
  });
}
