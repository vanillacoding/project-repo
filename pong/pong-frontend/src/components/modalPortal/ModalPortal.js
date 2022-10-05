import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const ModalPortal = ({ children }) => {
  const modalRoot = document.getElementById("modal");

  return ReactDOM.createPortal(children, modalRoot);
};

export default ModalPortal;

ModalPortal.propTypes = {
  children: PropTypes.node.isRequired,
};
