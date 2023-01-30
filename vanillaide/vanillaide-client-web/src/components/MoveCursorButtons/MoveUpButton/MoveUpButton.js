import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronUp } from "@fortawesome/free-solid-svg-icons";

export default function MoveUpButton({ handleClick }) {
  return (
    <FontAwesomeIcon
      icon={faCircleChevronUp}
      className="cursor-icon up"
      onClick={handleClick}
    />
  );
}

MoveUpButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
