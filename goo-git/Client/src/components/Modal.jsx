import React from 'react';
import { createPortal } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Overlay, ModalContainer } from '../styledComponents/Modal.styled';

export default function Modal({
  isOpen,
  children,
  toggleModal,
  theme,
}) {
  if (!isOpen) return null;

  return createPortal(
    <>
      <Overlay onClick={toggleModal} />
      <ThemeProvider theme={theme}>
        <ModalContainer>
          {children}
        </ModalContainer>
      </ThemeProvider>
    </>,
    document.getElementById('portal')
  );
}
