import {
  mouseDown,
  changeNormalNode,
  clickFeatNode,
  mouseUp,
  changeFeatNode,
} from '../features/maze/mazeSlice';

export const mazeMouseDown = (dispatch) => (e, targetNode) => {
  e.preventDefault();
  const nodeId = e.target.getAttribute('name');
  const nodeStatus = targetNode.status;

  dispatch(mouseDown());

  if (
    nodeStatus === 'start' ||
    nodeStatus === 'end' ||
    nodeStatus === 'middle'
  ) {
    dispatch(clickFeatNode({ nodeId, nodeStatus }));
  } else {
    dispatch(changeNormalNode(nodeId));
  }
};

export const mazeMouseUp = (dispatch) => (e) => {
  e.preventDefault();
  dispatch(mouseUp());
};

export const mazeMouseEnter =
  (dispatch, isMouseDown, isFeatNodeClick) => (e, targetNode) => {
    e.preventDefault();
    const nodeId = e.target.getAttribute('name');

    if (isMouseDown && isFeatNodeClick) {
      dispatch(
        changeFeatNode({
          targetNodeId: nodeId,
          targetNodeStatus: targetNode.status,
        }),
      );
    } else if (isMouseDown) {
      dispatch(changeNormalNode(nodeId));
    }
  };
