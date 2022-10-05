import styled from 'styled-components';
import { LogOut } from 'react-feather';

export const ExitButton = {};

ExitButton.Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 80px;
  margin: 30px;
`;

ExitButton.ExitBtn = styled(LogOut)`
  cursor: pointer;
`;
