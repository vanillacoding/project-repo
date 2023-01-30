import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import _ from "lodash";
import { useSelector } from "react-redux";
import { undo, redo, clear } from "../../utils/history";
import { drawLineWithEmit, drawLineWithoutEmit } from "../../utils/drawLine";
import { drawingVisualizer } from "../../utils/drawingVisualizer";
import DrawingColorTool from "../../components/DrawingColorTool";
import DrawingWidthTool from "../../components/DrawingWidthTool";
import DrawingHistoryButton from "../../components/DrawingHistoryButton";

const Drawing = () => {
  const { lineColor, lineWidth } = useSelector(({ lineStyle }) => lineStyle);
  const { selectedTool } = useSelector(({ selectedTool }) => selectedTool);

  const [isModalShow, setIsModalShow] = useState(false);

  const canvasRef = useRef(null);
  const socketRef = useRef(null);
  const lineObjects = useRef([]);
  const linePath = useRef([]);
  const undoStore = useRef([]);
  const redoStore = useRef([]);
  const historyIndex = useRef(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const colorElement = document.querySelector(".colorChange");
    const widthElement = document.querySelector(".widthChange");
    const undoElement = document.querySelector(".drawingUndoButton");
    const redoElement = document.querySelector(".drawingRedoButton");
    const clearElement = document.querySelector(".drawingClearButton");

    let drawing = false;
    let currentStyle = {
      color: lineColor,
      width: lineWidth,
    };

    colorElement.addEventListener(
      "change",
      (event) => {
        currentStyle.color = event.target.value;
      },
      false,
    );

    widthElement.addEventListener(
      "change",
      (event) => {
        currentStyle.width = event.target.value;
      },
      false,
    );

    const onMouseDown = (event) => {
      drawing = true;
      currentStyle.startPosition = [event.clientX, event.clientY];
    };

    const onMouseMove = (event) => {
      if (!drawing) {
        return;
      }

      drawLineWithEmit(
        context,
        canvas,
        socketRef,
        currentStyle.startPosition,
        [event.clientX, event.clientY],
        currentStyle.color,
        currentStyle.width,
      );

      linePath.current.push([
        currentStyle.startPosition,
        [event.clientX, event.clientY],
        currentStyle.color,
        currentStyle.width,
      ]);

      currentStyle.startPosition = [event.clientX, event.clientY];
    };

    const onMouseUp = (event) => {
      if (!drawing) {
        return;
      }

      drawing = false;

      drawLineWithEmit(
        context,
        canvas,
        socketRef,
        currentStyle.startPosition,
        [event.clientX, event.clientY],
        currentStyle.color,
        currentStyle.width,
      );

      if (event.type !== "mouseout") {
        historyIndex.current += 1;
        redoStore.current.length = 0;

        lineObjects.current.push(_.cloneDeep(linePath.current));
        undoStore.current.push(_.cloneDeep(lineObjects.current));

        socketRef.current.emit("drawingHistory", {
          lineObjects: lineObjects.current,
          undoStore: undoStore.current,
          redoStore: redoStore.current,
          historyIndex: historyIndex.current,
        });
      }

      linePath.current.length = 0;
    };

    canvas.addEventListener("mousedown", onMouseDown, false);
    canvas.addEventListener("mouseup", onMouseUp, false);
    canvas.addEventListener("mouseout", onMouseUp, false);
    canvas.addEventListener("mousemove", onMouseMove, false);

    clearElement.addEventListener("click", () => {
      clear(
        "drawing",
        context,
        canvas,
        socketRef,
        undoStore,
        redoStore,
        historyIndex,
        lineObjects,
      );
    });
    redoElement.addEventListener("click", () => {
      redo(
        "drawing",
        context,
        canvas,
        socketRef,
        undoStore,
        redoStore,
        historyIndex,
        lineObjects,
      );
    });
    undoElement.addEventListener("click", () => {
      undo(
        "drawing",
        context,
        canvas,
        socketRef,
        undoStore,
        redoStore,
        historyIndex,
        lineObjects,
      );
    });

    const onResize = () => {
      canvas.width = 2560;
      canvas.height = 1600;
    };

    window.addEventListener("resize", onResize, false);
    onResize();

    const onDrawingEvent = (data) => {
      if (data.startPosition) {
        drawLineWithoutEmit(
          context,
          [
            data.startPosition[0] * canvas.width,
            data.startPosition[1] * canvas.height,
          ],
          [
            data.endPosition[0] * canvas.width,
            data.endPosition[1] * canvas.height,
          ],
          data.color,
          data.width,
        );
      }
    };

    socketRef.current = io.connect(
      `${process.env.REACT_APP_SERVER_IPADDRESS}`,
      {
        secure: true,
        reconnect: true,
        rejectUnauthorized: false,
      },
    );

    socketRef.current.on("drawing", onDrawingEvent);
    socketRef.current.on("drawingHistory", (data) => {
      lineObjects.current = [...data.lineObjects];
      undoStore.current = [...data.undoStore];
      redoStore.current = [...data.redoStore];
      historyIndex.current = data.historyIndex;

      context.clearRect(0, 0, canvas.width, canvas.height);
      drawingVisualizer(context, [...data.lineObjects]);
    });

    return () => {
      socketRef.current.off();
    };
  }, []);

  return (
    <DrawingContainer>
      <canvas
        ref={canvasRef}
        className="drawingCanvas"
        style={{ zIndex: selectedTool === "drawing" ? 1 : 0 }}
      />
      <div
        className="drawing-floatingBox"
        style={{
          zIndex: selectedTool === "drawing" ? 1 : -1,
          display: selectedTool === "drawing" ? "flex" : "none",
        }}
      >
        <div
          className="drawing-floatingModal"
          style={{
            transform: !isModalShow
              ? ["translateX(100vmin)"]
              : ["translateX(0)"],
            display: isModalShow ? "flex" : "none",
          }}
        >
          <h1>Drawing</h1>
          <div className="drawing-toolBox">
            <DrawingColorTool />
            <DrawingWidthTool />
          </div>
          <DrawingHistoryButton />
          <div
            onClick={() => {
              setIsModalShow(false);
            }}
            className="drawing-closeButton"
          >
            close
          </div>
        </div>
        <div
          className="drawing-floatButton"
          style={{
            transform: isModalShow
              ? ["translateY(100vmin)"]
              : ["translateY(0)"],
            display: selectedTool === "drawing" ? "flex" : "none",
            zIndex: selectedTool === "drawing" ? 1 : -1,
          }}
          onClick={() => {
            setIsModalShow(true);
          }}
        >
          +
        </div>
      </div>
    </DrawingContainer>
  );
};

