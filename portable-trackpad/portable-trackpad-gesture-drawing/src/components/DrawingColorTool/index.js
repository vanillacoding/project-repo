import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setLineColor } from "../../redux/reducers/lineStyle";

const DrawingColorTool = () => {
  const { lineColor } = useSelector(({ lineStyle }) => lineStyle);

  const dispatch = useDispatch();

  return (
    <DrawingColorToolContainer>
      <div className="drawing-tool">
        <p>선 색상변경</p>
        <input
          type="color"
          className="colorChange"
          onChange={(event) => {
            dispatch(setLineColor(event.target.value));
          }}
        />
        <h5>{lineColor}</h5>
      </div>
    </DrawingColorToolContainer>
  );
};

const DrawingColorToolContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1vh;
`;

export default DrawingColorTool;
