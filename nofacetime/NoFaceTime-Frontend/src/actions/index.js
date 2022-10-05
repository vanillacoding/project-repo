import {
  GET_USER_DATA_FROM_DB,
  ADD_ROOM,
  DELETE_ROOM,
  ADD_GROUP,
  DELETE_GROUPS,
  ADD_MEMBERS,
  DELETE_MEMBERS,
  JOIN_ROOM,
  LEAVE_ROOM,
  ADD_MESSAGE,
  ADD_SECRET_MESSAGE,
  SAVE_TARGET_GROUP_ID
} from '../constants/actionTypes';

export const createActionForUserData = (userData) => {

  return {
    type: GET_USER_DATA_FROM_DB,
    payload: userData
  };
};

export const createActionToAddRoom = (addedRoomData) => {
  return {
    type: ADD_ROOM,
    payload: addedRoomData //객체로 새로 추가된 룸 정보가 들어옴! (예상)
  };
};

export const createActionToDeleteRoom = (id) => { // 원래 가지고 있던 룸 아이디를 우리가 보내줌 (디비에는 따로 요청처리, 값 받지 않음)
  return {
    type: DELETE_ROOM,
    payload: id
  };
};

export const createActionToAddGroup = (addedGroupData) => {
  return {
    type: ADD_GROUP,
    payload: addedGroupData // 객체로 된, 추가된 그룹의 정보 (예상)
  };
};

export const createActionToDeleteGroups = (arrayOfId) => { // 지울 그룹들의 오브젝트 아이디만 그룹으로 만들어서 내보냄.
  return {
    type: DELETE_GROUPS,
    payload: arrayOfId
  };
};

export const createActionToAddMembers = (groupId, allMemberData) => {
  return {
    type: ADD_MEMBERS,
    payload: { groupId, allMemberData }  //어느 그룹인지 그룹아이디, 추가되고 난 후의 전체 멤버 배열 형태
  };
};

export const createActionToDeleteMembers = (groupId, arrayOfEmail) => { // 어느 그룹인지 그룹 아이디, 삭제하고 난 후의 전체 멤버 배역 형태
  return {
    type: DELETE_MEMBERS,
    payload: { groupId, arrayOfEmail }
  };
};

export const createActionToJoinMembersInRoom = (obj) => {
  return {
    type: JOIN_ROOM,
    payload: obj
  };
};

export const createActionToDeleteMembersInRoom = (members) => {
  return {
    type: LEAVE_ROOM,
    payload: members
  };
};

export const createActionToAddMessage = (message) => {
  return {
    type: ADD_MESSAGE,
    payload: message
  };
};

export const createActionToSecretMessage = (message) => {
  return {
    type: ADD_SECRET_MESSAGE,
    payload: message
  };
};

export const createActionToSaveTargetGroupId = (groupId) => {
  return {
    type: SAVE_TARGET_GROUP_ID,
    payload: groupId
  };
};
