import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function MoveLeftButton({ handleClick }) {
  return (
    <FontAwesomeIcon
      icon={faCircleChevronLeft}
      className="cursor-icon left"
      onClick={handleClick}
    />
  );
}

MoveLeftButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
