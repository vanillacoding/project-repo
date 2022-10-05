import { useState } from "react";

const useModal = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleModal = (content) => {
    setIsModalOpened(!isModalOpened);

    if (content) {
      setModalContent(content);
    }
  };

  return { isModalOpened, handleModal, modalContent };
};

export default useModal;
