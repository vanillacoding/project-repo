import { useState } from "react";
import styled from "styled-components";

import Button from "../../common/Button";
import UserMenuDropdown from "./UserMenuDropdown";

import { ICON } from "../../../constants/variants";

const UserMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function UserMenuButton({ handleLoginStatus }) {
  const [isClicked, setIsClicked] = useState(false);

  const UserMenuIcon = <img alt="사용자 메뉴 아이콘" src="/images/user_menu_icon.png" width="40" height="40" />;

  const handleDropDown = () => {
    setIsClicked(!isClicked);
  };

  return (
    <UserMenuWrapper>
      <Button variant={ICON} onClick={handleDropDown} children={UserMenuIcon} />
      {isClicked && <UserMenuDropdown onClick={handleLoginStatus} />}
    </UserMenuWrapper>
  );
}
