import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { GrFormClose } from 'react-icons/gr';
import Button from './Button';

import theme from './styles/theme';

function Modal({ children, setModalOpen }) {
  return (
    <StyledModal>
      {children}
      <Button color={theme.lightGray} onClick={() => setModalOpen(false)}>
        <GrFormClose size='26px' />
      </Button>
    </StyledModal>
  );
}

const StyledModal = styled.div`
  z-index: 999;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    width: 400px;
    height: 260px;
    padding: 18px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 38px;
    background-color: ${({ theme }) => theme.purple};
  }

  form {
    text-align: center;
  }

  h2 {
    font-size: 24px;
    margin-bottom: 18px;
    color: ${({ theme }) => theme.orange};
  }

  h3 {
    font-size: 16px;
    margin-bottom: 32px;
    color: ${({ theme }) => theme.orange};
  }

  input[type='text'],
  input[type='number'],
  input[type='url'],
  input[type='email'] {
    all: unset;
    padding: 14px;
    border-radius: 24px;
    margin-right: 10px;
    color: ${({ theme }) => theme.purple};
    background-color: ${({ theme }) => theme.white};
  }

  input[type='url'] {
    width: 200px;
  }

  input[type='submit'] {
    all: unset;
    cursor: pointer;
    padding: 14px 16px;
    border-radius: 32px;
    font-size: 14px;
    font-weight: 700;
    color: ${({ theme }) => theme.purple};
    background-color: ${({ theme }) => theme.pink};
  }
`;

export default Modal;

Modal.propTypes = {
  setModalOpen: PropTypes.func.isRequired,
  children: PropTypes.node,
};
