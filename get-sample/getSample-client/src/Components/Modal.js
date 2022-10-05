import React from 'react';
import './Common.scss';
import './Modal.scss';

function Modal(props) {
  const { modalMessage, onNotReadyModal, isReadyToShowModal } = props;
  console.log(props);

  const classBox = ['Modal'];
  if (!isReadyToShowModal) {
    classBox.push('display-none');
  }
  return (
    <div className={classBox.join(' ')}>
      <h1>{modalMessage}</h1>
      <div
        className="button"
        onClick={() => {
          onNotReadyModal();
        }}
      >
        Ok
      </div>
    </div>
  );
}

export default Modal;
