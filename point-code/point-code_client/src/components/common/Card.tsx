import React, { ReactNode } from 'react';
import styled from 'styled-components';

const CardBlock = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1.5rem;
  border: 1.5px solid ${props => props.theme.color.gray[3]};
  border-radius: 4px;
  background: white;
  line-height: 1.6;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.0625);
`;

type CardProps = {
  children: ReactNode;
};

const Card = ({ children }: CardProps) => (
  <CardBlock>
    {children}
  </CardBlock>
);

export default Card;
