import React from "react";
import styled from "styled-components";

import Profile from "./shared/Profile";
import ProfileForm from "./shared/ProfileForm";
import useMyProfile from "../hooks/useMyProfile";

const Container = styled.div`
  height: 50%;
`;

const EditButton = styled.button`
  position: absolute;
  bottom: 45px;
  right: 10px;
  cursor: pointer;
`;

const ProfileContainer = styled.div`
  position: relative;
`;

function MyProfile() {
  const {
    userData,
    isEditing,
    setIsEditing,
    handleFormSubmit,
    handleInputChange,
  } = useMyProfile();

  return (
    <Container>
      {isEditing ? (
        <ProfileForm
          name={userData.name}
          description={userData.description}
          photoURL={userData.photoURL}
          musicURL={userData.musicURL}
          handleInputChange={handleInputChange}
          handleSubmit={handleFormSubmit}
        />
      ) : (
        <ProfileContainer>
          <Profile
            name={userData.name}
            description={userData.description}
            photoURL={userData.photoURL}
            musicURL={userData.musicURL}
          />
          <EditButton
            type="button"
            onClick={() => setIsEditing(true)}
          >
            변경
          </EditButton>
        </ProfileContainer>
      )}

    </Container>
  );
}

export default MyProfile;
