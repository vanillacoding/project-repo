import _ from "lodash";
import { drawingVisualizer } from "./drawingVisualizer";
import { figureVisualizer } from "./figureVisualizer";

export const undo = (
  type,
  context,
  canvas,
  socket,
  undoStore,
  redoStore,
  historyIndex,
  objects,
) => {
  if (historyIndex.current < 0) {
    window.alert("더이상 되돌아갈 작업이 없습니다.");
  } else if (historyIndex.current === 0) {
    const popUndoStore = _.cloneDeep(undoStore.current.pop());

    context.clearRect(0, 0, canvas.width, canvas.height);
    redoStore.current.unshift(popUndoStore);

    objects.current.length = 0;
    historyIndex.current = -1;

    if (type === "drawing") {
      socket.current.emit("drawingHistory", {
        lineObjects: objects.current,
        undoStore: undoStore.current,
        redoStore: redoStore.current,
        historyIndex: historyIndex.current,
      });
    } else {
      socket.current.emit("figureHistory", {
        undoStore: undoStore.current,
        redoStore: redoStore.current,
        historyIndex: historyIndex.current,
      });
    }
  } else {
    const popUndoStore = _.cloneDeep(undoStore.current.pop());

    context.clearRect(0, 0, canvas.width, canvas.height);
    redoStore.current.unshift(popUndoStore);

    historyIndex.current -= 1;
    objects.current = _.cloneDeep(undoStore.current[historyIndex.current]);

    if (type === "drawing") {
      drawingVisualizer(context, objects.current);

      socket.current.emit("drawingHistory", {
        lineObjects: objects.current,
        undoStore: undoStore.current,
        redoStore: redoStore.current,
        historyIndex: historyIndex.current,
      });
    } else {
      figureVisualizer(context, objects.current);

      socket.current.emit("figureHistory", {
        undoStore: undoStore.current,
        redoStore: redoStore.current,
        historyIndex: historyIndex.current,
      });
    }
  }
};

export const redo = (
  type,
  context,
  canvas,
  socket,
  undoStore,
  redoStore,
  historyIndex,
  objects,
) => {
  if (redoStore.current.length > 0) {
    const shiftRedoStore = _.cloneDeep(redoStore.current.shift());

    context.clearRect(0, 0, canvas.width, canvas.height);
    undoStore.current.push(shiftRedoStore);

    historyIndex.current += 1;

    const lastUndoStoreData = _.cloneDeep(
      undoStore.current[historyIndex.current],
    );

    objects.current = lastUndoStoreData;

    figureVisualizer(context, objects.current);

    if (type === "drawing") {
      drawingVisualizer(context, objects.current);

      socket.current.emit("drawingHistory", {
        lineObjects: objects.current,
        undoStore: undoStore.current,
        redoStore: redoStore.current,
        historyIndex: historyIndex.current,
      });
    } else {
      figureVisualizer(context, objects.current);

      socket.current.emit("figureHistory", {
        undoStore: undoStore.current,
        redoStore: redoStore.current,
        historyIndex: historyIndex.current,
      });
    }
  }
};

export const clear = (
  type,
  context,
  canvas,
  socket,
  undoStore,
  redoStore,
  historyIndex,
  objects,
) => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  undoStore.current.length = 0;
  redoStore.current.length = 0;
  objects.current.length = 0;
  historyIndex.current = -1;

  if (type === "drawing") {
    socket.current.emit("drawingHistory", {
      lineObjects: objects.current,
      undoStore: undoStore.current,
      redoStore: redoStore.current,
      historyIndex: historyIndex.current,
    });
  } else {
    figureVisualizer(context, objects.current);

    socket.current.emit("figureHistory", {
      undoStore: undoStore.current,
      redoStore: redoStore.current,
      historyIndex: historyIndex.current,
    });
  }
};
