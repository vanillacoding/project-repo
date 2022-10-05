import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import {
  selectAllIds,
  selectIsMouseDown,
  selectIsFeatNodeClick,
  selectAnimatedNodeIds,
  setAnimationTimeoutId,
  selectAnimatedPathNodeIds,
  selectAnimatedMazeNodeIds,
} from './mazeSlice';
import { selectSpeed } from '../mazeOptions/mazeOptionsSlice';
import Node from '../node/Node';

import style from './Maze.module.css';
import { mazeMouseDown, mazeMouseEnter, mazeMouseUp } from '../../events';
import { animatePathNodes, animateVisitNodes } from '../../util/maze';

const Maze = () => {
  const allIds = useSelector(selectAllIds, shallowEqual);
  const isMouseDown = useSelector(selectIsMouseDown);
  const isFeatNodeClick = useSelector(selectIsFeatNodeClick);
  const animatedNodeIds = useSelector(selectAnimatedNodeIds);
  const animationSpeed = useSelector(selectSpeed);
  const animatedPathNodeIds = useSelector(selectAnimatedPathNodeIds);
  const animatedMazeNodeIds = useSelector(selectAnimatedMazeNodeIds);

  const dispatch = useDispatch();

  const handleMouseDown = useCallback(mazeMouseDown(dispatch), [dispatch]);
  const handleMouseUp = useCallback(mazeMouseUp(dispatch), [dispatch]);
  const handleMouseEnter = useCallback(
    mazeMouseEnter(dispatch, isMouseDown, isFeatNodeClick),
    [dispatch, isMouseDown, isFeatNodeClick],
  );

  useEffect(() => {
    animateVisitNodes(
      dispatch,
      setAnimationTimeoutId,
      animatedNodeIds,
      animatedPathNodeIds,
      animationSpeed,
    );
  }, [animatedNodeIds, animatedPathNodeIds, animationSpeed]);

  useEffect(() => {
    animatePathNodes(
      dispatch,
      setAnimationTimeoutId,
      animatedMazeNodeIds,
      animationSpeed,
    );
  }, [animatedMazeNodeIds, animationSpeed]);

  return (
    <div className={style.Maze}>
      {allIds.map((row, index) => (
        <div className={style.MazeRow} key={index}>
          {row.map((nodeId) => (
            <Node
              nodeId={nodeId}
              handleMouseDown={handleMouseDown}
              handleMouseUp={handleMouseUp}
              handleMouseEnter={handleMouseEnter}
              key={nodeId}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Maze;
