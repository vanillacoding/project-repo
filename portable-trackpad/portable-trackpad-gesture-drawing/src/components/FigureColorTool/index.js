import React, { forwardRef } from "react";
import styled from "styled-components";

const FigureColorTool = (props, ref) => {
  const { objects, objectActualIndex } = ref;

  return (
    <FigureColorToolContainer>
      <h4>색상</h4>
      <input
        type="color"
        onChange={(event) => {
          objects.current[objectActualIndex.current].color = event.target.value;
        }}
      />
    </FigureColorToolContainer>
  );
};

const FigureColorToolContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 2vh;

  input {
    width: 10vmin;
  }
`;

export default forwardRef(FigureColorTool);
