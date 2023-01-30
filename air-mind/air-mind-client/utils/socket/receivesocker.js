import deleteNodeHelper from '../deletenodehelper';

const receiveSocket = (
  socket,
  setNodeData,
  setMindMapData,
  router,
  setSocketUserData,
  setIsFoldLock,
) => {
  socket.on('receiveColor', (nodeId, color) => {
    setNodeData(prev => {
      if (!prev[nodeId]) {
        return prev;
      }

      const temp = { ...prev };
      const tempSel = { ...temp[nodeId] };

      tempSel.attribute = {
        ...tempSel.attribute,
        color,
      };
      temp[nodeId] = tempSel;

      return temp;
    });
  });

  socket.on('receiveTitle', (nodeId, updatedContent) => {
    setNodeData(prev => {
      if (!prev[nodeId]) {
        return prev;
      }

      const temp = { ...prev };
      const tempSel = { ...temp[nodeId] };

      tempSel.title = updatedContent;
      temp[nodeId] = tempSel;

      return temp;
    });
  });

  socket.on('receiveContent', (nodeId, updatedDescription) => {
    setNodeData(prev => {
      if (!prev[nodeId]) {
        return prev;
      }

      const temp = { ...prev };
      const tempSel = { ...temp[nodeId] };

      tempSel.content = updatedDescription;
      temp[nodeId] = tempSel;

      return temp;
    });
  });

  socket.on('receiveDeleteNode', (nodeId, nodeData) => {
    deleteNodeHelper(nodeId, nodeData, setNodeData);
  });

  socket.on('receiveAddNode', (newNode, nodeId) => {
    setNodeData(prev => {
      if (!prev[nodeId]) {
        return prev;
      }

      const tempData = { ...prev };
      const { _id: newId } = newNode.node;

      if (tempData[nodeId].children.indexOf(newId) === -1) {
        const newParent = {
          ...tempData[nodeId],
          children: [...tempData[nodeId].children, newId],
        };
        tempData[nodeId] = newParent;
        tempData[newId] = newNode.node;
      }

      return { ...prev, ...tempData };
    });
  });

  socket.on('receivePosition', (nodeId, updatedPositionX, updatedPositionY) => {
    setNodeData(prev => {
      if (!prev[nodeId]) {
        return prev;
      }

      const temp = { ...prev };
      const tempSel = { ...temp[nodeId] };

      tempSel.attribute = {
        ...tempSel.attribute,
        cordX: updatedPositionX,
        cordY: updatedPositionY,
      };

      temp[nodeId] = tempSel;

      return temp;
    });
  });

  socket.on('receiveFold', (isFold, nodeId) => {
    let isFoldLock = false;
    setIsFoldLock(prevIsFold => {
      console.log('isFoldLock: ', prevIsFold);
      if (prevIsFold) {
        isFoldLock = true;
      }
      return prevIsFold;
    });

    if (isFoldLock) {
      setNodeData(prev => {
        if (!prev[nodeId]) {
          return prev;
        }

        const temp = { ...prev };
        const tempSel = { ...temp[nodeId] };
        tempSel.attribute = {
          ...tempSel.attribute,
          isFold: !isFold,
        };
        temp[nodeId] = tempSel;

        return temp;
      });
    }
  });

  socket.on('receiveSizeChange', (nodeId, change) => {
    setNodeData(prev => {
      if (!prev[nodeId]) {
        return prev;
      }

      const temp = { ...prev };
      const tempSel = { ...temp[nodeId] };

      const currentSize = tempSel.attribute.size;
      let newSize;

      if (change === 'bigger') {
        switch (currentSize) {
          case 'SMALL':
            newSize = 'MEDIUM';
            break;
          case 'MEDIUM':
            newSize = 'LARGE';
            break;
          default:
            newSize = 'LARGE';
        }
      } else {
        switch (currentSize) {
          case 'LARGE':
            newSize = 'MEDIUM';
            break;
          case 'MEDIUM':
            newSize = 'SMALL';
            break;
          default:
            newSize = 'SMALL';
        }
      }

      tempSel.attribute = {
        ...tempSel.attribute,
        size: newSize,
      };
      temp[nodeId] = tempSel;

      return temp;
    });
  });

  socket.on('receiveMindMapTitleChange', (mindMapData, value) => {
    const newMindMapData = { ...mindMapData, title: value };

    setMindMapData(newMindMapData);
  });

  socket.on('receivePublicOptionChange', (mindMapData, value) => {
    const newMindMapData = { ...mindMapData, access: value };

    setMindMapData(newMindMapData);
  });

  socket.on('receiveDeleteMindMap', () => {
    router.push('/');
  });

  socket.on('receiveAddComment', (nodeId, comment) => {
    setNodeData(prev => {
      const tempData = { ...prev };
      const node = { ...tempData[nodeId] };

      node.comments = [...node.comments, comment];
      tempData[nodeId] = node;

      return tempData;
    });
  });

  socket.on('receiveAddImages', (nodeId, images) => {
    setNodeData(prev => {
      const tempData = { ...prev };
      tempData[nodeId] = { ...tempData[nodeId], images };
      return tempData;
    });
  });

  socket.on('insertUser', (socketId, profile, nodeAncestorList) => {
    setSocketUserData(prev => {
      const tempData = { ...prev };
      tempData[socketId] = {
        nodeAncestorList,
        profile,
      };

      return tempData;
    });
  });

  socket.on('deleteUser', socketId => {
    setSocketUserData(prev => {
      const tempData = { ...prev };
      delete tempData[socketId];

      return tempData;
    });
  });
};

export default receiveSocket;
