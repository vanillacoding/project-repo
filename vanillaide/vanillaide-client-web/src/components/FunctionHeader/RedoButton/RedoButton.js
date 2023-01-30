import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

export default function RedoButton({
  code,
  handleClick,
  selectedLanguage,
  handleUndoRedoClick,
  view,
}) {
  const handleRedoClick = () => {
    view.focus();
    if (!code[selectedLanguage].next) return;

    handleClick((prevState) => ({
      ...prevState,
      [selectedLanguage]: prevState[selectedLanguage].next,
    }));

    const { anchor, head } = code[selectedLanguage].next;

    handleUndoRedoClick((prevState) => ({
      ...prevState,
      [selectedLanguage]: { anchor, head },
    }));
  };

  return (
    <FontAwesomeIcon
      icon={faRotateRight}
      className="function-icon"
      onClick={handleRedoClick}
      data-testid="redoButton"
    />
  );
}

RedoButton.propTypes = {
  code: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  selectedLanguage: PropTypes.string.isRequired,
  handleUndoRedoClick: PropTypes.func.isRequired,
  view: PropTypes.object,
};
