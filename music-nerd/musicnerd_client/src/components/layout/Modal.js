import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Loading from './Loading';

import * as colors from '../../lib/colors';

const Modal = ({
  loading,
  shouldModalOpen,
  closeModal,
  title,
  children
}) => {
  const modalStyle = shouldModalOpen ? { display: 'block' } : { display: 'none' };

  return (
    <Fragment>
      <ModalOverlay
        style={modalStyle}
        onClick={closeModal}
      />
      <ModalWindow style={modalStyle}>
        {loading ?
          <Loading color='black' /> :
          <Fragment>
            <ModalHeader>
              <h1>{title}</h1>
              <h3 onClick={closeModal}>X</h3>
            </ModalHeader>
            <ModalContent>
              {children}
            </ModalContent>
          </Fragment>}
      </ModalWindow>
    </Fragment>
  );
};

const ModalOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  height: 100vh;
  width: 100vw;
  z-index: 1;
`;

const ModalWindow = styled.div`
  padding: 1rem;
  position: absolute;
  background-color: ${colors.MAIN_TEXT_COLOR};
  color: ${colors.DEFAULT_GLOBAL_FONT_COLOR};
  text-align: center;
  z-index: 2;
`;

const ModalHeader = styled.div`
  display: flex;
  h3 {
    position: absolute;
    right: 1rem;
    cursor: pointer
  }
`;

const ModalContent = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

Modal.propTypes = {
  loading: PropTypes.bool,
  shouldModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func,
  title: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default Modal;
