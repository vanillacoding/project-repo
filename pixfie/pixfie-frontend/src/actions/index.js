import * as types from '../constants/actionTypes';

export const setPhoto = photo => {
  return {
    type: types.SET_PHOTO,
    photo
  };
};

export const setSignupInfo = signupInfo => {
  return {
    type: types.SET_SIGNUP_INFO,
    signupInfo
  };
};

export const setLoginInfo = loginInfo => {
  return {
    type: types.SET_LOGIN_INFO,
    loginInfo
  };
};

export const setSearchKeyword = keyword => {
  return {
    type: types.SET_SEARCH_KEYWORD,
    keyword
  };
};

export const setSearchResults = users => {
  return {
    type: types.SET_SEARCH_RESULTS,
    users
  };
};

export const setSearchedUser = user => {
  return {
    type: types.SET_SEARCHED_USER,
    user
  };
};

export const setLoggedIn = loggedIn => {
  return {
    type: types.SET_LOGGED_IN,
    loggedIn
  };
};

export const setUserPortraits = userPortraits => {
  return {
    type: types.SET_USER_PORTRAITS,
    userPortraits
  };
};

export const setFaceType = faceType => {
  return {
    type: types.SET_FACE_TYPE,
    faceType
  };
};

export const setOptionTheme = optionTheme => {
  return {
    type: types.SET_OPTION_THEME,
    optionTheme
  };
};

export const setCurrentTheme = currentTheme => {
  return {
    type: types.SET_CURRENT_THEME,
    currentTheme
  };
};

export const setCurrentOption = currentOption => {
  return {
    type: types.SET_CURRENT_OPTION,
    currentOption
  };
};

export const setDropdownStatus = dropdownStatus => {
  return {
    type: types.SET_DROPDOWN_STATUS,
    dropdownStatus
  };
};

export const setFontLoaded = fontLoaded => {
  return {
    type: types.SET_FONT_LOADED,
    fontLoaded
  };
};
