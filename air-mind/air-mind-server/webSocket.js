const { Server } = require('socket.io');

const webSocket = server => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });

  const socketSet = new Set();

  io.on('connection', socket => {
    console.log('socket connected!');

    socket.on('colorChange', (mindMapId, nodeId, color) => {
      socket.broadcast.to(mindMapId).emit('receiveColor', nodeId, color);
    });

    socket.on('titleChange', (mindMapId, nodeId, title) => {
      socket.broadcast.to(mindMapId).emit('receiveTitle', nodeId, title);
    });

    socket.on('contentChange', (mindMapId, nodeId, updatedContent) => {
      socket.broadcast
        .to(mindMapId)
        .emit('receiveContent', nodeId, updatedContent);
    });

    socket.on('addNode', (mindMapId, newNode, nodeId) => {
      socket.broadcast.to(mindMapId).emit('receiveAddNode', newNode, nodeId);
    });

    socket.on('deleteNode', (nodeId, nodeData, userId, mindMapId) => {
      socket.broadcast
        .to(mindMapId)
        .emit('receiveDeleteNode', nodeId, nodeData);
    });

    socket.on(
      'nodePositionChange',
      (mindMapId, nodeId, updatedPositionX, updatedPositionY) => {
        socket.broadcast
          .to(mindMapId)
          .emit('receivePosition', nodeId, updatedPositionX, updatedPositionY);
      },
    );

    socket.on('fold', (isFold, mindMapId, nodeId) => {
      socket.broadcast.to(mindMapId).emit('receiveFold', isFold, nodeId);
    });

    socket.on('sizeChange', (mindMapId, nodeId, change) => {
      socket.broadcast.to(mindMapId).emit('receiveSizeChange', nodeId, change);
    });

    socket.on('mindMapTitleChange', (mindMapId, mindMapData, value) => {
      socket.broadcast
        .to(mindMapId)
        .emit('receiveMindMapTitleChange', mindMapData, value);
    });

    socket.on('publicOptionChange', (mindMapId, mindMapData, value) => {
      socket.broadcast
        .to(mindMapId)
        .emit('receivePublicOptionChange', mindMapData, value);
    });

    socket.on('deleteMindMap', (mindMapId, result) => {
      socket.broadcast.to(mindMapId).emit('receiveDeleteMindMap', result);
    });

    socket.on('enterNode', (socketId, profile, ancestorList, mindMapId) => {
      socket.broadcast
        .to(mindMapId)
        .emit('insertUser', socketId, profile, ancestorList);
    });

    socket.on('leaveNode', (socketId, mindMapId) => {
      socket.broadcast.to(mindMapId).emit('deleteUser', socketId);
    });

    socket.on('addComment', (nodeId, mindMapId, comment) => {
      socket.broadcast.to(mindMapId).emit('receiveAddComment', nodeId, comment);
    });

    socket.on('addImages', (mindMapId, nodeId, images) => {
      socket.broadcast.to(mindMapId).emit('receiveAddImages', nodeId, images);
    });

    socket.on('deleteImage', (mindMapId, nodeId, imagePath) => {
      socket.broadcast
        .to(mindMapId)
        .emit('receiveDeleteImage', nodeId, imagePath);
    });

    socket.on('joinMindMap', mindMapId => {
      socketSet.add(socket.id);
      socket.join(mindMapId);
      console.log('Socket added!!', socketSet);
    });

    socket.on('leaveMindMap', mindMapId => {
      socket.leave(mindMapId);
      socketSet.delete(socket);
      console.log('Socket leaved!!', socketSet);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};

module.exports = webSocket;
