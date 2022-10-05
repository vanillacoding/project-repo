import { ALGORITHM, NODE_STATUS } from '../../constant';
import { isFeatNode } from '../../util/maze';
import mazeReducer, {
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
  changeCurrentJamBlockType,
  createMiddleNode,
  deleteMiddleNode,
} from './mazeSlice';

import { getNodeColIndex, getPrevNodeId } from '../../util/test';

describe('maze reducer create maze', () => {
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

  it('should handle initial state', () => {
    expect(mazeReducer(undefined, { type: 'unknown' })).toEqual({
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
    });
  });

  it('should handle createMaze', () => {
    const actual = mazeReducer(
      initialState,
      createMaze({ width: 800, height: 600 }),
    );
    expect(actual.widthCount).toEqual(20);
    expect(actual.heightCount).toEqual(7);
    expect(actual.startNodeId).toEqual('3-5');
    expect(actual.endNodeId).toEqual('3-15');
  });
});

describe('maze reducer run basic path finding', () => {
  let testMazeState;

  beforeEach(() => {
    testMazeState = mazeReducer(
      undefined,
      createMaze({ width: 800, height: 600 }),
    );
  });

  it('should handle mouseDown', () => {
    const actual = mazeReducer(testMazeState, mouseDown());

    expect(actual.isMouseDown).toEqual(true);
  });

  it('should handle mouseUp', () => {
    const actual = mazeReducer(testMazeState, mouseUp());

    expect(actual.isMouseDown).toEqual(false);
  });

  it('should handle clickFeatNode', () => {
    const actual = mazeReducer(
      testMazeState,
      clickFeatNode({
        nodeId: '3-5',
        nodeStatus: NODE_STATUS.START,
      }),
    );

    expect(actual.clickedFeatNodeInfo).toEqual({
      id: '3-5',
      status: NODE_STATUS.START,
    });
    expect(actual.isFeatNodeClick).toEqual(true);
  });

  it('should handle changeNormalNode', () => {
    const NODE_ID = '2-1';
    const actual = mazeReducer(testMazeState, changeNormalNode(NODE_ID));

    expect(actual.nodes.byId[NODE_ID].status).toEqual(NODE_STATUS.WALL);
  });

  it('should handle changeFeatNode', () => {
    const FEAT_NODE_ID = '3-5';
    const TARGET_NODE_ID = '3-6';

    const mouseClickState = mazeReducer(testMazeState, mouseDown());

    const clickedFeatNodeState = mazeReducer(
      mouseClickState,
      clickFeatNode({
        nodeId: FEAT_NODE_ID,
        nodeStatus: testMazeState.nodes.byId[FEAT_NODE_ID].status,
      }),
    );

    expect(clickedFeatNodeState.isFeatNodeClick).toEqual(true);
    expect(clickedFeatNodeState.clickedFeatNodeInfo).toEqual({
      id: FEAT_NODE_ID,
      status: NODE_STATUS.START,
    });

    const actual = mazeReducer(
      clickedFeatNodeState,
      changeFeatNode({
        targetNodeId: TARGET_NODE_ID,
        targetNodeStatus:
          clickedFeatNodeState.nodes.byId[TARGET_NODE_ID].status,
      }),
    );

    expect(actual.nodes.byId[TARGET_NODE_ID].status).toEqual(NODE_STATUS.START);
  });

  it('should handle startPathFinding', () => {
    const START_NODE_ID = '3-5';
    const END_NODE_ID = '3-15';
    const pathfindingState = mazeReducer(
      testMazeState,
      startPathfinding(ALGORITHM.A_STAR_SEARCH),
    );

    const startColIndex = parseInt(getNodeColIndex(START_NODE_ID), 10);
    const endColIndex = parseInt(getNodeColIndex(END_NODE_ID), 10);

    for (let i = endColIndex; i > startColIndex; i--) {
      const currentNodeId = `3-${i}`;
      const previousNodeId =
        pathfindingState.nodes.byId[currentNodeId].previousNodeId;

      expect(previousNodeId).toEqual(getPrevNodeId(currentNodeId));

      const currentNodeStatus =
        pathfindingState.nodes.byId[currentNodeId].status;

      if (!isFeatNode(currentNodeStatus)) {
        const visitedNodeState = mazeReducer(
          pathfindingState,
          visitNode(currentNodeId),
        );

        expect(visitedNodeState.nodes.byId[currentNodeId].status).toEqual(
          NODE_STATUS.VISITED2,
        );
      }
    }
  });

  it('should handle drawMazeNode and changeCurrentJamBlock', () => {
    const TARGET_NODE_ID = '1-5';
    const targetNodeBeforeStatus =
      testMazeState.nodes.byId[TARGET_NODE_ID].status;
    let currentJamBlockType;

    currentJamBlockType = testMazeState.currentJamBlockType;

    const drawWallBlockState = mazeReducer(
      testMazeState,
      drawMazeNode({
        nodeId: TARGET_NODE_ID,
        nodeStatus: targetNodeBeforeStatus,
      }),
    );

    const targetNodeDrawWallStatus =
      drawWallBlockState.nodes.byId[TARGET_NODE_ID].status;

    expect(targetNodeDrawWallStatus).toEqual(currentJamBlockType);

    const changeJamBlockState = mazeReducer(
      testMazeState,
      changeCurrentJamBlockType(NODE_STATUS.WEIGHTED),
    );

    currentJamBlockType = changeJamBlockState.currentJamBlockType;

    const drawWeightBlockState = mazeReducer(
      changeJamBlockState,
      drawMazeNode({
        nodeId: TARGET_NODE_ID,
        nodeStatus: targetNodeBeforeStatus,
      }),
    );

    const targetNodeDrawWeightStatus =
      drawWeightBlockState.nodes.byId[TARGET_NODE_ID].status;

    expect(targetNodeDrawWeightStatus).toEqual(currentJamBlockType);
  });

  it('should handle markPathNode', () => {
    const PATH_NODE_ID = '3-6';
    const actual = mazeReducer(testMazeState, markPathNode(PATH_NODE_ID));

    expect(actual.nodes.byId[PATH_NODE_ID].status).toEqual(NODE_STATUS.PATH2);
  });

  it('should handle setAnimationTimeoutId', () => {
    const TIMEOUT_ID = 6;
    const actual = mazeReducer(
      testMazeState,
      setAnimationTimeoutId(TIMEOUT_ID),
    );

    expect(actual.animationTimeoutId).toEqual(TIMEOUT_ID);
  });

  it('should handle startAnimation and endAnimation', () => {
    const startAnimationState = mazeReducer(testMazeState, startAnimation());

    expect(startAnimationState.isProgressive).toEqual(true);

    const endAnimationState = mazeReducer(startAnimationState, endAnimation());

    expect(endAnimationState.isProgressive).toEqual(false);
    expect(endAnimationState.animatedNodeIds.length).toEqual(0);
    expect(endAnimationState.animatedPathNodeIds.length).toEqual(0);
  });

  it('should handle createMiddleNode and deleteMiddleNode', () => {
    const createdMiddleNodeState = mazeReducer(
      testMazeState,
      createMiddleNode(),
    );

    const widthCount = testMazeState.widthCount;
    const heightCount = testMazeState.heightCount;

    const middleNodeIdY = parseInt(heightCount / 2, 10);
    const middleNodeIdX = parseInt(widthCount / 2, 10);

    let middleNodeId = `${middleNodeIdY}-${middleNodeIdX}`;

    expect(createdMiddleNodeState.middleNodeId).toEqual(middleNodeId);

    const deleteMiddleNodeState = mazeReducer(
      createdMiddleNodeState,
      deleteMiddleNode(),
    );

    expect(deleteMiddleNodeState.middleNodeId).toEqual(null);
  });
});
