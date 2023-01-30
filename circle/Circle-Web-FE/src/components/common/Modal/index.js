import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { AiOutlineClose } from "react-icons/ai";

import Portal from "../Portal";
import theme from "../../../config/constants/theme";

export default function Modal({ children, isOpen, setIsOpen }) {
  if (!isOpen) {
    return null;
  }

  const handleOuterClick = (event) => {
    event.stopPropagation();

    if (event.currentTarget === event.target) {
      setIsOpen(false);
    }
  };

  return (
    <Portal id="portal-modal">
      <Container onClick={handleOuterClick} data-testid="modal">
        <Wrapper>
          <CloseButton onClick={() => setIsOpen(false)}>
            <CloseIcon />
          </CloseButton>
          {children}
        </Wrapper>
      </Container>
    </Portal>
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: ${theme.modalBackGround};
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

const Wrapper = styled.div`
  position: fixed;
  top: 45%;
  left: 50%;
  width: 60vw;
  height: 50vh;
  max-width: 500px;
  max-height: 280px;
  padding: 32px 20px;
  border: none;
  border-radius: 10px;
  background-color: ${theme.gray};
  -webkit-box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000,
    5px 5px 15px 5px rgba(153, 153, 153, 0);
  box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000,
    5px 5px 15px 5px rgba(153, 153, 153, 0);
  transform: translate(-50%, -50%);
  cursor: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  overflow: visible;
  top: 10px;
  left: 10px;
  padding: 0;
  border: none;
  border-radius: 0;
  background: inherit;
  box-shadow: none;
  cursor: pointer;
`;

const CloseIcon = styled(AiOutlineClose)`
  font-size: 20px;
`;
