import { CALC_NUMBERS } from '../constant';
import { rand } from '../util';

export const createBasicRandomWall = (nodes) => {
  const ids = nodes.allIds.flat();
  const amount = ids.length * CALC_NUMBERS.QUARTER;
  const selectedIds = [];

  for (let i = 0; i < amount; i++) {
    const randomIdIndex = rand(0, ids.length);

    selectedIds.push(ids[randomIdIndex]);
    ids.splice(randomIdIndex, 1);
  }

  return selectedIds;
};

export default createBasicRandomWall;
