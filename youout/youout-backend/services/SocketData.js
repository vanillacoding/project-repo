const { keys, cloneDeep } = require('lodash');
const { ObjectId } = require('mongoose').Types;

class SocketData {
  constructor() {
    this._games = {};
    this._sockets = {};
  }

  validateObjectId(id) {
    if (!ObjectId.isValid(id)) {
      console.error(`🔥 Error fired => ${id} is not a ObjectId`);
    }
  }

  update({ target, data }) {
    const clone = cloneDeep(target);

    keys(data).forEach((key) => {
      const value = data[key];
      clone[key] = value;
    });

    return clone;
  }

  initGame({ gameId }) {
    this.validateObjectId(gameId);

    this._games[gameId] = {
      _id: gameId,
      users: [],
      isPlaying: false,
      gameInfo: null,
    };

    return this;
  }

  getGames() {
    return keys(this._games).map((key) => {
      return this._games[key];
    });
  }

  getGame({ gameId }) {
    this.validateObjectId(gameId);

    return cloneDeep(this._games[gameId]);
  }

  updateGame({ gameId, data }) {
    this.validateObjectId(gameId);

    const target = this._games[gameId];
    const updated = this.update({ target, data });

    return this._games[gameId] = updated;
  }

  deleteGame({ gameId }) {
    this.validateObjectId(gameId);

    delete this._games[gameId];
  }

  initSocket({ socketId }) {
    this._sockets[socketId] = { id: socketId };
    return this;
  }

  getSocket({ socketId }) {
    return cloneDeep(this._sockets[socketId]);
  }

  updateSocket({ socketId, data }) {
    const target = this._sockets[socketId];
    const updated = this.update({ target, data });

    return this._sockets[socketId] = updated;
  }

  deleteSocket({ socketId }) {
    delete this._sockets[socketId];
  }
};

module.exports = SocketData;
