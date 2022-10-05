import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowDropdown } from 'react-icons/io';

import Dropdown from '../dropDown/Dropdown';
import { CLEAR_MAZE, MAZE_AND_PATTERNS, NAV, NAV_LIST } from '../../constant';
import {
  setMenu,
  selectMenu,
  selectSideMenuButtonStatus,
  setSideMenuButtonStatus,
  closeSideMenuButtonStatus,
} from './navSlice';
import {
  selectAlgorithm,
  setAlgorithm,
  setSpeed,
} from '../mazeOptions/mazeOptionsSlice';
import {
  clearVisitedAndPathNodes,
  clearWallAndWeightNode,
  createMiddleNode,
  deleteMiddleNode,
  drawRecursiveDivisionMaze,
  endAnimation,
  startPathfinding,
  selectAnimationTimeoutId,
  selectIsProgressive,
  selectMiddleNodeId,
  setAnimationTimeoutId,
  drawBasicRandomWall,
  saveMazeAsync,
  selectMaze,
  selectMazeId,
} from '../maze/mazeSlice';

import style from './Nav.module.css';
import { isNotStartButton, makeCopyLink } from '../../util';
import Modal from '../../components/Modal';
import sideButton from '../../images/sideButton.png';

const Nav = () => {
  const menuStatus = useSelector(selectMenu);
  const isProgressive = useSelector(selectIsProgressive);
  const currentAlgorithm = useSelector(selectAlgorithm);
  const animationTimeoutId = useSelector(selectAnimationTimeoutId);
  const middleNodeId = useSelector(selectMiddleNodeId);
  const isSideMenuButtonOpen = useSelector(selectSideMenuButtonStatus);
  const maze = useSelector(selectMaze);
  const mazeId = useSelector(selectMazeId);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopyCompleted, setIsCopyCompleted] = useState(false);

  useEffect(() => {
    if (!isCopyCompleted) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setIsCopyCompleted(false);
    }, 2000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isCopyCompleted]);

  function handleOnClick(e) {
    e.preventDefault();
    const currentClickedMenu = e.currentTarget.name;

    const dropdownNavList = NAV_LIST.filter(
      (navItem) => navItem.hasDropdown,
    ).map((navItem) => navItem.title);

    if (dropdownNavList.includes(currentClickedMenu)) {
      if (menuStatus === currentClickedMenu) {
        dispatch(setMenu('none'));
        return;
      }

      dispatch(setMenu(currentClickedMenu));
      return;
    }

    if (currentClickedMenu === NAV.START) {
      dispatch(clearVisitedAndPathNodes());
      dispatch(startPathfinding(currentAlgorithm));
    }

    if (currentClickedMenu === NAV.STOP) {
      if (animationTimeoutId) {
        clearTimeout(animationTimeoutId);
        dispatch(setAnimationTimeoutId(0));
        dispatch(endAnimation());
      }
    }

    if (currentClickedMenu === NAV.ADD_MIDDLE_POINT) {
      if (!middleNodeId) {
        dispatch(createMiddleNode());
      } else {
        dispatch(deleteMiddleNode());
      }
    }

    if (currentClickedMenu === NAV.SAVE_AND_SHARE) {
      dispatch(saveMazeAsync({ maze, algorithm: currentAlgorithm }));
      setIsModalOpen(true);
    }

    dispatch(closeSideMenuButtonStatus());
  }

  function handleOnDropdownClick(e) {
    e.preventDefault();

    if (isProgressive) {
      alert('Wait for the pathfind algorithm to complete ⏳');
      return;
    }

    if (menuStatus === NAV.ALGORITHMS) {
      dispatch(setAlgorithm(e.target.name));
    }

    if (menuStatus === NAV.SPEED) {
      dispatch(setSpeed(e.target.name));
    }

    if (menuStatus === NAV.CLEAR_MAZE) {
      switch (e.target.name) {
        case CLEAR_MAZE.CLEAR_ALL: {
          dispatch(clearWallAndWeightNode());
          dispatch(clearVisitedAndPathNodes());
          break;
        }

        case CLEAR_MAZE.CLEAR_WALLS_AND_WEIGHT: {
          dispatch(clearWallAndWeightNode());
          break;
        }

        case CLEAR_MAZE.CLEAR_PATH: {
          dispatch(clearVisitedAndPathNodes());
          break;
        }
        default: {
          break;
        }
      }
    }

    if (menuStatus === NAV.MAZES_AND_PATTERNS) {
      dispatch(clearVisitedAndPathNodes());
      dispatch(clearWallAndWeightNode());

      switch (e.target.name) {
        case MAZE_AND_PATTERNS.RECURSIVE_DIVISION: {
          dispatch(drawRecursiveDivisionMaze());
          break;
        }

        case MAZE_AND_PATTERNS.BASIC_RANDOM_WALL: {
          dispatch(drawBasicRandomWall());
          break;
        }

        default: {
          break;
        }
      }
    }

    dispatch(setMenu('none'));
    dispatch(closeSideMenuButtonStatus());
  }

  function handleSideMenuButtonClick() {
    dispatch(setSideMenuButtonStatus());
  }

  function handleOnClose() {
    setIsModalOpen(false);
  }

  return (
    <nav className={style.Nav}>
      <ul
        className={`${style.SideMenu} ${
          isSideMenuButtonOpen ? style.SideMenuOn : style.SideMenuOff
        }`}
      >
        {NAV_LIST.filter(isNotStartButton).map((item) => (
          <li
            className={`${style.SideBarItem} ${
              item.title === NAV.START && style.start
            }`}
            key={item.title}
          >
            <button
              className={`${style.SideBarButton}`}
              type="button"
              onClick={handleOnClick}
              name={item.title}
            >
              {item.title}
              {item.hasDropdown && <IoMdArrowDropdown />}
            </button>
            {item.hasDropdown && item.title === menuStatus && (
              <Dropdown
                isMobile
                items={item.child}
                handleOnClick={handleOnDropdownClick}
              />
            )}
          </li>
        ))}
      </ul>
      <ul className={style.NavItems}>
        <li className={style.Logo}>
          <img
            src="/logo.png"
            width={128}
            height={128}
            className={style.LogoImage}
            alt="logo"
          />
        </li>
        <li className={style.SideButton}>
          <img
            src={sideButton}
            width={16}
            height={16}
            className={`${style.SideButtonImage} ${
              isSideMenuButtonOpen ? style.SideButtonOn : style.SideButtonOff
            }`}
            alt="side menu button"
            onClick={handleSideMenuButtonClick}
          />
        </li>
        {NAV_LIST.map((item) => (
          <li
            className={`${style.NavItem} ${
              item.title === NAV.START && style.start
            }`}
            key={item.title}
          >
            {item.title === NAV.START ? (
              <>
                <button
                  className={`${style.NavButton} ${style.StartButton} ${
                    currentAlgorithm !== 'none' && style.StartButtonReady
                  }`}
                  type="button"
                  onClick={handleOnClick}
                  name={isProgressive ? NAV.STOP : item.title}
                >
                  {isProgressive ? NAV.STOP : item.title}
                </button>
              </>
            ) : (
              <>
                <button
                  className={style.NavButton}
                  type="button"
                  onClick={handleOnClick}
                  name={item.title}
                >
                  {item.title}
                  {item.hasDropdown && <IoMdArrowDropdown />}
                </button>
                {item.hasDropdown && item.title === menuStatus && (
                  <Dropdown
                    items={item.child}
                    handleOnClick={handleOnDropdownClick}
                  />
                )}
              </>
            )}
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <Modal onClose={handleOnClose}>
          <div className={style.ModalChildren}>
            <span className={style.ModalTitle}>Link: </span>
            <div className={style.ModalLink}>{makeCopyLink(mazeId)}</div>
            <button
              type="button"
              className={style.ModalCopyButton}
              onClick={() => {
                navigator.clipboard.writeText(makeCopyLink(mazeId));
                setIsCopyCompleted(true);
              }}
            >
              Copy
            </button>
            {isCopyCompleted && (
              <div className={style.ModalCopyCompleteMessage}>Copied!</div>
            )}
          </div>
        </Modal>
      )}
    </nav>
  );
};

export default React.memo(Nav);