const DrawingContainer = styled.div`
  canvas {
    position: absolute;
    top: 0;
    left: -20vw;
    z-index: 1;
  }

  .drawing-floatingBox {
    position: absolute;
    bottom: 4vmin;
    right: 5vmin;
    transition: all 0.2s ease-in-out;

    .drawing-floatButton {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      right: 0;
      bottom: 0;
      height: 4vmin;
      width: 4vmin;
      border-radius: 4vmin;
      color: white;
      background-color: #777;
      user-select: none;
      cursor: pointer;
      transition: all 0.4s ease-in-out;

      :hover {
        background-color: hsl(0, 0%, 80%);
      }

      :active {
        background-color: hsl(0, 0%, 60%);
      }
    }

    .drawing-floatingModal {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 48vmin;
      width: 30vmin;
      background-color: hsl(0, 0%, 80%);
      border-radius: 3vmin;
      transition: all 0.4s ease-in-out;

      h1 {
        margin-bottom: 2vh;
      }

      .drawing-toolBox {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .drawing-tool {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          margin-bottom: 1vh;
        }

        p {
          color: hsl(0, 0%, 10%);
          margin-top: 1vmin;
          margin-bottom: 0.5vmin;
        }
      }

      .drawing-historyButton {
        margin: 0 0.5vmin;
        padding: 1vmin 1.4vmin;
        color: #777;
        font-size: 1.5vmin;
        border: none;
        border-radius: 1.5vmin;
        transition: all 0.2s ease-in-out;

        :hover {
          background-color: hsl(0, 0%, 80%);
        }

        :active {
          background-color: hsl(0, 0%, 60%);
        }
      }

      .drawing-closeButton {
        margin-top: 2vh;
        padding: 0.5vmin 2vmin;
        color: hsl(0, 0%, 80%);
        background-color: hsl(0, 0%, 40%);
        border-radius: 1vmin;
        user-select: none;
        cursor: pointer;
        transition: all 0.2s ease-in-out;

        :hover {
          background-color: hsl(0, 0%, 50%);
        }

        :active {
          background-color: hsl(0, 0%, 30%);
        }
      }
    }
  }
`;

export default Drawing;
