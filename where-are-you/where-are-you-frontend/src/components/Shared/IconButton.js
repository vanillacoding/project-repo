import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

const Button = styled.button`
  width: 30px;
  height: 30px;
  display: inline-block;
  position: absolute;
  top: ${props => props.top};
  right: calc((50px + 0.5rem) * -1);
  background: #ffffff url(${props => props.icon}) no-repeat center;
  opacity: 0.4;
  transition: 0.3s all;

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.color.red};
    opacity: 1;
  }
`;

function IconButton(props) {
  const {
    name,
    icon,
    top,
    handleClick
  } = props;

  return (
    <Button
      type="button"
      aria-label={name}
      onClick={handleClick}
      icon={icon}
      top={top}
    />
  );
}

IconButton.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  top: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default IconButton;
