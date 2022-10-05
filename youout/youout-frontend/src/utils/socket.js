import io from 'socket.io-client';

const socket = io(process.env.NODE_ENV !== 'production' ? '' : 'https://api.youout.site');

//export for test
export const SOCKET = {
  userJoin: 'USER_JOIN',
  userLeave: 'USER_LEAVE',
  gameStart: 'GAME_START',
  gameUpdate: 'GAME_UPDATE',
  gameEnd: 'GAME_END',
  gameComplete: 'GAME_COMPLETE',
  getPlayingGames: 'GET_PLAYING_GAMES',
};

export const getPlayingGames = (data) => {
  socket.emit(SOCKET.getPlayingGames, data);
};

export const gameStart = (data) => {
  socket.emit(SOCKET.gameStart, data);
};

export const joinWaitingRoom = (data) => {
  socket.emit(SOCKET.userJoin, data);
};

export const updateData = (data) => {
  socket.emit(SOCKET.gameUpdate, data);
};

export const gameComplete = (data) => {
  socket.emit(SOCKET.gameComplete, data);
};

export const gameEnd = () => {
  socket.emit(SOCKET.gameEnd);
};

export const listenGameStart = (callback) => {
  socket.on(SOCKET.gameStart, (gameInfo) => {
    callback(gameInfo);
  });
};

export const listenGetGames = (callback) => {
  socket.on(SOCKET.getPlayingGames, (gameInfo) => {
    callback(gameInfo);
  });
};

export const listenJoinUser = (callback) => {
  socket.on(SOCKET.userJoin, (users) => {
    callback(users);
  });
};

export const listenUpdateData = (callback) => {
  socket.on(SOCKET.gameUpdate, (gameInfo) => {
    callback(gameInfo);
  });
};

export const offPlayingGames = () => {
  socket.off(SOCKET.getPlayingGames);
};

export const disconnectRoom = (data) => {
  socket.off(SOCKET.userJoin);
  socket.off(SOCKET.gameStart);
  socket.off(SOCKET.gameUpdate);
  socket.off(SOCKET.userLeave);
  socket.off(SOCKET.getPlayingGames);

  socket.emit(SOCKET.userLeave, data);
};
