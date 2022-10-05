import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.25);
  z-index: 100;
  cursor: pointer;
`;

const ModalBlock = styled.div`
  width: 20rem;
  padding: 1.5rem;
  border-radius: 4px;
  background: white;
  line-height: 1.6;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.125);
  cursor: default;
`;

type ModalProps = {
  onOverlayClick: () => void;
  children: ReactNode;
};

const Modal = ({ onOverlayClick, children }: ModalProps) => (
  <Overlay onClick={onOverlayClick}>
    <ModalBlock>
      {children}
    </ModalBlock>
  </Overlay>
);

export default Modal;
