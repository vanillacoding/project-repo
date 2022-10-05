import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import logo from '../assets/logo.png';

import Button from './Button';

function Login({ onLogin }) {
  return (
    <Wrapper>
      <img src={logo} alt='logo' />
      <p>친구와 함께하는 술술TALK</p>
      <Button onClick={onLogin}>구글 로그인</Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.purple};

  img {
    width: 300px;
    margin-bottom: 30px;
  }

  p {
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 50px;
    color: ${({ theme }) => theme.white};
  }

  button {
    font-size: 18px;
    padding: 18px 36px;
    color: ${({ theme }) => theme.purple};
    background-color: ${({ theme }) => theme.orange};
  }
`;

export default Login;

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
