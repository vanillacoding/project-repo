import { cloneDeep } from 'lodash';

export default data => {
  const result = cloneDeep(data);
  const backgroundVertexNode = [];
  let row = 0;
  let col = 0;
  let maxCols = result.backgroundMaxCols;
  let maxRows = result.backgroundMaxRows;
  if (!maxCols && !maxRows) {
    return result;
  }
  let amount = maxCols * maxRows;
  for (let i = 0; i < amount; i++) {
    let vertex = {};
    if (row % 2 === 0) {
      vertex.x = (col * result.backgroundCellSize) - result.backgroundCellSize;
    } else {
      vertex.x = (col * result.backgroundCellSize) - result.backgroundCellSize - result.backgroundCellSize / 2;
    }
    vertex.x = vertex.x + (Math.random() - 0.5) * result.backgroundVariance * result.backgroundCellSize * 2;
    vertex.y = (row * result.backgroundCellSize * 0.865) - result.backgroundCellSize;
    vertex.y = vertex.y + (Math.random() - 0.5) * result.backgroundVariance * result.backgroundCellSize * 2;
    vertex.col = col;
    vertex.row = row;
    backgroundVertexNode.push(vertex);
    col++;
    if ((i + 1) % maxCols === 0) {
      row++;
      col = 0;
    }
  }
  result.backgroundVertexNode = backgroundVertexNode;
  return result;
}
