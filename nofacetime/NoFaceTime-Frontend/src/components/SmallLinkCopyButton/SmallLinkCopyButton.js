import React from 'react';
import styles from './SmallLinkCopyButton.module.css';

const SmallButton = ({
  buttonName,
  link,
  clickEventFunction
}) => {
  return (
    <button
      className={styles.SmallLinkCopyButton}
      id={link}
      value={link}
      onClick={(e) => clickEventFunction(e)}>
      {buttonName}
    </button>
  );
};

export default SmallButton;
