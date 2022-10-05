import React from "react";

import styles from "../styles/ModalHeader.module.css";

const ModalHeader = ({ className, text, children }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <h1 className={styles.heading}>{text}</h1>
      {children}
    </div>
  );
};

export default ModalHeader;
