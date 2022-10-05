import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import { buttonStyle } from "../../styles";

const Button = styled.button`
  ${buttonStyle}
`;

function NormalButton({ title, color, handleClick }) {
  return (
    <Button
      type="button"
      name={title}
      color={color}
      onClick={handleClick}
    >
      <span>{title}</span>
    </Button>
  );
}

NormalButton.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default NormalButton;
