import React, { useRef, useContext } from "react";

import { createPortal } from "react-dom";
import styled from "styled-components";

import { ModalContext } from "../../../contexts/ModalContext";
import CloseButton from "./CloseButton";

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.4);
`;

const Wrapper = styled.div`
  width: auto;
  height: auto;
  padding: ${({ theme }) => theme.padding.small};
  position: relative;
  background: white;
`;

function Modal() {
  const { isModalOpened, handleModal, modalContent } = useContext(ModalContext);
  const modalRef = useRef();

  const clickModalOutside = (event) => {
    if (!modalRef.current || modalRef.current.contains(event.target)) return;
    handleModal(null);
  };

  const renderModal = () => {
    if (!isModalOpened) return null;

    return (
      <Backdrop onClick={clickModalOutside}>
        <Wrapper ref={modalRef}>
          <CloseButton
            title="Close"
            top="-30px"
            closeModal={() => handleModal(null)}
            color="#f8a507"
          />
          {modalContent}
        </Wrapper>
      </Backdrop>
    );
  };

  return (
    <>
      {createPortal(
        renderModal(),
        document.getElementById("modal")
      )}
    </>
  );
}

export default Modal;
