import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Portal from "../Portal";
import { DEFAULT_VALUES } from "../../../config/constants";
import theme from "../../../config/constants/theme";

export default function ToastMessage({
  message,
  color,
  isToastDisplayed,
  setIsToastDisplayed,
}) {
  useEffect(() => {
    const removeToast = setTimeout(() => {
      setIsToastDisplayed(false);
    }, DEFAULT_VALUES.TOAST_TIMEOUT);

    return () => clearTimeout(removeToast);
  }, [setIsToastDisplayed]);

  if (!isToastDisplayed) {
    return null;
  }

  return (
    <Portal id="potal-toast">
      <Wrapper color={color}>
        <StyledToast>{message}</StyledToast>
      </Wrapper>
    </Portal>
  );
}

ToastMessage.propTypes = {
  message: PropTypes.string.isRequired,
  color: PropTypes.string,
  isToastDisplayed: PropTypes.bool.isRequired,
  setIsToastDisplayed: PropTypes.func.isRequired,
};

ToastMessage.defaultProps = {
  color: theme.gray,
};

const Wrapper = styled.div`
  position: fixed;
  top: 12px;
  right: 12px;
  width: 40vw;
  height: 5vh;
  max-width: 300px;
  min-height: 46px;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  background-color: ${(props) => props.color};
  cursor: auto;

  animation-name: toast-in-right, fade-out;
  animation-delay: 0s, ${DEFAULT_VALUES.TOAST_TIMEOUT - 400}ms;
  animation-duration: 0.7s, 0.5s;

  @keyframes toast-in-right {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

const StyledToast = styled.div`
  align-content: center;
  margin-top: 0.2rem;
  font-weight: bold;
  letter-spacing: 0.29px;
  text-align: center;
`;
