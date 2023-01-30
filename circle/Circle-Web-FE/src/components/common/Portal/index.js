import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const getRootElement = (id) => {
  const rootElement = document.getElementById(id);

  if (rootElement !== null) {
    return rootElement;
  }

  const newRootElement = document.createElement("div");
  newRootElement.setAttribute("id", id);
  document.body.appendChild(newRootElement);

  return newRootElement;
};

const createParentElement = (id) => {
  const rootElement = getRootElement(id);
  const parentElement = document.createElement("div");

  rootElement.appendChild(parentElement);

  const removeParentElement = () => {
    rootElement.removeChild(parentElement);
  };

  return [parentElement, removeParentElement];
};

export default function Portal({ id, children }) {
  const [parentElement, removeParentElement] = createParentElement(id);

  useEffect(() => {
    return () => removeParentElement();
  }, [removeParentElement]);

  return createPortal(children, parentElement);
}

Portal.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
