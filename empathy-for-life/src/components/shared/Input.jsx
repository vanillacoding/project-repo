import React from "react";

import styles from "../styles/Input.module.css";

const Input = ({
  title = "",
  labelClassName = "",
  inputClassName = "",
  labelAttr = {},
  inputAttr = {},
}) => {
  const id = title + Date.now()
  return (
    <div className={styles.container}>
      {title
        ? <label
            htmlFor={id}
            className={`${styles.title} ${labelClassName}`}
            {...labelAttr}
          >
            {title}
          </label>
        : null
      }
      <input
        id={id}
        className={`${styles.textInput} ${inputClassName}`}
        type="text"
        {...inputAttr}
      />
    </div>
  );
};

export default Input;
