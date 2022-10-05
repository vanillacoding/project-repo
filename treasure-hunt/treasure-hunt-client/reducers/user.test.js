import users from './user';

const initialState = {
  isLogin: false,
  userInfo: {},
};

// [mockDate]
const mockUser = {
  'picture_url': 'www.aeerk.com/efjeke/12kek4',
  'name': 'apple',
  'id': 'aekjaekljr123'
};

// [mockAction]
const actionLogin = {
  type: 'GET_LOGINUSER',
  userInfo: mockUser,
};

const actionLogout = {
  type: 'GET_LOGOUTUSER',
};

//[mockState]
const stateLogin = {
  isLogin: true,
  userInfo: mockUser,
};

describe('<users Reducer>', () => {
  it('should change isLogin and stored userInfo treasures if action is GET_LOGINUSER.', () => {
    expect(users(initialState, actionLogin)).toEqual(stateLogin);
  });

  it('should change isLogin and delete userInfo if action is GET_LOGOUTUSER.', () => {
    expect(users(stateLogin, actionLogout)).toEqual(initialState);
  });
});
