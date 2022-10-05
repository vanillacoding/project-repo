import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import Modal from "../components/ModalComponent";
import { removeError } from "../features/errorSlice";

function Error({ statusCode, message }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleConform = function () {
    dispatch(removeError());
  };

  const handleCancle = function () {
    dispatch(removeError());
    history.push("/");
  };

  return (
    <Modal
      innerText={`${statusCode}: ${message}`}
      cancelText="Go home"
      onConfirm={handleConform}
      onCancel={handleCancle}
      width={200}
      isError={true}
    />
  );
}

Error.propTypes = {
  statusCode: PropTypes.number,
  message: PropTypes.string,
};

export default Error;
