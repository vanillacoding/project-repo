import React from 'react';
import { FaDoorClosed } from 'react-icons/fa';
import { ImKey } from 'react-icons/im';
import { convertTimeFormat } from '../utils/index';
import PropTypes from 'prop-types';
import styles from './GameHeader.module.scss';

const ICON_SIZE = '1.5em';

const GameHeader = ({
  minutes,
  seconds,
  onToggleHint,
  onToggleQuit,
  children,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.icons}>
        <div onClick={onToggleHint}><ImKey size={ICON_SIZE} /></div>
        <div className={styles.timeLimit}>
          {convertTimeFormat(minutes, seconds)}
        </div>
        <div onClick={onToggleQuit}><FaDoorClosed size={ICON_SIZE} /></div>
      </div>
      <div className={styles.contents}>
        {children}
      </div>
    </div>
  );
};

GameHeader.propTypes = {
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  onToggleHint: PropTypes.func.isRequired,
  onToggleQuit: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default GameHeader;
