import render from '../../../reducers/render';
import { LOG_IN_SUCCESS, LOADING, LOG_OUT } from '../../../constants';

describe('rener reducer', () => {
  const initialState = {
    isLoggedIn: false,
    isLoading: false,
    isError: false,
  };

  const state = {
    isLoggedIn: true,
    isLoading: false,
    isError: false,
  };

  it('should handle initial state', () => {
    expect(render(undefined, {})
    ).toEqual(initialState);
  });

  it('should handle LOG_IN_SUCCESS', () => {
    expect(render(initialState, { type: LOG_IN_SUCCESS })
    ).toEqual({
      isLoggedIn: true,
      isLoading: false,
      isError: false,
    });
  });

  it('should handle LOADING', () => {
    expect(render(initialState, { type: LOADING })
    ).toEqual({
      isLoggedIn: false,
      isLoading: true,
      isError: false,
    });
  });

  it('should handle LOADING', () => {
    expect(render(state, { type: LOG_OUT })
    ).toEqual(initialState);
  });
});
