import { useState } from "react";
import styled from "styled-components";

import LoginButton from "./LoginButton";
import NotificationButton from "./NotificationButton";
import UserMenuButton from "./UserMenuButton";

const ToolWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 200px;
`;

export default function UserTools() {
  const hasUserId = !!localStorage.getItem("userId");

  const [isLogin, setLoginStatus] = useState(hasUserId);

  const handleClick = (boolean) => setLoginStatus(boolean);

  return (
    <ToolWrapper>
      {!isLogin && <LoginButton handleLoginStatus={handleClick} />}
      {isLogin && (
        <>
          <NotificationButton />
          <UserMenuButton handleLoginStatus={handleClick} />
        </>
      )}
    </ToolWrapper>
  );
}
