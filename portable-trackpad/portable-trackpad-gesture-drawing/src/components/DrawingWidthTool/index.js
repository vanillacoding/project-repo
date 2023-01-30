import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setLineWidth } from "../../redux/reducers/lineStyle";

const DrawingWidthTool = () => {
  const { lineWidth } = useSelector(({ lineStyle }) => lineStyle);

  const dispatch = useDispatch();

  return (
    <DrawingWidthToolContainer>
      <div className="drawing-tool">
        <p>선 굵기</p>
        <input
          type="range"
          min="1"
          max="200"
          defaultValue="5"
          className="widthChange"
          onChange={(event) => {
            dispatch(setLineWidth(event.target.value));
          }}
        />
        <h5>{lineWidth}</h5>
      </div>
    </DrawingWidthToolContainer>
  );
};

const DrawingWidthToolContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1vh;
`;

export default DrawingWidthTool;
