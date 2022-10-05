import styled from 'styled-components';

export const Header = {};

Header.Container = styled.div`
  position: sticky;
  display: flex;
  background-color: white;
  top: 0;
  width: 100%;
  height: 70px;
  z-index: 10;
`;

Header.NavContainer = styled.div`
  display: flex;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
`;

Header.NavLeft = styled.div`
  display: flex;
  width: 30%;
  height: 100%;
`;

Header.NavRight = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 70%;
  height: 100%;
`;

Header.NavItem = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  width: fit-content;
  height: 100%;
  margin: 0 10px;
`;

Header.Title = styled.a`
  display: flex;
  font-size: 24px;
  cursor: pointer;
  height: fit-content;
  margin: auto;
`;

Header.Text = styled.span`
  margin: auto;
  cursor: pointer;
`;
