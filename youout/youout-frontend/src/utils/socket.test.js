import {
  SOCKET,
  getPlayingGames,
  gameStart,
  joinWaitingRoom,
  updateData,
  gameComplete,
  gameEnd,
  listenGameStart,
  listenGetGames,
  listenJoinUser,
  listenUpdateData,
  disconnectRoom,
} from './socket';

jest.mock('socket.io-client', () => jest.fn(() => {
  return {
    emit: global.EMIT,
    on: global.ON,
    off: global.OFF,
  };
}));

describe('socket test', () => {
  it('getPlayingGames test', () => {
    getPlayingGames();
    expect(global.EMIT.mock.calls[0][0]).toEqual(SOCKET.getPlayingGames);
  });

  it('gameStart test', () => {
    gameStart();
    expect(global.EMIT.mock.calls[0][0]).toEqual(SOCKET.gameStart);
  });

  it('joinWaitingRoom test', () => {
    joinWaitingRoom();
    expect(global.EMIT.mock.calls[0][0]).toEqual(SOCKET.userJoin);
  });

  it('updateData test', () => {
    updateData();
    expect(global.EMIT.mock.calls[0][0]).toEqual(SOCKET.gameUpdate);
  });

  it('gameComplete test', () => {
    gameComplete();
    expect(global.EMIT.mock.calls[0][0]).toEqual(SOCKET.gameComplete);
  });

  it('gameEnd test', () => {
    gameEnd();
    expect(global.EMIT.mock.calls[0][0]).toEqual(SOCKET.gameEnd);
  });

  it('listenGameStart test', () => {
    listenGameStart();
    expect(global.ON.mock.calls[0][0]).toEqual(SOCKET.gameStart);
  });

  it('listenGetGames test', () => {
    listenGetGames();
    expect(global.ON.mock.calls[0][0]).toEqual(SOCKET.getPlayingGames);
  });

  it('listenJoinUser test', () => {
    listenJoinUser();
    expect(global.ON.mock.calls[0][0]).toEqual(SOCKET.userJoin);
  });

  it('listenUpdateData test', () => {
    listenUpdateData();
    expect(global.ON.mock.calls[0][0]).toEqual(SOCKET.gameUpdate);
  });

  it('disconnectRoom test', () => {
    disconnectRoom();

    expect(global.OFF.mock.calls[0][0]).toEqual(SOCKET.userJoin);
    expect(global.OFF.mock.calls[1][0]).toEqual(SOCKET.gameStart);
    expect(global.OFF.mock.calls[2][0]).toEqual(SOCKET.gameUpdate);
    expect(global.OFF.mock.calls[3][0]).toEqual(SOCKET.userLeave);
    expect(global.OFF.mock.calls[4][0]).toEqual(SOCKET.getPlayingGames);
    expect(global.EMIT.mock.calls[0][0]).toEqual(SOCKET.userLeave);
  });
});
