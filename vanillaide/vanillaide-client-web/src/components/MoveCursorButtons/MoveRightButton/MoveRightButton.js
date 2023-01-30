import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function MoveRightButton({ handleClick }) {
  return (
    <FontAwesomeIcon
      icon={faCircleChevronRight}
      className="cursor-icon right"
      onClick={handleClick}
    />
  );
}

MoveRightButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
