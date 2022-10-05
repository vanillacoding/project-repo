import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  BsHeartFill, BsHeartHalf, BsHeart,
} from "react-icons/bs";

const HeartWrapper = styled.span`
  margin: 0 auto;

  div {
    display: inline-block;
    transform: translateY(3px);
  }
`;

function HeartCounter({ count }) {
  const numberOfHearts = 5;
  const countPerHeart = 2;
  const half = 0.5;

  const hearts = [...new Array(numberOfHearts)].map((_, i) => {
    if (i + half > count / countPerHeart) {
      return <BsHeart key={`${i}blank`} />;
    } else if (i + half === count / countPerHeart) {
      return <BsHeartHalf key={`${i}half`} />;
    } else {
      return <BsHeartFill key={`${i}fill`} />;
    }
  });

  return (
    <HeartWrapper>
      <div>{hearts}</div>
    </HeartWrapper>
  );
}

HeartCounter.propTypes = {
  count: PropTypes.number.isRequired,
};

HeartCounter.defaultProps = {
  count: 0,
};

export default HeartCounter;
