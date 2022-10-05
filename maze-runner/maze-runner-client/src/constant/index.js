import wall from '../images/wallNode.png';
import weight from '../images/weightNode.png';
import start from '../images/startNode.png';
import end from '../images/endNode.png';
import middle from '../images/middleNode.png';

export const ALGORITHM = {
  DFS: 'DFS',
  BFS: 'BFS',
  DIJKSTRA: 'Dijkstra',
  A_STAR_SEARCH: 'A * search',
  SWARM: 'Swarm',
  BIDIRECTIONAL_SWARM: 'Bidirectional swarm',
  CONVERGENT_SWARM: 'Convergent swarm',
  GREEDY_BEST_FIRST_SEARCH: 'Greedy best-first search',
  NONE: 'none',
};

export const ALGORITHMS = [
  ALGORITHM.A_STAR_SEARCH,
  ALGORITHM.DIJKSTRA,
  ALGORITHM.BFS,
  ALGORITHM.DFS,
  // ALGORITHM.SWARM,
  // ALGORITHM.BIDIRECTIONAL_SWARM,
  // ALGORITHM.CONVERGENT_SWARM,
  // ALGORITHM.GREEDY_BEST_FIRST_SEARCH,
];

export const MAZE_AND_PATTERNS = {
  RECURSIVE_DIVISION: 'Recursive division',
  RECURSIVE_DIVISION_VERTICAL: 'Recursive division (vertical skew)',
  RECURSIVE_DIVISION_HORIZONTAL: 'Recursive division (horizontal skew)',
  BASIC_RANDOM_WALL: 'Basic random maze',
  BASIC_RANDOM_WEIGHT: 'Basic weight maze',
  SIMPLE_STAIR: 'Simple stair pattern',
};

export const MAZE_AND_PATTERNS_DROPDOWN_LIST = [
  MAZE_AND_PATTERNS.RECURSIVE_DIVISION,
  // MAZE_AND_PATTERNS.RECURSIVE_DIVISION_VERTICAL,
  // MAZE_AND_PATTERNS.RECURSIVE_DIVISION_HORIZONTAL,
  MAZE_AND_PATTERNS.BASIC_RANDOM_WALL,
  // MAZE_AND_PATTERNS.BASIC_RANDOM_WEIGHT,
  // MAZE_AND_PATTERNS.SIMPLE_STAIR,
];

export const CLEAR_MAZE = {
  CLEAR_ALL: 'Clear all',
  CLEAR_WALLS_AND_WEIGHT: 'Clear walls & weight',
  CLEAR_PATH: 'Clear path',
};

export const CLEAR_MAZE_DROPDOWN_LIST = [
  CLEAR_MAZE.CLEAR_ALL,
  CLEAR_MAZE.CLEAR_WALLS_AND_WEIGHT,
  CLEAR_MAZE.CLEAR_PATH,
];

export const SPEED = {
  FAST: 'fast',
  AVERAGE: 'average',
  SLOW: 'slow',
};

export const SPEED_MS = {
  [SPEED.FAST]: 10,
  [SPEED.AVERAGE]: 50,
  [SPEED.SLOW]: 100,
};

export const SPEED_LIST = [SPEED.FAST, SPEED.AVERAGE, SPEED.SLOW];

export const NAV = {
  COMPARE_MODE: 'Compare mode',
  ALGORITHMS: 'Algorithms',
  MAZES_AND_PATTERNS: 'Create Maze',
  ADD_MIDDLE_POINT: 'apple',
  START: 'Start!',
  STOP: 'Stop',
  CLEAR_MAZE: 'Clear maze',
  SAVE_AND_SHARE: 'Save & Share',
  SPEED: 'Speed',
};

