import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

import List from "./List";
import HeartCounter from "./HeartCounter";
import theme from "../theme";
import { getKoreanTimeString } from "../utils/time";
import { PLUS } from "../constants/buttons";

const RatingOpener = styled.span`
  padding: 0 20px;
  font-size: 24px;
`;

function ContentBar({
  creatorId, category, content, onClickRating, color,
}) {
  const {
    _id: ratingId, url, date, duration, rating,
  } = content;

  const handleClickBar = function (ev) {
    if (ev.target.textContent === PLUS) {
      ev.preventDefault();
      onClickRating({
        ratingId, date, duration, rating,
      });
    }
  };

  const type = category === "activity" ? content.type : category;
  const heartCount = onClickRating && !rating?.heartCount
    ? <RatingOpener onClick={onClickRating}>{PLUS}</RatingOpener>
    : <HeartCounter count={rating?.heartCount || 0} />;

  return (
    <Link to={`/${creatorId}/${category}/${ratingId}`} key={ratingId} onClick={handleClickBar}>
      <List color={color} key={ratingId}>
        <div>{url ? <img scr={url} alt="image" /> : type}</div>
        <div>{getKoreanTimeString(date)}</div>
        {duration && <div>{duration} min</div>}
        <span>{heartCount}</span>
      </List>
    </Link>
  );
}

ContentBar.propTypes = {
  content: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    type: PropTypes.string,
    url: PropTypes.string,
    date: PropTypes.string.isRequired,
    duration: PropTypes.number,
    rating: PropTypes.shape({
      date: PropTypes.string,
      heartCount: PropTypes.number,
      text: PropTypes.string,
    }),
  }),
  onClickRating: PropTypes.func,
  creatorId: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  color: PropTypes.oneOf([theme.background.main, theme.background.sub]),
};

ContentBar.defaultProps = {
  color: theme.background.main,
};

export default ContentBar;
