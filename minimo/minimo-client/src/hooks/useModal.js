import { useState } from 'react';

function useModal(initialMode = false) {
  const [modalOpen, setModalOpen] = useState(initialMode);

  function toggle() {
    setModalOpen((prev) => !prev);
  }

  return {
    modalOpen,
    toggle,
    setModalOpen,
  };
}

export default useModal;
