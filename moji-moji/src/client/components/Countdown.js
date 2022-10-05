import React from 'react';
import PropTypes from 'prop-types';
import './Countdown.scss';

const Countdown = ({ countdown, currentEmoji }) => {
  return (
    <div className={`Countdown count${countdown}`}>
      <span className={`Countdown__text count${countdown}`}>
        {countdown === -1 ? currentEmoji.emoji : countdown}
      </span>
      <p className="Countdown__message">
        {countdown === -1 ? 'Find This Item!' : 'Prepare For Hunting!'}
      </p>
    </div>
  );
};

Countdown.propTypes = {
  countdown: PropTypes.number,
  currentEmoji: PropTypes.instanceOf(Object)
};

Countdown.defaultProps = {
  countdown: 0,
  currentEmoji: {}
};

export default Countdown;
