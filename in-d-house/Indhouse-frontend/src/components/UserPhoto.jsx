import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.lightIndigo};
  position: absolute;
  top: 2rem;
  right: 2rem;

  img {
    border-radius: 50px;
    width: 4rem;
  }
`;

const UserPhoto = ({ photo }) => {
  return (
    <Wrapper>
      <img src={photo}></img>
    </Wrapper>
  );
};

UserPhoto.propTypes = {
  photo: PropTypes.string.isRequired,
};

export default UserPhoto;
