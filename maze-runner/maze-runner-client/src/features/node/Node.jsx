import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { getImgInfoByNodeStatus } from '../../util';

import style from './Node.module.css';
import { NODE_STATUS } from '../../constant';
import { MAZE } from '../../constant/maze';

const Node = ({ nodeId, handleMouseDown, handleMouseUp, handleMouseEnter }) => {
  const targetNode = useSelector((state) => state.maze.nodes.byId[nodeId]);
  const { src, alt } = getImgInfoByNodeStatus(
    targetNode.weight > 1 &&
      (targetNode.status === NODE_STATUS.VISITED ||
        targetNode.status === NODE_STATUS.VISITED2 ||
        targetNode.status === NODE_STATUS.PATH ||
        targetNode.status === NODE_STATUS.PATH2)
      ? NODE_STATUS.WEIGHTED
      : targetNode.status,
  );

  return (
    <>
      {src ? (
        <img
          src={src}
          width={MAZE.BLOCK_SIZE_PX}
          height={MAZE.BLOCK_SIZE_PX}
          className={`${style.Node} ${style[targetNode.status]}`}
          onPointerDown={(e) => {
            // console.log(e);
            handleMouseDown(e, targetNode);
          }}
          onPointerUp={(e) => {
            // console.log(e);
            handleMouseUp(e);
          }}
          onPointerEnter={(e) => {
            // console.log(e);
            handleMouseEnter(e, targetNode);
          }}
          name={nodeId}
          alt={alt}
        />
      ) : (
        <div
          className={`${style.Node} ${style[targetNode.status]}`}
          onPointerDown={(e) => {
            // console.log(e);
            handleMouseDown(e, targetNode);
          }}
          onPointerUp={(e) => {
            // console.log(e);
            handleMouseUp(e);
          }}
          onPointerEnter={(e) => {
            // console.log(e);
            handleMouseEnter(e, targetNode);
          }}
          name={nodeId}
        />
      )}
    </>
  );
};

Node.defaultProps = {
  handleMouseDown: () => {},
  handleMouseUp: () => {},
  handleMouseEnter: () => {},
};

Node.propTypes = {
  nodeId: PropTypes.string.isRequired,
  handleMouseDown: PropTypes.func,
  handleMouseUp: PropTypes.func,
  handleMouseEnter: PropTypes.func,
};

export default React.memo(Node);
