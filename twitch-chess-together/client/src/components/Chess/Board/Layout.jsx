import React from 'react';
import styled from 'styled-components';

export default function Layout({ children }) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}

const LayoutWrapper = styled.div`
  display: grid;
  margin: auto;
  position: absolute;
  height: 640px;
  width: 640px;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
`;
