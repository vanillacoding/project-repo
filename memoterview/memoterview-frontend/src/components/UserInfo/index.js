import React from "react";
import styled from "styled-components";

import UserIcon from "../UserIcon";

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: ${({ theme }) => theme.Solitude};
  padding-bottom: 10px;
`;

const UserName = styled.div`
  margin-top: 20px;
  font-size: 20px;
`;

const UserEmail = styled.div`
  margin: 5px 0 20px 0;
  font-size: 15px;
`;

function UserInfo({ userInfo }) {
  return (
    <UserInfoWrapper>
      <UserIcon avatar={userInfo.avatar} avatarSize="60px"/>
      <UserName>{userInfo.userName}</UserName>
      <UserEmail>{userInfo.userEmail}</UserEmail>
    </UserInfoWrapper>
  );
}

export default React.memo(UserInfo);
