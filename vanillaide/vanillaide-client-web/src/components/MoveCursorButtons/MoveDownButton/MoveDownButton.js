import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function MoveDownButton({ handleClick }) {
  return (
    <FontAwesomeIcon
      icon={faCircleChevronDown}
      className="cursor-icon down"
      onClick={handleClick}
    />
  );
}

MoveDownButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
