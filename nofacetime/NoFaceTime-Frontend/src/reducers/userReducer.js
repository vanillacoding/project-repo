import {
  GET_USER_DATA_FROM_DB,
  ADD_ROOM,
  DELETE_ROOM,
  ADD_GROUP,
  DELETE_GROUPS,
  ADD_MEMBERS,
  DELETE_MEMBERS
} from '../constants/actionTypes';

const initialState = {
  isLoggedIn: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DATA_FROM_DB:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true
      };

    case ADD_ROOM:
      return {
        ...state,
        rooms: [...state.rooms, action.payload]
      };

    case DELETE_ROOM:
      return {
        ...state,
        rooms: state.rooms.filter((room) => {
          return room._id !== action.payload;
        })
      };

    case ADD_GROUP:
      return {
        ...state,
        groups: [...state.groups, action.payload]
      };

    case DELETE_GROUPS:
      return {
        ...state,
        groups: state.groups.filter((group) => {
          return !action.payload.includes(group._id);
        })
      };

    case ADD_MEMBERS:
      const targetGroup = state.groups.filter((group) => {
        return group._id === action.payload.groupId;
      })[0];

      targetGroup.members.push(...action.payload.allMemberData);

      return {
        ...state,
        groups: [...state.groups]
      };

    case DELETE_MEMBERS:
      const target = state.groups.filter((group) => {
        return group._id === action.payload.groupId;
      })[0];

      const safeGroup = state.groups.filter((group) => {
        return group._id !== action.payload.groupId;
      });

      const afterDelete = target.members.filter((email) => {
        return !action.payload.arrayOfEmail.includes(email);
      });
      target.members = afterDelete;

      return {
        ...state,
        groups: [...safeGroup, target]
      };

    default:
      return state;
  }
};

export default userReducer;
