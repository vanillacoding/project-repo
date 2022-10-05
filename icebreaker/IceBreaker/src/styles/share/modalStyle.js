import styled from 'styled-components';

import { flexCenter } from './common';

export const Container = styled.div`
  height: 100%;
  font-family: 'Do Hyeon';
  text-align: center;
`;

export const MessageArea = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30%;
`;

export const Title = styled.p`
  height: 15%;
  font-size: 20px;
  color: ${({ theme }) => theme.white};
`;

export const Form = styled.form`
  height: 55%;

  .input {
    max-width: 180px;
    height: 60px;
    margin: auto;
    border-radius: 20px;
    text-align: center;
    font-size: 18px;
    box-shadow: ${({ theme }) => theme.boxShadow};
    background-color: ${({ theme }) => `${theme.white}99`};
  }

  .button-area {
    ${flexCenter}
    margin-top: 23px;

    button {
      margin-right: 10px;
    }
  }
`;
