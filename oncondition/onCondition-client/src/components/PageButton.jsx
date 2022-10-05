import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import COLORS from "../constants/colors";

const UpArrow = styled.div`
  width: 0;
  height: 0;
  margin: 10px auto;
  border-bottom: 20px solid ${COLORS.MAIN_MINT};
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  cursor: pointer;
`;

const DownArrow = styled.div`
  width: 0;
  height: 0;
  margin: 10px auto;
  border-top: 20px solid ${COLORS.MAIN_MINT};
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  cursor: pointer;
`;

function PrevButton({ onClick }) {
  return (
    <UpArrow
      onClick={onClick}
    />
  );
}

PrevButton.propTypes = {
  onClick: PropTypes.func,
};

function NextButton({ onClick }) {
  return (
    <DownArrow
      onClick={onClick}
    />
  );
}

NextButton.propTypes = {
  onClick: PropTypes.func,
};

export { PrevButton, NextButton };
