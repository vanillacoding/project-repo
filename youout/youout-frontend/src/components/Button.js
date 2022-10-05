import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const DEFAULT_BUTTON = 'defaultButton';

const Button = ({
  className,
  onClick,
  text,
  ...attrs
}) => {
  return (
    <button
      type='button'
      className={styles[className]}
      onClick={onClick}
      {...attrs}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  className: DEFAULT_BUTTON,
};

export default React.memo(Button);
