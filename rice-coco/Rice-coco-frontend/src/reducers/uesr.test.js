import { user } from './user';

const initialState = {
  _id: '',
  birthYear: '',
  email: '',
  favoritePartners: [],
  gender: '',
  nickname: '',
  occupation: '',
  preferredPartner: {
    _id: '',
    birthYear: '',
    gender: '',
    occupation: '',
  },
  promise: 0,
};

// [mockDate]
const mockUser = {
  _id: 'saddsa232',
  birthYear: '1992',
  email: 'aaaaa46@naver.comcom',
  favoritePartners: ['asdasd234as', 'asd23423as'],
  gender: 'female',
  nickname: '다람쥐',
  occupation: '간호서',
  preferredPartner: {
    _id: '',
    birthYear: '',
    gender: '',
    occupation: '',
  },
  promise: 5,
};

// [mockAction]
const actionSetUser = {
  type: 'SET_USER_INFO',
  payload: mockUser,
};

const actionSetUserPromise = {
  type: 'SET_USER_PROMISE',
  payload: 10,
};

const actionResetUser = {
  type: 'RESET_USER_INFO',
};

//[mockState]
const stateLogin = mockUser;

const statePromise = {
  ...stateLogin,
  promise: 10,
};

describe('user reducers', () => {
  it('should stored userInfo treasures if action is SET_USER_INFO.', () => {
    expect(user(initialState, actionSetUser)).toEqual(stateLogin);
  });

  it('should set promise if action is SET_USER_PROMISE.', () => {
    expect(user(stateLogin, actionSetUserPromise)).toEqual(statePromise);
  });

  it('should reset userInfo if action is RESET_USER_INFO.', () => {
    expect(user(stateLogin, actionResetUser)).toEqual(initialState);
  });
});
