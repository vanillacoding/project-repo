import checkTargetIsInDistance from './checkTargetIsInDistance';

const mockData = {
  target: {
    latitude: 37.5059692,
    longitude: 127.0590819,
  },
  sourceOne: {
    latitude: 37.5051792,
    longitude: 127.0595819,
  },
  sourceTwo: {
    latitude: 32.5039692,
    longitude: 121.0590819,
  },
  sourceThree: {
    latitude: 37.5059692,
    longitude: 127.0596819,
  },
  sourceFour: {
    latitude: 37.5059692,
    longitude: 127.0590819,
  },
};

describe('checkTargetIsInDistance', function () {
  it('should return boolean whether target is within a certain distance from source', () => {
    expect(checkTargetIsInDistance(mockData.target, mockData.sourceOne, 5000)).toBe(true);
    expect(checkTargetIsInDistance(mockData.target, mockData.sourceTwo, 5000)).toBe(false);
    expect(checkTargetIsInDistance(mockData.target, mockData.sourceThree, 5000)).toBe(true);
    expect(checkTargetIsInDistance(mockData.target, mockData.sourceFour, 5000)).toBe(true);
  });
});
