import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import UserNameEditForm from "./forms/UserNameEditForm";
import UserPhotoEditForm from "./forms/UserPhotoEditForm";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    color: ${({ theme }) => theme.colors.indigo};
    font-size: ${({ theme }) => theme.fontSizes.medium};
    font-weight: ${({ theme }) => theme.fontWeights.strong};
  }
`;

const Profile = () => {
  const { _id, name: currentName, photoUrl } = useSelector(state => state.user.profile);

  return (
    <Wrapper>
      <span>{`Current name: ${currentName}`}</span>
      <UserPhotoEditForm
        _id={_id}
        photoUrl={photoUrl}
      />
      <UserNameEditForm
        _id={_id}
        currentName={currentName}
      />
    </Wrapper>
  );
};

export default Profile;
