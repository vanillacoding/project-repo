import styled from 'styled-components';

import { flexCenterColumn } from './common';

export const Wrapper = styled.div`
  ${flexCenterColumn}
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
