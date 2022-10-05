import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Loading from '../layout/Loading';
import Form from '../layout/Form';
import FormInput from '../layout/FormInput';

import * as colors from '../../lib/colors';

const Signup = ({
  error,
  loading,
  requestSignup
}) => {
  const [ user, setUser ] = useState({
    username: '',
    email: '',
    password: '',
    confirmationPassword: ''
  });

  const { username, email, password, confirmationPassword } = user;

  const checkInputCondition = () =>
    (username.length > 1) &&
    (email.includes('@')) &&
    (password.length > 5) &&
    (confirmationPassword.length > 5);
  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = (e, user) => {
    e.preventDefault();
    requestSignup(user);
  };

  return (
    loading ?
      <Loading /> :
      <SignupWrapper>
        <Form title='Sign Up' onSubmit={e => onSubmit(e, user)}>
          <FormInput
            type='text'
            name='username'
            placeholder='Username (max 8 characters)'
            value={username}
            onChange={onChange}
            required
          />
          <FormInput
            type='email'
            name='email'
            placeholder='example@example.com'
            value={email}
            onChange={onChange}
            required
          />
          <FormInput
            type='password'
            name='password'
            placeholder='Password (over 6 characters)'
            minLength='6'
            value={password}
            onChange={onChange}
            required
          />
          <FormInput
            type='password'
            name='confirmationPassword'
            placeholder='Confirm password'
            minLength='6'
            value={confirmationPassword}
            onChange={onChange}
            required
          />
          <ErrorMessage>{error ? error : null}</ErrorMessage>
          <SubmitButton type='submit' value='Register' isActive={checkInputCondition()} />
        </Form>
      </SignupWrapper>
  );
};

const SignupWrapper = styled.section`
  width: 35vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const ErrorMessage = styled.p`
  margin: 2rem 0;
  font-size: 1.6rem;
  height: 3rem;
  width: 70%;
  text-align: center;
  color: ${colors.ERROR_TEXT_COLOR};
`;

const SubmitButton = styled.input`
  border: none;
  border-radius: 2rem;
  background-color: ${colors.HIGHLIGHT_COLOR};
  color: ${colors.MAIN_TEXT_COLOR};
  font-size: 2rem;
  padding: 1rem 1.5rem;
  width: 50%;
  cursor: ${props => !props.isActive ? 'normal' : 'pointer'};
  opacity: ${props => !props.isActive ? 0.5 : 1};

  &:hover {
    box-shadow: ${props => !props.isActive ? 'none' : '0.3rem 0.3rem 0.3rem #52b7ff'};
    transition: all 0.3s;
  }
`;

Signup.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  requestSignup: PropTypes.func.isRequired
};

export default Signup;
