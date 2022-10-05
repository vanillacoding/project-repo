import React from "react";
import styled from "styled-components";

import { legos } from "../../../constants/legos";
import { generateRandomLegoIdx } from "../../../utils/generateRandomLegoIdx";
import UserIcon from "../../UserIcon";

const UserInfo = styled.div`
  display: flex;
  height: 100%;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1vw;
`;

const UserIconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2vw;
  width: ${props => props.size};
  height: ${props => props.size};
`;

const UserName = styled.div`
  font-size: ${props => props.nameSize};
  margin: 0.5vh;
`;

const UserEmail = styled.div`
  font-size: ${props => props.emailSize};
  margin: 0.5vh;
`;

function IntervieweeDetailUserInfo({ name, email, commenterInfo }) {
  const randomLegoIdx = generateRandomLegoIdx();
  const intervieweeAvatar = legos[randomLegoIdx];

  const avatar = commenterInfo ? commenterInfo.avatar : intervieweeAvatar;
  const displayingName = commenterInfo ? commenterInfo.username : name;
  const displayingEmail = commenterInfo ? commenterInfo.email : email;

  const avatarSize = commenterInfo ? "40px" : "80px";
  const nameSize = commenterInfo ? "20px" : "20px";
  const emailSize = commenterInfo ? "20px" : "20px";

  return (
    <UserInfo>

      <UserIconWrapper>
        <UserIcon avatarSize={avatarSize} avatar={avatar} />
      </UserIconWrapper>
      <UserInfoWrapper>
        <UserName nameSize={nameSize}>{displayingName}</UserName>
        <UserEmail emailSize={emailSize}>{displayingEmail}</UserEmail>
      </UserInfoWrapper>
    </UserInfo>
  );
}

export default IntervieweeDetailUserInfo;
