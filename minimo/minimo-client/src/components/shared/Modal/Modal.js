import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import * as ICON from 'react-feather';

export default function Modal({ children, handleClose }) {
  return ReactDOM.createPortal(
    <>
      <ModalBackground
        onClick={handleClose}
        onDragEnter={(e) => e.stopPropagation()}
      />
      <ModalContainer>
        <ModalHeader>
          <Title>{' '}</Title>
          <ModalClose onClick={handleClose}>
            <ICON.X color='darkgrey' />
          </ModalClose>
        </ModalHeader>
        <ModalContent>
          {children}
        </ModalContent>
      </ModalContainer>
    </>,
    document.getElementById('modal'),
  );
}

const ModalHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  text-align: right;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgb(243, 243, 243);
  box-shadow: 4px 17px 20px 0px rgb(0 0 0 / 8%);
  padding: 12px 12px;
  box-sizing: border-box;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  cursor: pointer;
`;

const ModalContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  /* pointer-events: auto; */
  min-width: 500px;
  min-height: fit-content;
  /* max-width: 100%; */
  /* background-color: #fff; */
  /* background-clip: padding-box; */
  /* border: 1px solid rgba(0, 0, 0, 0.2); */
  border-radius: 0.3rem;
  outline: 0;
  padding: 2rem;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 1rem;
  margin-left: 1rem;
  font-family: sans-serif;
`;

const ModalClose = styled.button`
  all: unset;
  cursor: pointer;
`;
