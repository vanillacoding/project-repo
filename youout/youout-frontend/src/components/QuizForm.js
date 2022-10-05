import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import { validateLength, validateSpace } from '../utils/validation';
import { pageName } from '../constants/page';
import PropTypes from 'prop-types';
import styles from './NewGameForm.module.scss';

const QuizForm = ({
  index,
  setPage,
  quizList,
  setQuizList,
  validationMessage,
  setValidationMessage,
}) => {
  const memo = quizList[index];
  const [ quiz, setQuiz ] = useState(memo || {
    index,
    keyword: '',
    quiz: '',
    answer: '',
    hint: '',
  });

  const handleChangeQuizInputs = ({ target }) => {
    const { name, value } = target;

    switch (name) {
      case 'keyword':
        setValidationMessage({
          ...validationMessage,
          keyword: validateLength(1, 20, 'Keyword', value) || validateSpace(value),
        });
        break;
      case 'quiz':
        setValidationMessage({
          ...validationMessage,
          quiz: validateLength(3, 50, 'Quiz', value),
        });
        break;
      case 'answer':
        setValidationMessage({
          ...validationMessage,
          answer: validateLength(1, 50, 'Answer', value),
        });
        break;
      case 'hint':
        setValidationMessage({
          ...validationMessage,
          hint: validateLength(3, 50, 'Hint', value),
        });
        break;
    }

    setQuiz({
      index,
      ...quiz,
      [name]: value,
    });
  };

  const handleSubmitQuiz = () => {
    const isAllInputsFilled = quiz.keyword
      && quiz.quiz
      && quiz.answer
      && quiz.hint;

    if (!isAllInputsFilled) return;

    const prevQuizList = [...quizList];
    prevQuizList[index] = quiz;
    setQuizList(prevQuizList);
    setPage(pageName.SECOND);
  };

  return (
    <div className={styles.quizForm}>
      <Input
        type='text'
        id='keyword'
        labelName='다음 문제를 보여줄 사진 키워드'
        value={quiz['keyword']}
        name='keyword'
        placeholder='예) 바나나'
        onChange={handleChangeQuizInputs}
      />
      {
        validationMessage.keyword &&
        <div className={styles.validationMessage}>
          {validationMessage.keyword}
        </div>
      }
      <Input
        type='text'
        id='quiz'
        labelName='문제를 입력하세요.'
        value={quiz['quiz']}
        name='quiz'
        placeholder='예) 바나나를 먹은 사람은?'
        onChange={handleChangeQuizInputs}
      />
      {
        validationMessage.quiz &&
        <div className={styles.validationMessage}>
          {validationMessage.quiz}
        </div>
      }
      <Input
        type='text'
        id='answer'
        labelName='답을 입력하세요.'
        value={quiz['answer']}
        name='answer'
        placeholder='예) 나'
        onChange={handleChangeQuizInputs}
      />
      {
        validationMessage.answer &&
        <div className={styles.validationMessage}>
          {validationMessage.answer}
        </div>
      }
      <Input
        type='text'
        id='hint'
        labelName='힌트를 입력하세요.'
        value={quiz['hint']}
        name='hint'
        placeholder='예) 그런거 안줘!'
        onChange={handleChangeQuizInputs}
      />
      {
        validationMessage.hint &&
        <div className={styles.validationMessage}>
          {validationMessage.hint}
        </div>
      }
      <Button
        className='basicButton'
        text='완료'
        onClick={handleSubmitQuiz}
      />
    </div>
  );
};

QuizForm.propTypes = {
  index: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  quizList: PropTypes.array.isRequired,
  setQuizList: PropTypes.func.isRequired,
  validationMessage: PropTypes.shape({
    keyword: PropTypes.string,
    quiz: PropTypes.string,
    answer: PropTypes.string,
    hint: PropTypes.string,
  }),
  setValidationMessage: PropTypes.func.isRequired,
};

export default QuizForm;
