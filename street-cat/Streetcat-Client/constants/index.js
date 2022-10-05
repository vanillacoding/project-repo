export const LOADING = 'LOADING';
export const FETCH_CATS_DATA = 'FETCH_CATS_DATA';
export const ADD_CAT_DATA = 'ADD_CAT_DATA';
export const UPDATE_CATS_DATA = 'UPDATE_CATS_DATA';
export const UPDATE_CATS_DATA_LIKE = 'UPDATE_CATS_DATA_LIKE';
export const MODIFY_CAT_DATA = 'MODIFY_CAT_DATA';
export const DELETE_CAT = 'DELETE_CAT';
export const UPDATE_CATS_DATA_COMMENT = 'UPDATE_CATS_DATA_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_SUCCESS_CAT = 'LOG_IN_SUCCESS_CAT';
export const LOG_IN_SUCCESS_USER = 'LOG_IN_SUCCESS_USER';
export const LOG_OUT = 'LOG_OUT';
export const LOCATION_SUCCESS = 'LOCATION_SUCCESS';
export const REG_PETTERNS = {
  name: /[1-9|$&+,:;=?@#|'<>.^*()%!-]/g,
  textArea: /^[a-zA-Z0-9[ㄱ-ㅎ|ㅏ-ㅣ|가-힣.,\s]{1,30}$/g,
};

export const GET_USER_LOCATION = 'GET_USER_LOCATION';
export const CHECKBOX_VALUE = ['상', '중', '하'];
export const ACTION_SHEET_VALUE = ['상', '중', '하', '취소'];
export const CHOSEN_CAT = 'CHOSEN_CAT';
export const HEADER_IMAGE = 'https://cdn.pixabay.com/photo/2016/10/11/18/17/black-cat-1732366_1280.png';
export const MARKER = 'https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color/254000/66-512.png'
export const CAT_MARKER = 'https://cdn1.iconfinder.com/data/icons/locations-6/48/1-512.png';
export const ADD_COMMENT = 'ADD_COMMENT';
export const GET_COMMENTS = 'GET_COMMENTS';
export const REST_COMMENTS = 'REST_COMMENTS';
export const DELETE_ALERT = { option1: '삭제', option2: '정말삭제하시겠습니까' };
export const COLOR = { 
  main: '#ff9191', 
  second: '#C64242', 
  white: 'white', 
  transparent: 'transparent',
  circle: 'rgba(200, 300, 200, 0.5)',
};

export const API = 'http://streetcat-development.ap-northeast-2.elasticbeanstalk.com';