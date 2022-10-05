const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');

const io = require('../configs/socket').getIo();

const { SOCKET_EVENT: EVENT, MESSAGE } = require('../configs/constants');
const { phrases } = require('./phrases.json');

const members = {};
const rooms = {};
const gameMembers = {};

const generateOrderList = list =>
  _.chain(list)
    .map(({ socketId }) => socketId)
    .shuffle()
    .value();

const isRoomFull = room => room.memberList.length >= room.maxNum;

io.on('connection', socket => {
  socket.on(EVENT.CREATE_ROOM, ({ roomData }, cb) => {
    const roomId = uuidv4();
    const newRoom = {
      ...roomData,
      _id: roomId,
      memberList: [],
      isLocked: false,
      filter: null,
    };

    rooms[roomId] = newRoom;

    socket.broadcast.emit(EVENT.ROOM_LIST, { rooms: _.values(rooms) });

    return cb({ roomId });
  });

  socket.on(EVENT.JOIN_ROOM, ({ roomId, user }, cb) => {
    if (!(roomId in rooms)) return cb(MESSAGE.ROOM.NOT_EXIST);

    if (rooms[roomId].isLocked) return cb(MESSAGE.ROOM.LOCKED);

    if (isRoomFull(rooms[roomId])) return cb(MESSAGE.ROOM.FULL);

    socket.join(roomId);

    const newMember = { ...user, roomId, socketId: socket.id };

    members[socket.id] = newMember;
    rooms[roomId].memberList.push(newMember);

    socket.to(roomId).emit(EVENT.MEMBER_JOINED, { newMember });
    socket.broadcast.emit(EVENT.ROOM_LIST, { rooms: _.values(rooms) });

    return cb({ room: rooms[roomId] });
  });

  socket.on(EVENT.LEAVE_ROOM, ({ roomId }) => {
    if (roomId in rooms) {
      socket.leave(roomId);
      delete members[socket.id];

      _.remove(rooms[roomId].memberList, member => member.socketId === socket.id);

      if (_.isEmpty(rooms[roomId].memberList)) {
        delete rooms[roomId];
      } else {
        socket.to(roomId).emit(EVENT.MEMBER_LEAVED, { socketId: socket.id });
      }

      socket.broadcast.emit(EVENT.ROOM_LIST, { rooms: _.values(rooms) });
      io.to(roomId).emit(EVENT.RESET_GAME);
    }
  });

  socket.on(EVENT.SENDING_SIGNAL, ({ signal, receiver }) => {
    const initiator = members[socket.id];
    const { socketId } = receiver;
    io.to(socketId).emit(EVENT.SENDING_SIGNAL, { initiator, signal });
  });

  socket.on(EVENT.RETURNING_SIGNAL, ({ signal, receiver }) => {
    const returner = members[socket.id];
    const { socketId } = receiver;
    io.to(socketId).emit(EVENT.RETURNING_SIGNAL, { returner, signal });
  });

  socket.on(EVENT.CHAT, ({ chat }) => {
    const { roomId } = members[socket.id];
    io.to(roomId).emit(EVENT.CHAT, { chat });
  });

  socket.on(EVENT.LOCKING_STATUS, ({ roomId, isLocked }) => {
    if (!roomId) return;

    rooms[roomId].isLocked = isLocked;
    io.to(roomId).emit(EVENT.LOCKING_STATUS, { isLocked });
  });

  socket.on(EVENT.VIDEO_FILTER, ({ roomId, isFilterOn, filter }) => {
    if (!roomId) return;

    rooms[roomId].filter = isFilterOn ? filter : null;
    io.to(roomId).emit(EVENT.VIDEO_FILTER, { isFilterOn, filter });
  });

  socket.on(EVENT.ROOM_LIST, () => {
    io.emit(EVENT.ROOM_LIST, { rooms: _.values(rooms) });
  });

  socket.on(EVENT.START_GAME, ({ title, roomId }) => {
    const room = rooms[roomId];
    const shouldMembers = room && room.memberList.length >= 2;

    if (!shouldMembers) return;

    if (title === 'speechBomb') {
      const explosionTime = _.random(30, 60) * 1000;
      gameMembers[roomId] = generateOrderList(room.memberList);

      io.to(roomId).emit(EVENT.INIT_GAME, {
        explosionTime,
        initialTurn: gameMembers[roomId][0],
        phrases,
      });
    }
  });

  socket.on(EVENT.PROCEED_GAME, status => {
    io.to(status.roomId).emit(EVENT.PROCEED_GAME, status);
  });

  socket.on(EVENT.TURN_CHANGE, status => {
    const { roomId } = status;
    const currentIndex = gameMembers[roomId].findIndex(
      socketId => socketId === socket.id,
    );
    const lastIndex = gameMembers[roomId].length - 1;
    let targetIndex = currentIndex + 1;

    while (!gameMembers[roomId][targetIndex]) {
      targetIndex = currentIndex >= lastIndex ? 0 : currentIndex + 1;
    }

    io.to(roomId).emit(EVENT.TURN_CHANGE, gameMembers[roomId][targetIndex]);
  });

  socket.on(EVENT.RESET_GAME, roomId => {
    io.to(roomId).emit(EVENT.RESET_GAME);
  });

  socket.on('disconnect', () => {
    if (!members[socket.id]) return;
    const leavedMember = members[socket.id];
    const { roomId } = leavedMember;

    if (!rooms[roomId]) return;

    delete members[socket.id];
    _.remove(rooms[roomId].memberList, member => member.socketId === socket.id);

    if (_.isEmpty(rooms[roomId].memberList)) {
      delete rooms[roomId];
    } else {
      socket.to(roomId).emit(EVENT.MEMBER_LEAVED, { socketId: socket.id });
    }

    socket.broadcast.emit(EVENT.ROOM_LIST, { rooms: _.values(rooms) });
    io.to(roomId).emit(EVENT.RESET_GAME);
  });
});
