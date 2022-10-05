import { useEffect, useRef } from "react";
import { removeEventHelper } from "../utils/eventListHelper";

/**
 *
 * @param {function} CanvasConstructor Canvas constructor function
 * @param {object} options Options of canvas
 * @returns Ref of canvas
 */
const useCanvas = (CanvasConstructor, options, isLoaded) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const myCanvas = new CanvasConstructor(canvasRef, options);

    return () => {
      if (myCanvas.animationFrameId) {
        window.cancelAnimationFrame(myCanvas.animationFrameId);
      }

      if (myCanvas.eventList) {
        removeEventHelper(myCanvas.eventList);
      }

      myCanvas.ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    };
  }, [CanvasConstructor, options, isLoaded]);

  return canvasRef;
};

export default useCanvas;
