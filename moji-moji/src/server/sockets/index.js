const broadcasts = {
  // broadcastId: {
  //   broadcastId,
  //   originUserId,
  //   viewers: []
  // }
};

const users = {
  // userId,
  // broadcastId,
  // isBroadcastOrigin,
  // watcherId,
  // playerId
};

module.exports = io => {
  io.on('connection', socket => {
    socket.on('create', broadcast => {
      try {
        console.log('create', broadcast);
        const broadcastId = broadcast.broadcastId;
        const userId = broadcast.userId;

        if (broadcasts[broadcastId]) {
          return io.to(`${socket.id}`).emit('create', {
            result: 'exist'
          });
        }

        broadcasts[broadcastId] = {
          broadcastId,
          originUserId: userId,
          viewers: []
        };

        if (!users[broadcast.userId]) {
          socket.userId = userId;
          socket.isActiveUser = true;

          users[broadcast.userId] = {
            userId,
            broadcastId,
            isBroadcastOrigin: true,
            socketId: socket.id
          };
        }

        return io.to(`${socket.id}`).emit('create', {
          result: 'success',
          broadcastId: broadcast.broadcastId
        });
      } catch (err) {
        console.error(err);
      }
    });

    socket.on('join', broadcast => {
      try {
        console.log('join', broadcast);
        const broadcastId = broadcast.broadcastId;
        const userId = broadcast.userId;
        const originUserId = broadcasts[broadcastId].originUserId;

        if (!broadcasts[broadcastId]) {
          return io.to(`${socket.id}`).emit('join', {
            result: 'non exist'
          });
        }

        if (!users[userId]) {
          socket.userId = userId;
          socket.isActiveUser = true;

          users[userId] = {
            userId,
            broadcastId,
            isBroadcastOrigin: false,
            socketId: socket.id
          };
        }

        if (!broadcasts[broadcastId].viewers.length) {
          return io.to(`${socket.id}`).emit('join', {
            result: 'success',
            broadcastId,
            targetUserId: originUserId
          });
        }

        const targetUserId = broadcasts[broadcastId].viewers.slice(-1)[0];

        io.to(`${socket.id}`).emit('join', {
          result: 'success',
          broadcastId,
          targetUserId
        });
      } catch (err) {
        console.error(err);
      }
    });

    socket.on('offer', broadcast => {
      try {
        console.log('offer', broadcast);
        const broadcastId = broadcast.broadcastId;
        const userId = broadcast.userId;
        const targetUserId = broadcast.targetUserId;
        const isBroadcastOrigin = users[targetUserId].isBroadcastOrigin;
        const socketId = users[targetUserId].socketId;

        broadcasts[broadcastId].viewers.push(userId);
        users[userId].playerId = targetUserId;
        users[targetUserId].watcherId = userId;

        notifyNumberOfViewers(broadcastId);

        io.to(`${socketId}`).emit('offer', {
          broadcastId,
          targetUserId: userId,
          isBroadcastOrigin,
          desc: broadcast.desc
        });
      } catch (err) {
        console.error(err);
      }
    });

    socket.on('re-offer', broadcast => {
      try {
        console.log('re-offer', broadcast);
        const broadcastId = broadcast.broadcastId;
        const userId = broadcast.userId;
        const targetUserId = broadcast.targetUserId;
        const isBroadcastOrigin = users[targetUserId].isBroadcastOrigin;
        const socketId = users[targetUserId].socketId;

        users[userId].playerId = targetUserId;
        users[targetUserId].watcherId = userId;

        io.to(`${socketId}`).emit('re-offer', {
          broadcastId,
          targetUserId: userId,
          isBroadcastOrigin,
          desc: broadcast.desc
        });
      } catch (err) {
        console.error(err);
      }
    });

    socket.on('answer', broadcast => {
      try {
        console.log('answer', broadcast);
        const broadcastId = broadcast.broadcastId;
        const userId = broadcast.userId;
        const targetUserId = broadcast.targetUserId;
        const socketId = users[targetUserId].socketId;

        io.to(`${socketId}`).emit('answer', {
          desc: broadcast.desc
        });
      } catch (err) {
        console.error(err);
      }
    });

    socket.on('re-answer', broadcast => {
      try {
        console.log('re-answer', broadcast);
        const targetUserId = broadcast.targetUserId;
        const socketId = users[targetUserId].socketId;

        io.to(`${socketId}`).emit('answer', {
          desc: broadcast.desc
        });
      } catch (err) {
        console.error(err);
      }
    });

    socket.on('candidate', broadcast => {
      try {
        console.log('candidate', broadcast);
        const userId = broadcast.userId;
        const connectionType = broadcast.connectionType;
        const targetUserId =
          connectionType === 'player'
            ? users[userId].watcherId
            : users[userId].playerId;
        const socketId = users[targetUserId].socketId;

        io.to(`${socketId}`).emit('candidate', {
          connectionType,
          candidate: broadcast.candidate
        });
      } catch (err) {
        console.error(err);
      }
    });

    socket.on('disconnect', () => {
      console.log('disconnect');
      try {
        const userId = socket.userId;
        const user = users[userId];

        if (!user) {
          return;
        }

        const broadcastId = user.broadcastId;
        const broadcast = broadcasts[broadcastId];

        if (user.isBroadcastOrigin === true) {
          Object.values(users).forEach(_user => {
            if (_user.broadcastId === broadcastId) {
              io.to(`${_user.socketId}`).emit(
                'broadcast-end',
                user.broadcastId
              );
            }
          });

          broadcast.viewers.forEach(_userId => {
            delete users[_userId];
          });

          delete broadcasts[broadcastId];
          delete users[userId];

          return;
        }

        // user 앞뒤 viewer 찾아서 재연결
        const userIndex = broadcast.viewers.indexOf(userId);
        const previousUserId =
          broadcast.viewers[userIndex - 1] || broadcast.originUserId;
        const nextUserId = broadcast.viewers[userIndex + 1];

        if (nextUserId) {
          const socketId = users[nextUserId].socketId;

          io.to(`${socketId}`).emit('re-join', {
            broadcastId,
            targetUserId: previousUserId
          });
        }

        // viewers 업데이트
        broadcast.viewers.splice(userIndex, 1);
        // user 삭제
        delete users[userId];
        // viewer수 알림
        notifyNumberOfViewers(broadcastId);
      } catch (err) {
        console.error(err);
      }
    });

    function notifyNumberOfViewers(broadcastId) {
      const broadcast = broadcasts[broadcastId];
      const numberOfViewers = broadcast.viewers.length;
      const originUserId = broadcast.originUserId;
      const socketId = users[originUserId].socketId;

      io.to(`${socketId}`).emit('notify-number-of-viewers', numberOfViewers);
    }
  });
};
