import React, { createContext } from "react";

import PropTypes from "prop-types";

import Modal from "../components/Shared/Modal";
import useModal from "../hooks/useModal";

const ModalContext = createContext();
const { Provider } = ModalContext;

const ModalProvider = ({ children }) => {
  const {
    isModalOpened,
    handleModal,
    modalContent
  } = useModal();

  return (
    <Provider value={{ isModalOpened, handleModal, modalContent }}>
      {children}
      <Modal />
    </Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { ModalContext, ModalProvider };
