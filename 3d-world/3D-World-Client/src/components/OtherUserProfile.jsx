import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Profile from "./shared/Profile";
import useOtherUserProfile from "../hooks/useOtherUserProfile";

const Container = styled.div`
`;

// TODO: RENAME options: read-only-profile / editable-profile
function OtherUserProfile({ id }) {
  const { userData } = useOtherUserProfile(id);

  return (
    <Container>
      <Profile
        name={userData.name}
        description={userData.description}
        photoURL={userData.photoURL}
        musicURL={userData.musicURL}
      />
    </Container>
  );
}

OtherUserProfile.propTypes = {
  id: PropTypes.string.isRequired,
};

export default OtherUserProfile;
