import React, { useState } from 'react';
import { connect } from 'react-redux';

import ModalContainer from '../ModalContainer/ModalContainer';
import Group from '../../components/Group/Group';
import Sidebar from '../../components/Sidebar/Sidebar';

import {
  createActionForUserData,
  createActionToAddRoom,
  createActionToDeleteRoom,
  createActionToAddGroup,
  createActionToDeleteGroups,
  createActionToAddMembers,
  createActionToDeleteMembers,
  createActionToJoinMembersInRoom,
  createActionToDeleteMembersInRoom,
  createActionToSaveTargetGroupId
} from '../../actions';
import { createGroup, addMember } from '../../api';
import { deleteGroup, deleteMember } from '../../api';
import styles from './GroupContainer.module.css';

const GroupContainer = ({
  currentUser,
  addGroups,
  deleteGroups,
  addMembers,
  deleteMembers,
  groupId,
  saveTargetGroupId
}) => {
  const [showModal, setShowModal] = useState(false); // 얘랑
  const [showMember, setShowMember] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [targetGroupId, setTargetGroupId] = useState(null); // 얘랑 리덕스에 들어가야 그룹 리스트 재사용 가능..
  const [checkedGroups, setCheckedGroups] = useState([]);
  const [memberEmail, setMemberEmail] = useState('');
  const [checkedMembers, setCheckedMembers] = useState([]);
  const [newMembers, setNewMembers] = useState([]);

  console.log("TARGET GROUP Id", groupId);
  const onChange = (emailOrId, selectedArray, setSelectedArray) => {
    const selected = selectedArray.indexOf(emailOrId);

    if (selected === -1) {
      setSelectedArray([...selectedArray, emailOrId]);
    } else {
      const filtered = selectedArray.filter((item) => item !== emailOrId);
      setSelectedArray([...filtered]);
    }
  };

  const fetchTocreateGroup = () => createGroup(currentUser._id, groupName, newMembers);
  const fetchToDeleteGroups = () => deleteGroup(currentUser._id, checkedGroups);
  const fetchToAddMember = () => addMember(targetGroupId, newMembers);
  const fetchToDeletemembers = () => deleteMember(targetGroupId, checkedMembers);

  const fetch = async () => {
    if (showMember) {
      deleteMembers(targetGroupId, checkedMembers);
      setCheckedMembers([]);
    } else {
      deleteGroups(checkedGroups);
      setCheckedGroups([]);
    }

    await fetchToDelete();
    return;
  };

  const changeGroupName = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setGroupName(value);
  };

  const changeMemberEmail = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setMemberEmail(value);
  };

  const addNewMember = (event) => {
    event.preventDefault();
    setNewMembers([...newMembers, memberEmail]);
    setMemberEmail('');
  };

  const newMemberList = newMembers.map((member, index) => {
    return <div key={index} className={styles.Member}>{member}</div>;
  });

  const createGroupModal = (
    <div className={styles.ModalContent}>
      <div className={styles.ModalTitle}>Create group</div>
      <input
        className={styles.Input}
        type='text'
        placeholder='Group Name'
        onChange={changeGroupName}
      />
      <input
        className={`${styles.Input} ${styles.InputMember}`}
        type='text'
        placeholder='Add Member'
        value={memberEmail}
        onChange={changeMemberEmail}
        onKeyPress={event => event.key === 'Enter' ? addNewMember(event) : null}
      />
      <button className={`${styles.AddButton} ${styles.PlusButton}`} onClick={addNewMember}>+</button>
      <div className={styles.Members}>
        <div className={styles.AddedMemberListTitle}>
          Member List
        </div>
        {newMemberList}
      </div>
    </div>
  );

  const addMemberModal = (
    <div className={styles.ModalContent}>
      <div className={styles.ModalTitle}>Add Member</div>
      <input
        className={styles.Input}
        type='text'
        placeholder='Add Member'
        value={memberEmail}
        onChange={changeMemberEmail}
        onKeyPress={event => event.key === 'Enter' ? addNewMember(event) : null}
      />
      <button className={`${styles.AddButton} ${styles.PlusButton}`} onClick={addNewMember}>+</button>
      <div className={styles.Members}>
        <div className={styles.AddedMemberListTitle}>
          Member List
        </div>
        {newMemberList}
      </div>
    </div>
  );

  const popupModal = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const getMemberData = async (groupId) => {
    setTargetGroupId(groupId);
    setShowMember(true);
  };

  const title = showMember ? 'Member' : 'Your Groups';
  const fetchToDelete = showMember ? fetchToDeletemembers : fetchToDeleteGroups;
  const fetchToCreate = showMember ? fetchToAddMember : fetchTocreateGroup;
  const modalContent = showMember ? addMemberModal : createGroupModal;

  const handleCheckbox = showMember ?
    (memberEmail) => onChange(memberEmail, checkedMembers, setCheckedMembers) :
    (targetGroup) => onChange(targetGroup, checkedGroups, setCheckedGroups);

  const addAndUpdateUserState = showMember ? addMembers : addGroups;

  return (
    <>
      <div className={styles.GroupContainer}>
        {showModal &&
          <ModalContainer
            currentUser={currentUser}
            addAndUpdateUserState={addAndUpdateUserState}////////  REDUX DISPATCH ADD ROOM
            setShowModal={setShowModal}
            fetchToCreate={fetchToCreate}
            setNewMembers={setNewMembers}
          >{modalContent}
          </ModalContainer>
        }
        <Sidebar />
        <div className={styles.ContentWrapper}>
          <h1 className={styles.Title}>{title}</h1>
          <div className={styles.Group}>
            <div className={styles.ButtonWrapper}>
              <button
                className={`${styles.Button} ${styles.AddButton}`}
                onClick={popupModal}>
                Add
              </button>
              <button
                className={`${styles.Button} ${styles.DeleteButton}`}
                onClick={fetch}>
                Delete
                </button>
            </div>
            <Group
              targetGroupId={targetGroupId}
              currentUser={currentUser}
              showMember={showMember}
              setShowMember={setShowMember}
              getMemberData={getMemberData}
              handleCheckbox={handleCheckbox}
              saveTargetGroupId={saveTargetGroupId}
            />
          </div>
        </div>

      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { userReducer, memberInRoomReducer, groupReducer } = state;
  console.log("mapStateToProps groupReducer", state.groupReducer);

  return {
    currentUser: userReducer,
    isLoggedIn: userReducer.isLoggedIn,
    memberInRoom: memberInRoomReducer,
    groupId: groupReducer
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
    deleteLeavingMember: (socketId) => { dispatch(createActionToDeleteMembersInRoom(socketId)); },
    saveTargetGroupId: (groupId) => { dispatch(createActionToSaveTargetGroupId(groupId)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupContainer);
