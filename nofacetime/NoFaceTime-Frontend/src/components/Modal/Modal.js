import React from 'react';

import CompleteButton from '../CompleteButton/CompleteButton';
import CancelButton from '../CancelButton/CancelButton';

import styles from './Modal.module.css';

const Modal = (props) => {
  const {
    currentUser,
    setCurrentUser,
    setShowModal,
    setNewMembers,
    fetchFunction,
    setExistMember,
    children
  } = props;

  const closeModal = () => {
    setShowModal(false);

    if (setNewMembers) setNewMembers([]);
  };

  return (
    <div className={styles.ModalBackground}>
      <div className={styles.Modal}>
        {children}
        <div>
          <CancelButton
            buttonName={'Cancel'}
            onClick={closeModal} />
          <CompleteButton
            buttonName={'Create'}
            fetchToServer={fetchFunction}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setExistMember={setExistMember}
            closeModal={closeModal} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
