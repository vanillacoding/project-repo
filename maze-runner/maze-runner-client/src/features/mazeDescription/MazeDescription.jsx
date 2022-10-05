import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MazeOption from '../mazeOptions/MazeOption';
import {
  MAZE_OPTIONS,
  NODE_STATUS,
  NODE_TYPES,
  USER_GUIDE_TEXT,
} from '../../constant';
import {
  selectAlgorithm,
  selectMazeOptions,
} from '../mazeOptions/mazeOptionsSlice';

import style from './MazeDescription.module.css';
import NodeType from '../nodeType/NodeType';
import {
  changeCurrentJamBlockType,
  createMiddleNode,
  deleteMiddleNode,
  selectMiddleNodeId,
} from '../maze/mazeSlice';

import arrowPigTail from '../../images/arrowPigTail.png';

const MazeDescription = () => {
  const mazeOptions = useSelector(selectMazeOptions);
  const mazeAlgorithm = useSelector(selectAlgorithm);
  const middleNodeId = useSelector(selectMiddleNodeId);
  const dispatch = useDispatch();

  function isHurdleOrStopoverNode(nodeType) {
    return (
      nodeType.id === NODE_STATUS.WEIGHTED ||
      nodeType.id === NODE_STATUS.WALL ||
      nodeType.id === NODE_STATUS.MIDDLE
    );
  }

  function handleOnClick(id) {
    const isJamBlock = id === NODE_STATUS.WEIGHTED || id === NODE_STATUS.WALL;

    if (isJamBlock) {
      dispatch(changeCurrentJamBlockType(id));
    }

    const isAppleBlock = id === NODE_STATUS.MIDDLE;

    if (isAppleBlock) {
      if (!middleNodeId) {
        dispatch(createMiddleNode());
      } else {
        dispatch(deleteMiddleNode());
      }
    }
  }

  return (
    <section className={style.MazeDescription}>
      <div className={style.NodeInfo}>
        {NODE_TYPES.map(
          (nodeType) =>
            isHurdleOrStopoverNode(nodeType) || (
              <NodeType type={nodeType} key={nodeType.title} />
            ),
        )}
        <div className={style.NodeTypeDivider} />
        <div className={style.ClickableNodeWrapper}>
          {NODE_TYPES.map(
            (nodeType) =>
              isHurdleOrStopoverNode(nodeType) && (
                <NodeType
                  type={nodeType}
                  key={nodeType.title}
                  onClick={handleOnClick}
                />
              ),
          )}
          <div className={style.NodeInfoMemo}>
            <img
              src={arrowPigTail}
              width={30}
              height={30}
              className={style.NodeInfoMemoArrow}
              alt="arrow pig tail shape"
            />
            {USER_GUIDE_TEXT.CLICK_ME}
          </div>
        </div>
      </div>
      {mazeAlgorithm === 'none' ? (
        <div className={style.SelectedOptionInfo}>
          <span className={style.AlgorithmSelectMessage}>
            {USER_GUIDE_TEXT.SELECT_YOUR_ALGO}
          </span>
        </div>
      ) : (
        <div className={style.SelectedOptionInfo}>
          {MAZE_OPTIONS.map((mazeOption) => (
            <MazeOption
              item={{
                [mazeOption]: mazeOptions[mazeOption.toLowerCase()],
              }}
              key={mazeOption}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default React.memo(MazeDescription);
