import React from "react";
import styled from "styled-components";

const UserIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileAvatar = styled.img`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: 50%;
`;

function UserIcon({ avatarSize, avatar }) {
  return (
    <UserIconWrapper>
      <ProfileAvatar size={avatarSize} src={avatar} />
    </UserIconWrapper>
  );
}

export default React.memo(UserIcon);
