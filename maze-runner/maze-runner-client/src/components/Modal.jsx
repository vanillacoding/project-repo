import React from 'react';
import PropTypes from 'prop-types';

import style from './Modal.module.css';
import Portal from './Portal';

const Modal = ({ onClose, children }) => {
  return (
    <Portal elementId="modal-root">
      <div className={style.Modal}>
        <div className={style.ModalDimmer} onClick={onClose}></div>
        <div className={style.ModalContainer}>{children}</div>
      </div>
    </Portal>
  );
};

Modal.defaultProps = {
  onClose: () => {},
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func,
};

export default Modal;
