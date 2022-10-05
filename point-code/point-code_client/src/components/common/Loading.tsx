import React from 'react';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';

const LoadingBlock = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Loading = () => (
  <LoadingBlock>
    <ClipLoader color="gray" />
  </LoadingBlock>
);

export default Loading;
