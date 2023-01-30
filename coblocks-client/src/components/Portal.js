import { createPortal } from "react-dom";

function Portal({ children }) {
  return createPortal(children, document.getElementById("modal-root"));
}

export { Portal };
