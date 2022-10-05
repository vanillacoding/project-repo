import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { NODE_STATUS } from '../../constant';
import {
  selectCurrentJamBlockType,
  selectMiddleNodeId,
} from '../maze/mazeSlice';

import style from './NodeType.module.css';
import { MAZE } from '../../constant/maze';

const NodeType = ({ type, onClick }) => {
  const currentJamBlockType = useSelector(selectCurrentJamBlockType);
  const middleNodeId = useSelector(selectMiddleNodeId);
  const { id, title, imagePath } = type;

  const isClickableBlock =
    id === NODE_STATUS.WEIGHTED ||
    id === NODE_STATUS.WALL ||
    id === NODE_STATUS.MIDDLE;
  const isSelected =
    currentJamBlockType === id || (id === NODE_STATUS.MIDDLE && middleNodeId);

  return (
    <div
      className={`${style.NodeType} ${
        isClickableBlock && style.ClickableNode
      } ${isSelected && style.SelectedJamNodeType}`}
      onClick={() => onClick(id)}
    >
      <img
        src={imagePath}
        width={MAZE.BLOCK_SIZE_PX}
        height={MAZE.BLOCK_SIZE_PX}
        className={style.NodeTypeImage}
        alt={title}
      />
      <span className={style.NodeTypeTitle}>{title}</span>
    </div>
  );
};

NodeType.defaultProps = {
  onClick: () => {},
};

NodeType.propTypes = {
  type: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
};

export default NodeType;
