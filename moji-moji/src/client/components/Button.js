import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ className, onClick, onSubmit, children }) => {
  return (
    <Fragment>
      <button
        type="button"
        className={`Button ${className}`}
        onClick={onClick}
        onSubmit={onSubmit}
      >
        {children}
      </button>
    </Fragment>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  onSubmit: PropTypes.func,
  children: PropTypes.node.isRequired
};

Button.defaultProps = {
  className: 'Button',
  onClick: () => {},
  onSubmit: () => {},
};

export default Button;
