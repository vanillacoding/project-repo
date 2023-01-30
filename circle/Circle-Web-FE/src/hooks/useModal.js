import React, { useState } from "react";
import Modal from "../components/common/Modal";

export default function useModal(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const customModal = ({ children }) => {
    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        {children}
      </Modal>
    );
  };

  return [customModal, toggleModal, isOpen];
}
