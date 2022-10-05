import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import { selectColor, selectSize } from "../../styles/utils";

const Button = styled.button`
  padding: ${(props) => selectSize(props)};
  background: transparent;
  border: 1px solid ${(props) => selectColor(props)};
  font-family: "Bebas Neue";
  font-size: ${({ theme }) => theme.fontSize.middle};
  letter-spacing: 0.1rem;
  color: ${(props) => selectColor(props)};
  cursor: pointer;
  transition: 0.3s all;

  &:hover {
    background: ${({ theme }) => theme.color.blue};
    border: 1px solid ${({ theme }) => theme.color.blue};
    color: ${({ theme }) => theme.color.white};

    & > span {
      width: 70px;

      span {
        background: ${({ theme }) => theme.color.white};
      }
    }
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;

    &:hover {
      background: inherit;
      border-color: inherit;
    }
  }
`;

const Arrow = styled.span`
  width: 40px;
  padding: 0 0 0 10px;
  display: inline-block;
  position: relative;
  transition: 0.3s all;
`;

const Line = styled.span`
  width: 100%;
  height: 1px;
  background: ${(props) => selectColor(props)};
  display: inline-block;
`;

const End = styled.span`
  width: 15px;
  height: 1px;
  background: ${(props) => selectColor(props)};
  display: inline-block;
  position: absolute;
  bottom: 8px;
  transform: rotate(-135deg);
  transform-origin: bottom left;
`;

function SharedButton(props) {
  const {
    type,
    title,
    color,
    size,
    handleClick,
    hasArrow,
    disabled,
  } = props;

  return (
    <Button
      type={type}
      color={color}
      size={size}
      onClick={handleClick}
      disabled={disabled}
    >
      {title}
      {hasArrow
        && (
          <Arrow>
            <Line color={color} />
            <End color={color} />
          </Arrow>
        )}
    </Button>
  );
}

SharedButton.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  hasArrow: PropTypes.bool,
  disabled: PropTypes.bool,
};

SharedButton.defaultProps = {
  hasArrow: true,
  disabled: false,
};

export default SharedButton;
