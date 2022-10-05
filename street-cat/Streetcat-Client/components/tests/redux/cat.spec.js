import cat from '../../../reducers/cat';
import {   
  LOG_IN_SUCCESS_CAT, 
  FETCH_CATS_DATA, 
  ADD_CAT_DATA, 
  CHOSEN_CAT, 
  UPDATE_CATS_DATA_LIKE, 
  MODIFY_CAT_DATA,
  DELETE_CAT, 
} from '../../../constants';

describe('cat reducer', () => {
  const initialState = {
    catLists: [],
    catsAround: [],
    currentCat: null,
    catIndex: null,
  };

  const mockState = {
    catLists: [],
    catsAround: [{ name: 'Max' }, { name: 'Dev' }],
    currentCat: null,
    catIndex: null,
  };

  const secondMockState = {
    catLists: [{ name: 'Max', _id: '13579', likes: ['id'] }, { name : 'Dev' }],
    catsAround: [],
    currentCat: null,
    catIndex: null,
  };

  const thirdMockState = {
    catLists: [{ name: 'Max', _id: '1357'}, { name : 'Dev', _id: '124' }],
    catsAround: [{ name: 'Max', _id: '1357'}, { name : 'Dev', _id: '124' }],
    currentCat: { name: 'Max', _id: '1357'},
    catIndex: 0,
  };

  const forthMockState = {
    catLists: [
      { name: 'Max', location: [37.506611, 127.058261]}, 
      { name : 'Dev', location: [37.510143, 127.051931] }
    ],
    catsAround: null,
    currentCat: null,
    catIndex: null,
  };

  const newCat = { name: '박서방 '};
  const cats =  [{ name: 'Max' }, { name : 'Dev' }];
  const likedCat = { name: 'Max', _id: '13579', likes: ['id', 'id1'] };
  const commonCat = { name: 'Mad', _id: '1357' };
  const location = { latitude: 37.505888, longitude: 127.059098 };

  it('should handle initial state', () => {
    expect(cat(undefined, {})
    ).toEqual(initialState);
  });

  it('should handle LOG_IN_SUCCESS', () => {
    expect(cat(initialState, { 
      type: LOG_IN_SUCCESS_CAT, 
      cats,
    })
    ).toEqual({
      catLists: cats,
      catsAround: [],
      currentCat: null,
      catIndex: null,
    });
  });

  it('should handle ADD_CAT_DATA', () => {
    expect(cat(initialState, { 
      type: ADD_CAT_DATA,
      newCat,
    })
    ).toEqual({
      catLists: [newCat],
      catsAround: [],
      currentCat: null,
      catIndex: null,
    });
  });

  it('should handle CHOSEN_CAT', () => {
    expect(cat(mockState, { type: CHOSEN_CAT, catIndex: 0 })
    ).toEqual({
      catLists: [],
      catsAround: [{ name: 'Max' }, { name: 'Dev' }],
      currentCat: { name: 'Max' },
      catIndex: 0,
    });
  });

  it('should handle UPDATE_CATS_DATA_LIKE', () => {
    expect(cat(secondMockState, { type: UPDATE_CATS_DATA_LIKE, cat: likedCat })
    ).toEqual({
      catLists: [{ name: 'Dev' }, likedCat],
      catsAround: [],
      currentCat: likedCat,
      catIndex: null,
    });
  });

  it('should handle MODIFY_CAT_DATA', () => {
    expect(cat(thirdMockState, { type: MODIFY_CAT_DATA, cat: commonCat })
    ).toEqual({
      catLists: [{ name: 'Dev', _id: '124' }, commonCat],
    catsAround: [{ name: 'Dev', _id: '124' }, commonCat],
    currentCat: commonCat,
    catIndex: 0,
    });
  });

  it('should handle DELETE_CAT', () => {
    expect(cat(thirdMockState, { type: DELETE_CAT, cat: commonCat })
    ).toEqual({
      catLists: [{ name: 'Dev', _id: '124' }],
      catsAround: [{ name: 'Dev', _id: '124' }],
      currentCat: null,
      catIndex: null,
    });
  });

  it('should handle FETCH_CATS_DATA', () => {
    expect(cat(forthMockState, { type: FETCH_CATS_DATA, location })
    ).toEqual({
      catLists: [
        { name: 'Max', location: [37.506611, 127.058261]}, 
        { name : 'Dev', location: [37.510143, 127.051931] },
      ],
      catsAround: [{ name: 'Max', location: [37.506611, 127.058261]}],
      currentCat: null,
      catIndex: null,
    });
  });
});
