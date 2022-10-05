import React from "react";

import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import styled from "styled-components";

import LinkButton from "../Shared/LinkButton";

const Wrapper = styled.section`
  width: 300px;
  height: calc(100vh - 70px);
  padding: 70px ${({ theme }) => theme.padding.base};
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: black;
`;

const UserProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 40px;
  font-weight: bolder;

  & > .user-email {
    width: 200px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & > .user-money {
    width: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const ProfileImageBox = styled.div`
  width: 120px;
  height: 120px;
  margin-bottom: 20px;
  border-radius: 50%;
  box-shadow: 3px 3px 15px -6px #000000;
  overflow: hidden;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

function Profile(props) {
  const {
    name,
    email,
    money,
    imageUrl,
  } = props;

  return (
    <Wrapper>
      <UserProfileBox>
        <ProfileImageBox>
          <img
            src={imageUrl}
            alt="user-profile"
          />
        </ProfileImageBox>
        <div
          className="user-name"
        >
          {name}
        </div>
        <div
          className="user-email"
        >
          {email}
        </div>
        <div
          className="user-money"
        >
          <FontAwesomeIcon icon={faCoins} />
          {money}
        </div>
      </UserProfileBox>
      <LinkButton
        path="/"
        type="button"
        title="Go to main"
        color="black"
        size="base"
      />
    </Wrapper>
  );
}

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  money: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default Profile;
