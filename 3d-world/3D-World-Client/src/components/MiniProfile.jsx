import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Name from "./shared/Name";
import Photo from "./shared/Photo";

const Container = styled.div`
  display: flex;
  align-items: center;
  align-items: center;
  width: fit-content;
  padding: 0.3em;
  border-radius: 5px;
  font-weight: 600;

  &:hover {
    cursor: pointer;
  }
`;

const MiniPhoto = styled(Photo)`
  margin-right: 1em;
`;

function MiniProfile({ photoURL, name, onClick }) {
  return (
    <Container onClick={onClick}>
      <MiniPhoto
        src={photoURL}
        alt="profile"
        borderRadius="100%"
      />
      <Name name={name} />
    </Container>
  );
}

MiniProfile.propTypes = {
  photoURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

MiniProfile.defaultProps = {
  onClick: () => {},
};

export default MiniProfile;
