import React from "react";

import styles from "../styles/Container.module.css";

const Container = ({ className, children }) => {
  return (
      <div className={`${styles.border} ${className}`}>
        {children}
      </div>
  );
};

export default Container;
