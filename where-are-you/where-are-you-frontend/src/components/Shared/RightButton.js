import React from "react";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

import rightButton from "../../assets/common/right_button.png";

const Button = styled(Link)`
  width: 260px;
  height: 130px;
  padding: 50px 0 0 80px;
  display: inline-block;
  position: absolute;
  top: calc(250px + 1rem);
  right: calc((260px + 3rem) * -1);
  background: url(${rightButton});
  font-size: 2rem;
  transition: 0.5s all;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.color.orange};
    transform: rotate(7deg) scale(1.1);
  }
`;

function RightButton({ path, text }) {
  return (
    <Button to={path}>
      {text}
    </Button>
  );
}

RightButton.propTypes = {
  path: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default RightButton;
