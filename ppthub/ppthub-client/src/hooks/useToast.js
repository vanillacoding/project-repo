import React, { useState, createContext, useContext, useCallback } from "react";
import ReactDOM from "react-dom";

import styled from "styled-components";

import THEME_COLORS from "../config/constants/themeColors";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toastMessage, setToastMessage] = useState("");

  const showToastMessage = useCallback(
    (message) => {
      if (message === toastMessage) {
        return null;
      }

      setToastMessage(message);

      setTimeout(() => {
        setToastMessage("");
      }, 2000);

      return null;
    },
    [toastMessage],
  );

  const isShowToast = toastMessage !== "";

  return (
    <ToastContext.Provider value={showToastMessage}>
      {children}
      {isShowToast && <ToastMessage message={toastMessage} />}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const showToastMessage = useContext(ToastContext);

  if (!showToastMessage) {
    return null;
  }

  return (message) => showToastMessage(message);
}

function ToastMessage({ message }) {
  return (
    <ToastPortal>
      <TostMessageBubble>
        <Message>{message}</Message>
      </TostMessageBubble>
    </ToastPortal>
  );
}

function ToastPortal({ children }) {
  const toastRoot = document.getElementById("portal-root");
  return ReactDOM.createPortal(children, toastRoot);
}

const TostMessageBubble = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 2%;
  left: 1%;
  width: 40vw;
  height: 5vh;
  max-width: 18rem;
  min-height: 3rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
  background-color: ${THEME_COLORS.MAIN_COLOR};
  animation-name: slideIn, slideOut;
  animation-delay: 0s, 1.5s;
  animation-duration: 1s, 1s;
  animation-iteration-count: 1;
  z-index: 10;

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0%);
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0%);
    }
    to {
      transform: translateX(-300%);
    }
  }
`;

const Message = styled.p`
  text-align: center;
  font-weight: 700;
  color: #000000;
`;
