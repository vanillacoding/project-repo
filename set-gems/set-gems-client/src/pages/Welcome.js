import React from "react";
import PropTypes from "prop-types";

import Guide from "../components/Guide";
import { SINGLE, MULTI } from "../constants/mode";

function Welcome({ onSelectMode }) {
  const handleSingleButtonClick = () => onSelectMode(SINGLE);
  const handleMultiButtonClick = () => onSelectMode(MULTI);

  return (
    <div>
      <h1>SET GEMS</h1>
      <Guide />
      <button
        type="button"
        onClick={handleSingleButtonClick}
      >혼자하기</button>
      <button
        type="button"
        onClick={handleMultiButtonClick}
      >같이하기</button>
    </div>
  );
}

Welcome.propTypes = {
  onSelectMode: PropTypes.func,
};

export default Welcome;
