import React, { forwardRef } from "react";
import styled from "styled-components";

const FigureWidthTool = (props, ref) => {
  const { objects, objectActualIndex } = ref;

  return (
    <FigureWidthToolContainer>
      <h4>너비</h4>
      <input
        onChange={(event) => {
          const selectedFigure = objects.current[objectActualIndex.current];

          if (selectedFigure.type === "circle") {
            selectedFigure.height = event.target.value;
            selectedFigure.width = event.target.value;
          } else if (selectedFigure.type === "triangle") {
            selectedFigure.width = (Math.sqrt(3) / 2) * event.target.value;
          } else {
            selectedFigure.width = event.target.value;
          }
        }}
      />
    </FigureWidthToolContainer>
  );
};

const FigureWidthToolContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 2vh;

  input {
    width: 10vmin;
  }
`;

export default forwardRef(FigureWidthTool);
