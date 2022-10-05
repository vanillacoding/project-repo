import { location } from './location';

const initialState = {
  latitude: 0,
  longitude: 0,
};

// [mockData]
const mockDataOne = {
  latitude: 34.345435,
  longitude: 127.0590819,
};

// [mockAction]
const mockActionOne = {
  type: 'SET_LOCATION',
  payload: mockDataOne,
};

const mockActionTwo = {
  type: 'RESET_LOCATION',
};

//[mockState]
const mockState = mockDataOne;

describe('location reducer', () => {
  it('shoud stored location if action is called by SET_LOCATION.', () => {
    expect(location(initialState, mockActionOne)).toEqual(mockState);
  });
  it('shoud return current state if it called with Unregistered action.', () => {
    expect(location(initialState, mockActionTwo)).toEqual(initialState);
  });
});
