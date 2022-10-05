import { useEffect } from "react";

import { runCursorEffect } from "../utils/canvas";
import Item from "../utils/canvasItem";

const useCanvas = (room, canvasRef, items, runImageAction) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const circle = document.getElementById("circle");
    const drawnItems = [];

    const clickEvent = (event) => {
      for (const item of drawnItems) {
        item.runEvent(drawnItems, canvas, context, event, runImageAction);
      }
    };

    const mouseMoveEvent = (event) => {
      runCursorEffect(circle, canvas, event, drawnItems);
    };

    context.clearRect(0, 0, canvas.width, canvas.height);

    (async () => {
      for (const item of items) {
        const image = new Item(item);
        await image.draw(context);
        drawnItems.push(image);
      }

      circle.addEventListener("click", clickEvent);
      canvas.addEventListener("mousemove", mouseMoveEvent);
    })();

    return () => {
      circle.removeEventListener("click", clickEvent);
      canvas.removeEventListener("mousemove", mouseMoveEvent);
    };
  }, [room]);
};

export default useCanvas;
