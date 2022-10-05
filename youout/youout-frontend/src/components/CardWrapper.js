import React, { useEffect } from 'react';
import Card, { Popup } from './Card';
import ToastMessage from './ToastMessage';
import { DELAY, GAME_PHASE } from '../constants/game';
import PropTypes from 'prop-types';
import styles from './CardWrapper.module.scss';

const CardWrapper = ({
  keyword,
  quiz,
  gamePhase,
  userAnswer,
  resultMessage,
  userAlertList,
  isCardShowing,
  onSetCardShowing,
  onSubmitAnswer,
  onSetAnswer,
  recognizedKeywordList,
}) => {
  useEffect(() => {
    const timerId = setTimeout(() => {
      onSetCardShowing(false);
    }, DELAY.THREE_SEC);

    return () => clearTimeout(timerId);
  }, [isCardShowing]);

  return (
    <div className={styles.container}>
      {
        gamePhase === GAME_PHASE.KEYWORD
          ? isCardShowing
            ? <Card
                gamePhase={gamePhase}
                title={keyword}
              />
            : <Popup
                className='keywordPopup'
                content={keyword}
                resultMessage={resultMessage}
              >
                <div className={styles.keywordContainer}>
                  {
                    recognizedKeywordList.length > 0 &&
                    recognizedKeywordList.map((keyword, index) => (
                      <div key={index} className={styles.keyword}>
                        {keyword}
                      </div>
                    ))
                  }
                </div>
              </Popup>
          : <Card
              gamePhase={gamePhase}
              title={quiz}
              buttonText='도전'
              onClick={onSubmitAnswer}
            >
              <span>{resultMessage}</span>
              <input
                type='text'
                placeholder='요기에 정답✍️'
                value={userAnswer}
                onChange={onSetAnswer}
              />
            </Card>
      }
      <div className={styles.toastContainer}>
        {
          userAlertList.length > 0 &&
          userAlertList.map((user, index) => (
            <ToastMessage
              key={index}
              username={user.username}
              gameIndex={user.gameIndex + 1}
              color={user.color}
            />
          ))
        }
      </div>
    </div>
  );
};

CardWrapper.propTypes = {
  keyword: PropTypes.string.isRequired,
  quiz: PropTypes.string.isRequired,
  gamePhase: PropTypes.string.isRequired,
  userAnswer: PropTypes.string.isRequired,
  resultMessage: PropTypes.string.isRequired,
  userAlertList: PropTypes.array.isRequired,
  isCardShowing: PropTypes.bool.isRequired,
  onSetCardShowing: PropTypes.func.isRequired,
  onSubmitAnswer: PropTypes.func.isRequired,
  onSetAnswer: PropTypes.func.isRequired,
  recognizedKeywordList: PropTypes.arrayOf(PropTypes.string),
};

export default CardWrapper;
