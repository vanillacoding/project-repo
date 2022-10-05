import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import styled from "styled-components";
import { throttle } from "lodash";
import PropTypes from "prop-types";

import {
  SEND_DRAW,
  SEND_DRAW_START,
  CHANGE_COLOR,
  DELETE_CANVAS,
  RECEIVE_COLOR,
  DRAWING,
  DRAW_START,
  CLEAR_CANVAS
} from "../../../constants/socketEvents";

import ClearButton from "./ClearButton/ClearButton";
import ColorPicker from "./ColorPicker/ColorPicker";

const WhiteBoardCanvas = styled.div`
  position: relative;
  width: 59%;
  height: 80%;
  margin: 1em;
  background-color: #FFFFFF;
  border-radius: 10px;

  .colorpicker-container {
    position: absolute;
    left: 50%;
    width: 70px;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    transform: translateX(-50%);
  }
`;

function WhiteBoard({ socket, roomId }) {
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [color, setColor] = useState("#000000");
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef();
  const canvasouter = useRef();

  useEffect(() => {
    if (!canvasRef || !canvasouter) return;

    setWidth(canvasouter.current.offsetWidth);
    setHeight(canvasouter.current.offsetHeight);

    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    ctx.lineWidth = 2.5;

    canvas.addEventListener("mousedown", initDraw);
    canvas.addEventListener("mousemove", throttle(draw, 50));
    canvas.addEventListener("mouseup", finishDraw);
    canvas.addEventListener("mouseout", finishDraw);

    let pos = {
      drawable: false,
      X: -1,
      Y: -1
    };

    function initDraw(event) {
      pos = { drawable: true, ...getPosition(event) };

      socket.emit(SEND_DRAW_START, roomId, pos);
    }

    function draw(event) {
      if (pos.drawable) {
        pos = { drawable: pos.drawable, ...getPosition(event) };

        socket.emit(SEND_DRAW, roomId, pos);
      }
    }

    function finishDraw() {
      pos = {
        drawable: false,
        X: -1,
        Y: -1
      };
    }

    function getPosition(event) {
      return {
        X: event.offsetX,
        Y: event.offsetY
      };
    }

    socket.on(RECEIVE_COLOR, (color) => {
      setColor(color);
      ctx.strokeStyle = color;
    });

    socket.on(DRAW_START, (receivedPos) => {
      isDrawing || setIsDrawing(true);
      ctx.moveTo(receivedPos.X, receivedPos.Y);
    });

    socket.on(DRAWING, (receivedPos) => {
      ctx.lineTo(receivedPos.X, receivedPos.Y);
      ctx.stroke();
    });

    socket.on(CLEAR_CANVAS, () => {
      setIsDrawing(false);
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
    });

    return () => {
      socket.off(DRAW_START);
      socket.off(DRAWING);
      socket.off(CLEAR_CANVAS);
      socket.off(RECEIVE_COLOR);
    };
  }, [canvasRef, canvasouter, roomId, color, isDrawing]);

  const handleColorChange = useCallback((event) => {
    socket.emit(CHANGE_COLOR, roomId, event.target.value);
  }, []);

  const handleButtonClick = useCallback(() => {
    socket.emit(DELETE_CANVAS, roomId);
  }, []);

  return (
    <WhiteBoardCanvas ref={canvasouter}>
      {
        isDrawing
          ? <ClearButton
              className="colorpicker-container"
              buttonClickEvent={handleButtonClick}
            />
          : <ColorPicker
              className="colorpicker-container"
              color={color}
              colorPickerClickEvent={handleColorChange}
            />
      }
      <canvas
        ref={canvasRef}
        className="whiteboard-canvas"
        width={width}
        height={height}
      />
    </WhiteBoardCanvas>
  );
}

WhiteBoard.propTypes = {
  socket: PropTypes.object.isRequired,
  roomId: PropTypes.string.isRequired
};

export default React.memo(WhiteBoard);
