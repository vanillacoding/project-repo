import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen, fireEvent } from '@testing-library/react';

import { GAME_STATUS } from '../../constants/game';
import * as reducers from '../../store/quizSlice';
import InputBox from '../InputBox';

const MOCK_URL = '/banana.jpg';
const MOCK_VALUE = '바나나';

jest.mock('react-redux');

describe('<InputBox /> : render form', () => {
  it('should render form of InputBox', () => {
    useSelector.mockImplementation((selector) =>
      selector({
        quiz: {
          quizCollection: {
            byId: {
              0: { imgUrl: MOCK_URL, answer: MOCK_VALUE },
            },
            allIds: [0],
          },
          currentQuizIndex: 0,
          gameStatus: GAME_STATUS.ANSWER_GUESS_TIME,
        },
      }),
    );

    render(<InputBox />);

    expect(screen.getByPlaceholderText('Guess What')).toBeInTheDocument();
  });

  it('should not render form of InputBox', () => {
    useSelector.mockImplementation((selector) =>
      selector({
        quiz: {
          quizCollection: {
            byId: {
              0: { imgUrl: MOCK_URL, answer: MOCK_VALUE },
            },
            allIds: [0],
          },
          currentQuizIndex: 0,
          gameStatus: GAME_STATUS.ICE_BREAKING_TIME,
        },
      }),
    );

    const { container } = render(<InputBox />);

    expect(container.firstChild).toBeEmptyDOMElement();
  });
});

describe('<InputBox /> : submit correct value', () => {
  const mockStore = configureStore([]);
  const store = mockStore({});

  it('should reset value of input if submitted value is correct with answer', () => {
    useDispatch.mockImplementation(() => function dispatch() {});
    useSelector.mockImplementation((selector) =>
      selector({
        quiz: {
          quizCollection: {
            byId: {
              0: { imgUrl: MOCK_URL, answer: MOCK_VALUE },
            },
            allIds: [0],
          },
          currentQuizIndex: 0,
          gameStatus: GAME_STATUS.ANSWER_GUESS_TIME,
        },
      }),
    );
    render(<InputBox />);

    const input = screen.getByPlaceholderText('Guess What');
    const form = screen.getByTestId('form');

    fireEvent.change(input, {
      target: {
        value: MOCK_VALUE,
      },
    });

    fireEvent.submit(form);
    expect(input).toHaveAttribute('value', '');

    store.dispatch(reducers.goToNextStep());
    const actions = store.getActions();

    expect(actions[0].type).toEqual('quiz/goToNextStep');

    store.clearActions();
  });
});

describe('<InputBox /> : submit incorrect value', () => {
  const mockStore = configureStore([]);
  const store = mockStore({});

  it('should return if submitted value is empty', () => {
    useDispatch.mockImplementation(() => function dispatch() {});
    useSelector.mockImplementation((selector) =>
      selector({
        quiz: {
          quizCollection: {
            byId: {
              0: { imgUrl: MOCK_URL, answer: MOCK_VALUE },
            },
            allIds: [0],
          },
          currentQuizIndex: 0,
          gameStatus: GAME_STATUS.ANSWER_GUESS_TIME,
        },
      }),
    );
    render(<InputBox />);

    const input = screen.getByPlaceholderText('Guess What');
    const form = screen.getByTestId('form');

    fireEvent.change(input, {
      target: {
        value: '',
      },
    });

    fireEvent.submit(form);

    store.dispatch(reducers.changeMessage('Empty Value'));
    const actions = store.getActions();

    expect(actions[0].type).toEqual('quiz/changeMessage');
    expect(actions[0].payload).toEqual('Empty Value');

    store.clearActions();
  });

  it('should reset value of input if submitted value is not korean', () => {
    useDispatch.mockImplementation(() => function dispatch() {});
    useSelector.mockImplementation((selector) =>
      selector({
        quiz: {
          quizCollection: {
            byId: {
              0: { imgUrl: MOCK_URL, answer: MOCK_VALUE },
            },
            allIds: [0],
          },
          currentQuizIndex: 0,
          gameStatus: GAME_STATUS.ANSWER_GUESS_TIME,
        },
      }),
    );
    render(<InputBox />);

    const input = screen.getByPlaceholderText('Guess What');
    const form = screen.getByTestId('form');

    fireEvent.change(input, {
      target: {
        value: 'banana',
      },
    });

    fireEvent.submit(form);
    expect(input).toHaveAttribute('value', '');

    store.dispatch(reducers.changeMessage('Not Korean'));
    const actions = store.getActions();

    expect(actions[0].type).toEqual('quiz/changeMessage');
    expect(actions[0].payload).toEqual('Not Korean');

    store.clearActions();
  });

  it('should reset value of input if submitted value is all wrong ', () => {
    useDispatch.mockImplementation(() => function dispatch() {});
    useSelector.mockImplementation((selector) =>
      selector({
        quiz: {
          quizCollection: {
            byId: {
              0: { imgUrl: MOCK_URL, answer: MOCK_VALUE },
            },
            allIds: [0],
          },
          currentQuizIndex: 0,
          gameStatus: GAME_STATUS.ANSWER_GUESS_TIME,
        },
      }),
    );
    render(<InputBox />);

    const input = screen.getByPlaceholderText('Guess What');
    const form = screen.getByTestId('form');
    const WRONG_ANSWER = '복숭아';

    fireEvent.change(input, {
      target: {
        value: WRONG_ANSWER,
      },
    });

    fireEvent.submit(form);
    expect(input).toHaveAttribute('value', '');

    store.dispatch(reducers.changeMessage('All Wrong!'));
    const actions = store.getActions();

    expect(actions[0].type).toEqual('quiz/changeMessage');
    expect(actions[0].payload).toEqual('All Wrong!');

    store.clearActions();
  });
});
