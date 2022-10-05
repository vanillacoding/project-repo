import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { getCampaigns } from '../reducers/campaigns';
import Header from '../components/Header';
import DashboardMain from '../components/DashboardMain';
import DashboardNav from '../components/DashboardNav';

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 80px);
  display: flex;
  box-sizing: border-box;
`;

const NavContainer = styled.div`
  width: 15%;
  height: 100%;
  overflow-y: scroll;
`;

const MainContainer = styled.div`
  width: 85%;
  height: 100%;
  overflow-y: hidden;
`;

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCampaigns());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container>
        <NavContainer>
          <DashboardNav />
        </NavContainer>
        <MainContainer>
          <DashboardMain />
        </MainContainer>
      </Container>
    </>
  );
}
