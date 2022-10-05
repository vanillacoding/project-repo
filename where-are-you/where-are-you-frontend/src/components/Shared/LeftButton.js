import React from "react";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

import leftButton from "../../assets/common/left_button.png";

const Button = styled(Link)`
  width: 260px;
  height: 130px;
  padding: 40px 0 0 80px;
  display: inline-block;
  position: absolute;
  top: calc(250px + 1rem);
  left: calc((260px + 3rem) * -1);
  background: url(${leftButton});
  font-size: 2rem;
  transition: 0.5s all;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.color.orange};
    transform: rotate(-7deg) scale(1.1);
  }
`;

function LeftButton({ path, text }) {
  return (
    <Button to={path}>
      {text}
    </Button>
  );
}

LeftButton.propTypes = {
  path: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default LeftButton;
