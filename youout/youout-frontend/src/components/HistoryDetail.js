import React from 'react';
import {
  convertMsToMinutes,
  convertMsToSeconds,
  convertTimeFormat,
} from '../utils';
import PropTypes from 'prop-types';
import style from './HistoryDetail.module.scss';

const HistoryDetail = ({ historyInfo }) => {
  return (
    <div className={style.container}>
      <h5 className={style.title}>게임 이름</h5>
      <div className={style.gameName}>{historyInfo.game.name}</div>
      <h5 className={style.title}>같이 플레이한 유저들</h5>
      <ul className={style.players}>
        {
          historyInfo.users.map((user) => {
            const minutes = convertMsToMinutes(user.clearTime) - 1;
            const seconds = convertMsToSeconds(user.clearTime);
            const formated = convertTimeFormat(minutes, seconds);

            return (
              <li key={user._id}>
                <img src={user.id.image} />
                {user.id.name}
                {formated} 남기고 탈출 했슴둥!
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

HistoryDetail.propTypes = {
  historyInfo: PropTypes.shape({
    game: PropTypes.shape({
      name: PropTypes.string
    }),
    users: PropTypes.array
  }).isRequired,
};

export default HistoryDetail;
