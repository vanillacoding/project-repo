import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import Header from './Header';
import Input from './Input';
import Button from './Button';
import QuizForm from './QuizForm';
import DetailGameInfo from './DetailGameInfo';
import Map from './Map';
import api from '../utils/api';
import { validateLength } from '../utils/validation';
import { pageName, pageNavigation } from '../constants/page';
import PropTypes from 'prop-types';
import styles from './NewGameForm.module.scss';

const ICON_SIZE = '3em';

const NewGameForm = ({
  onCreateNewGame,
}) => {
  const { game_id } = useParams();
  const [ page, setPage ] = useState(1);
  const [gameInfo, setGameInfo] = useState({
    name: '',
    address: '',
    addressDetail: '',
    location: {},
    timeLimit: '',
  });
  const [ quizList, setQuizList ] = useState([]);
  const [ quizCount, setQuizCount ] = useState(5);
  const [ currentQuizIndex, setCurrentQuizIndex ] = useState(-1);
  const [ validationMessage, setValidationMessage ] = useState({
    name: '',
    addressDetail: '',
    keyword: '',
    quiz: '',
    answer: '',
    hint: '',
  });

  useEffect(() => {
    if (!game_id) return;

    (async () => {
      const path = `/games/${game_id}`;
      const {
        name,
        address,
        addressDetail,
        location,
        timeLimit,
        quizList
      } = await api.get({ path });

      setGameInfo({
        name,
        address,
        addressDetail,
        location,
        timeLimit
      });
      setQuizList(quizList);
      setQuizCount(quizList.length);
    })();
  }, []);

  const handleChangeInputs = ({ target }) => {
    const { name, value } = target;

    switch (name) {
      case 'name':
        setValidationMessage({
          ...validationMessage,
          name: validateLength(3, 30, 'Name', value),
        });
        break;
      case 'addressDetail':
        setValidationMessage({
          ...validationMessage,
          addressDetail: validateLength(3, 30, 'Address', value),
        });
        break;
    }

    setGameInfo({
      ...gameInfo,
      [name]: value,
    });
  };

  const handleIncreaseCounter = () => {
    setQuizCount((prev) => {
      return prev + 1 > 10 ? prev : prev + 1;
    });
  };

  const handleDecreaseCounter = () => {
    setQuizCount((prev) => {
      return prev - 1 < 2 ? prev : prev - 1;
    });
  };

  const handlePageNavigation = ({ target }) => {
    const isAllInputsFilled = gameInfo.name
      && gameInfo.address
      && gameInfo.addressDetail
      && gameInfo.timeLimit;
    const isAllQuizesFilled = quizList.every((quiz) => quiz.quiz);

    if (page === 1 && !isAllInputsFilled) return;
    if (page === 2 && !isAllQuizesFilled) return;

    const { name } = target;
    name === pageNavigation.PREV
      ? setPage((prev) => prev - 1)
      : setPage((prev) => prev + 1);
  };

  const handleQuizInputButton = (index) => {
    setCurrentQuizIndex(index);
    setPage(pageName.QUIZ_FORM);
  };

  const handleSubmitButton = () => {
    onCreateNewGame({
      ...gameInfo,
      quizList,
    }, game_id ? game_id : '');
  };

  return (
    <>
      <Header title='?????? ?????????'>
        <form className={styles.container}>
          {
            page === pageName.FIRST &&
            <div className={styles.firstForm}>
              <Input
                type='text'
                id='name'
                labelName='?????? ??????'
                value={gameInfo['name']}
                name='name'
                placeholder='?????? ??????'
                onChange={handleChangeInputs}
              />
              {
                validationMessage.name &&
                <div className={styles.validationMessage}>
                  {validationMessage.name}
                </div>
              }
              <Button
                className='basicButton'
                text='??? ?????? ????????????'
                onClick={() => setPage(pageName.MAP)}
              />
              <Input
                type='text'
                id='address'
                labelName='??????'
                value={gameInfo['address']}
                name='address'
                placeholder='???) ?????????'
                onChange={handleChangeInputs}
                disabled
              />
              <Input
                type='text'
                id='address'
                labelName=''
                value={gameInfo['addressDetail']}
                name='addressDetail'
                placeholder='?????? ??????'
                onChange={handleChangeInputs}
              />
              {
                validationMessage.addressDetail &&
                <div className={styles.validationMessage}>
                  {validationMessage.addressDetail}
                </div>
              }
              <Input
                type='select'
                labelName='?????? ??????'
                name='timeLimit'
                id='timeLimit'
                onChange={handleChangeInputs}
              />
              <div className={styles.quizCounter}>
                <span className={styles.counterName}>?????? ??????</span>
                <div className={styles.counter}>
                  <Button
                    className='circleButton'
                    onClick={handleDecreaseCounter}
                    text={<AiFillMinusCircle size={ICON_SIZE} />}
                  />
                  <span className={styles.quizCount}>{quizCount}</span>
                  <Button
                    className='circleButton'
                    onClick={handleIncreaseCounter}
                    text={<AiFillPlusCircle size={ICON_SIZE} />}
                  />
                </div>
              </div>
              <Button
                className='naviButton'
                name={pageNavigation.NEXT}
                text='Next'
                onClick={handlePageNavigation}
              />
            </div>
          }
          {
            page === pageName.SECOND &&
            <div className={styles.secondForm}>
              {
                Array(quizCount).fill(0).map((quiz, index) => (
                  <div className={styles.quizContainer} key={index}>
                    <div className={styles.quizDone}>
                      { quizList[index]?.quiz ? '???' : '???' }
                    </div>
                    <Button
                      className='basicButton'
                      text={quizList[index]?.quiz || '????????? ???????????????.'}
                      onClick={() => handleQuizInputButton(index)}
                    />
                  </div>
                ))
              }
              <div className={styles.buttonContainer}>
                <Button
                  className='naviButton'
                  name={pageNavigation.PREV}
                  text='Prev'
                  onClick={handlePageNavigation}
                />
                <Button
                  className='naviButton'
                  name={pageNavigation.NEXT}
                  text='Next'
                  onClick={handlePageNavigation}
                />
              </div>
            </div>
          }
          {
            page === pageName.THIRD &&
            <DetailGameInfo
              quizList={quizList}
              gameInfo={gameInfo}
            >
              <div className={styles.buttonContainer}>
                <Button
                  className='naviButton'
                  name={pageNavigation.PREV}
                  text='Prev'
                  onClick={handlePageNavigation}
                />
                <Button
                  className='naviButton'
                  text='?????????'
                  onClick={handleSubmitButton}
                />
              </div>
            </DetailGameInfo>
          }
          {
            page === pageName.QUIZ_FORM &&
            <QuizForm
              index={currentQuizIndex}
              setPage={setPage}
              quizList={quizList}
              setQuizList={setQuizList}
              validationMessage={validationMessage}
              setValidationMessage={setValidationMessage}
            />
          }
          {
            page === pageName.MAP &&
            <Map
              setPage={setPage}
              gameInfo={gameInfo}
              setGameInfo={setGameInfo}
            />
          }
        </form>
      </Header>
    </>
  );
};

NewGameForm.propTypes = {
  onCreateNewGame: PropTypes.func.isRequired,
};

export default NewGameForm;
