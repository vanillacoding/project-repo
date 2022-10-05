import React from 'react';
import Header from './Header';
import PropTypes from 'prop-types';
import styles from './WaitingRoom.module.scss';

const Counter = ({ count }) => {
  return (
    <div className={styles.counter}>
      {count >= 0 ? count : ''}
    </div>
  );
};

const Users = ({ users }) => {
  return (
    <ul className={styles.users}>
      <p>게임이 시작되길 마냥 기다리는 중👀</p>
      {
        users.map((user, index) => (
          <li key={user.socketId}>
            <img src={user.image} className={styles.userIcon}/>
            {user.username}
            {index === 0 ? ' (방장)' : ''}
          </li>
        ))
      }
    </ul>
  );
};

const StartButton = ({ isMaster, onStart }) => {
  return (
    isMaster
      ? <button className={styles.startButton} onClick={onStart}>시작</button>
      : <button className={styles.startButton}>대기</button>
  );
};

const WaitingRoom = ({ users, isMaster, onStart, count }) => {
  return (
    <Header title='대기방'>
      <Counter count={count} />
      <div className={styles.waitingRoom}>
        <Users users={users} isMaster={isMaster} />
        <StartButton isMaster={isMaster} onStart={onStart} />
      </div>
    </Header>
  );
};

Counter.propTypes = {
  count: PropTypes.number.isRequired,
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
};

StartButton.propTypes = {
  isMaster: PropTypes.bool,
  onStart: PropTypes.func.isRequired,
};

WaitingRoom.propTypes = {
  users: PropTypes.array.isRequired,
  isMaster: PropTypes.bool,
  onStart: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};

export default WaitingRoom;
