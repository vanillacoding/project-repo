import React from 'react';
import styles from './CompleteButton.module.css';

const CompleteButton = ({
  buttonName,
  onClick
}) => {
  return (
    <button
      className={styles.CompleteButton}
      onClick={onClick}>
      {buttonName}
    </button>
  );
};

export default CompleteButton;
