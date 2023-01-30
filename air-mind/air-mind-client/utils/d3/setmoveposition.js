import * as d3 from 'd3';
import { putNodesData } from '../../service/noderequests';

export default function setMovePosition(
  ref,
  x,
  y,
  nodeId,
  nodeData,
  setNodeData,
  mindMap,
  socket,
) {
  const translateX = x;
  const translateY = y;
  let dragged = false;

  const handleDrag = d3
    .drag()
    .subject(() => {
      d3.select(this);
      return { x: translateX, y: translateY };
    })
    .on('drag', d => {
      setNodeData(prev => {
        const tempNodeData = { ...prev };
        const node = { ...tempNodeData[nodeId] };
        node.attribute = {
          ...node.attribute,
          cordX: d.x,
          cordY: d.y,
        };
        tempNodeData[nodeId] = node;
        return tempNodeData;
      });
      dragged = true;
    })
    .on('end', d => {
      if (dragged) {
        const node = { ...nodeData[nodeId] };
        node.attribute = {
          ...node.attribute,
          cordX: d.x,
          cordY: d.y,
        };

        const { _id: mindMapId } = mindMap;
        const { _id: userId } = mindMap.author;
        putNodesData(userId, mindMapId, nodeId, node);

        socket.emit('nodePositionChange', mindMapId, nodeId, d.x, d.y);
      }
    });

  handleDrag(ref);
}
