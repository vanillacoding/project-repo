import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Button from './Button';

function ErrorBox({ message, text }) {
  const history = useHistory();

  return (
    <Wrapper>
      <h1>{message}</h1>
      <Button onClick={() => history.push('/')}>{text}</Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: inherit;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 38px;
    margin-bottom: 20px;
    color: ${({ theme }) => theme.pink};
  }
`;

export default ErrorBox;

ErrorBox.propTypes = {
  message: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
