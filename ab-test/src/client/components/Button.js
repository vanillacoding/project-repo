import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ onClick, disableStatus, children }) => (
  <button
    type="button"
    className="btn-add"
    onClick={onClick}
    disabled={disableStatus}
  >
    { children }
  </button>
);

export default Button;

Button.propTypes = {
  onClick: PropTypes.func,
  disableStatus: PropTypes.bool,
};
