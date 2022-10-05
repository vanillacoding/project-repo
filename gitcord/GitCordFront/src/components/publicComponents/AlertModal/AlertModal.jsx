import React, { useEffect } from "react";
import { AiFillAlert } from "react-icons/ai";
import styled from "styled-components";
import PropTypes from "prop-types";

const AlertModalWrapper = styled.div`
  position: fixed;
  bottom: 3rem;
  left: 3rem;
  width: 15em;
  height: auto;
`;

const AlertModalOuter = styled.div`
  width: 100%;
  height: 7%;
  padding: 0.5em;
  margin: 0 0 1em 0;
  background-color: rgb(250, 250, 250, 0.9);
  border-radius: 10px;
  animation: slide .6s ease-in-out;

  .alert-message {
    display: flex;
    justify-content: center;
    align-self: center;
    font-size: 0.8rem;
    font-weight: bold;
    color: ${props => props.color};
  }

  @keyframes slide {
    from {
      transform: translateX(-300px);
    }
    to {
      transform: translateX(0px);
    }
  }
`;

function AlertModal({
  alertMessages,
  handleAlertDelete,
  color = "#000000"
}) {
  useEffect(() => {
    const deleteMessage = setTimeout(() => {
      handleAlertDelete((alertMessages) => {
        alertMessages.shift();

        return [...alertMessages];
      });
    }, 2500);

    return () => clearTimeout(deleteMessage);
  }, [alertMessages, handleAlertDelete]);

  return (
    <AlertModalWrapper>
      {
        alertMessages.map((message, index) => (
          <AlertModalOuter key={index} color={color}>
            <AiFillAlert size={20} />
            <span className="alert-message">
              {message}
            </span>
          </AlertModalOuter>
        ))
      }
    </AlertModalWrapper>
  );
}

AlertModal.propTypes = {
  alertMessages: PropTypes.array.isRequired,
  handleAlertDelete: PropTypes.func.isRequired,
  color: PropTypes.string
};

export default AlertModal;
