import React, { useRef } from "react";

import useCanvasDraw from "../hooks/useCanvasDraw";

import styles from "./styles/Canvas.module.css";

const Canvas = () => {
  const canvasRef = useRef(null);
  useCanvasDraw(canvasRef);

  return (
    <canvas
      className={styles.canvas}
      ref={canvasRef}
      width={1080}
      height={1000}
    />
  );
};

export default Canvas;
