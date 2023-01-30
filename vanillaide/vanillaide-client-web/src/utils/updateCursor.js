function updatePrevCursor(viewUpdate, doc, head, handlePrevCursor) {
  let initialCursor = 0;
  let lineNumber = 0;
  let prevEndHead = 0;
  const currentHead = head;
  const docToString = doc.toString();

  while (
    docToString.indexOf("\n", initialCursor) < currentHead &&
    docToString.indexOf("\n", initialCursor) !== -1
  ) {
    initialCursor = docToString.indexOf("\n", initialCursor) + 1;
    lineNumber += 1;
    prevEndHead = docToString.indexOf("\n", initialCursor - 1);
  }

  const { viewportLines } = viewUpdate.view.viewState;
  const prevLineLength = viewportLines[lineNumber - 1]
    ? viewportLines[lineNumber - 1].length + 1
    : 0;

  if (currentHead - prevLineLength < 0) return;

  if (currentHead - prevEndHead > prevLineLength && prevLineLength !== 0) {
    return handlePrevCursor(currentHead - (currentHead - prevEndHead));
  }

  return handlePrevCursor(currentHead - prevLineLength);
}

function updateNextCursor(viewUpdate, doc, head, handleNextCursor) {
  let initialCursor = 0;
  let lineNumber = 0;
  const currentHead = head;
  const docToString = doc.toString();

  while (
    docToString.indexOf("\n", initialCursor) < currentHead &&
    docToString.indexOf("\n", initialCursor) !== -1
  ) {
    initialCursor = docToString.indexOf("\n", initialCursor) + 1;
    lineNumber += 1;
  }

  const { viewportLines } = viewUpdate.view.viewState;
  const currentLineLength = viewportLines[lineNumber].length;
  const nextLineLength = viewportLines[lineNumber + 1]
    ? viewportLines[lineNumber + 1].length
    : null;
  const nextCursor = viewportLines[lineNumber + 1]
    ? viewportLines[lineNumber + 1].from
    : null;

  if (nextLineLength === 0) {
    return handleNextCursor(nextCursor);
  }

  if (nextLineLength === null) {
    return handleNextCursor(currentHead);
  }

  if (currentHead + currentLineLength + 1 > docToString.length) {
    return handleNextCursor(docToString.length);
  }

  return handleNextCursor(currentHead + currentLineLength + 1);
}

export { updatePrevCursor, updateNextCursor };
