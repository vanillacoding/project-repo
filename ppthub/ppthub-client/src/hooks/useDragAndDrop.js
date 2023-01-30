import { useState, useEffect, useCallback } from "react";

function useDragAndDrop({ onChange, dragAndDropRef }) {
  const [isDragging, setIsDragging] = useState(false);
  const handleDragIn = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleDragOut = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer.files) {
      setIsDragging(true);
    }

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer.files) {
      setIsDragging(true);
    }
  }, []);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      onChange(event);
      setIsDragging(false);
    },
    [onChange],
  );

  const initializeDragEvents = useCallback(() => {
    if (dragAndDropRef.current) {
      dragAndDropRef.current.addEventListener("dragenter", handleDragIn);
      dragAndDropRef.current.addEventListener("dragleave", handleDragOut);
      dragAndDropRef.current.addEventListener("dragover", handleDragOver);
      dragAndDropRef.current.addEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop, dragAndDropRef]);

  const resetDragEvents = useCallback(() => {
    if (dragAndDropRef.current) {
      dragAndDropRef.current.removeEventListener("dragenter", handleDragIn);
      dragAndDropRef.current.removeEventListener("dragleave", handleDragOut);
      dragAndDropRef.current.removeEventListener("dragover", handleDragOver);
      dragAndDropRef.current.removeEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop, dragAndDropRef]);

  useEffect(() => {
    initializeDragEvents();
    return () => resetDragEvents();
  }, [initializeDragEvents, resetDragEvents]);

  return isDragging;
}

export default useDragAndDrop;
