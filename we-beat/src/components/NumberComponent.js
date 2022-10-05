import React from 'react';
import styles from '../styles/App.module.scss';

const NumberComponent = (props) => {
  return (
    props.noteCount.map((note, index) => (
      <li
        className={
          props.currentNoteIndex === index ?
            `${styles.activeNumber}` : `noteCount${index}`
        }
        key={index}
      >
        {index + 1}
      </li>
    ))
  );
};

export default NumberComponent;
