import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import _ from "lodash";
import { useSelector } from "react-redux";
import { undo, redo, clear } from "../../utils/history";
import { figureVisualizer } from "../../utils/figureVisualizer";
import NEW_FIGURES from "../../constants/NEW_FIGURES";
import FigureTool from "../../components/FigureHeightTool";
import FigureWidthTool from "../../components/FigureWidthTool";
import FigureColorTool from "../../components/FigureColorTool";
import AddFigureButton from "../../components/AddFigureButton";
import FigureHistoryButton from "../../components/FigureHistoryButton";

const Figure = () => {
  const { selectedTool } = useSelector(({ selectedTool }) => selectedTool);

  const [isModalShow, setIsModalShow] = useState(false);

  const canvasRef = useRef(null);
  const initialPosition = useRef([0, 0]);
  const objects = useRef([]);
  const objectActualIndex = useRef(null);
  const objectActual = useRef({});
  const socketServerRef = useRef(null);
  const socketPackRef = useRef(null);
  const undoStore = useRef([]);
  const redoStore = useRef([]);
  const historyIndex = useRef(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const undoElement = document.querySelector(".figureUndoButton");
    const redoElement = document.querySelector(".figureRedoButton");
    const clearElement = document.querySelector(".figureClearButton");

    let scaleCount = 0;

    socketServerRef.current = io.connect(
      `${process.env.REACT_APP_SERVER_IPADDRESS}`,
      {
        secure: true,
        reconnect: true,
        rejectUnauthorized: false,
      },
    );

    socketPackRef.current = io.connect(
      `http://${process.env.REACT_APP_PACKAGE_IPADDRESS}:${process.env.REACT_APP_PACKAGE_PORT}`,
      {
        secure: true,
        reconnect: true,
        rejectUnauthorized: false,
      },
    );

    socketServerRef.current.on("figure", (data) => {
      objects.current = data;

      figureVisualizer(context, objects.current);
    });

    socketPackRef.current.on("drawingGesture", (data) => {
      if (data === "triangle") {
        objects.current.push(NEW_FIGURES.TRIANGLE);

        figureVisualizer(context, objects.current);
      } else if (data === "circle") {
        objects.current.push(NEW_FIGURES.CIRCLE);

        figureVisualizer(context, objects.current);
      } else if (data === "square") {
        objects.current.push(NEW_FIGURES.SQUARE);

        figureVisualizer(context, objects.current);
      } else if (data === "scaleUp") {
        const selectedFigure = objects.current[objectActualIndex.current];

        scaleCount++;

        if (scaleCount === 2) {
          if (selectedFigure.type === "triangle") {
            selectedFigure.width += 1;
            selectedFigure.height += Math.sqrt(3) / 2;
          } else {
            selectedFigure.width += 1;
            selectedFigure.height += 1;
          }

          scaleCount = 0;
        }

        figureVisualizer(context, objects.current);
      } else if (data === "scaleDown") {
        const selectedFigure = objects.current[objectActualIndex.current];

        if (selectedFigure.width < 11 || selectedFigure.height < 11) {
          return;
        }

        scaleCount++;

        if (scaleCount === 2) {
          if (selectedFigure.type === "triangle") {
            selectedFigure.width -= 1;
            selectedFigure.height -= Math.sqrt(3) / 2;
          } else {
            selectedFigure.width -= 1;
            selectedFigure.height -= 1;
          }

          scaleCount = 0;
        }

        figureVisualizer(context, objects.current);
      }
    });

    socketServerRef.current.on("figureHistory", (data) => {
      undoStore.current = data.undoStore;
      redoStore.current = data.redoStore;
      historyIndex.current = data.historyIndex;

      context.clearRect(0, 0, canvas.width, canvas.height);

      const currentObject = _.cloneDeep(undoStore.current[data.historyIndex]);

      objects.current = currentObject;

      figureVisualizer(context, objects.current);
    });

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", onResize, false);
    onResize();
    figureVisualizer(context, objects.current);

    const onMouseDown = (event) => {
      for (let i = 0; i < objects.current.length; i++) {
        const { x, y, height, width } = objects.current[i];
        const identifySquare =
          x < event.clientX &&
          width + x > event.clientX &&
          y < event.clientY &&
          height + y > event.clientY;

        const identifyCircle =
          x - width / 2 < event.clientX &&
          width / 2 + x > event.clientX &&
          y - height / 2 < event.clientY &&
          height / 2 + y > event.clientY;

        const identifyTriangle =
          x < event.clientX &&
          width + x > event.clientX &&
          y > event.clientY &&
          height + y > event.clientY;

        const identifyPoint =
          objects.current[i].type === "circle"
            ? identifyCircle
            : objects.current[i].type === "square"
            ? identifySquare
            : identifyTriangle;

        if (identifyPoint) {
          objectActualIndex.current = i;
          objectActual.current = objects.current[i];
          initialPosition.current = [event.clientX - x, event.clientY - y];

          break;
        }
      }
    };

    const onMouseMove = (event) => {
      if (objectActual.current != null) {
        objectActual.current.x = event.clientX - initialPosition.current[0];
        objectActual.current.y = event.clientY - initialPosition.current[1];
      }

      socketServerRef.current.emit("figure", objects.current);

      figureVisualizer(context, objects.current);
    };

    const onMouseUp = (event) => {
      if (objectActual.current !== null && event.type !== "mouseout") {
        const currentObject = _.cloneDeep(objects.current);

        historyIndex.current += 1;

        undoStore.current.push(currentObject);
        redoStore.current.length = 0;

        socketServerRef.current.emit("figureHistory", {
          undoStore: undoStore.current,
          redoStore: redoStore.current,
          historyIndex: historyIndex.current,
        });
      }

      objectActual.current = null;
    };

    canvas.addEventListener("mousedown", onMouseDown, false);
    canvas.addEventListener("mouseup", onMouseUp, false);
    canvas.addEventListener("mouseout", onMouseUp, false);
    canvas.addEventListener("mousemove", onMouseMove, false);

    window.addEventListener("click", () => {
      figureVisualizer(context, objects.current);
    });

    window.addEventListener("keyup", () => {
      figureVisualizer(context, objects.current);
    });

    clearElement.addEventListener("click", () => {
      clear(
        "figure",
        context,
        canvas,
        socketServerRef,
        undoStore,
        redoStore,
        historyIndex,
        objects,
      );
    });

    redoElement.addEventListener("click", () => {
      redo(
        "figure",
        context,
        canvas,
        socketServerRef,
        undoStore,
        redoStore,
        historyIndex,
        objects,
      );
    });

    undoElement.addEventListener("click", () => {
      undo(
        "figure",
        context,
        canvas,
        socketServerRef,
        undoStore,
        redoStore,
        historyIndex,
        objects,
      );
    });

    return () => {
      socketServerRef.current.off();
      socketPackRef.current.off();
    };
  }, []);

  const inputUndo = (data) => {
    const currentObject = _.cloneDeep(data);

    historyIndex.current += 1;
    undoStore.current.push(currentObject);
    redoStore.current = [];

    socketServerRef.current.emit("figureHistory", {
      undoStore: undoStore.current,
      redoStore: redoStore.current,
      historyIndex: historyIndex.current,
    });
  };

  return (
    <FigureContainer>
      <canvas ref={canvasRef} className="figureCanvas" />
      <div
        className="figure-floatingBox"
        style={{
          zIndex: selectedTool === "figure" ? 1 : -1,
          display: selectedTool === "figure" ? "flex" : "none",
        }}
      >
        <div
          className="figure-floatingModal"
          style={{
            transform: !isModalShow
              ? ["translateX(100vmin)"]
              : ["translateX(0)"],
            display: isModalShow ? "flex" : "none",
          }}
        >
          <h1>Figure</h1>
          <div className="figure-toolBox">
            <div className="controlBox">
              <FigureTool ref={{ objects, objectActualIndex }} />
              <FigureWidthTool ref={{ objects, objectActualIndex }} />
              <FigureColorTool ref={{ objects, objectActualIndex }} />
            </div>
          </div>
          <div className="buttonBox">
            <h4>도형 추가</h4>
            <div>
              {["square", "circle", "triangle"].map((value, index) => {
                return (
                  <AddFigureButton
                    inputUndo={inputUndo}
                    type={value}
                    ref={{ objects }}
                    key={index}
                  />
                );
              })}
            </div>
          </div>
          <FigureHistoryButton />
          <div
            onClick={() => {
              setIsModalShow(false);
            }}
            className="figure-closeButton"
          >
            close
          </div>
        </div>
        <div
          className="figure-floatButton"
          style={{
            transform: isModalShow
              ? ["translateY(100vmin)"]
              : ["translateY(0)"],
            display: selectedTool === "figure" ? "flex" : "none",
            zIndex: selectedTool === "figure" ? 1 : -1,
          }}
          onClick={() => {
            setIsModalShow(true);
          }}
        >
          +
        </div>
      </div>
    </FigureContainer>
  );
};

const FigureContainer = styled.div`
  canvas {
    position: absolute;
    top: 0;
    left: -20vw;
    z-index: 0;
  }

  .figure-floatingBox {
    position: absolute;
    bottom: 4vmin;
    right: 5vmin;
    transition: all 0.2s ease-in-out;

    .figure-floatButton {
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

    .figure-floatingModal {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 65vmin;
      width: 30vmin;
      background-color: hsl(0, 0%, 80%);
      border-radius: 3vmin;
      transition: all 0.4s ease-in-out;

      h1 {
        margin-bottom: 2vh;
      }

      .figure-toolBox {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .figure-tool {
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

      .figure-historyButton {
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

      .figure-closeButton {
        margin-top: 4vh;
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

  .controlBox {
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-top: 2vh;

      input {
        width: 10vmin;
      }
    }
  }

  .buttonBox {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 2vh;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .figure-historyBox {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 2vh;

    div {
      display: flex;
      justify-content: center;
      align-items: center;

      button {
        user-select: none;
        cursor: pointer;
      }
    }
  }
`;

export default Figure;
