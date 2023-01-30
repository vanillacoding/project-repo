import React, { useState } from "react";
import Modal from "../components/Modal";

function useModal() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const customModal = ({ children }) => {
    return (
      <Modal isOpenModal={isOpenModal} onModalStatusChanged={setIsOpenModal}>
        {children}
      </Modal>
    );
  };

  return [customModal, toggleModal];
}

export default useModal;
