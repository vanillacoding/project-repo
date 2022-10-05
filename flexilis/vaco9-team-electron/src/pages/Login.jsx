import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import LoginForm from '../components/LoginForm.jsx';
import { fetchLogin } from '../reducers/login';

const Container = styled.div`
  height: 100vh;
`;

export default function Login() {
  const isError = useSelector((state) => state.loginReducer.isError);
  const errorMessage = useSelector((state) => state.loginReducer.errorMessage);
  const isFetching = useSelector((state) => state.loginReducer.isFetching);
  const dispatch = useDispatch();

  function handleLoginSubmit(data) {
    dispatch(fetchLogin(data));
  }

  return (
    <Container>
      <LoginForm
        isError={isError}
        errorMessage={errorMessage}
        isFetching={isFetching}
        onLoginSubmit={handleLoginSubmit} />
    </Container>
  );
}
