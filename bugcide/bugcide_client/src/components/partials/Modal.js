import React from 'react';

const Modal = (props) => {
  const {
    children,
    onModalClose,
    inputValue,
    onInputChange,
    hasFailMessage,
    failMessage,
    labelMessage01,
    labelMessage02
  } = props;

  return (
    <div className="modal-container">
      <div className="modal-content">
        <button
          type="button"
          className="btn-close"
          onClick={onModalClose}
        >
          X
        </button>
        <label>
          <span className="label-basic">
            Project Name
          </span>
          <input
            type="text"
            value={inputValue}
            onChange={onInputChange}
            className="input-basic"
          />
          {hasFailMessage && (
            <span className="label-info txt-red">
              {failMessage}
            </span>
          )}
          <span className="label-info">
            {labelMessage01}
          </span>
          <span className="label-info">
            {labelMessage02}
          </span>
        </label>
        {children}
      </div>
    </div>
  );
};

export default Modal;
