import { useState } from "react";

const useModal = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalType, setModalType] = useState("");

  const handleModal = (content) => {
    setIsModalOpened(!isModalOpened);

    if (content) {
      setModalContent(content);
      setModalType(content.type.name);
    }
  };

  return { isModalOpened, handleModal, modalContent, modalType };
};

export default useModal;
