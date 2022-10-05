import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const CloseButton = ({ text, color, closeModal }) => {
  return (
    <Button
      type="button"
      aria-label="닫기"
      color={color}
      onClick={closeModal}
    >
      {text}
    </Button>
  );
};

const Button = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  padding: 10px;
  background: ${props => props.color};
  border: none;
  color: ${({ theme }) => theme.color.white};

  :before,
  :after {
    content: "";
    position: absolute;
    top: 24px;
    left: 10px;
    width: 30px;
    height: 2px;
    background-color: black;
  }

  :before {
    transform: rotate(45deg);
  }

  :after {
    transform: rotate(-45deg);
  }
`;

CloseButton.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};

CloseButton.defaultProps = {
  text: "Close",
  color: "",
};

export default CloseButton;
