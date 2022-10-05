import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ipcRenderer } from 'electron';
import { useDispatch } from 'react-redux';
import { fetchLogin } from '../reducers/login';
import Spinner from '../components/Spinner.jsx';
import { color } from '../css/color';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: ${color.MAIN};
`;

export default function Loading() {
  const dispatch = useDispatch();

  useEffect(async () => {
    ipcRenderer.on('loginDataExist', async (event, data) => {
      const userData = {
        email: data.account,
        password: data.password,
      };

      dispatch(fetchLogin(userData));
    });

    ipcRenderer.on('loginDataDoesNotExist', (event, data) => {
      window.location.hash = '#/login';
    });
  });

  return (
    <Container>
      <Spinner
        color="white"
        loading={true}
        size={40}
      />
    </Container>
  );
}
