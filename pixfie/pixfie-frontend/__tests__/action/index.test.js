import * as actions from '../../src/actions/index';
import * as types from '../../src/constants/actionTypes';

describe('action', () => {
  it('should create SET_PHOTO action', () => {
    expect(actions.setPhoto('test url')).toEqual({
      type: types.SET_PHOTO,
      photo: 'test url'
    });
  });

  it('should create SET_SIGNUP_INFO action', () => {
    const signupInfo = {
      user_id: 'test',
      user_name: 'test',
      password: 'password',
      passwordCheck: 'password'
    };
    expect(actions.setSignupInfo(signupInfo)).toEqual({
      type: types.SET_SIGNUP_INFO,
      signupInfo: {
        user_id: 'test',
        user_name: 'test',
        password: 'password',
        passwordCheck: 'password'
      }
    });
  });

  it('should create SET_LOGIN_INFO action', () => {
    const loginInfo = {
      user_id: 'test',
      password: 'password'
    };
    expect(actions.setLoginInfo(loginInfo)).toEqual({
      type: types.SET_LOGIN_INFO,
      loginInfo: {
        user_id: 'test',
        password: 'password'
      }
    });
  });

  it('should create SET_SEARCH_KEYWORD action', () => {
    expect(actions.setSearchKeyword('keyword')).toEqual({
      type: types.SET_SEARCH_KEYWORD,
      keyword: 'keyword'
    });
  });

  it('should create SET_SEARCH_RESULTS action', () => {
    const users = {
      _id: '123',
      user_id: 'test',
      user_name: 'test',
    };
    expect(actions.setSearchResults(users)).toEqual({
      type: types.SET_SEARCH_RESULTS,
      users: {
        _id: '123',
        user_id: 'test',
        user_name: 'test',
      }
    });
  });

  it('should create SET_SEARCHED_USER action', () => {
    const user = {
      _id: '123',
      user_id: 'test'
    };
    expect(actions.setSearchedUser(user)).toEqual({
      type: types.SET_SEARCHED_USER,
      user: {
        _id: '123',
        user_id: 'test'
      }
    });
  });

  it('should create SET_LOGGED_IN action', () => {
    const loggedIn = {
      status: true,
      user: {
        _id: '123',
        user_id: 'test'
      }
    };
    expect(actions.setLoggedIn(loggedIn)).toEqual({
      type: types.SET_LOGGED_IN,
      loggedIn: {
        status: true,
        user: {
          _id: '123',
          user_id: 'test'
        }
      }
    });
  });

  it('should create SET_USER_PORTRAITS action', () => {
    expect(actions.setUserPortraits([1, 2, 3])).toEqual({
      type: types.SET_USER_PORTRAITS,
      userPortraits: [1, 2, 3]
    });
  });

  it('should create SET_FACE_TYPE action', () => {
    expect(actions.setFaceType({ face: 0, eye: 0 })).toEqual({
      type: types.SET_FACE_TYPE,
      faceType: { face: 0, eye: 0 }
    });
  });

  it('should create SET_OPTION_THEME action', () => {
    expect(actions.setOptionTheme({ name: 'faceColor', options: [1, 2, 3] })).toEqual({
      type: types.SET_OPTION_THEME,
      optionTheme: { name: 'faceColor', options: [1, 2, 3] }
    });
  });

  it('should create SET_CURRENT_OPTION action', () => {
    expect(actions.setCurrentOption(0)).toEqual({
      type: types.SET_CURRENT_OPTION,
      currentOption: 0
    });
  });

  it('should create SET_DROPDOWN_STATUS action', () => {
    expect(actions.setDropdownStatus(false)).toEqual({
      type: types.SET_DROPDOWN_STATUS,
      dropdownStatus: false
    });
  });

  it('should create SET_FONT_LOADED action', () => {
    expect(actions.setFontLoaded(false)).toEqual({
      type: types.SET_FONT_LOADED,
      fontLoaded: false
    });
  });
});
