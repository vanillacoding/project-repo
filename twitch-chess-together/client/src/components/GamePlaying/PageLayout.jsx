import React from 'react';
import styled from 'styled-components';

export default function PageLayout({ children }) {
  return <Layout>{children}</Layout>;
}

const Layout = styled.div`
  display: flex;
  flex-direction: row;
`;
