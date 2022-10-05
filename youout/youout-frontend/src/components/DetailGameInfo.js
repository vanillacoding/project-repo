import React from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { convertMsToMinutes } from '../utils';
import PropTypes from 'prop-types';
import styles from './DetailGameInfo.module.scss';

const DetailGameInfo = ({
  quizList,
  gameInfo,
  children,
}) => {
  return (
    <div className={styles.thirdForm}>
      <h5 className={styles.title}>게임 이름</h5>
      <div className={styles.content}>
        {gameInfo.name}
      </div>
      <h5 className={styles.title}>주소</h5>
      <div className={styles.content}>
        {`${gameInfo.address} ${gameInfo.addressDetail}`}
      </div>
      <h5 className={styles.title}>제한시간</h5>
      <div className={styles.content}>
        {`${convertMsToMinutes(gameInfo.timeLimit)}분`}
      </div>
      <h5 className={styles.title}>문제 리스트</h5>
      <ul>
        {
          quizList.map((quiz, index) => (
            <li className={styles.content} key={index}>
              <FaRegCheckCircle /> {quiz.quiz}
            </li>
          ))
        }
      </ul>
      {children}
    </div>
  );
};

DetailGameInfo.propTypes = {
  quizList: PropTypes.arrayOf(PropTypes.shape({
    quiz: PropTypes.string,
  })),
  gameInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    addressDetail: PropTypes.string.isRequired,
    timeLimit: PropTypes.number.isRequired,
  }),
  children: PropTypes.element,
};

export default DetailGameInfo;
