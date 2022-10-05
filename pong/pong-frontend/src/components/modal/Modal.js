import React from "react";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";

const Modal = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.modalWrapper}>
        <div className={styles.arc}>
          <div className={styles.arc2}>
          </div>
        </div>
      </div>
      <div className={styles.contentWrapper}>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};
