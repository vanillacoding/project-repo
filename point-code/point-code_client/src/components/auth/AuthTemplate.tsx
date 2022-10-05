import React, { ReactNode } from 'react';
import styled from 'styled-components';

const AuthTemplateBlock = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.color.lightGray};
`;

type AuthTemplateProps = {
  children: ReactNode;
};

const AuthTemplate = ({ children }: AuthTemplateProps) => (
  <AuthTemplateBlock>
    {children}
  </AuthTemplateBlock>
);

export default AuthTemplate;
