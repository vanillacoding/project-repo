import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export default function RunButton({ handleClick }) {
  return (
    <FontAwesomeIcon
      icon={faPlay}
      className="function-icon"
      onClick={handleClick}
      data-testid="runButton"
    />
  );
}

RunButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
