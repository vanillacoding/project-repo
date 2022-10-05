import React from 'react';
import CompleteButton from '../CompleteButton/CompleteButton';
import styles from './SettingModal.module.css';
import MyVideo from '../MyVideo/MyVideo';

const SettingModal = ({
  isJoinedRoom,
  setIsJoinedRoom,
  videoRef,
  toggleAudio,
  isHost,
  audioMuted
}) => {

  return (
    <div className={styles.SettingModalBackground}>
      <div className={styles.SettingModal}>
        <div className={styles.VideoWrapper}>
          <MyVideo isJoinedRoom={isJoinedRoom} isHost={isHost} videoRef={videoRef} audioMuted={audioMuted}/>
        </div>
        <div className={styles.Mute}>
          <label>
            <input
              type="checkbox"
              onChange={toggleAudio} />
            Mute
          </label>
        </div>
        <CompleteButton buttonName='Join' onClick={() => setIsJoinedRoom(true)} />
      </div>
    </div>
  );
};

export default SettingModal;
