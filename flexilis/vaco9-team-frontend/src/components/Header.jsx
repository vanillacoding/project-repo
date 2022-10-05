import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import useHeader from '../hooks/useHeader';

const Container = styled.div`
  position: sticky;
  display: flex;
  top: 0;
  left: 0;
  z-index: 999;
  height: 80px;
  width: 100%;
  min-width: 900px;
  background-color: ${props => props.theme.SUB};
  font-family: 'Nanum Barun Gothic';
  font-size: 18px;
`;

const LeftHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 50%;
  height: 100%;
`;

const RightHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 50%;
  height: 100%;
`;

const HeaderItem = styled.div`
  display: flex;
  width: fit-content;
  height: 100%;
  margin: auto 30px;
`;

const HeaderLink = styled(Link)`
  display: flex;
  height: fit-content;
  margin: auto;
  justify-content: center;
  align-content: center;
  text-decoration: none;
  color: ${props => props.theme.MAIN_FONT};
  &:hover {
    color: ${props => props.theme.BOLD};
  }
`;

export default function Header() {
  const { user, handleLogoutClick } = useHeader();

  return (
    <Container>
      <LeftHeader>
        <HeaderItem>
          <HeaderLink to="/main">
            Flexilis Ads
          </HeaderLink>
        </HeaderItem>
      </LeftHeader>
      <RightHeader>
        <HeaderItem>
          <HeaderLink to="/campaign/new">
            캠페인 시작하기
          </HeaderLink>
        </HeaderItem>
        {user ? (
          <>
            <HeaderItem>
              <HeaderLink to="/dashboard">
                대시보드
              </HeaderLink>
            </HeaderItem>
            <HeaderItem>
              <HeaderLink to="/main" onClick={handleLogoutClick}>
                로그아웃
              </HeaderLink>
            </HeaderItem>
          </>
        ) : (
          <HeaderItem>
            <HeaderLink to="/login">
              로그인
            </HeaderLink>
          </HeaderItem>
        )}
      </RightHeader>
    </Container>
  );
}
