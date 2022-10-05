import { nodeWidth } from '../common/sizes.module.css';

export const MAZE = {
  BLOCK_SIZE_PX: parseInt(nodeWidth.slice(0, -2), 10) || 35,
  MAZE_SIDE_MARGIN_PX: 50,
  MARGIN_BOTTOM_PX: 50,
  DOUBLE: 2,
};

export default { MAZE };
