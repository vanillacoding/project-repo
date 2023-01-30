import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

export default function SaveButton({ code }) {
  const {
    html: { content: htmlCode },
    css: { content: cssCode },
    js: { content: jsCode },
  } = code;

  const handleClick = () => {
    const contentOfCode = {
      html: htmlCode,
      css: cssCode,
      js: jsCode,
    };

    window.ReactNativeWebView.postMessage(
      JSON.stringify({ method: "save", code: contentOfCode }),
    );
  };

  return (
    <FontAwesomeIcon
      icon={faFloppyDisk}
      className="function-icon"
      onClick={handleClick}
    />
  );
}

SaveButton.propTypes = {
  code: PropTypes.object.isRequired,
};
