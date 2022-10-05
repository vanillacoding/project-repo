import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { render, screen, fireEvent } from '@testing-library/react';

import * as quizReducers from '../../store/quizSlice';
import * as battleReducers from '../../store/battleSlice';

import ErrorBox from '../ErrorBox';

jest.mock('react-redux');

describe('<ErrorBox /> : render', () => {
  const mockStore = configureStore([]);
  const store = mockStore({});
  const mockupHistoryFunc = jest.fn();
  const MOCK_ERROR_MESSAGE = '에러가 발생했습니다';

  it('should render error message', () => {
    useDispatch.mockImplementation(() => function dispatch() {});
    useHistory.mockImplementation(() => ({
      push: mockupHistoryFunc,
    }));
    useLocation.mockImplementation(() => ({
      state: {
        error: MOCK_ERROR_MESSAGE,
      },
    }));

    render(<ErrorBox />);

    expect(screen.getByText(`🙈${MOCK_ERROR_MESSAGE}`)).toBeInTheDocument();
  });

  it('should be executed onClick function when clicked button', () => {
    useDispatch.mockImplementation(() => function dispatch() {});
    useHistory.mockImplementation(() => ({
      push: mockupHistoryFunc,
    }));
    useLocation.mockImplementation(() => ({
      state: {
        error: MOCK_ERROR_MESSAGE,
      },
    }));

    render(<ErrorBox />);

    const button = screen.getByText('메뉴로 돌아가기');
    fireEvent.click(button);

    store.dispatch(quizReducers.changeGameStatus());
    store.dispatch(quizReducers.resetQuizForGameOver());
    store.dispatch(battleReducers.resetBattleForGameOver());
    const actions = store.getActions();

    expect(actions[0].type).toEqual('quiz/changeGameStatus');
    expect(actions[1].type).toEqual('quiz/resetQuizForGameOver');
    expect(actions[2].type).toEqual('battle/resetBattleForGameOver');

    store.clearActions();
  });
});
