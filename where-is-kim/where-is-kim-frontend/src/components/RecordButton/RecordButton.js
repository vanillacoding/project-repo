import React from "react";

export default function RecordButton({ text, onClick, isDisabled }) {
  return (
    <button onClick={onClick} disabled={isDisabled}>
      {text}
    </button>
  );
}
