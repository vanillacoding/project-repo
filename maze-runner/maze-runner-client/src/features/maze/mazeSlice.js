import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  ALGORITHM,
  NODE_PROPERTY,
  NODE_STATUS,
  RESPONSE_RESULT,
} from '../../constant';
import { ERROR } from '../../constant/error';
import { MAZE } from '../../constant/maze';
import { createBasicRandomWall } from '../../mazeGenerationAlgorithms/basicRandomWall';
import { recursiveDivisionWrapper } from '../../mazeGenerationAlgorithms/recursiveDivision';
import {
  calcMazeBlockCount,
  createNodes,
  isFeatNode,
  resetNodeProperties,
  changeToWallNode,
  changeToWeightNode,
  changeToMiddleNode,
  runAlgorithm,
  resetAllNodeProperties,
  mazeInfoToData,
} from '../../util/maze';
import { getMaze, saveMaze } from './mazeAPI';

const initialState = {
  width: 0,
  height: 0,
  widthCount: 0,
  heightCount: 0,

  startNodeId: null,
  endNodeId: null,
  middleNodeId: null,

  nodes: {
    byId: {},
    allIds: [[]],
  },
  animatedNodeIds: [],
  animatedPathNodeIds: [],
  animatedMazeNodeIds: [],
  animationTimeoutId: null,

  isVisitNodeColorChanged: false,
  isPathNodeColorChanged: false,

  isMouseDown: false,
  isFeatNodeClick: false,
  clickedFeatNodeInfo: {
    id: null,
    status: null,
  },

  isProgressive: false,

  currentJamBlockType: NODE_STATUS.WALL,

  weightValue: 10,

  isErrorOccurred: false,
  error: null,

  mazeId: null,
};

export const saveMazeAsync = createAsyncThunk(
  'maze/saveMaze',
  async (mazeInfo) => {
    const data = mazeInfoToData(mazeInfo);
    const textResponse = await saveMaze(data);
    const response = JSON.parse(textResponse);

    if (response.result === RESPONSE_RESULT.ERROR) {
      throw new Error(ERROR.SERVER_ERROR);
    }

    return response;
  },
);

export const getMazeAsync = createAsyncThunk('maze/getMaze', async (mazeId) => {
  try {
    const textResponse = await getMaze(mazeId);
    const response = JSON.parse(textResponse);

    if (response.result === RESPONSE_RESULT.ERROR) {
      throw new Error(ERROR.SERVER_ERROR);
    }

    return response;
  } catch (err) {
    return err;
  }
});

