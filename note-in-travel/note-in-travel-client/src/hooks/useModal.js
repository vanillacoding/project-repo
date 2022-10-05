import { useState } from "react";

/**
 * custom hook to handle state of isModalOpen
 * @param {boolean} initialState of isModalOpen
 * @returns object - state of isModalOpen and methods to handle state
 */
function useModal(initialState = false) {
  const [isModalOpen, setIsModalOpen] = useState(initialState);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function toggleModal() {
    setIsModalOpen((prev) => !prev);
  }

  return {
    isModalOpen,
    openModal,
    closeModal,
    toggleModal,
  };
}

export default useModal;
