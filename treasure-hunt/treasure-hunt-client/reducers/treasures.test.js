import treasures from './treasures';

const initialState = {
  treasures: [],
  selectedTreasure: {},
  uriList: [],
};

// [mockDate]
const mockDataOne = [{
  'id': 'ekajrlkejralek122',
  'country': 'France',
  'name': '파리 교통 패스',
  'expiration': '2020/05/04'
}, {
  'id': 'aese123asertetae2',
  'country': 'England',
  'name': '영국 유심 4GB',
  'expiration': '2020/05/04'
}];

const mockDataTwo = [{
  'id': 'ael3lalc',
  'country': 'Korea',
  'name': '서울 롯데월드 쿠폰',
  'expiration': '2020/12/31'
}];

const mockDataThree = {
  'id': 'aeraeraero1234',
  'country': 'Swiss',
  'name': '스위스 교통 패스',
  'expiration': '2020/12/31'
};

const uriFirst = 'www.abdc.com/ekek/123';
const uriSecond = 'www.abdc.com/esaerk/123';

// [mockAction]
const actionTreasuresOne = {
  type: 'GET_TREASURES',
  treasures: mockDataOne,
};

const actionTreasuresTwo = {
  type: 'GET_TREASURES',
  treasures: mockDataTwo,
};

const actionSelectedTreasures = {
  type: 'GET_SELECTEDTREASURE',
  selectedTreasure: mockDataThree,
};

const actionTakePicturesOne = {
  type: 'TAKE_PICTURES',
  uri: uriFirst,
};

const actionTakePicturesTwo = {
  type: 'TAKE_PICTURES',
  uri: uriSecond,
};

const actionInitialPictures = {
  type: 'INITIAL_PICTURES',
};

//[mockState]
const stateTreasuresOne = {
  treasures: mockDataOne, selectedTreasure: {}, uriList: [],
};

const stateTreasuresTwo = {
  treasures: mockDataTwo, selectedTreasure: {}, uriList: [],
};

const stateSelectedTreasure = {
  treasures: mockDataOne, selectedTreasure: mockDataThree, uriList: [],
};

const stateTakeUrisOne = {
  treasures: [], selectedTreasure: {}, uriList: [uriFirst],
};

const stateTakeUrisTwo = {
  treasures: [], selectedTreasure: {}, uriList: [uriFirst, uriSecond],
};

describe('<treasures Reducer>', () => {
  it('should be stored treasures if action is GET_TREASURES.', () => {
    expect(treasures(initialState, actionTreasuresOne)).toEqual(stateTreasuresOne);
    expect(treasures(stateTreasuresOne, actionTreasuresTwo)).toEqual(stateTreasuresTwo);
  });

  it('should stored selected treasure if action is GET_SELECTEDTREASURE.', () => {
    expect(treasures(stateTreasuresOne, actionSelectedTreasures)).toEqual(stateSelectedTreasure);
  });

  it('should stored given treasure pictures uri if action is TAKE_PICTURES.', () => {
    expect(treasures(initialState, actionTakePicturesOne)).toEqual(stateTakeUrisOne);
    expect(treasures(stateTakeUrisOne, actionTakePicturesTwo)).toEqual(stateTakeUrisTwo);
  });

  it('should delete treasure pictures uri if action is INITIAL_PICTURES.', () => {
    expect(treasures(stateTakeUrisOne, actionInitialPictures)).toEqual(initialState);
  });
});
