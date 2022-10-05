import React from "react";
import PropTypes from "prop-types";

import theme from "../theme";
import CardContainer from "./CardContainer";
import HeartCounter from "./HeartCounter";
import ProfileImageWrapper from "./ProfileImageWrapper";
import { getKoreanDateString } from "../utils/time";

function FriendCard({
  id,
  profileUrl,
  name,
  lastAccessDate,
  scores,
  onClick,
  graph,
  color,
}) {
  const handleCardClick = function () {
    onClick(id);
  };

  const scoresArray = Object.values(scores);
  const score = scoresArray.length
    ? scoresArray.reduce((sum, score) => sum + score) / scoresArray.length
    : 0;

  return (
    <CardContainer color={color} onClick={handleCardClick}>
      <ProfileImageWrapper>
        {graph ? graph : <img src={profileUrl} alt="profile" />}
      </ProfileImageWrapper>
      <p>{name}</p>
      <p>{getKoreanDateString(lastAccessDate)}</p>
      <HeartCounter count={score} />
    </CardContainer>
  );
}

FriendCard.propTypes = {
  id: PropTypes.string.isRequired,
  profileUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  scores: PropTypes.objectOf(PropTypes.number),
  lastAccessDate: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  graph: PropTypes.element,
  color: PropTypes.oneOf([theme.background.main, theme.background.sub]),
};

FriendCard.defaultProps = {
  score: 0,
  color: theme.background.main,
};

export default FriendCard;
