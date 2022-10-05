import React from 'react';
import styles from './ButtonInHeader.module.css';

const ButtonInHeader = () => {
  return (
    <div className={styles.ButtonInHeader}>
      <button className={styles.Button}>
        Sign In
      </button>
    </div>
  );
};

export default ButtonInHeader;