export const mazeOptionsSlice = createSlice({
  name: 'maze',
  initialState,
  reducers: {
    createMaze: (state, action) => {
      const { width, height } = action.payload;

      state.width = width;
      state.height = height;

      const { widthCount, heightCount } = calcMazeBlockCount(width, height);

      state.widthCount = widthCount;
      state.heightCount = heightCount;

      const { allIds, byId } = createNodes(widthCount, heightCount);

      state.nodes.byId = byId;
      state.nodes.allIds = allIds;

      state.startNodeId = `${parseInt(heightCount * 0.5, 10)}-${parseInt(
        widthCount * 0.25,
        10,
      )}`;
      state.endNodeId = `${parseInt(heightCount * 0.5, 10)}-${parseInt(
        widthCount * 0.75,
        10,
      )}`;
    },
    mouseDown: (state) => {
      if (state.isProgressive) {
        return;
      }

      state.isMouseDown = true;
    },
    mouseUp: (state) => {
      if (state.isProgressive) {
        return;
      }

      state.isMouseDown = false;
      state.isFeatNodeClick = false;
      state.clickedFeatNodeInfo = { id: null, status: null };
    },
    clickFeatNode: (state, action) => {
      if (state.isProgressive) {
        return;
      }

      const { nodeId: id, nodeStatus: status } = action.payload;
      state.clickedFeatNodeInfo = { id, status };
      state.isFeatNodeClick = true;
    },
    changeNormalNode: (state, action) => {
      if (state.isProgressive) {
        return;
      }

      const targetNodeId = action.payload;
      const targetNode = state.nodes.byId[targetNodeId];

      if (isFeatNode(targetNode.status)) {
        return;
      }

      if (
        targetNode.status === NODE_STATUS.UNVISITED ||
        targetNode.status === NODE_STATUS.VISITED ||
        targetNode.status === NODE_STATUS.VISITED2 ||
        targetNode.status === NODE_STATUS.PATH ||
        targetNode.status === NODE_STATUS.PATH2
      ) {
        if (state.currentJamBlockType === NODE_STATUS.WALL) {
          changeToWallNode(targetNode);
        } else if (state.currentJamBlockType === NODE_STATUS.WEIGHTED) {
          changeToWeightNode(targetNode, state.weightValue);
        }
      } else if (
        targetNode.status === NODE_STATUS.WALL &&
        state.currentJamBlockType === NODE_STATUS.WEIGHTED
      ) {
        changeToWeightNode(targetNode, state.weightValue);
      } else if (
        targetNode.status === NODE_STATUS.WEIGHTED &&
        state.currentJamBlockType === NODE_STATUS.WALL
      ) {
        changeToWallNode(targetNode);
      } else if (targetNode.status === state.currentJamBlockType) {
        resetNodeProperties(targetNode, ['All']);
      }
    },
    changeFeatNode: (state, action) => {
      if (state.isProgressive) {
        return;
      }

      const { targetNodeId, targetNodeStatus } = action.payload;
      const { id: featNodeId, status: featNodeStatus } =
        state.clickedFeatNodeInfo;
      const targetNode = state.nodes.byId[targetNodeId];
      const featNode = state.nodes.byId[featNodeId];

      if (isFeatNode(targetNodeStatus)) {
        return;
      }

      if (state.isMouseDown) {
        targetNode.status = featNodeStatus;
        resetNodeProperties(targetNode, [
          NODE_PROPERTY.DISTANCE,
          NODE_PROPERTY.PREVIOUS_NODE_ID,
          NODE_PROPERTY.WEIGHT,
        ]);
        resetNodeProperties(featNode, ['All']);

        if (featNodeStatus === NODE_STATUS.START) {
          state.startNodeId = targetNodeId;
        }

        if (featNodeStatus === NODE_STATUS.END) {
          state.endNodeId = targetNodeId;
        }

        if (featNodeStatus === NODE_STATUS.MIDDLE) {
          state.middleNodeId = targetNodeId;
        }

        state.clickedFeatNodeInfo.id = targetNodeId;
      }
    },
    startPathfinding: (state, action) => {
      const { nodes, startNodeId, endNodeId, middleNodeId } = state;
      const algorithmName = action.payload;

      if (algorithmName === ALGORITHM.NONE) {
        return;
      }

      state.isVisitNodeColorChanged = false;
      state.isPathNodeColorChanged = false;

      resetAllNodeProperties(state.nodes);

      const result = runAlgorithm(
        algorithmName,
        startNodeId,
        middleNodeId,
        endNodeId,
        nodes,
      );

      state.animatedNodeIds = result.animatedNodeIds;
      state.animatedPathNodeIds = result.animatedPathNodeIds;
    },
    visitNode: (state, action) => {
      const nodeId = action.payload;

      if (nodeId === '/') {
        state.isVisitNodeColorChanged = true;
        return;
      }

      if (isFeatNode(state.nodes.byId[nodeId].status)) {
        return;
      }

      state.nodes.byId[nodeId].status = state.isVisitNodeColorChanged
        ? NODE_STATUS.VISITED
        : NODE_STATUS.VISITED2;
    },
    drawMazeNode: (state, action) => {
      const { nodeId } = action.payload;
      const targetNode = state.nodes.byId[nodeId];
      const nodeStatus = state.nodes.byId[nodeId].status;

      if (isFeatNode(nodeStatus)) {
        return;
      }

      if (state.currentJamBlockType === NODE_STATUS.WALL) {
        changeToWallNode(targetNode);
        return;
      }

      if (state.currentJamBlockType === NODE_STATUS.WEIGHTED) {
        changeToWeightNode(targetNode, state.weightValue);
      }
    },
    markPathNode: (state, action) => {
      const pathNodeId = action.payload;

      if (pathNodeId === '/') {
        state.isPathNodeColorChanged = true;
        return;
      }

      if (isFeatNode(state.nodes.byId[pathNodeId].status)) {
        return;
      }

      state.nodes.byId[pathNodeId].status = state.isPathNodeColorChanged
        ? NODE_STATUS.PATH
        : NODE_STATUS.PATH2;
    },
    setAnimationTimeoutId: (state, action) => {
      state.animationTimeoutId = action.payload;
    },
    startAnimation: (state) => {
      state.isProgressive = true;
    },
    endAnimation: (state) => {
      state.isProgressive = false;
      state.animatedNodeIds = [];
      state.animatedPathNodeIds = [];
    },
    clearVisitedAndPathNodes: (state) => {
      state.nodes.allIds.forEach((row) => {
        row.forEach((id) => {
          if (
            state.nodes.byId[id].status === NODE_STATUS.VISITED ||
            state.nodes.byId[id].status === NODE_STATUS.VISITED2 ||
            state.nodes.byId[id].status === NODE_STATUS.PATH ||
            state.nodes.byId[id].status === NODE_STATUS.PATH2
          ) {
            state.nodes.byId[id].status = NODE_STATUS.UNVISITED;
          }
        });
      });

      state.animatedNodeIds = [];
      state.animatedPathNodeIds = [];
    },
    clearWallAndWeightNode: (state) => {
      state.nodes.allIds.forEach((row) => {
        row.forEach((id) => {
          const currentNode = state.nodes.byId[id];

          if (
            state.nodes.byId[id].status === NODE_STATUS.WALL ||
            state.nodes.byId[id].status === NODE_STATUS.WEIGHTED
          ) {
            resetNodeProperties(currentNode, [NODE_PROPERTY.STATUS]);
          }

          resetNodeProperties(currentNode, [
            NODE_PROPERTY.DISTANCE,
            NODE_PROPERTY.PREVIOUS_NODE_ID,
            NODE_PROPERTY.WEIGHT,
          ]);
        });
      });
    },
    changeCurrentJamBlockType: (state, action) => {
      const jamBlockType = action.payload;

      if (
        jamBlockType !== NODE_STATUS.WALL &&
        jamBlockType !== NODE_STATUS.WEIGHTED
      ) {
        return;
      }

      state.currentJamBlockType = jamBlockType;
    },
    createMiddleNode: (state) => {
      if (state.isProgressive) {
        return;
      }

      if (state.middleNodeId) {
        return;
      }

      const widthCount = state.widthCount;
      const heightCount = state.heightCount;

      const middleNodeIdY = parseInt(heightCount / 2, 10);
      const middleNodeIdX = parseInt(widthCount / 2, 10);

      let middleNodeId = `${middleNodeIdY}-${middleNodeIdX}`;
      let middleNode = state.nodes.byId[middleNodeId];

      let count = 1;

      while (
        middleNode.status === NODE_STATUS.START ||
        middleNode.status === NODE_STATUS.END
      ) {
        middleNodeId = `${middleNodeIdY}-${middleNodeIdX + count}`;
        middleNode = state.nodes.byId[middleNodeId];
      }

      state.middleNodeId = middleNodeId;
      changeToMiddleNode(middleNode);
    },
    deleteMiddleNode: (state) => {
      if (state.isProgressive) {
        return;
      }

      const nodeId = state.middleNodeId;
      const targetNode = state.nodes.byId[nodeId];

      resetNodeProperties(targetNode, ['All']);
      state.middleNodeId = null;
    },
    drawRecursiveDivisionMaze: (state) => {
      state.animatedMazeNodeIds = recursiveDivisionWrapper(
        state.widthCount,
        state.heightCount,
        state.nodes,
      );
    },
    drawBasicRandomWall: (state) => {
      state.animatedMazeNodeIds = createBasicRandomWall(state.nodes);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveMazeAsync.rejected, (state, action) => {
        console.error('save maze rejected: ', action.error);
      })
      .addCase(saveMazeAsync.fulfilled, (state, action) => {
        const result = action.payload;

        if (result instanceof Error) {
          state.isErrorOccurred = true;
          state.error = action.payload.message;

          return;
        }

        const { mazeId } = result;

        state.mazeId = mazeId;
      });

    builder
      .addCase(getMazeAsync.rejected, (state, action) => {
        console.error('get maze rejected: ', action.error);
      })
      .addCase(getMazeAsync.fulfilled, (state, action) => {
        if (action.payload instanceof Error) {
          state.isErrorOccurred = true;
          state.error = action.payload.message;

          return;
        }

        const data = action.payload;
        const { maze } = data;
        const { block } = maze;

        const [widthCount, heightCount] = [block[0].length, block.length];

        state.width =
          widthCount * MAZE.BLOCK_SIZE_PX + MAZE.MAZE_SIDE_MARGIN_PX;
        state.height = heightCount * MAZE.BLOCK_SIZE_PX + MAZE.MARGIN_BOTTOM_PX;
        state.widthCount = widthCount;
        state.heightCount = heightCount;

        const nodes = createNodes(widthCount, heightCount);
        const { byId, allIds } = nodes;

        block.forEach((row, rowIndex) =>
          row.forEach((number, colIndex) => {
            const nodeId = `${rowIndex}-${colIndex}`;

            switch (number) {
              case 0: {
                byId[nodeId].status = NODE_STATUS.UNVISITED;
                return;
              }
              case 1: {
                byId[nodeId].status = NODE_STATUS.WALL;
                return;
              }
              case 2: {
                byId[nodeId].status = NODE_STATUS.WEIGHTED;
                byId[nodeId].weight = state.weightValue;
                return;
              }
              case 3: {
                byId[nodeId].status = NODE_STATUS.START;
                state.startNodeId = nodeId;
                return;
              }
              case 4: {
                byId[nodeId].status = NODE_STATUS.END;
                state.endNodeId = nodeId;
                return;
              }
              case 5: {
                byId[nodeId].status = NODE_STATUS.MIDDLE;
                state.middleNodeId = nodeId;
                return;
              }
              default: {
                return;
              }
            }
          }),
        );

        state.nodes.byId = byId;
        state.nodes.allIds = allIds;
      });
  },
});

