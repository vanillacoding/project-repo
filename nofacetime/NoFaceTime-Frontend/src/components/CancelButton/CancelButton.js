import React from 'react';
import styles from './CancelButton.module.css';

const CancelButton = ({
  buttonName,
  onClick
}) => {
  const cancel = onClick;

  return (
    <button
      className={styles.CancelButton}
      onClick={cancel}>
      {buttonName}
    </button>
  );
};

export default CancelButton;
