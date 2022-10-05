import React from 'react';
import styled from 'styled-components';
import RegisterForm from '../components/RegisterForm.jsx';
import { register } from '../apis/index.js';
import { useState } from 'react';

const Container = styled.div`
  height: 100vh;
`;

export default function Register() {
  const [isFetching, setIsFetching] = useState(false);

  async function handleRegisterSubmit(data) {
    setIsFetching(true);
    try {
      const response = await register(data);
      window.location.hash = '#/login';
    } catch (error) {
      setIsFetching(false);
      window.location.hash = '#/register';
    }
  }

  return (
    <Container>
      <RegisterForm
        isFetching={isFetching}
        onRegisterSubmit={handleRegisterSubmit} />
    </Container>
  );
}
