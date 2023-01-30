import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";

export default function UndoButton({
  code,
  handleClick,
  selectedLanguage,
  handleUndoRedoClick,
  view,
}) {
  const handleUndoClick = () => {
    view.focus();

    if (!code[selectedLanguage].prev) return;
    handleClick((prevState) => ({
      ...prevState,
      [selectedLanguage]: prevState[selectedLanguage].prev,
    }));

    const { anchor, head } = code[selectedLanguage].prev;

    handleUndoRedoClick((prevState) => ({
      ...prevState,
      [selectedLanguage]: { anchor, head },
    }));
  };

  return (
    <FontAwesomeIcon
      icon={faRotateLeft}
      className="function-icon"
      onClick={handleUndoClick}
      data-testid="undoButton"
    />
  );
}

UndoButton.propTypes = {
  code: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  selectedLanguage: PropTypes.string.isRequired,
  handleUndoRedoClick: PropTypes.func.isRequired,
  view: PropTypes.object,
};
