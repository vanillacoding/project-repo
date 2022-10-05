import React from 'react';
import PropTypes from 'prop-types';

import style from './MazeOption.module.css';

const MazeOption = ({ item }) => {
  const [key, value] = Object.entries(item)[0];

  return (
    <div className={style.MazeOption}>
      <span className={style.MazeOptionText}>{`${key}: ${value}`}</span>
    </div>
  );
};

MazeOption.propTypes = {
  item: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default MazeOption;
