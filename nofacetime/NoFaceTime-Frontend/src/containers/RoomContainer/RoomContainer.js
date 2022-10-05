import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import ModalContainer from '../ModalContainer/ModalContainer';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import MyRoom from '../../components/MyRoom/MyRoom';

import {
  createActionForUserData,
  createActionToAddRoom,
  createActionToDeleteRoom,
  createActionToAddGroup,
  createActionToDeleteGroups,
  createActionToAddMembers,
  createActionToDeleteMembers,
  createActionToJoinMembersInRoom,
  createActionToDeleteMembersInRoom
} from '../../actions';
import { createRoom, deleteRoom } from '../../api';
import styles from './RoomContainer.module.css';

const RoomContainer = ({
  currentUser,
  addRooms,
  deleteRooms
}) => {
  const [showModal, setShowModal] = useState(false);
  const [roomName, setRoomName] = useState('');
  let history = useHistory();

  const setInputValue = (event) => {
    const { value } = event.target;
    setRoomName(value);
  };

  const fetchToCreateRoom = () => createRoom(currentUser, roomName);

  const modalContent = (
    <div className={styles.ModalContent}>
      <div className={styles.ModalTitle}>Create your room</div>
      <input
        className={styles.RoomNameInput}
        type='text'
        placeholder='Enter room name'
        onChange={(e) => setInputValue(e)}>
      </input>
    </div>
  );

  const enterRoom = (event, roomLink) => {
    if (event.target.tagName !== 'BUTTON') {
      const sliceIndex = roomLink.indexOf('/rooms');
      const roomIdURL = roomLink.slice(sliceIndex);

      history.push(roomIdURL);
    }
  };

  const fetchToDeleteRoomData = async (roomId) => {
    deleteRooms(roomId);
    await deleteRoom(currentUser._id, roomId);
  };

  const popupModal = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  return (
    <>
      <Header />
      <div className={styles.RoomContainer}>
        <Sidebar />
        <div className={styles.ContentWrap}>
          <h1 className={styles.Title}> Your Rooms </h1>
          <MyRoom
            currentUser={currentUser}
            enterRoom={enterRoom}
            popupModal={popupModal}
            fetchToDeleteRoomData={fetchToDeleteRoomData} />
          {
            showModal &&
            <ModalContainer
              currentUser={currentUser}
              addAndUpdateUserState={addRooms}
              setShowModal={setShowModal}
              fetchToCreate={fetchToCreateRoom}>
              {modalContent}
            </ModalContainer>
          }
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { userReducer, memberInRoomReducer } = state;

  return {
    currentUser: userReducer,
    isLoggedIn: userReducer.isLoggedIn,
    memberInRoom: memberInRoomReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserData: (userData) => { dispatch(createActionForUserData(userData)); },
    addRooms: (addedRoomData) => { dispatch(createActionToAddRoom(addedRoomData)); },
    deleteRooms: (id) => { dispatch(createActionToDeleteRoom(id)); },
    addGroups: (addedGroupData) => { dispatch(createActionToAddGroup(addedGroupData)); },
    deleteGroups: (arrayOfId) => { dispatch(createActionToDeleteGroups(arrayOfId)); },
    addMembers: (groupId, allMemberData) => { dispatch(createActionToAddMembers(groupId, allMemberData)); },
    deleteMembers: (groupId, arrayOfEmail) => { dispatch(createActionToDeleteMembers(groupId, arrayOfEmail)); },
    joinMember: (socketId) => { dispatch(createActionToJoinMembersInRoom(socketId)); },
    deleteLeavingMember: (socketId) => { dispatch(createActionToDeleteMembersInRoom(socketId)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomContainer);
