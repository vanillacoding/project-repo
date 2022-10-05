import React from "react";
import PropTypes from "prop-types";

import theme from "../theme";
import CardContainer from "./CardContainer";
import ProfileImageWrapper from "./ProfileImageWrapper";
import styled from "styled-components";

const Button = styled.button`
  border-radius: 10px;
  margin: -2% 3% 6% 3%;
  padding: 3% 7%;
  border: none;
  background-color: ${({ theme }) => theme.background.main};
  color: white;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.small};
  width: ${(props) => props.width + "px"};
  height: ${(props) => props.height + "px"};
`;

const PendingFilter = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 300px;
  height: 420px;
  margin: 10px;
  padding: 30px;
  transform: translate(-40px, -40px);
  backdrop-filter: grayscale(100%);

  @media screen and (max-width: 400px) {
    width: 220px;
    height: 300px;
  }
`;

function PendingCard({
  id,
  profileUrl,
  name,
  onAcceptButtonClick,
  onDenyButtonClick,
  isSent,
}) {
  const handleAcceptButtonClick = function () {
    onAcceptButtonClick(id);
  };

  const handleDenyButtonClick = function () {
    onDenyButtonClick(id);
  };

  return (
    <CardContainer color={theme.background.main}>
      <ProfileImageWrapper>
        <img src={profileUrl} alt="profile" />
      </ProfileImageWrapper>
      <p>{name}</p>
      <PendingFilter>
        <p>{isSent ? "친구 요청 중" : "친구 요청 "}</p>
        {!isSent
          && <div>
            <Button onClick={handleAcceptButtonClick}>수락</Button>
            <Button onClick={handleDenyButtonClick}>거절</Button>
          </div>
        }
      </PendingFilter>
    </CardContainer>
  );
}

PendingCard.propTypes = {
  id: PropTypes.string.isRequired,
  profileUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onAcceptButtonClick: PropTypes.func,
  onDenyButtonClick: PropTypes.func,
  isSent: PropTypes.bool,
};

export default PendingCard;
