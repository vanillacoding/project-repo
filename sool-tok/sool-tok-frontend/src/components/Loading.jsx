import React from 'react';
import styled from 'styled-components';
import ReactLoading from 'react-loading';

import theme from './styles/theme';

function Loading() {
  return (
    <Wrapper>
      <ReactLoading type='bubbles' color={theme.orange} width={'15%'} height={'15%'} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Loading;
