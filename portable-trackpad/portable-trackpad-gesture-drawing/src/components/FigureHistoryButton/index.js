import React from "react";
import styled from "styled-components";

const FigureHistoryButton = () => {
  return (
    <FigureHistoryButtonContainer>
      <h4>히스토리</h4>
      <div>
        <button className="figureUndoButton figure-historyButton">undo</button>
        <button className="figureRedoButton figure-historyButton">redo</button>
        <button className="figureClearButton figure-historyButton">
          clear
        </button>
      </div>
    </FigureHistoryButtonContainer>
  );
};

const FigureHistoryButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1vh;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1vh;
  }
`;

export default FigureHistoryButton;
