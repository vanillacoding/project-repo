import React, { useState, useEffect } from "react";

const LoadingText = ({ text }) => {
  const [currentText, setCurrentText] = useState(text);

  useEffect(() => {
    const interval = window.setInterval(() => {
      currentText === text + "..."
      ? setCurrentText(text)
      : setCurrentText(currentText + ".");
    }, 800);

    return () => {
      window.clearInterval(interval);
    };
  }, [currentText]);

  return <h1>{currentText}</h1>;
};

export default LoadingText;
