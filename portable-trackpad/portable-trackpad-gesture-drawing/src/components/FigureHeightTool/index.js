import React, { forwardRef } from "react";
import styled from "styled-components";

const FigureHeightTool = (props, ref) => {
  const { objects, objectActualIndex } = ref;

  return (
    <FigureHeightToolContainer>
      <h4>높이</h4>
      <input
        onChange={(event) => {
          const selectedFigure = objects.current[objectActualIndex.current];

          if (selectedFigure.type === "circle") {
            selectedFigure.height = event.target.value;
            selectedFigure.width = event.target.value;
          } else if (selectedFigure.type === "triangle") {
            selectedFigure.height = (Math.sqrt(3) / 2) * event.target.value;
          } else {
            selectedFigure.height = event.target.value;
          }
        }}
      />
    </FigureHeightToolContainer>
  );
};

const FigureHeightToolContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 2vh;

  input {
    width: 10vmin;
  }
`;

export default forwardRef(FigureHeightTool);
