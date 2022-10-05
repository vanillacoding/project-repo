import io from 'socket.io-client';

export const socket = io.connect(process.env.REACT_APP_SERVER_URL);

export const socketApi = {
  joinRoom: (user, x, y, roomId) => {
    socket.emit('joinRoom', {
      name: user.name,
      nickname: user.nickname,
      email: user.email,
      characterType: user.character,
      roomId,
      coordinates: {
        x,
        y,
        vx: 0,
        vy: 0,
      },
    });
  },
  changeCoordinates: (player) => {
    socket.emit('changeCoordinates', {
      x: player.sprite.x,
      y: player.sprite.y,
      vx: player.sprite.vx,
      vy: player.sprite.vy,
    });
  },
  setVideoChatSpace: (space) => {
    socket.emit('setVideoChatSpace', space);
  },
  joinVideoChat: (videoChatId) => {
    socket.emit('join videoChat', videoChatId);
  },
  sendingVideoChatSignal: (payload) => {
    socket.emit('sending signal', payload);
  },
  returningSignal: (payload) => {
    socket.emit('returning signal', payload);
  },
  leaveVideoChat: () => {
    socket.emit('leave videoChat');
  },
  sendMessage: (message) => {
    socket.emit('sendMessage', message);
  },
};
