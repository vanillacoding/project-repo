import React from "react";
import styles from "../styles/PopUpWindow.module.css";
import CloseButton from "../shared/CloseButton";

const PopUpWindow = ({ className, text, onClick, children }) => {
  return (
    <div className={`${styles.popUpContainer} ${className}`}>
      <div className={styles.buttonContainer}>
        <CloseButton onClick={onClick} />
      </div>
      <span className={styles.content}>{text}</span>
      {children}
    </div>
  );
};

export default PopUpWindow;
