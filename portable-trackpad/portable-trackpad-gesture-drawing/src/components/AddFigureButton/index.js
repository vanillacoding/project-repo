import React, { forwardRef } from "react";
import styled from "styled-components";
import NEW_FIGURES from "../../constants/NEW_FIGURES";

const AddFigureButton = ({ inputUndo, type }, ref) => {
  const { objects } = ref;
  const figureType =
    type === "square"
      ? NEW_FIGURES.SQUARE
      : type === "circle"
      ? NEW_FIGURES.CIRCLE
      : NEW_FIGURES.TRIANGLE;

  return (
    <AddFigureButtonContainer>
      <button
        onClick={() => {
          objects.current.push({ ...figureType });

          inputUndo(objects.current);
        }}
      >
        <span className="material-symbols-outlined">
          {type === "triangle" ? "change_history" : type}
        </span>
      </button>
    </AddFigureButtonContainer>
  );
};

const AddFigureButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 2vh;

  button {
    margin: 0 0.5vmin;
    padding: 1vmin 1.4vmin;
    color: #777;
    font-size: 1.5vmin;
    border: none;
    border-radius: 1.5vmin;
    user-select: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    :hover {
      background-color: hsl(0, 0%, 80%);
    }

    :active {
      background-color: hsl(0, 0%, 60%);
    }
  }
`;

export default forwardRef(AddFigureButton);
