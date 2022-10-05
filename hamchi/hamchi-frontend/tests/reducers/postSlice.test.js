import {
  reducer,
  toggleFilter,
  initializePosts
} from '../../features/postSlice';

describe('post slice test', () => {
  it('test toggle', () => {
    const key = 'isFiltered';
    const prevState = {
      page: 1,
      isScrollEnd: false,
      isFiltered: false,
      isLoading: true,
      isError: false,
      errorMessage: ''
    };
    const result = reducer(prevState, toggleFilter(true));

    expect(result[key]).toEqual(true);
  });

  it('test initialize posts', () => {
    const key = 'entities';
    const prevState = {
      entities: {
        test1: {
        },
        test2: {
        }
      },
      page: 100,
      isScrollEnd: false,
      isFiltered: false,
      isLoading: true,
      isError: false,
      errorMessage: ''
    };
    const result = reducer(prevState, initializePosts());

    expect(result[key]).toEqual({});
  });
});
