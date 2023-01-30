import React from "react";
import ReactDOM from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

import styled from "styled-components";

import THEME_COLORS from "../config/constants/themeColors";

function ModalPortal({ children }) {
  const ModalRoot = document.getElementById("portal-root");
  return ReactDOM.createPortal(children, ModalRoot);
}

function Modal({ children, isOpenModal, onModalStatusChanged }) {
  if (!isOpenModal) {
    return null;
  }

  const handleOuterClick = (event) => {
    event.stopPropagation();

    if (event.currentTarget === event.target) {
      onModalStatusChanged(false);
    }
  };

  return (
    <ModalPortal>
      <ModalContainer onClick={handleOuterClick} data-testid="modal">
        <ModalBox>
          <CloseButton onClick={() => onModalStatusChanged(false)}>
            <CloseIcon />
          </CloseButton>
          {children}
        </ModalBox>
      </ModalContainer>
    </ModalPortal>
  );
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${THEME_COLORS.MODAL_BACKGROUND};
  cursor: pointer;
  z-index: 99;
  animation-name: fadeIn;
  animation-duration: 0.3s;
  animation-timing-function: ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 60vw;
  height: 60vh;
  max-width: 50rem;
  max-height: 50rem;
  padding: 2rem 1.4rem;
  border: none;
  border-radius: 10px;
  background-color: ${THEME_COLORS.MODAL_COLOR};
  -webkit-box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000,
    5px 5px 15px 5px rgba(153, 153, 153, 0);
  box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000,
    5px 5px 15px 5px rgba(153, 153, 153, 0);
  transform: translate(-50%, -50%);
  cursor: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  left: 0.8rem;
  padding: 0;
  border: none;
  border-radius: 0;
  background: inherit;
  box-shadow: none;
  cursor: pointer;
`;

const CloseIcon = styled(AiOutlineClose)`
  font-size: 1.1rem;
`;

export default Modal;
