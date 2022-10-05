import React from 'react';

import MenubarButton from '../MenubarButton/MenubarButton';
import { MENU_MODE } from '../../constants/index';
import styles from './MenuBar.module.css';

const MenuBar = ({
  audioMuted,
  toggleAudio,
  stopVideo,
  setMode
}) => {
  const {
    MIC,
    OUT,
    INVITE,
    STUDENTS,
    PUBLIC_CHAT,
    SCREEN_SHARE,
    QUESTION_CHAT } = MENU_MODE;

  const handleClick = (e) => {
    const targetName = e.currentTarget.name;

    switch (targetName) {

      case PUBLIC_CHAT:
        return setMode(PUBLIC_CHAT);

      case QUESTION_CHAT:
        return setMode(QUESTION_CHAT);

      case SCREEN_SHARE:
        return setMode(SCREEN_SHARE);

      case INVITE:
        return setMode(INVITE);

      case OUT:
        stopVideo();
        window.history.back();
        return;

      default:
        return setMode(STUDENTS);
    }
  };

  return (
    <div className={styles.MenuBar}>
      <button className={styles.MenuButton} name={MIC} onClick={toggleAudio}>
        {
          !audioMuted
            ? <>
              <i className="fas fa-microphone"></i>
              <p className={styles.MenuTitle}>Mic</p>
            </>
            : <>
              <i className="fas fa-microphone-slash"></i>
              <p className={styles.MenuTitle}>Mute</p>
            </>
        }
      </button>
      <MenubarButton handleClick={handleClick} />
    </div >
  );
};

export default MenuBar;
