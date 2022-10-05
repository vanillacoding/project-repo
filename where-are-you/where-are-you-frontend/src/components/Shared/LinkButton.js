import React from "react";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { buttonStyle } from "../../styles";

const Button = styled(Link)`
  ${buttonStyle}
`;

function LinkButton({ path, title, color }) {
  return (
    <Button to={path} color={color}>
      <span>{title}</span>
    </Button>
  );
}

LinkButton.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};

export default LinkButton;
