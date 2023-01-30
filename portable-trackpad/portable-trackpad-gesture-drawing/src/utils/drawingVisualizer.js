import { drawLineWithoutEmit } from "./drawLine";

export const drawingVisualizer = (context, path) => {
  for (let i = 0; i < path.length; i++) {
    for (let j = 0; j < path[i].length; j++) {
      drawLineWithoutEmit(context, ...path[i][j]);
    }
  }
};
