import React, { ComponentProps } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../../lib/styles/theme';
import Header from '../../../components/common/Header';

describe('<Header />', () => {
  type HeaderProps = ComponentProps<typeof Header>;

  const renderUI = (props: HeaderProps) => render(
    <ThemeProvider theme={theme}>
      <Router>
        <Header {...props} />
      </Router>
    </ThemeProvider>
  );

  const mockProps: HeaderProps = {
    user: {
      _id: '5e979d7646645630c470fbab',
      name: 'test',
      email: 'test@gmail.com',
      avatar_url: 'https://recap-project.eu/wp-content/uploads/2017/02/default-user.jpg',
      tried_submissions: [],
      solved_problems: [],
      total_point: 0
    },
    onLogout: jest.fn()
  };

  it('should render logo', () => {
    const { getByText } = renderUI(mockProps);

    getByText('PointCode');
  });

  describe('when logged-in', () => {
    it('should render user name & image, logout link', () => {
      const { getByText, getByAltText } = renderUI(mockProps);

      getByText(mockProps.user!.name);
      getByText('로그아웃');
      getByAltText('유저 아바타 이미지');
    });

    it('should call action on logout link click', () => {
      const { getByText } = renderUI(mockProps);

      fireEvent.click(getByText('로그아웃'));
      expect(mockProps.onLogout).toHaveBeenCalledTimes(1);
    });
  });

  describe('when not logged-in', () => {
    it('should render login, signup link', () => {
      const { getByText } = renderUI({ ...mockProps, user: null });

      getByText('로그인');
      getByText('회원가입');
    });
  });
});
