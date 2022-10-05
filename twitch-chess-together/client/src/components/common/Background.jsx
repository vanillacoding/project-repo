import React from 'react';
import styled from 'styled-components';

import background from '../../assets/background';
import { fullWidthAndHeight } from '../styles/mixin';

export default function Background({ children }) {
  return <DisplayBackground>{children}</DisplayBackground>;
}

const DisplayBackground = styled.div`
  ${fullWidthAndHeight}
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;