export const {
  createMaze,
  mouseDown,
  mouseUp,
  clickFeatNode,
  changeNormalNode,
  changeFeatNode,
  startPathfinding,
  visitNode,
  drawMazeNode,
  markPathNode,
  setAnimationTimeoutId,
  startAnimation,
  endAnimation,
  clearVisitedAndPathNodes,
  clearWallAndWeightNode,
  changeCurrentJamBlockType,
  createMiddleNode,
  deleteMiddleNode,
  drawRecursiveDivisionMaze,
  drawBasicRandomWall,
} = mazeOptionsSlice.actions;

export const selectMaze = (state) => state.maze;
export const selectMazeWidth = (state) => state.maze.width;
export const selectMazeHeight = (state) => state.maze.height;
export const selectAllIds = (state) => state.maze.nodes.allIds;
export const selectById = (state) => state.maze.nodes.byId;
export const selectIsProgressive = (state) => state.maze.isProgressive;
export const selectIsMouseDown = (state) => state.maze.isMouseDown;
export const selectIsFeatNodeClick = (state) => state.maze.isFeatNodeClick;
export const selectAnimatedNodeIds = (state) => state.maze.animatedNodeIds;
export const selectAnimationTimeoutId = (state) =>
  state.maze.animationTimeoutId;
export const selectAnimatedPathNodeIds = (state) =>
  state.maze.animatedPathNodeIds;
export const selectCurrentJamBlockType = (state) =>
  state.maze.currentJamBlockType;
export const selectMiddleNodeId = (state) => state.maze.middleNodeId;
export const selectAnimatedMazeNodeIds = (state) =>
  state.maze.animatedMazeNodeIds;
export const selectMazeId = (state) => state.maze.mazeId;

export default mazeOptionsSlice.reducer;
