import React, { useState } from "react";

import ToastMessage from "../components/common/ToastMessage";

export default function useToast(initialState = false) {
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("");
  const [isToastDisplayed, setIsToastDisplayed] = useState(initialState);

  const handleSendToast = (message, color) => {
    setToastMessage(message);
    setToastColor(color);
    setIsToastDisplayed(true);
  };

  const customToast = () => {
    return (
      <ToastMessage
        message={toastMessage}
        color={toastColor}
        isToastDisplayed={isToastDisplayed}
        setIsToastDisplayed={setIsToastDisplayed}
      />
    );
  };

  return [customToast, handleSendToast, isToastDisplayed];
}
