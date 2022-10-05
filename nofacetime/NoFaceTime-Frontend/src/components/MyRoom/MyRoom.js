import React from 'react';

import RoomList from '../RoomList/RoomList';
import styles from './MyRoom.module.css';

const MyRoom = ({
  currentUser,
  enterRoom,
  popupModal,
  fetchToDeleteRoomData
}) => {
  return (
    <div className={styles.MyRoom}>
      <div className={styles.RoomsContainer}>
        <RoomList
          currentUser={currentUser}
          enterRoom={enterRoom}
          fetchToDeleteRoomData={fetchToDeleteRoomData}
        />
      </div>
      <button
        className={styles.AddRoomButton}
        onClick={popupModal}>
        Add Room
      </button>
    </div>
  );
};

export default MyRoom;
