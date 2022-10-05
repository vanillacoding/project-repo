import { ALGORITHM, SPEED } from '../../constant';
import { getAlgorithmInfo } from '../../util';
import mazeOptionsReducer, { setAlgorithm, setSpeed } from './mazeOptionsSlice';

describe('maze options reducer', () => {
  const initialState = {
    algorithm: 'none',
    speed: 'fast',
    weighted: 'none',
    shortest: 'none',
  };

  it('should handle initial state', () => {
    expect(mazeOptionsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState,
    );
  });

  it('should handle set algorithm', () => {
    const SELECTED_ALGORITHM = ALGORITHM.A_STAR_SEARCH;
    const actual = mazeOptionsReducer(
      undefined,
      setAlgorithm(SELECTED_ALGORITHM),
    );

    expect(actual.algorithm).toEqual(SELECTED_ALGORITHM);

    const { weighted, shortest } = getAlgorithmInfo(SELECTED_ALGORITHM);

    expect(actual.weighted).toEqual(weighted);
    expect(actual.shortest).toEqual(shortest);
  });

  it('should handle set speed', () => {
    const SELECTED_SPEED = SPEED.SLOW;
    const actual = mazeOptionsReducer(undefined, setSpeed(SELECTED_SPEED));

    expect(actual.speed).toEqual(SELECTED_SPEED);
  });
});
