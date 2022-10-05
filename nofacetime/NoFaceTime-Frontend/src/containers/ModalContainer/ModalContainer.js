import React from 'react';
import CompleteButton from '../../components/CompleteButton/CompleteButton';
import CancelButton from '../../components/CancelButton/CancelButton';
import styles from './ModalContainer.module.css';

const ModalContainer = ({
  currentUser,//공통
  addAndUpdateUserState,//공통
  setShowModal,//공통
  fetchToCreate,
  setNewMembers, // members와 setmembers는 Group쪽에서 들어옴. Room과는 관계없음.
  setExistMember,// members와 setmembers는 Group쪽에서 들어옴. Room과는 관계없음. showMember = true 일 때
  children
}) => {

  const closeModal = () => {
    setShowModal(false);

    if (setNewMembers) setNewMembers([]);
  };

  const handleClickButton = async () => {
    const data = await fetchToCreate();
    console.log("FETCH DATA To Create ", data);
    if ('rooms' in data) addAndUpdateUserState(data.rooms);
    if ('groups' in data) addAndUpdateUserState(data.groups);
    if ('members' in data) addAndUpdateUserState(data.groupId, data.members);

    closeModal();
  };

  return (
    <div className={styles.ModalBackground}>
      <div className={styles.Modal}>
        <div className={styles.ModalContent}>
          {children}
          <div className={styles.Buttons}>
            <CancelButton
              buttonName={'Cancel'}
              onClick={closeModal} />
            <CompleteButton
              buttonName={'Create'}
              onClick={handleClickButton}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalContainer;
