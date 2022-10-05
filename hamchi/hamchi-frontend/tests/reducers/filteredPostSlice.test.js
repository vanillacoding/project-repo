import {
  reducer,
  addType,
  deleteType,
  initFeeds
} from '../../features/filteredPostSlice';

describe('test filtered post slice', () => {
  it('test initialize feeds', () => {
    const key1 = 'entities';
    const key2 = 'page';
    const entities = {};
    const entityNum = 24;

    for (let i = 0; i < entityNum; i++) {
      entities[i] = {};
    }

    const prevState = {
      entities,
      page: 6
    };

    const result = reducer(prevState, initFeeds());

    expect(result[key1]).toEqual({});
    expect(result[key2]).toEqual(1);
  });

  it('test add type', () => {
    const key = 'selectedHamsterTypes';
    const type = 'Syrian';
    const prevState = {
      page: 1,
      isScrollEnd: false,
      selectedHamsterTypes: {},
      isLoading: true,
      isError: false,
      errorMessage: ''
    };
    const expected = {};
    const result = reducer(prevState, addType(type));

    expected[type] = true;
    expect(result[key]).toEqual(expected);
  });

  it('test delete type', () => {
    const key = 'selectedHamsterTypes';
    const type = 'Syrian';
    const expected = {};
    const prevState = {
      page: 1,
      isScrollEnd: false,
      selectedHamsterTypes: { Syrian: true },
      isLoading: true,
      isError: false,
      errorMessage: ''
    };

    const result = reducer(prevState, deleteType(type));

    expect(result[key]).toEqual(expected);
  });
});
