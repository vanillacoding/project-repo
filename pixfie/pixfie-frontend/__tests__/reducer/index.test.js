import {
  photo,
  signupInfo,
  loginInfo,
  keyword,
  users,
  searchedUser,
  loggedIn,
  userPortraits,
  faceType,
  optionTheme,
  currentOption,
  dropdownStatus,
  fontLoaded } from '../../src/reducers/index';
import * as types from '../../src/constants/actionTypes';

describe('reducers', () => {
  describe('photo', () => {
    it('should provide initial state', () => {
      expect(photo(undefined, {})).toEqual('');
    });

    it('should provide input that received as input', () => {
      const action = { type: types.SET_PHOTO, photo: 'url' };

      expect(photo('', action)).toEqual('url');
    });
  });

  describe('signupInfo', () => {
    const initialSignupState = {
      user_id: '',
      user_name: '',
      password: '',
      passwordCheck: ''
    };

    it('should provide initial state', () => {
      expect(signupInfo(undefined, {})).toEqual(initialSignupState);
    });

    it('should provide input that received as input', () => {
      const info = {
        user_id: 'test',
        user_name: 'test',
        password: 'password',
        passwordCheck: 'password'
      };
      const action = { type: types.SET_SIGNUP_INFO, signupInfo: info };

      expect(signupInfo('', action)).toEqual({
        user_id: 'test',
        user_name: 'test',
        password: 'password',
        passwordCheck: 'password'
      });
    });
  });

  describe('loginInfo', () => {
    const initialLoginState = {
      user_id: '',
      password: ''
    };

    it('should provide initial state', () => {
      expect(loginInfo(undefined, {})).toEqual(initialLoginState);
    });

    it('should provide input that received as input', () => {
      const info = {
        user_id: 'test',
        password: 'password'
      };
      const action = { type: types.SET_LOGIN_INFO, loginInfo: info };

      expect(loginInfo('', action)).toEqual({
        user_id: 'test',
        password: 'password'
      });
    });
  });

  describe('keyword', () => {
    it('should provide initial state', () => {
      expect(keyword(undefined, {})).toEqual('');
    });

    it('should provide input that received as input', () => {
      const action = { type: types.SET_SEARCH_KEYWORD, keyword: 'keyword'};

      expect(keyword('', action)).toEqual('keyword');
    });
  });

  describe('users', () => {
    it('should provide initial state', () => {
      expect(users(undefined, {})).toEqual([]);
    });

    it('should provide input that received as input', () => {
      const action = { type: types.SET_SEARCH_RESULTS, users: ['user1', 'user2']};

      expect(users('', action)).toEqual(['user1', 'user2']);
    });
  });

  describe('searchedUser', () => {
    const initialSearchedUser = {
      _id: '',
      user_id: '',
      user_name: '',
      profile_url: '',
      photos: [],
      followers: [],
      followings: []
    };

    it('should provide initial state', () => {
      expect(searchedUser(undefined, {})).toEqual(initialSearchedUser);
    });

    it('should provide input that received as input', () => {
      const user = {
        _id: '123',
        user_id: 'test',
        user_name: 'test',
        profile_url: 'url',
        photos: [],
        followers: [],
        followings: []
      };
      const action = { type: types.SET_SEARCHED_USER, user: user};

      expect(searchedUser('', action)).toEqual({
        _id: '123',
        user_id: 'test',
        user_name: 'test',
        profile_url: 'url',
        photos: [],
        followers: [],
        followings: []
      });
    });
  });

  describe('loggedIn', () => {
    const initialLoggedIn = {
      status: false,
      user: {}
    };

    it('should provide initial state', () => {
      expect(loggedIn(undefined, {})).toEqual(initialLoggedIn);
    });

    it('should provide input that received as input', () => {
      const loginUser = {
        status: false,
        user: { user_id: 'test' }
      };
      const action = { type: types.SET_LOGGED_IN, loggedIn: loginUser};

      expect(loggedIn('', action)).toEqual({
        status: false,
        user: { user_id: 'test' }
      });
    });
  });

  describe('userPortraits', () => {
    it('should provide initial state', () => {
      expect(userPortraits(undefined, {})).toEqual([]);
    });

    it('should provide input that received as input', () => {
      const action = { type: types.SET_USER_PORTRAITS, userPortraits: ['portrait1', 'portrait2']};

      expect(userPortraits('', action)).toEqual(['portrait1', 'portrait2']);
    });
  });

  describe('faceType', () => {
    const initialFaceType = {
      face: 0,
      eyebrows: 0,
      eyes: 0,
      nose: 0,
      lip: 0
    };

    it('should provide initial state', () => {
      expect(faceType(undefined, {})).toEqual(initialFaceType);
    });

    it('should provide input that received as input', () => {
      const type = {
        face: 0,
        eyebrows: 1,
        eyes: 2,
        nose: 3,
        lip: 4
      };
      const action = { type: types.SET_FACE_TYPE, faceType: type};

      expect(faceType('', action)).toEqual({
        face: 0,
        eyebrows: 1,
        eyes: 2,
        nose: 3,
        lip: 4
      });
    });
  });

  describe('optionTheme', () => {
    const initialOptionTheme = {
      name: 'face color',
      id: 'faceColor',
      options: [
        ['#FFDBAC', '#ee8862'],
        ['#F3B780', '#ee8862'], 
        ['#8D5524', '#30150e']
      ]
    };

    it('should provide initial state', () => {
      expect(optionTheme(undefined, {})).toEqual(initialOptionTheme);
    });

    it('should provide input that received as input', () => {
      const theme = {
        name: 'eye color',
        id: 'eyeColor',
        options: [
          ['#FFDBAC', '#ee8862'],
          ['#F3B780', '#ee8862'], 
        ]
      };
      const action = { type: types.SET_OPTION_THEME, optionTheme: theme};

      expect(optionTheme('', action)).toEqual({
        name: 'eye color',
        id: 'eyeColor',
        options: [
          ['#FFDBAC', '#ee8862'],
          ['#F3B780', '#ee8862'], 
        ]
      });
    });
  });

  describe('currentOption', () => {
    it('should provide initial state', () => {
      expect(currentOption(undefined, {})).toEqual(0);
    });

    it('should provide input that received as input', () => {
      const action = { type: types.SET_CURRENT_OPTION, currentOption: 1};

      expect(currentOption('', action)).toEqual(1);
    });
  });

  describe('dropdownStatus', () => {
    const initialDropdownStatus = {
      status: false,
      item: {}
    };

    it('should provide initial state', () => {
      expect(dropdownStatus(undefined, {})).toEqual(initialDropdownStatus);
    });

    it('should provide input that received as input', () => {
      const status = {
        status: true,
        item: { _id: '123' }
      };
      const action = { type: types.SET_DROPDOWN_STATUS, dropdownStatus: status};

      expect(dropdownStatus('', action)).toEqual({
        status: true,
        item: { _id: '123' }
      });
    });
  });

  describe('fontLoaded', () => {
    it('should provide initial state', () => {
      expect(fontLoaded(undefined, {})).toEqual(false);
    });

    it('should provide input that received as input', () => {
      const action = { type: types.SET_FONT_LOADED, fontLoaded: true};

      expect(fontLoaded('', action)).toEqual(true);
    });
  });
});
