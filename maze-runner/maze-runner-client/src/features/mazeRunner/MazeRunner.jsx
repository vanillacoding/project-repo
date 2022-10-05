import React, { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Nav from '../nav/Nav';
import MazeDescription from '../mazeDescription/MazeDescription';
const Maze = lazy(() => import('../maze/Maze'));
import useWindowSize from '../../hook/useWindowSize';
import {
  createMaze,
  selectMazeWidth,
  selectMazeHeight,
  getMazeAsync,
} from '../maze/mazeSlice';

import style from './MazeRunner.module.css';
import {
  closeSideMenuButtonStatus,
  selectSideMenuButtonStatus,
} from '../nav/navSlice';
import { useParams } from 'react-router';

function MazeRunner() {
  const { width, height } = useWindowSize();
  const maze = {
    width: useSelector(selectMazeWidth),
    height: useSelector(selectMazeHeight),
  };
  const isSideMenuButtonOpen = useSelector(selectSideMenuButtonStatus);
  const { mazeId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!maze.width || !maze.height) {
      dispatch(createMaze({ width, height }));
    }

    if (isSideMenuButtonOpen) {
      dispatch(closeSideMenuButtonStatus());
    }
  }, [width, height]);

  useEffect(() => {
    if (!mazeId) {
      return;
    }

    dispatch(getMazeAsync(mazeId));
  }, [mazeId]);

  return (
    <div className={style.MazeRunner}>
      <header className={style.Header}>
        <Nav />
      </header>
      <main className={style.Main}>
        <MazeDescription />
        <Suspense fallback={<p>loading...</p>}>
          <Maze />
        </Suspense>
      </main>
    </div>
  );
}

export default MazeRunner;
