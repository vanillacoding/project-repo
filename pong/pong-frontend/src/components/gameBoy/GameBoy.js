import React from "react";
import PropTypes from "prop-types";
import styles from "./GameBoy.module.css";

const GameBoy = (props) => {
  return (
    <div className={styles.gameBoyWrapper} >
      <div className={styles.gameBoyHead} >
        <div className={styles.gameBoardWrapper} >
          {props.children}
        </div>
        <div className={styles.gameBoyMark} >
          <h4>GAMEBOY <span>PONG!</span></h4>
        </div>
      </div>
    </div>
  );
};

export default GameBoy;

GameBoy.propTypes = {
  children: PropTypes.node.isRequired,
};