export const NAV_LIST = [
  // {
  //   title: NAV.COMPARE_MODE,
  //   hasDropdown: false,
  // },
  {
    title: NAV.ALGORITHMS,
    hasDropdown: true,
    child: ALGORITHMS,
  },
  {
    title: NAV.MAZES_AND_PATTERNS,
    hasDropdown: true,
    child: MAZE_AND_PATTERNS_DROPDOWN_LIST,
  },
  // {
  //   title: NAV.ADD_MIDDLE_POINT,
  //   hasDropdown: false,
  // },
  {
    title: NAV.START,
    hasDropdown: false,
  },
  {
    title: NAV.CLEAR_MAZE,
    hasDropdown: true,
    child: CLEAR_MAZE_DROPDOWN_LIST,
  },
  {
    title: NAV.SAVE_AND_SHARE,
    hasDropdown: false,
  },
  {
    title: NAV.SPEED,
    hasDropdown: true,
    child: SPEED_LIST,
  },
];

export const MAZE_OPTIONS = ['Algorithm', 'Speed', 'Weighted', 'Shortest'];

export const NODE_STATUS = {
  UNVISITED: 'unvisited',
  VISITED: 'visited',
  VISITED2: 'visited2',
  WALL: 'wall',
  WEIGHTED: 'weighted',
  START: 'start',
  END: 'end',
  MIDDLE: 'middle',
  PATH: 'path',
  PATH2: 'path2',
};

export const NODE_STATUS_LIST = [
  NODE_STATUS.UNVISITED,
  NODE_STATUS.VISITED,
  NODE_STATUS.WALL,
  NODE_STATUS.WEIGHTED,
  NODE_STATUS.START,
  NODE_STATUS.END,
  NODE_STATUS.MIDDLE,
  NODE_STATUS.PATH,
];

export const NODE_IMAGE_PATH = {
  WALL: wall,
  WEIGHTED: weight,
  START: start,
  END: end,
  MIDDLE: middle,
  // PATH: 'path',
};

export const NODE_TYPES = [
  {
    id: NODE_STATUS.START,
    title: 'Start',
    imagePath: start,
  },
  {
    id: NODE_STATUS.END,
    title: 'End',
    imagePath: end,
  },
  {
    id: NODE_STATUS.MIDDLE,
    title: 'Stopover',
    imagePath: middle,
  },
  {
    id: NODE_STATUS.WEIGHTED,
    title: 'Weight Block',
    imagePath: weight,
  },
  {
    id: NODE_STATUS.WALL,
    title: 'Wall Block',
    imagePath: wall,
  },
];

export const WEIGHTED = {
  TRUE: 'true',
  FALSE: 'false',
  NONE: 'none',
};

export const SHORTEST = {
  GUARANTEE: 'guaranteed',
  NO_GUARANTEE: 'no-guaranteed',
  NONE: 'none',
};

export const NODE_PROPERTY = {
  STATUS: 'status',
  WEIGHT: 'weight',
  PREVIOUS_NODE_ID: 'previousNodeId',
  DISTANCE: 'distance',
};

export const CALC_NUMBERS = {
  HALF: 0.5,
  QUARTER: 0.25,
  TRIPLE: 3,
};

export const PROGRESS_RESULT = {
  SUCCESS: 'success',
  FAILURE: 'failure',
  NONE: 'none',
};

export const PLAIN_DIRECTION = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
};

export const USER_GUIDE_TEXT = {
  SELECT_YOUR_ALGO: 'Select your algorithm!',
  CLICK_ME: 'Click me',
};

export const RESPONSE_RESULT = {
  OK: 'ok',
  ERROR: 'error',
};

export default {
  ALGORITHM,
  ALGORITHMS,
  MAZE_AND_PATTERNS,
  MAZE_AND_PATTERNS_DROPDOWN_LIST,
  CLEAR_MAZE,
  CLEAR_MAZE_DROPDOWN_LIST,
  SPEED,
  SPEED_MS,
  SPEED_LIST,
  NAV,
  NAV_LIST,
  MAZE_OPTIONS,
  NODE_STATUS,
  NODE_STATUS_LIST,
  NODE_IMAGE_PATH,
  NODE_TYPES,
  WEIGHTED,
  SHORTEST,
  NODE_PROPERTY,
  CALC_NUMBERS,
  PROGRESS_RESULT,
  PLAIN_DIRECTION,
  USER_GUIDE_TEXT,
};
