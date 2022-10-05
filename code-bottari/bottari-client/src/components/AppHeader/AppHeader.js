import styled from "styled-components";

import Logo from "./Logo/Logo";
import SearchBar from "./SearchBar/SearchBar";
import UserTools from "./UserTools/UserTools";
import NavigationBar from "./NavigationBar/NavigationBar";

const HeaderWrapper = styled.header`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100px;
  margin-bottom: 5px;
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.3);
`;

export default function AppHeader() {
  return (
    <>
      <HeaderWrapper>
        <Logo />
        <SearchBar />
        <UserTools />
      </HeaderWrapper>
      <NavigationBar />
    </>
  );
}
