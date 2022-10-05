import React, { useEffect } from "react";
import styled from "styled-components";

const Modal = ({ children, onBackgroundClick, backgroundColor }) => {
  useEffect(() => {
    document.body.classList.add("hidden");

    return () => {
      document.body.classList.remove("hidden");
    };
  }, []);

  return (
    <>
      <ModalBackground 
        onClick={onBackgroundClick} 
        color={backgroundColor} 
      />
      <ModalChildrenField>
        {children}
      </ModalChildrenField>
    </>
  );
};

const ModalBackground = styled.div`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${({ color }) => color};
  z-index: 1;
  overflow: hidden;
`;

const ModalChildrenField = styled.div`
  display: block;
  position: fixed;
  overflow-x: hidden;
  overflow-y: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

export default Modal;
