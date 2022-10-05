import React from "react";

import styles from "../styles/HeaderBoard.module.css";

const HeaderBoard = ({ boardClassName = "", barClassName = "", children, ...rest }) => {

  return (
    <div
      className={`${styles.board} ${boardClassName}`}
      {...rest}
    >
      <div
        className={`${styles.bar} ${barClassName}`}
      />
      {children}
    </div>
  );
};

export default HeaderBoard;
