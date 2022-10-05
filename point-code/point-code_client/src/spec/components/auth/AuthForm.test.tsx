import React, { ComponentProps } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../../lib/styles/theme';
import AuthForm from '../../../components/auth/AuthForm';

describe('<AuthForm />', () => {
  type AuthFormProps = ComponentProps<typeof AuthForm>;

  const renderUI = (props: AuthFormProps) => render(
    <ThemeProvider theme={theme}>
      <Router>
        <AuthForm {...props} />
      </Router>
    </ThemeProvider>
  );

  const mockProps: AuthFormProps = {
    mode: 'login',
    form: {
      name: undefined,
      email: '',
      password: '',
      confirmation: undefined
    },
    isLoading: false,
    errorMessage: null,
    onChangeField: () => {},
    onSubmitForm: jest.fn()
  };

  it('should render email & password input', () => {
    const { getByPlaceholderText } = renderUI(mockProps);

    getByPlaceholderText('Email Address');
    getByPlaceholderText('Password');
  });

  describe('when has error message prop', () => {
    it('should render error message', () => {
      const { getByText } = renderUI({ ...mockProps, errorMessage: '빈 칸을 모두 입력하세요.' });

      getByText('빈 칸을 모두 입력하세요.');
    });
  });

  describe('login page', () => {
    it('should render correctly', () => {
      const { getByText, queryByPlaceholderText, getAllByText } = renderUI(mockProps);

      getAllByText('Login');
      getByText('Securely login to your Point Code account');
      getByText('Don’t have an account?');
      expect(queryByPlaceholderText('Name')).not.toBeInTheDocument();
      expect(queryByPlaceholderText('Confirmation')).not.toBeInTheDocument();
    });

    it('should call action on submit button click', () => {
      const { getAllByText } = renderUI(mockProps);

      fireEvent.click(getAllByText('Login')[1]);
      expect(mockProps.onSubmitForm).toHaveBeenCalledTimes(1);
    });
  });

  describe('signup page', () => {
    it('should render correctly', () => {
      const { getByText, getByPlaceholderText, getAllByText } = renderUI({
        ...mockProps,
        mode: 'signup',
        form: { name: '', email: '', password: '', confirmation: '' }
      });

      getAllByText('Sign Up');
      getByText('Complete the below form to create your account');
      getByText('Already a member?');
      getByPlaceholderText('Name');
      getByPlaceholderText('Confirmation');
    });

    it('should call action on submit button click', () => {
      const { getAllByText } = renderUI({
        ...mockProps,
        mode: 'signup',
        form: { name: '', email: '', password: '', confirmation: '' }
      });

      fireEvent.click(getAllByText('Sign Up')[1]);
      expect(mockProps.onSubmitForm).toHaveBeenCalledTimes(2);
    });
  });
});
