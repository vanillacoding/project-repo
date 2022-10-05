import React from 'react';
import styled from 'styled-components';

const ResponsiveBlock = styled.div`
  width: 64rem;
  margin: 0 auto;
  padding: 0 1.5rem;

  @media (max-width: 64rem) {
    width: 48rem;
  }
  @media (max-width: 48rem) {
    width: 100%;
  }
`;

const Responsive = (props: any) => (
  <ResponsiveBlock {...props} />
);

export default Responsive;
