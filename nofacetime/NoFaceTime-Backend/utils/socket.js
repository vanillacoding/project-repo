module.exports = {
  startSocket: (io) => io.on('connection', socket => {
    console.log('we have a new connection!!');

    socket.on('join-room', (roomId, userId) => {
      console.log(roomId, userId);
      socket.to(roomId).broadcast.emit('user-connected', userId) //send it to everyone "else" in the room

    });

    // socket.on('join', ({ name, room }, callback) => {
    //   console.log(name);
    //   console.log(room);

    //   callback();//error handling
    // });

    socket.on('disconnect', () => {//specific socket that joined
      console.log('user left');
    });
  })
}
