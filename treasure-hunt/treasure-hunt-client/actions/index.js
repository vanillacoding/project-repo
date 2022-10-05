import * as types from '../constants/actionTypes';

export function getTreasures(treasures){
  return {
    type: types.GET_TREASURES,
    treasures,
  };
}

export function getSelectedTreasure(selectedTreasure){
  return {
    type: types.GET_SELECTEDTREASURE,
    selectedTreasure,
  };
}

export function getLoginUser(userInfo){
  return {
    type: types.GET_LOGINUSER,
    userInfo,
  };
}

export function getLogoutUser(){
  return {
    type: types.GET_LOGOUTUSER,
  };
}

export function takePictures(uri){
  return {
    type: types.TAKE_PICTURES,
    uri,
  };
}

export function initialPictures() {
  return {
    type: types.INITIAL_PICTURES,
  };
}
