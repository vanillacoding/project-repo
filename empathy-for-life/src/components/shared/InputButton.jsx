import React from "react";

import styles from "../styles/InputButton.module.css";

const InputButton = ({ text, className, ...rest }) => {
  return (
    <input
      className={`${styles.inputButton} ${className}`}
      type="submit"
      value={text}
      {...rest}
    />
  );
};

export default InputButton;
